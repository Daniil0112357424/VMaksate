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

function seedUsers() {
  const store = readStore();
  const defaults = [
    { id: 'demo-1', label: 'Demo Alice' },
    { id: 'demo-2', label: 'Demo Bob' },
    { id: 'demo-3', label: 'Demo Carol' },
  ];

  defaults.forEach((item) => {
    const exists = store.users.some((user) => user.id === item.id);
    if (!exists) {
      store.users.push(item);
    }
  });

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

seedUsers();

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
