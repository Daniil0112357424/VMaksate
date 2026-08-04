const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'store.json');

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

function readStore() {
  ensureStore();
  return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

function saveStore(store) {
  ensureStore();
  fs.writeFileSync(dataFile, JSON.stringify(store, null, 2));
}

function sanitizeUser(user) {
  return {
    id: user.id,
    label: user.label,
  };
}

function pruneDemoUsers() {
  const store = readStore();
  const demoIds = new Set(store.users.filter((u) => /^demo-/i.test(String(u.id))).map((u) => u.id));

  if (demoIds.size === 0) {
    return;
  }

  store.users = store.users.filter((user) => !demoIds.has(user.id));
  store.messages = store.messages.filter((message) => !demoIds.has(message.fromId) && !demoIds.has(message.toId));
  saveStore(store);
}

function ensureUser(id, label, password = '') {
  const store = readStore();
  const index = store.users.findIndex((user) => user.id === String(id));

  if (index >= 0) {
    store.users[index].label = String(label || store.users[index].label || id);
    if (password) {
      store.users[index].password = String(password);
    }
  } else {
    store.users.push({ id: String(id), label: String(label || id), password: String(password || '') });
  }

  saveStore(store);
}

pruneDemoUsers();

app.get('/api/users', (req, res) => {
  const search = String(req.query.search || '').toLowerCase();
  const store = readStore();
  const users = store.users
    .map((user) => sanitizeUser(user))
    .filter((user) => {
      if (!search) return true;
      return user.id.toLowerCase().includes(search) || user.label.toLowerCase().includes(search);
    });

  res.json(users);
});

app.post('/api/auth/register', (req, res) => {
  const { id, label, password } = req.body || {};

  if (!id || !label || !password) {
    return res.status(400).json({ error: 'Need id, label and password.' });
  }

  const store = readStore();
  const exists = store.users.some((user) => user.id === String(id));
  if (exists) {
    return res.status(409).json({ error: 'This user id is already taken.' });
  }

  ensureUser(String(id), String(label), String(password));
  res.cookie('sessionUserId', String(id), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  res.json({ ok: true, user: sanitizeUser({ id: String(id), label: String(label) }) });
});

app.post('/api/auth/login', (req, res) => {
  const { id, password } = req.body || {};
  if (!id || !password) {
    return res.status(400).json({ error: 'Need id and password.' });
  }

  const store = readStore();
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

app.get('/api/auth/me', (req, res) => {
  const sessionUserId = req.cookies?.sessionUserId;
  if (!sessionUserId) {
    return res.json({ user: null });
  }

  const store = readStore();
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

app.delete('/api/users/:id', (req, res) => {
  const id = String(req.params.id || '');
  if (!id) {
    return res.status(400).json({ error: 'Need user id.' });
  }

  const store = readStore();
  store.users = store.users.filter((user) => user.id !== id);
  store.messages = store.messages.filter((message) => message.fromId !== id && message.toId !== id);
  saveStore(store);

  res.json({ ok: true, deletedUserId: id });
});

app.delete('/api/users', (req, res) => {
  const store = readStore();
  store.users = [];
  store.messages = [];
  saveStore(store);
  res.json({ ok: true });
});

app.get('/api/chat', (req, res) => {
  const me = String(req.query.me || '');
  const other = String(req.query.other || '');

  if (!me || !other) {
    return res.status(400).json({ error: 'Need both ids.' });
  }

  ensureUser(me, me);
  ensureUser(other, other);

  const store = readStore();
  const messages = store.messages
    .filter((item) => {
      return (item.fromId === me && item.toId === other) || (item.fromId === other && item.toId === me);
    })
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  res.json({ chatKey: [me, other].sort().join('::'), messages });
});

app.post('/api/chat', (req, res) => {
  const { fromId, toId, text } = req.body || {};

  if (!fromId || !toId || !text) {
    return res.status(400).json({ error: 'Need fromId, toId and text.' });
  }

  ensureUser(String(fromId), String(fromId));
  ensureUser(String(toId), String(toId));

  const store = readStore();
  const message = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    fromId: String(fromId),
    toId: String(toId),
    text: String(text),
    createdAt: new Date().toISOString(),
  };

  store.messages.push(message);
  saveStore(store);

  res.json({ ok: true, message });
});

app.listen(PORT, () => {
  console.log(`Messenger running on http://localhost:${PORT}`);
});
