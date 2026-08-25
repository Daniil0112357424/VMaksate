const express = require('express');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = 'Daniil011235!';
const storageMode = String(process.env.STORAGE_MODE || 'firebase').toLowerCase();
const dataDir = process.env.DATA_DIR || path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'store.json');
const rawFirebaseEnv = String(process.env.FIREBASE_SERVICE_ACCOUNT || '');
const firebaseKeyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || '';
const supabaseUrl = String(process.env.SUPABASE_URL || '');
const supabaseServiceRoleKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || '');

let firebaseDb = null;
let firebaseEnabled = false;
let supabase = null;
let supabaseEnabled = false;

function initFirebase() {
  try {
    if (storageMode !== 'firebase') {
      return;
    }
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

function initSupabase() {
  if (storageMode !== 'supabase') return;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.warn('Supabase credentials are not configured. Falling back to the local JSON store.');
    return;
  }

  supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  supabaseEnabled = true;
  console.log('Supabase initialized.');
}

initFirebase();
initSupabase();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function ensureStoreFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ users: [], messages: [], callSignals: [] }, null, 2));
  }
}

let memoryStore = { users: [], messages: [], callSignals: [] };
const firestoreCache = { users: null, messages: null, expiresAt: 0 };
const FIRESTORE_CACHE_MS = Math.max(1000, Number(process.env.FIRESTORE_CACHE_MS) || 15000);

function invalidateFirestoreCache() {
  firestoreCache.expiresAt = 0;
}

async function getFirestoreUsers() {
  if (firestoreCache.users && Date.now() < firestoreCache.expiresAt) {
    return firestoreCache.users;
  }

  const [usersSnapshot, messagesSnapshot] = await Promise.all([
    firebaseDb.collection('users').get(),
    firebaseDb.collection('messages').get(),
  ]);
  firestoreCache.users = usersSnapshot.docs.map((doc) => doc.data());
  firestoreCache.messages = messagesSnapshot.docs.map((doc) => doc.data());
  firestoreCache.expiresAt = Date.now() + FIRESTORE_CACHE_MS;
  return firestoreCache.users;
}

async function getFirestoreMessages() {
  if (!firestoreCache.messages || Date.now() >= firestoreCache.expiresAt) {
    await getFirestoreUsers();
  }
  return firestoreCache.messages;
}

async function readStoreFromDiskOrDb() {
  if (supabaseEnabled) {
    const [{ data: users, error: usersError }, { data: messages, error: messagesError }] = await Promise.all([
      supabase.from('users').select('id, label, password'),
      supabase.from('messages').select('id, from_id, to_id, text, created_at'),
    ]);
    if (usersError) throw usersError;
    if (messagesError) throw messagesError;
    return {
      users: users || [],
      messages: (messages || []).map(toAppMessage),
      callSignals: [],
    };
  }

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
    return { users: [], messages: [], callSignals: [] };
  }
}

let isSaving = false;
let savePending = false;

async function saveStoreToDiskOrDb(storeToSave) {
  if (supabaseEnabled) {
    return;
  }
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
      callSignals: JSON.parse(JSON.stringify(memoryStore.callSignals)),
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
    callSignals: Array.isArray(data.callSignals) ? data.callSignals : [],
  };
  if (!supabaseEnabled) pruneDemoUsers();
}).catch((err) => console.error('Initial store load failed:', err));

function toAppMessage(message) {
  return {
    id: String(message.id),
    fromId: String(message.from_id),
    toId: String(message.to_id),
    text: String(message.text),
    createdAt: String(message.created_at),
  };
}

function toDatabaseMessage(message) {
  return {
    id: message.id,
    from_id: message.fromId,
    to_id: message.toId,
    text: message.text,
    created_at: message.createdAt,
  };
}

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

  if (supabaseEnabled) {
    const [{ data: users, error: usersError }, { data: messages, error: messagesError }] = await Promise.all([
      supabase.from('users').select('id, label'),
      supabase.from('messages').select('from_id, to_id'),
    ]);
    if (usersError || messagesError) throw usersError || messagesError;

    let result = (users || []).filter((user) => user.id !== me);
    if (!search && me) {
      const partnerIds = new Set();
      (messages || []).forEach((message) => {
        if (message.from_id === me) partnerIds.add(message.to_id);
        if (message.to_id === me) partnerIds.add(message.from_id);
      });
      result = result.filter((user) => partnerIds.has(user.id));
    }
    if (search) {
      result = result.filter((user) => user.id.toLowerCase().includes(search) || user.label.toLowerCase().includes(search));
    }
    return res.json(result);
  }

  const storeUsers = firebaseEnabled && firebaseDb
    ? await getFirestoreUsers()
    : memoryStore.users;
  const storeMessages = firebaseEnabled && firebaseDb && !search
    ? await getFirestoreMessages()
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
  if (supabaseEnabled) {
    const { error } = await supabase.from('users').insert({
      id: String(id), label: String(label), password: String(password),
    });
    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Пользователь с таким user-id уже зарегистрирован' });
      }
      throw error;
    }
  } else if (firebaseEnabled && firebaseDb) {
    try {
      await firebaseDb.collection('users').doc(String(id)).create({
        id: String(id), label: String(label), password: String(password),
      });
      invalidateFirestoreCache();
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
  const user = supabaseEnabled
    ? (await supabase.from('users').select('id, label, password').eq('id', String(id)).maybeSingle()).data
    : firebaseEnabled && firebaseDb
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
  const user = supabaseEnabled
    ? (await supabase.from('users').select('id, label').eq('id', String(sessionUserId)).maybeSingle()).data
    : firebaseEnabled && firebaseDb
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

app.get('/api/admin/users', requireAdmin, async (req, res) => {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('users').select('id, label');
    if (error) throw error;
    return res.json({ users: data || [] });
  }
  res.json({ users: memoryStore.users.map((user) => sanitizeUser(user)) });
});

app.delete('/api/admin/users/:id', requireAdmin, async (req, res) => {
  const id = String(req.params.id || '');
  if (!id) {
    return res.status(400).json({ error: 'Need user id.' });
  }

  if (supabaseEnabled) {
    const [{ error: sentError }, { error: receivedError }, { error: userError }] = await Promise.all([
      supabase.from('messages').delete().eq('from_id', id),
      supabase.from('messages').delete().eq('to_id', id),
      supabase.from('users').delete().eq('id', id),
    ]);
    if (sentError || receivedError || userError) throw sentError || receivedError || userError;
  } else {
    memoryStore.users = memoryStore.users.filter((user) => user.id !== id);
    memoryStore.messages = memoryStore.messages.filter((message) => message.fromId !== id && message.toId !== id);
    persistStore();
  }

  res.json({ ok: true, deletedUserId: id });
});

app.delete('/api/admin/users', requireAdmin, async (req, res) => {
  if (supabaseEnabled) {
    const [{ error: messagesError }, { error: usersError }] = await Promise.all([
      supabase.from('messages').delete().not('id', 'is', null),
      supabase.from('users').delete().not('id', 'is', null),
    ]);
    if (messagesError || usersError) throw messagesError || usersError;
  } else {
    memoryStore.users = [];
    memoryStore.messages = [];
    persistStore();
  }
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

  if (supabaseEnabled) {
    const [{ data: sent, error: sentError }, { data: received, error: receivedError }] = await Promise.all([
      supabase.from('messages').select('id, from_id, to_id, text, created_at').eq('from_id', me).eq('to_id', other),
      supabase.from('messages').select('id, from_id, to_id, text, created_at').eq('from_id', other).eq('to_id', me),
    ]);
    if (sentError || receivedError) throw sentError || receivedError;
    const messages = [...(sent || []), ...(received || [])]
      .map(toAppMessage)
      .sort((first, second) => first.createdAt.localeCompare(second.createdAt));
    return res.json({ chatKey: [me, other].sort().join('::'), messages });
  }

  // Never serve chat history from the process cache when Firestore is enabled:
  // Railway can route the two users' requests to different server instances.
  const allMessages = firebaseEnabled && firebaseDb
    ? await getFirestoreMessages()
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

  if (supabaseEnabled) {
    const { error } = await supabase.from('messages').insert(toDatabaseMessage(message));
    if (error) throw error;
  } else if (firebaseEnabled && firebaseDb) {
    // A message is one independent document. Replacing the entire collection
    // caused concurrent requests to delete each other's messages.
    await Promise.all([
      firebaseDb.collection('messages').doc(message.id).set(message),
      firebaseDb.collection('users').doc(String(fromId)).set({ id: String(fromId) }, { merge: true }),
      firebaseDb.collection('users').doc(String(toId)).set({ id: String(toId) }, { merge: true }),
    ]);
    invalidateFirestoreCache();
  } else {
    ensureUser(String(fromId), String(fromId));
    ensureUser(String(toId), String(toId));
    memoryStore.messages.push(message);
    persistStore();
  }

  res.json({ ok: true, message });
});

const CALL_SIGNAL_TYPES = new Set(['offer', 'answer', 'candidate', 'hangup', 'decline', 'busy']);
const CALL_SIGNAL_MAX_AGE_MS = 5 * 60 * 1000;

function toAppCallSignal(signal) {
  return {
    id: String(signal.id),
    callId: String(signal.call_id),
    fromId: String(signal.from_id),
    toId: String(signal.to_id),
    type: String(signal.type),
    payload: signal.payload || null,
    createdAt: String(signal.created_at),
  };
}

function toDatabaseCallSignal(signal) {
  return {
    id: signal.id,
    call_id: signal.callId,
    from_id: signal.fromId,
    to_id: signal.toId,
    type: signal.type,
    payload: signal.payload,
    created_at: signal.createdAt,
  };
}

async function pruneExpiredCallSignals() {
  const earliest = new Date(Date.now() - CALL_SIGNAL_MAX_AGE_MS).toISOString();
  if (supabaseEnabled) {
    const { error } = await supabase.from('call_signals').delete().lt('created_at', earliest);
    if (error) throw error;
  } else if (firebaseEnabled && firebaseDb) {
    const expired = await firebaseDb.collection('callSignals').where('createdAt', '<', earliest).get();
    if (!expired.empty) {
      const batch = firebaseDb.batch();
      expired.docs.forEach((doc) => batch.delete(doc.ref));
      await batch.commit();
    }
  }
}

app.get('/api/calls/signals', async (req, res) => {
  const recipientId = String(req.query.for || '');
  const after = String(req.query.after || new Date(Date.now() - CALL_SIGNAL_MAX_AGE_MS).toISOString());
  if (!recipientId) return res.status(400).json({ error: 'Need recipient id.' });

  const earliest = new Date(Date.now() - CALL_SIGNAL_MAX_AGE_MS).toISOString();
  const since = after > earliest ? after : earliest;

  if (supabaseEnabled) {
    const { data, error } = await supabase
      .from('call_signals')
      .select('id, call_id, from_id, to_id, type, payload, created_at')
      .eq('to_id', recipientId)
      .gt('created_at', since)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return res.json({ signals: (data || []).map(toAppCallSignal) });
  }

  const signals = firebaseEnabled && firebaseDb
    ? (await firebaseDb.collection('callSignals').where('toId', '==', recipientId).get()).docs.map((doc) => doc.data())
    : memoryStore.callSignals;
  res.json({ signals: signals
    .filter((signal) => signal.toId === recipientId && signal.createdAt > since)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt)) });
});

app.post('/api/calls/signal', async (req, res) => {
  const { callId, fromId, toId, type, payload = null } = req.body || {};
  if (!callId || !fromId || !toId || !CALL_SIGNAL_TYPES.has(type)) {
    return res.status(400).json({ error: 'Invalid call signal.' });
  }

  const serializedPayload = JSON.stringify(payload);
  if (serializedPayload.length > 20000) {
    return res.status(413).json({ error: 'Call signal is too large.' });
  }

  const signal = {
    id: randomUUID(),
    callId: String(callId),
    fromId: String(fromId),
    toId: String(toId),
    type: String(type),
    payload,
    createdAt: new Date().toISOString(),
  };

  await pruneExpiredCallSignals();

  if (supabaseEnabled) {
    const { error } = await supabase.from('call_signals').insert(toDatabaseCallSignal(signal));
    if (error) throw error;
  } else if (firebaseEnabled && firebaseDb) {
    await firebaseDb.collection('callSignals').doc(signal.id).set(signal);
  } else {
    const earliest = new Date(Date.now() - CALL_SIGNAL_MAX_AGE_MS).toISOString();
    memoryStore.callSignals = memoryStore.callSignals.filter((item) => item.createdAt > earliest);
    memoryStore.callSignals.push(signal);
    persistStore();
  }

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Messenger running on http://localhost:${PORT}`);
});
