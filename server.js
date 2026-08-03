const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'store.json');

app.use(express.json());
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

function pruneDemoUsers() {
  const store = readStore();
  const demoUsers = new Set(store.users.filter((u) => /^demo-/i.test(String(u.id))).map((u) => u.id));

  if (demoUsers.size === 0) {
    return;
  }

  store.users = store.users.filter((user) => !demoUsers.has(user.id));
  store.messages = store.messages.filter((message) => !demoUsers.has(message.fromId) && !demoUsers.has(message.toId));
  saveStore(store);
}

function ensureUser(id, label) {
  const store = readStore();
  const index = store.users.findIndex((user) => user.id === String(id));

  if (index >= 0) {
    store.users[index].label = String(label || store.users[index].label || id);
  } else {
    store.users.push({ id: String(id), label: String(label || id) });
  }

  saveStore(store);
}

pruneDemoUsers();

app.get('/api/users', (req, res) => {
  const search = String(req.query.search || '').toLowerCase();
  const store = readStore();
  const users = store.users.filter((user) => {
    if (!search) return true;
    return user.id.toLowerCase().includes(search) || user.label.toLowerCase().includes(search);
  });

  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { id, label } = req.body || {};

  if (!id || !label) {
    return res.status(400).json({ error: 'Need user id and label.' });
  }

  ensureUser(String(id), String(label));
  const store = readStore();
  const user = store.users.find((entry) => entry.id === String(id));
  res.json({ ok: true, user });
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
