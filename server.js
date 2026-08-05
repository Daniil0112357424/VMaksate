const express = require('express');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
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

function ensureStoreFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ users: [], messages: [] }, null, 2));
  }
}

let memoryStore = { users: [], messages: [] };

async function readStoreFromDiskOrDb() {
  if (firebaseEnabled && firebaseDb) {
    try {
      const [usersSnap, messagesSnap] = await Promise.all([
        firebaseDb.collection('users').get(),
        firebaseDb.collection('messages').get(),
      ]);

      return {
        users: usersSnap.docs.map((doc) => doc.data()),
        messages: messagesSnap.docs.map((doc) => doc.data()),
      };
    } catch (e) {
      console.warn('Failed to read from Firestore:', e.message);
    }
  }

  ensureStoreFile();
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { users: [], messages: [] };
  }
}

let isSaving = false;
let savePending = false;

async function saveStoreToDiskOrDb(storeToSave) {
  if (firebaseEnabled && firebaseDb) {
    const users = Array.isArray(storeToSave.users) ? storeToSave.users : [];
    const messages = Array.isArray(storeToSave.messages) ? storeToSave.messages : [];

    const usersRef = firebaseDb.collection('users');
    const messagesRef = firebaseDb.collection('messages');

    const userBatch = firebaseDb.batch();
    users.forEach((user) => {
      userBatch.set(usersRef.doc(String(user.id)), {
        id: String(user.id),
        label: String(user.label || user.id),
        password: String(user.password || ''),
      }, { merge: true });
    });
    await userBatch.commit();

    const messageBatch = firebaseDb.batch();
    messages.forEach((message) => {
      messageBatch.set(messagesRef.doc(String(message.id)), {
        id: String(message.id),
        fromId: String(message.fromId),
        toId: String(message.toId),
        text: String(message.text),
        createdAt: String(message.createdAt),
      }, { merge: true });
    });
    await messageBatch.commit();
    return;
  }

  ensureStoreFile();
  fs.writeFileSync(dataFile, JSON.stringify(storeToSave, null, 2));
}

async function persistStore() {
  if (isSaving) {
    savePending = true;
    return;
  }

  isSaving = true;
  savePending = false;

  try {
    const snapshot = {
      users: JSON.parse(JSON.stringify(memoryStore.users)),
      messages: JSON.parse(JSON.stringify(memoryStore.messages)),
    };
    await saveStoreToDiskOrDb(snapshot);
  } catch (error) {
    console.error('Unable to persist store:', error.message);
  } finally {
    isSaving = false;
    if (savePending) {
      persistStore();
    }
  }
}

const storeReady = readStoreFromDiskOrDb().then((data) => {
  memoryStore = {
    users: Array.isArray(data.users) ? data.users : [],
    messages: Array.isArray(data.messages) ? data.messages : [],
  };
  pruneDemoUsers();
}).catch((err) => console.error('Initial store load failed:', err));

function sanitizeUser(user) {
  return {
    id: user.id,
    label: user.label,
  };
}

function pruneDemoUsers() {
  const demoIds = new Set(memoryStore.users.filter((u) => /^demo-/i.test(String(u.id))).map((u) => u.id));
  if (demoIds.size === 0) return;

  memoryStore.users = memoryStore.users.filter((user) => !demoIds.has(user.id));
  memoryStore.messages = memoryStore.messages.filter((message) => !demoIds.has(message.fromId) && !demoIds.has(message.toId));
  persistStore();
}

function ensureUser(id, label, password = '') {
  const strId = String(id);
  const index = memoryStore.users.findIndex((user) => user.id === strId);

  if (index >= 0) {
    let changed = false;
    if (label && memoryStore.users[index].label !== String(label)) {
      memoryStore.users[index].label = String(label);
      changed = true;
    }
    if (password && memoryStore.users[index].password !== String(password)) {
      memoryStore.users[index].password = String(password);
      changed = true;
    }
    if (changed) {
      persistStore();
    }
  } else {
    memoryStore.users.push({
      id: strId,
      label: String(label || strId),
      password: String(password || ''),
    });
    persistStore();
  }
}

app.get('/api/users', async (req, res) => {
  const me = String(req.query.me || '');
  const search = String(req.query.search || '').trim().toLowerCase();
  await storeReady;

  const storeUsers = firebaseEnabled && firebaseDb
    ? (await firebaseDb.collection('users').get()).docs.map((doc) => doc.data())
    : memoryStore.users;
  const storeMessages = firebaseEnabled && firebaseDb && !search
    ? (await firebaseDb.collection('messages').get()).docs.map((doc) => doc.data())
    : memoryStore.messages;
  let users = storeUsers
    .map((user) => sanitizeUser(user))
    .filter((user) => user.id !== me);

  if (!search) {
    if (me) {
      const partnerIds = new Set();
      storeMessages.forEach((message) => {
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

  await storeReady;
  if (firebaseEnabled && firebaseDb) {
    try {
      await firebaseDb.collection('users').doc(String(id)).create({
        id: String(id), label: String(label), password: String(password),
      });
    } catch (error) {
      if (error.code === 6) {
        return res.status(409).json({ error: 'Пользователь с таким user-id уже зарегистрирован' });
      }
      throw error;
    }
  } else {
    const exists = memoryStore.users.some((user) => user.id === String(id));
    if (exists) {
      return res.status(409).json({ error: 'Пользователь с таким user-id уже зарегистрирован' });
    }
    ensureUser(String(id), String(label), String(password));
  }
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

  await storeReady;
  const user = firebaseEnabled && firebaseDb
    ? (await firebaseDb.collection('users').doc(String(id)).get()).data()
    : memoryStore.users.find((entry) => entry.id === String(id));
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

  await storeReady;
  const user = firebaseEnabled && firebaseDb
    ? (await firebaseDb.collection('users').doc(String(sessionUserId)).get()).data()
    : memoryStore.users.find((entry) => entry.id === String(sessionUserId));
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

app.get('/api/admin/users', requireAdmin, (req, res) => {
  res.json({ users: memoryStore.users.map((user) => sanitizeUser(user)) });
});

app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
  const id = String(req.params.id || '');
  if (!id) {
    return res.status(400).json({ error: 'Need user id.' });
  }

  memoryStore.users = memoryStore.users.filter((user) => user.id !== id);
  memoryStore.messages = memoryStore.messages.filter((message) => message.fromId !== id && message.toId !== id);
  persistStore();

  res.json({ ok: true, deletedUserId: id });
});

app.delete('/api/admin/users', requireAdmin, (req, res) => {
  memoryStore.users = [];
  memoryStore.messages = [];
  persistStore();
  res.json({ ok: true });
});

app.delete('/api/users/:id', (req, res) => {
  const id = String(req.params.id || '');
  if (!id) {
    return res.status(400).json({ error: 'Need user id.' });
  }

  memoryStore.users = memoryStore.users.filter((user) => user.id !== id);
  memoryStore.messages = memoryStore.messages.filter((message) => message.fromId !== id && message.toId !== id);
  persistStore();

  res.json({ ok: true, deletedUserId: id });
});

app.delete('/api/users', (req, res) => {
  memoryStore.users = [];
  memoryStore.messages = [];
  persistStore();
  res.json({ ok: true });
});

app.get('/api/chat', async (req, res) => {
  const me = String(req.query.me || '');
  const other = String(req.query.other || '');

  if (!me || !other) {
    return res.status(400).json({ error: 'Need both ids.' });
  }

  await storeReady;

  // Never serve chat history from the process cache when Firestore is enabled:
  // Railway can route the two users' requests to different server instances.
  const allMessages = firebaseEnabled && firebaseDb
    ? (await firebaseDb.collection('messages').get()).docs.map((doc) => doc.data())
    : memoryStore.messages;
  const messages = allMessages
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

  await storeReady;

  const message = {
    id: randomUUID(),
    fromId: String(fromId),
    toId: String(toId),
    text: String(text),
    createdAt: new Date().toISOString(),
  };

  if (firebaseEnabled && firebaseDb) {
    // A message is one independent document. Replacing the entire collection
    // caused concurrent requests to delete each other's messages.
    await Promise.all([
      firebaseDb.collection('messages').doc(message.id).set(message),
      firebaseDb.collection('users').doc(String(fromId)).set({ id: String(fromId) }, { merge: true }),
      firebaseDb.collection('users').doc(String(toId)).set({ id: String(toId) }, { merge: true }),
    ]);
  } else {
    ensureUser(String(fromId), String(fromId));
    ensureUser(String(toId), String(toId));
    memoryStore.messages.push(message);
    persistStore();
  }

  res.json({ ok: true, message });
});

app.listen(PORT, () => {
  console.log(`Messenger running on http://localhost:${PORT}`);
});
