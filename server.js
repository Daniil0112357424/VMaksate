const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = 'Daniil011235!';
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'store.json');
const rawFirebaseEnv = String(process.env.FIREBASE_SERVICE_ACCOUNT || '');
const firebaseKeyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || '';

let firebaseDb = null;
let firebaseEnabled = false;

function initFirebase() {
  try {
    if (!rawFirebaseEnv && !firebaseKeyPath) {
      return;
    }

    let serviceAccount = null;
    if (rawFirebaseEnv.trim().startsWith('{')) {
      serviceAccount = JSON.parse(rawFirebaseEnv);
    } else if (fs.existsSync(rawFirebaseEnv)) {
      serviceAccount = JSON.parse(fs.readFileSync(rawFirebaseEnv, 'utf8'));
    } else if (fs.existsSync(firebaseKeyPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(firebaseKeyPath, 'utf8'));
    }

    if (!serviceAccount) {
      console.warn('Firebase credentials are not configured. Falling back to the local JSON store.');
      return;
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    firebaseDb = admin.firestore();
    firebaseEnabled = true;
    console.log('Firebase Firestore initialized.');
  } catch (error) {
    console.warn('Firebase is unavailable. Falling back to the local JSON store:', error.message);
    firebaseEnabled = false;
  }
}

initFirebase();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function ensureStore() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ users: [], messages: [] }, null, 2));
  }
}

async function readStore() {
  if (firebaseEnabled && firebaseDb) {
    const [usersSnap, messagesSnap] = await Promise.all([
      firebaseDb.collection('users').get(),
      firebaseDb.collection('messages').get(),
    ]);

    return {
      users: usersSnap.docs.map((doc) => doc.data()),
      messages: messagesSnap.docs.map((doc) => doc.data()),
    };
  }

  ensureStore();
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

async function saveStore(store) {
  if (firebaseEnabled && firebaseDb) {
    const users = Array.isArray(store.users) ? store.users : [];
    const messages = Array.isArray(store.messages) ? store.messages : [];

    const usersRef = firebaseDb.collection('users');
    const messagesRef = firebaseDb.collection('messages');

    const userBatch = firebaseDb.batch();
    const usersSnapshot = await usersRef.get();
    usersSnapshot.docs.forEach((doc) => userBatch.delete(doc.ref));
    users.forEach((user) => {
      userBatch.set(usersRef.doc(String(user.id)), {
        id: String(user.id),
        label: String(user.label || user.id),
        password: String(user.password || ''),
      });
    });
    await userBatch.commit();

    const messageBatch = firebaseDb.batch();
    const messagesSnapshot = await messagesRef.get();
    messagesSnapshot.docs.forEach((doc) => messageBatch.delete(doc.ref));
    messages.forEach((message) => {
      messageBatch.set(messagesRef.doc(String(message.id)), {
        id: Number(message.id) || Date.now() + Math.floor(Math.random() * 1000),
        fromId: String(message.fromId),
        toId: String(message.toId),
        text: String(message.text),
        createdAt: String(message.createdAt),
      });
    });
    await messageBatch.commit();
    return;
  }

  ensureStore();
  fs.writeFileSync(dataFile, JSON.stringify(store, null, 2));
}

function sanitizeUser(user) {
  return {
    id: user.id,
    label: user.label,
  };
}

async function pruneDemoUsers() {
  const store = await readStore();
  const demoIds = new Set(store.users.filter((u) => /^demo-/i.test(String(u.id))).map((u) => u.id));

  if (demoIds.size === 0) {
    return;
  }

  store.users = store.users.filter((user) => !demoIds.has(user.id));
  store.messages = store.messages.filter((message) => !demoIds.has(message.fromId) && !demoIds.has(message.toId));
  await saveStore(store);
}

async function ensureUser(id, label, password = '') {
  const store = await readStore();
  const index = store.users.findIndex((user) => user.id === String(id));

  if (index >= 0) {
    store.users[index].label = String(label || store.users[index].label || id);
    if (password) {
      store.users[index].password = String(password);
    }
  } else {
    store.users.push({ id: String(id), label: String(label || id), password: String(password || '') });
  }

  await saveStore(store);
}

pruneDemoUsers().catch((error) => {
  console.warn('Unable to prune demo users:', error.message);
});

app.get('/api/users', async (req, res) => {
  const me = String(req.query.me || '');
  const search = String(req.query.search || '').trim().toLowerCase();
  const store = await readStore();

  let users = store.users
    .map((user) => sanitizeUser(user))
    .filter((user) => user.id !== me);

  if (!search) {
    if (me) {
      const partnerIds = new Set();
      store.messages.forEach((message) => {
        if (message.fromId === me && message.toId !== me) {
          partnerIds.add(String(message.toId));
        }
        if (message.toId === me && message.fromId !== me) {
          partnerIds.add(String(message.fromId));
        }
      });

      users = users.filter((user) => partnerIds.has(user.id));
    }

    return res.json(users);
  }

  users = users.filter((user) => {
    return user.id.toLowerCase().includes(search) || user.label.toLowerCase().includes(search);
  });

  res.json(users);
});

app.post('/api/auth/register', async (req, res) => {
  const { id, label, password } = req.body || {};

  if (!id || !label || !password) {
    return res.status(400).json({ error: 'Need id, label and password.' });
  }

  const store = await readStore();
  const exists = store.users.some((user) => user.id === String(id));
  if (exists) {
    return res.status(409).json({ error: 'Пользователь с таким user-id уже зарегистрирован' });
  }

  await ensureUser(String(id), String(label), String(password));
  res.cookie('sessionUserId', String(id), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  res.json({ ok: true, user: sanitizeUser({ id: String(id), label: String(label) }) });
});

app.post('/api/auth/login', async (req, res) => {
  const { id, password } = req.body || {};
  if (!id || !password) {
    return res.status(400).json({ error: 'Need id and password.' });
  }

  const store = await readStore();
  const user = store.users.find((entry) => entry.id === String(id));
  if (!user || user.password !== String(password)) {
    return res.status(401).json({ error: 'Invalid user id or password.' });
  }

  res.cookie('sessionUserId', String(id), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  res.json({ ok: true, user: sanitizeUser(user) });
});

app.get('/api/auth/me', async (req, res) => {
  const sessionUserId = req.cookies?.sessionUserId;
  if (!sessionUserId) {
    return res.json({ user: null });
  }

  const store = await readStore();
  const user = store.users.find((entry) => entry.id === String(sessionUserId));
  if (!user) {
    return res.json({ user: null });
  }

  res.json({ user: sanitizeUser(user) });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('sessionUserId', { path: '/' });
  res.json({ ok: true });
});

function requireAdmin(req, res, next) {
  const adminCookie = req.cookies?.adminSession;
  if (adminCookie !== '1') {
    return res.status(401).json({ error: 'Admin access required.' });
  }
  next();
}

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {};
  if (String(password) !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin password.' });
  }

  res.cookie('adminSession', '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('adminSession', { path: '/' });
  res.json({ ok: true });
});

app.get('/api/admin/me', (req, res) => {
  const adminCookie = req.cookies?.adminSession;
  res.json({ admin: adminCookie === '1' });
});

app.get('/api/admin/users', requireAdmin, async (req, res) => {
  const store = await readStore();
  res.json({ users: store.users.map((user) => sanitizeUser(user)) });
});

app.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
  const id = String(req.params.id || '');
  if (!id) {
    return res.status(400).json({ error: 'Need user id.' });
  }

  const store = await readStore();
  store.users = store.users.filter((user) => user.id !== id);
  store.messages = store.messages.filter((message) => message.fromId !== id && message.toId !== id);
  await saveStore(store);

  res.json({ ok: true, deletedUserId: id });
});

app.delete('/api/admin/users', requireAdmin, async (req, res) => {
  const store = await readStore();
  store.users = [];
  store.messages = [];
  await saveStore(store);
  res.json({ ok: true });
});

app.delete('/api/users/:id', async (req, res) => {
  const id = String(req.params.id || '');
  if (!id) {
    return res.status(400).json({ error: 'Need user id.' });
  }

  const store = await readStore();
  store.users = store.users.filter((user) => user.id !== id);
  store.messages = store.messages.filter((message) => message.fromId !== id && message.toId !== id);
  await saveStore(store);

  res.json({ ok: true, deletedUserId: id });
});

app.delete('/api/users', async (req, res) => {
  const store = await readStore();
  store.users = [];
  store.messages = [];
  await saveStore(store);
  res.json({ ok: true });
});

app.get('/api/chat', async (req, res) => {
  const me = String(req.query.me || '');
  const other = String(req.query.other || '');

  if (!me || !other) {
    return res.status(400).json({ error: 'Need both ids.' });
  }

  await ensureUser(me, me);
  await ensureUser(other, other);

  const store = await readStore();
  const messages = store.messages
    .filter((item) => {
      return (item.fromId === me && item.toId === other) || (item.fromId === other && item.toId === me);
    })
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  res.json({ chatKey: [me, other].sort().join('::'), messages });
});

app.post('/api/chat', async (req, res) => {
  const { fromId, toId, text } = req.body || {};

  if (!fromId || !toId || !text) {
    return res.status(400).json({ error: 'Need fromId, toId and text.' });
  }

  await ensureUser(String(fromId), String(fromId));
  await ensureUser(String(toId), String(toId));

  const store = await readStore();
  const message = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    fromId: String(fromId),
    toId: String(toId),
    text: String(text),
    createdAt: new Date().toISOString(),
  };

  store.messages.push(message);
  await saveStore(store);

  res.json({ ok: true, message });
});

app.listen(PORT, () => {
  console.log(`Messenger running on http://localhost:${PORT}`);
});
