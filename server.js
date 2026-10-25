const express = require('express');
const fs = require('fs');
const path = require('path');
const { randomUUID, randomBytes, createHmac, timingSafeEqual } = require('crypto');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = String(process.env.ADMIN_PASSWORD || '');
const ADMIN_SESSION_SECRET = String(process.env.ADMIN_SESSION_SECRET || '');
const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;
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
const userEventClients = new Map();
const typingEventThrottle = new Map();
const presenceByUser = new Map();

// --- Password hashing (bcrypt) -------------------------------------------
// bcrypt stores a salted hash; the original password cannot be recovered
// from it. A cost factor of 10 is a good default balance of speed/security.
const BCRYPT_ROUNDS = Math.min(15, Math.max(8, Number(process.env.BCRYPT_ROUNDS) || 10));

function isBcryptHash(value) {
  return /^\$2[aby]\$\d{2}\$/.test(String(value || ''));
}

async function hashPassword(plain) {
  return bcrypt.hash(String(plain), BCRYPT_ROUNDS);
}

// Accepts both bcrypt hashes (new) and legacy plaintext (pre-migration),
// so existing users keep working while passwords are upgraded lazily.
async function verifyPassword(plain, stored) {
  const storedValue = String(stored || '');
  if (!storedValue) return false;
  if (isBcryptHash(storedValue)) {
    return bcrypt.compare(String(plain), storedValue);
  }
  return storedValue === String(plain);
}

// Persist an already-computed password hash to whichever backend is active.
async function storePasswordHash(userId, passwordHash) {
  const id = String(userId);
  const hash = String(passwordHash || '');

  if (supabaseEnabled) {
    const { error } = await supabase.from('users').update({ password: hash }).eq('id', id);
    if (error) throw error;
    return;
  }
  if (firebaseEnabled && firebaseDb) {
    await firebaseDb.collection('users').doc(id).set({ password: hash }, { merge: true });
    invalidateFirestoreCache();
    return;
  }
  const user = memoryStore.users.find((entry) => entry.id === id);
  if (user) {
    user.password = hash;
    persistStore();
  }
}
// --------------------------------------------------------------------------

function publishUserEvent(userId, eventName, payload) {
  const clients = userEventClients.get(String(userId));
  if (!clients) return;
  const event = `event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`;
  clients.forEach((client) => client.write(event));
}

function broadcastEvent(eventName, payload) {
  const event = `event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`;
  userEventClients.forEach((clients) => clients.forEach((client) => client.write(event)));
}

// Persist the last-seen timestamp so it survives restarts. Best effort only.
async function persistLastSeen(userId, lastSeenAt) {
  const id = String(userId);
  try {
    if (supabaseEnabled) {
      await supabase.from('users').update({ last_seen: lastSeenAt }).eq('id', id);
    } else if (firebaseEnabled && firebaseDb) {
      await firebaseDb.collection('users').doc(id).set({ lastSeenAt }, { merge: true });
      invalidateFirestoreCache();
    } else {
      const user = memoryStore.users.find((entry) => entry.id === id);
      if (user) {
        user.lastSeen = lastSeenAt;
        persistStore();
      }
    }
  } catch (error) {
    console.warn('Unable to persist last seen:', error.message);
  }
}

function publishChatMessage(message) {
  const fromId = message.fromId || message.from_id || message.sender_id;
  const toId = message.toId || message.to_id || message.partner_id;
  const type = message.type || message.last_message_type || 'text';
  if (type === 'call') return;
  const payload = {
    messageId: message.id || message.message_id,
    fromId,
    toId,
    text: message.text || message.last_message_text || '',
    type,
    createdAt: message.createdAt || message.created_at || message.last_message_at,
    stickerId: message.stickerId || message.sticker_id || null,
  };
  publishUserEvent(fromId, 'chat-message', payload);
  publishUserEvent(toId, 'chat-message', payload);
}

function publishConversationUpdate(fromId, toId) {
  const payload = { fromId: String(fromId), toId: String(toId) };
  publishUserEvent(payload.fromId, 'chat-message', payload);
  publishUserEvent(payload.toId, 'chat-message', payload);
}

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

app.use(express.json({ limit: '8mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function asyncHandler(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

app.get('/api/events', (req, res) => {
  const userId = req.cookies?.sessionUserId;
  if (!userId) return res.status(401).end();

  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.flushHeaders();
  res.write(': connected\n\n');

  const key = String(userId);
  if (!userEventClients.has(key)) userEventClients.set(key, new Set());
  userEventClients.get(key).add(res);

  // Presence: a live SSE stream means the user's browser is connected.
  if (!presenceByUser.get(key)?.online) {
    presenceByUser.set(key, { online: true, lastSeenAt: new Date().toISOString() });
    broadcastEvent('presence', { userId: key, online: true, lastSeenAt: null });
  }
  const heartbeat = setInterval(() => res.write(': keep-alive\n\n'), 25000);

  res.on('close', () => {
    clearInterval(heartbeat);
    const clients = userEventClients.get(key);
    clients?.delete(res);
    if (clients?.size === 0) {
      userEventClients.delete(key);
      const lastSeenAt = new Date().toISOString();
      presenceByUser.set(key, { online: false, lastSeenAt });
      broadcastEvent('presence', { userId: key, online: false, lastSeenAt });
      persistLastSeen(key, lastSeenAt);
    }
  });
});

app.get('/api/presence', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  if (!userId) return res.status(401).json({ error: 'Sign in required.' });
  await storeReady;

  const presence = {};
  presenceByUser.forEach((value, id) => { presence[id] = { ...value, online: Boolean(value.online) }; });

  // Enrich users that were never online in this process with their stored last-seen.
  try {
    const allUsers = supabaseEnabled
      ? (await supabase.from('users').select('id, last_seen')).data
      : firebaseEnabled && firebaseDb
        ? await getFirestoreUsers()
        : memoryStore.users;
    (allUsers || []).forEach((user) => {
      const id = String(user.id || '');
      if (!(id in presence)) {
        presence[id] = { online: false, lastSeenAt: user.last_seen || user.lastSeenAt || user.lastSeen || null };
      }
    });
  } catch (error) {
    console.warn('Unable to enrich presence with stored last seen:', error.message);
  }

  res.json(presence);
});

app.post('/api/chat/typing', (req, res) => {
  const fromId = req.cookies?.sessionUserId;
  const toId = String(req.body?.toId || '');
  const isTyping = req.body?.isTyping === true;
  if (!fromId || !toId || fromId === toId) {
    return res.status(400).json({ error: 'Invalid typing event.' });
  }

  const throttleKey = `${fromId}:${toId}`;
  const now = Date.now();
  const previousEvent = typingEventThrottle.get(throttleKey) || { lastTypingAt: 0, lastEventAt: 0 };
  if ((isTyping && now - previousEvent.lastTypingAt < 1500)
      || (!isTyping && now - previousEvent.lastEventAt < 250)) {
    return res.json({ ok: true, throttled: true });
  }

  typingEventThrottle.set(throttleKey, {
    lastTypingAt: isTyping ? now : previousEvent.lastTypingAt,
    lastEventAt: now,
  });
  if (typingEventThrottle.size > 10000) {
    for (const [key, eventState] of typingEventThrottle) {
      if (now - eventState.lastEventAt > 60000) typingEventThrottle.delete(key);
    }
  }
  publishUserEvent(toId, 'chat-typing', { fromId: String(fromId), isTyping });
  res.json({ ok: true });
});

if (supabaseEnabled) {
  supabase.channel('app-realtime-events')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, ({ new: message }) => {
      if (message.type !== 'call') {
        publishChatMessage(message);
      }
    })
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'call_signals' }, ({ new: signal }) => {
      publishUserEvent(signal.to_id, 'call-signal', toAppCallSignal(signal));
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, ({ new: message }) => {
      publishChatMessage(message);
    })
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, ({ old: message }) => {
      publishConversationUpdate(message.from_id, message.to_id);
    })
    .subscribe((status, error) => {
      if (status === 'SUBSCRIBED') console.log('Supabase Realtime connected.');
      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        console.error('Supabase Realtime subscription failed:', error || status);
      }
    });
} else if (firebaseEnabled && firebaseDb) {
  firebaseDb.collection('messages').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added' || change.type === 'modified') publishChatMessage(change.doc.data());
    });
  }, (error) => console.error('Firestore message listener failed:', error.message));
  firebaseDb.collection('callSignals').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const signal = change.doc.data();
        publishUserEvent(signal.toId, 'call-signal', signal);
      }
    });
  }, (error) => console.error('Firestore call listener failed:', error.message));
}

function ensureStoreFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ users: [], messages: [], callSignals: [] }, null, 2));
  }
}

let memoryStore = {
  users: [],
  messages: [],
  callSignals: [],
  chats: [],
  chatMembers: [],
  userBlocks: [],
};
const firestoreCache = { users: null, messages: null, expiresAt: 0 };
const FIRESTORE_CACHE_MS = Math.max(1000, Number(process.env.FIRESTORE_CACHE_MS) || 15000);

function invalidateFirestoreCache() {
  firestoreCache.expiresAt = 0;
}

// --- Group chats & blocking helpers ------------------------------------------
function ensureChatSchema() {
  let changed = false;
  memoryStore.chats.forEach((chat) => {
    if (!chat.id) { chat.id = randomUUID(); changed = true; }
    if (!chat.createdAt) { chat.createdAt = new Date().toISOString(); changed = true; }
    if (!chat.type) { chat.type = 'group'; changed = true; }
  });
  memoryStore.chatMembers.forEach((m) => {
    if (!m.chatId && m.chat_id) { m.chatId = m.chat_id; changed = true; }
    if (!m.userId && m.user_id) { m.userId = m.user_id; changed = true; }
    if (!m.joinedAt && m.joined_at) { m.joinedAt = m.joined_at; changed = true; }
    if (!m.joinedAt) { m.joinedAt = new Date().toISOString(); changed = true; }
    if (!m.role) { m.role = 'member'; changed = true; }
  });
  if (changed) persistStore();
}

function isUserBlocked(blockerId, blockedId) {
  return memoryStore.userBlocks.some(
    (b) => String(b.blockerId) === String(blockerId) && String(b.blockedId) === String(blockedId)
  );
}

function getBlockedByUser(userId) {
  return new Set(
    memoryStore.userBlocks
      .filter((b) => String(b.blockerId) === String(userId))
      .map((b) => String(b.blockedId))
  );
}

function getChatMembers(chatId) {
  return memoryStore.chatMembers.filter((m) => String(m.chatId || m.chat_id) === String(chatId));
}

function getChatMemberIds(chatId) {
  return getChatMembers(chatId).map((m) => String(m.userId));
}

function getDirectConversations(userId) {
  const uid = String(userId);
  const partners = new Map();
  memoryStore.messages.forEach((message) => {
    if (message.chatId) return;
    const from = String(message.fromId);
    const to = String(message.toId);
    if (from === uid) partners.set(to, true);
    else if (to === uid) partners.set(from, true);
  });
  return [...partners.keys()].map((partnerId) => ({
    id: `direct::${partnerId}`,
    type: 'direct',
    partnerId,
  }));
}

function getUserGroupChats(userId) {
  const uid = String(userId);
  return memoryStore.chats.filter((chat) =>
    getChatMemberIds(chat.id).includes(uid)
  );
}

function lastMessageForConversation(partnerId, currentUserId) {
  let best = null;
  memoryStore.messages.forEach((message) => {
    if (message.chatId) return;
    const isMatch =
      (String(message.fromId) === partnerId && String(message.toId) === currentUserId) ||
      (String(message.toId) === partnerId && String(message.fromId) === currentUserId);
    if (!isMatch || message.type === 'call') return;
    if (!best || String(message.createdAt) > String(best.createdAt)) best = message;
  });
  return best;
}

function lastMessageForGroup(chatId) {
  let best = null;
  memoryStore.messages.forEach((message) => {
    if (String(message.chatId) !== String(chatId) || message.type === 'call') return;
    if (!best || String(message.createdAt) > String(best.createdAt)) best = message;
  });
  return best;
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

async function deleteFirestoreDocuments(references) {
  const uniqueReferences = [...new Map(references.map((reference) => [reference.path, reference])).values()];
  for (let start = 0; start < uniqueReferences.length; start += 450) {
    const batch = firebaseDb.batch();
    uniqueReferences.slice(start, start + 450).forEach((reference) => batch.delete(reference));
    await batch.commit();
  }
}

async function deleteFirestoreUserData(userId) {
  const [sentMessages, receivedMessages] = await Promise.all([
    firebaseDb.collection('messages').where('fromId', '==', String(userId)).get(),
    firebaseDb.collection('messages').where('toId', '==', String(userId)).get(),
  ]);
  const messageReferences = [...sentMessages.docs, ...receivedMessages.docs].map((document) => document.ref);
  const userReference = firebaseDb.collection('users').doc(String(userId));
  await deleteFirestoreDocuments([...messageReferences, userReference]);
  memoryStore.users = memoryStore.users.filter((user) => String(user.id) !== String(userId));
  memoryStore.messages = memoryStore.messages.filter((message) =>
    String(message.fromId) !== String(userId) && String(message.toId) !== String(userId)
  );
  invalidateFirestoreCache();
}

async function deleteAllFirestoreData() {
  const [usersSnapshot, messagesSnapshot] = await Promise.all([
    firebaseDb.collection('users').get(),
    firebaseDb.collection('messages').get(),
  ]);
  const userIds = usersSnapshot.docs.map((document) => String(document.id));
  const references = [
    ...usersSnapshot.docs.map((document) => document.ref),
    ...messagesSnapshot.docs.map((document) => document.ref),
  ];
  await deleteFirestoreDocuments(references);
  memoryStore.users = [];
  memoryStore.messages = [];
  invalidateFirestoreCache();
  return userIds;
}

async function readStoreFromDiskOrDb() {
  if (supabaseEnabled) {
    const [{ data: users, error: usersError }, { data: messages, error: messagesError }] = await Promise.all([
      supabase.from('users').select('id, label, password'),
      supabase.from('messages').select('id, from_id, to_id, text, edited_at, created_at'),
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
      chats: JSON.parse(JSON.stringify(memoryStore.chats)),
      chatMembers: JSON.parse(JSON.stringify(memoryStore.chatMembers)),
      userBlocks: JSON.parse(JSON.stringify(memoryStore.userBlocks)),
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
    chats: Array.isArray(data.chats) ? data.chats : [],
    chatMembers: Array.isArray(data.chatMembers) ? data.chatMembers : [],
    userBlocks: Array.isArray(data.userBlocks) ? data.userBlocks : [],
  };
  ensureChatSchema();
  if (!supabaseEnabled) pruneDemoUsers();
}).catch((err) => console.error('Initial store load failed:', err));

function toAppMessage(message) {
  const stickerId = message.sticker_id || null;
  const type = String(message.type || 'text');
  const replyRaw = message.reply_to || message.replyTo || null;

  return {
    id: String(message.id),
    fromId: String(message.from_id),
    toId: String(message.to_id),
    text: String(message.text || ''),
    imageData: message.image_data || (type === 'sticker' ? getStickerAssetUrl(stickerId) : null),
    audioData: message.audio_data || message.audioData || null,
    fileData: message.file_data || message.fileData || null,
    fileName: message.file_name || message.fileName || null,
    fileType: message.file_type || message.fileType || null,
    durationMs: Number.isFinite(Number(message.duration_ms ?? message.durationMs))
      ? Number(message.duration_ms ?? message.durationMs)
      : null,
    replyTo: replyRaw && typeof replyRaw === 'object' ? {
      id: String(replyRaw.id || ''),
      fromId: String(replyRaw.fromId || ''),
      text: String(replyRaw.text || ''),
      type: String(replyRaw.type || 'text'),
      stickerId: replyRaw.stickerId || null,
    } : null,
    type,
    callId: message.call_id || null,
    callMode: message.call_mode || null,
    callStatus: message.call_status || null,
    stickerId,
    chatId: message.chat_id || message.chatId || null,
    readReceipts: message.read_receipts || message.readReceipts || {},
    pinnedAt: message.pinned_at || message.pinnedAt || null,
    pinnedBy: message.pinned_by || message.pinnedBy || null,
    reactions: message.reactions || {},
    deliveredAt: message.delivered_at || message.deliveredAt || null,
    readAt: message.read_at || null,
    editedAt: message.edited_at || message.editedAt || null,
    createdAt: String(message.created_at),
  };
}

function toDatabaseMessage(message) {
  return {
    id: message.id,
    from_id: message.fromId,
    to_id: message.toId,
    text: message.text,
    image_data: message.imageData || null,
    audio_data: message.audioData || null,
    file_data: message.fileData || null,
    file_name: message.fileName || null,
    file_type: message.fileType || null,
    duration_ms: Number.isFinite(Number(message.durationMs)) ? Number(message.durationMs) : null,
    reply_to: message.replyTo || null,
    type: message.type || 'text',
    call_id: message.callId || null,
    call_mode: message.callMode || null,
    call_status: message.callStatus || null,
    sticker_id: message.stickerId || null,
    chat_id: message.chatId || null,
    read_receipts: message.readReceipts || {},
    pinned_at: message.pinnedAt || null,
    pinned_by: message.pinnedBy || null,
    reactions: message.reactions || {},
    delivered_at: message.deliveredAt || null,
    read_at: message.readAt || null,
    edited_at: message.editedAt || null,
    created_at: message.createdAt,
  };
}

function sanitizeUser(user) {
  return {
    id: user.id,
    label: user.label,
    avatarData: user.avatar_data || user.avatarData || null,
    about: user.about || '',
  };
}

function getStickerAssetUrl(stickerId) {
  const normalized = String(stickerId || '').trim();
  if (!normalized) return null;
  return `/stickers/${normalized}.jpg`;
}

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_AUDIO_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;

function validFileData(value) {
  if (typeof value !== 'string' || !/^data:[^/]+\/[^;,]+;base64,[a-z0-9+/=]+$/i.test(value)) {
    return false;
  }
  const base64Data = value.slice(value.indexOf(',') + 1);
  return Buffer.byteLength(base64Data, 'base64') <= MAX_FILE_SIZE_BYTES;
}

function validImageData(value) {
  if (typeof value !== 'string' || !/^data:image\/(png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i.test(value)) {
    return false;
  }
  const base64Data = value.slice(value.indexOf(',') + 1);
  return Buffer.byteLength(base64Data, 'base64') <= MAX_IMAGE_SIZE_BYTES;
}

function validAudioData(value) {
  if (typeof value !== 'string'
    || !/^data:audio\/(webm|ogg|mp4|mpeg|mp3|wav|x-wav|x-m4a|aac);base64,[a-z0-9+/=]+$/i.test(value)) {
    return false;
  }
  const base64Data = value.slice(value.indexOf(',') + 1);
  return Buffer.byteLength(base64Data, 'base64') <= MAX_AUDIO_SIZE_BYTES;
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

app.get('/api/users', asyncHandler(async (req, res) => {
  const me = String(req.query.me || '');
  const search = String(req.query.search || '').trim().toLowerCase();
  await storeReady;

  if (supabaseEnabled) {
    const userQuery = supabase.from('users').select('id, label, avatar_data, about');
    const [{ data: users, error: usersError }, messageResults] = await Promise.all([
      userQuery,
      !search && me
        ? supabase.rpc('get_chat_list', { p_user_id: me })
        : Promise.resolve([]),
    ]);
    if (usersError) throw usersError;

    let result = (users || []).filter((user) => String(user.id || '') !== me);
    if (!search && me) {
      const { data: conversations, error: conversationsError } = messageResults;
      if (conversationsError) throw conversationsError;
      const conversationsByPartner = new Map((conversations || []).map((conversation) => [
        conversation.partner_id,
        {
          id: conversation.message_id,
          fromId: conversation.sender_id,
          text: conversation.last_message_text,
          type: conversation.last_message_type,
          createdAt: conversation.last_message_at,
          stickerId: conversation.sticker_id,
        },
      ]));
      result = result
        .filter((user) => conversationsByPartner.has(user.id))
        .map((user) => ({ ...sanitizeUser(user), lastMessage: conversationsByPartner.get(user.id) }))
        .sort((a, b) => Date.parse(b.lastMessage.createdAt) - Date.parse(a.lastMessage.createdAt));
    }
    if (search) {
      result = result.filter((user) =>
        String(user.id || '').toLowerCase().includes(search)
        || String(user.label || '').toLowerCase().includes(search)
      );
    }
    return res.json(result.map((user) => ({
      ...sanitizeUser(user),
      ...(user.lastMessage ? { lastMessage: user.lastMessage } : {}),
    })));
  }

  const storeUsers = firebaseEnabled && firebaseDb
    ? await getFirestoreUsers()
    : memoryStore.users;
  const storeMessages = firebaseEnabled && firebaseDb && !search
    ? await getFirestoreMessages()
    : memoryStore.messages;
  const blockedByMe = firebaseEnabled && firebaseDb
    ? new Set()
    : getBlockedByUser(me);
  let users = storeUsers
    .map((user) => sanitizeUser(user))
    .filter((user) => user.id !== me && !blockedByMe.has(user.id));

  if (!search) {
    if (me) {
      const lastMessages = new Map();
      storeMessages.forEach((message) => {
        const partnerId = message.fromId === me ? String(message.toId)
          : message.toId === me ? String(message.fromId)
            : null;
        if (!partnerId) return;
        const existing = lastMessages.get(partnerId);
        if (!existing || String(message.createdAt) > String(existing.createdAt)) lastMessages.set(partnerId, message);
      });

      users = users
        .filter((user) => lastMessages.has(user.id))
        .map((user) => {
          const message = lastMessages.get(user.id);
          return {
            ...user,
            lastMessage: {
              id: message.id,
              fromId: message.fromId,
              text: message.text,
              type: message.type || 'text',
              createdAt: message.createdAt,
              stickerId: message.stickerId || null,
            },
          };
        })
        .sort((a, b) => Date.parse(b.lastMessage.createdAt) - Date.parse(a.lastMessage.createdAt));
    }

    return res.json(users);
  }

  users = users.filter((user) =>
    String(user.id || '').toLowerCase().includes(search)
    || String(user.label || '').toLowerCase().includes(search)
  );

  res.json(users);
}));

app.post('/api/auth/register', async (req, res) => {
  const { id, label, password } = req.body || {};

  if (!id || !label || !password) {
    return res.status(400).json({ error: 'Need id, label and password.' });
  }
  if (typeof id !== 'string' || !/^[A-Za-z0-9]{3,20}$/.test(id)) {
    return res.status(400).json({ error: 'Invalid user ID. Use 3-20 Latin letters and digits only.' });
  }
  if (typeof password !== 'string' || !/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/.test(password)) {
    return res.status(400).json({ error: 'Invalid password. Use at least 6 Latin letters and digits, including at least one of each.' });
  }

  const passwordHash = await hashPassword(password);

  await storeReady;
  if (supabaseEnabled) {
    const { error } = await supabase.from('users').insert({
      id: String(id), label: String(label), password: passwordHash,
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
        id: String(id), label: String(label), password: passwordHash, avatarData: null,
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
    ensureUser(String(id), String(label), passwordHash);
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
    ? (await supabase.from('users').select('id, label, password, avatar_data, about').eq('id', String(id)).maybeSingle()).data
    : firebaseEnabled && firebaseDb
    ? (await firebaseDb.collection('users').doc(String(id)).get()).data()
    : memoryStore.users.find((entry) => entry.id === String(id));
  const storedPassword = String(user?.password || '');
  const passwordOk = await verifyPassword(password, storedPassword);
  if (!user || !passwordOk) {
    return res.status(401).json({ error: 'Invalid user id or password.' });
  }

  // Lazy migration: the login password is correct, so if it is still stored
  // as legacy plaintext, replace it with a bcrypt hash right now.
  if (storedPassword && !isBcryptHash(storedPassword)) {
    try {
      await storePasswordHash(user.id, await hashPassword(password));
    } catch (error) {
      console.warn('Failed to upgrade legacy password to a hash:', error.message);
    }
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
    ? (await supabase.from('users').select('id, label, avatar_data, about').eq('id', String(sessionUserId)).maybeSingle()).data
    : firebaseEnabled && firebaseDb
    ? (await firebaseDb.collection('users').doc(String(sessionUserId)).get()).data()
    : memoryStore.users.find((entry) => entry.id === String(sessionUserId));
  if (!user) {
    res.clearCookie('sessionUserId', { path: '/' });
    return res.json({ user: null });
  }

  res.json({ user: sanitizeUser(user) });
});

app.patch('/api/auth/profile', async (req, res) => {
  const sessionUserId = req.cookies?.sessionUserId;
  const { label, avatarData } = req.body || {};
  const about = typeof req.body?.about === 'string' ? req.body.about.trim() : '';
  const cleanLabel = String(label || '').trim();
  if (!sessionUserId || !cleanLabel || cleanLabel.length > 80) return res.status(400).json({ error: 'Invalid profile.' });
  if (about.length > 160) return res.status(400).json({ error: 'About text must be 160 characters or fewer.' });
  if (avatarData !== null && avatarData !== undefined && !validImageData(avatarData)) return res.status(400).json({ error: 'Invalid image.' });

  const update = { label: cleanLabel, about, avatarData: avatarData ?? null };
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('users').update({
      label: cleanLabel,
      avatar_data: update.avatarData,
      about: update.about,
    }).eq('id', String(sessionUserId)).select('id, label, avatar_data, about').single();
    if (error) throw error;
    return res.json({ ok: true, user: sanitizeUser(data) });
  }
  if (firebaseEnabled && firebaseDb) {
    await firebaseDb.collection('users').doc(String(sessionUserId)).set(update, { merge: true });
    invalidateFirestoreCache();
    return res.json({ ok: true, user: sanitizeUser({ id: sessionUserId, ...update }) });
  }
  const user = memoryStore.users.find((entry) => entry.id === String(sessionUserId));
  if (!user) return res.status(404).json({ error: 'User not found.' });
  Object.assign(user, update);
  persistStore();
  res.json({ ok: true, user: sanitizeUser(user) });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('sessionUserId', { path: '/' });
  res.json({ ok: true });
});

app.post('/api/auth/password', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const { currentPassword = '', newPassword = '' } = req.body || {};
  if (!userId) return res.status(401).json({ error: 'Sign in required.' });
  if (typeof newPassword !== 'string' || !/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/.test(newPassword)) {
    return res.status(400).json({ error: 'Новый пароль: не менее 6 символов, латинские буквы и цифры, минимум по одной букве и цифре.' });
  }

  await storeReady;
  const user = supabaseEnabled
    ? (await supabase.from('users').select('id, password').eq('id', String(userId)).maybeSingle()).data
    : firebaseEnabled && firebaseDb
      ? (await firebaseDb.collection('users').doc(String(userId)).get()).data()
      : memoryStore.users.find((entry) => entry.id === String(userId));
  if (!user) return res.status(404).json({ error: 'User not found.' });

  const currentOk = await verifyPassword(String(currentPassword), String(user.password || ''));
  if (!currentOk) return res.status(401).json({ error: 'Current password is incorrect.' });

  await storePasswordHash(userId, await hashPassword(newPassword));
  res.json({ ok: true });
});

function requireAdmin(req, res, next) {
  if (!isValidAdminSession(req.cookies?.adminSession)) {
    return res.status(401).json({ error: 'Admin access required.' });
  }
  next();
}

function createAdminSession() {
  const payload = `${Date.now()}.${randomBytes(32).toString('hex')}`;
  const signature = createHmac('sha256', ADMIN_SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function isValidAdminSession(token) {
  if (!ADMIN_PASSWORD || ADMIN_SESSION_SECRET.length < 32 || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const issuedAt = Number(parts[0]);
  if (!Number.isSafeInteger(issuedAt) || issuedAt > Date.now() || Date.now() - issuedAt > ADMIN_SESSION_TTL_MS) {
    return false;
  }

  const payload = `${parts[0]}.${parts[1]}`;
  const expected = createHmac('sha256', ADMIN_SESSION_SECRET).update(payload).digest();
  const provided = Buffer.from(parts[2], 'base64url');
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

function adminCookieOptions(includeLifetime = true) {
  const options = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };
  if (includeLifetime) options.maxAge = ADMIN_SESSION_TTL_MS;
  return options;
}

app.post('/api/admin/login', (req, res) => {
  if (!ADMIN_PASSWORD || ADMIN_SESSION_SECRET.length < 32) {
    console.error('Admin login is disabled: configure ADMIN_PASSWORD and a 32-character ADMIN_SESSION_SECRET.');
    return res.status(503).json({ error: 'Admin access is not configured.' });
  }
  const { password } = req.body || {};
  if (String(password) !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin password.' });
  }

  res.cookie('adminSession', createAdminSession(), adminCookieOptions());

  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('adminSession', adminCookieOptions(false));
  res.json({ ok: true });
});

app.get('/api/admin/me', (req, res) => {
  res.json({ admin: isValidAdminSession(req.cookies?.adminSession) });
});

app.get('/api/admin/users', requireAdmin, async (req, res) => {
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('users').select('id, label');
    if (error) throw error;
    return res.json({ users: data || [] });
  }
  if (firebaseEnabled && firebaseDb) {
    const users = await getFirestoreUsers();
    return res.json({ users: users.map((user) => sanitizeUser(user)) });
  }
  res.json({ users: memoryStore.users.map((user) => sanitizeUser(user)) });
});

app.post('/api/admin/users/:id/reset-password', requireAdmin, async (req, res) => {
  const id = String(req.params.id || '');
  const newPassword = String(req.body?.password || '');
  if (!id) {
    return res.status(400).json({ error: 'Need user id.' });
  }
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'Введите новый пароль — минимум 4 символа.' });
  }

  await storeReady;
  const user = supabaseEnabled
    ? (await supabase.from('users').select('id').eq('id', id).maybeSingle()).data
    : firebaseEnabled && firebaseDb
      ? (await firebaseDb.collection('users').doc(id).get()).exists
      : memoryStore.users.some((entry) => entry.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  await storePasswordHash(id, await hashPassword(newPassword));
  res.json({ ok: true, userId: id });
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
  } else if (firebaseEnabled && firebaseDb) {
    await deleteFirestoreUserData(id);
  } else {
    memoryStore.users = memoryStore.users.filter((user) => user.id !== id);
    memoryStore.messages = memoryStore.messages.filter((message) => message.fromId !== id && message.toId !== id);
    persistStore();
  }

  publishUserEvent(id, 'account-deleted', {});
  if (req.cookies?.sessionUserId === id) res.clearCookie('sessionUserId', { path: '/' });
  res.json({ ok: true, deletedUserId: id });
});

app.delete('/api/admin/users', requireAdmin, async (req, res) => {
  let deletedUserIds = [];
  if (supabaseEnabled) {
    const { data: users, error: usersReadError } = await supabase.from('users').select('id');
    if (usersReadError) throw usersReadError;
    deletedUserIds = (users || []).map((user) => String(user.id));
    const [{ error: messagesError }, { error: usersError }] = await Promise.all([
      supabase.from('messages').delete().not('id', 'is', null),
      supabase.from('users').delete().not('id', 'is', null),
    ]);
    if (messagesError || usersError) throw messagesError || usersError;
  } else if (firebaseEnabled && firebaseDb) {
    deletedUserIds = await deleteAllFirestoreData();
  } else {
    deletedUserIds = memoryStore.users.map((user) => String(user.id));
    memoryStore.users = [];
    memoryStore.messages = [];
    persistStore();
  }
  deletedUserIds.forEach((userId) => publishUserEvent(userId, 'account-deleted', {}));
  if (req.cookies?.sessionUserId) {
    publishUserEvent(String(req.cookies.sessionUserId), 'account-deleted', {});
  }
  res.clearCookie('sessionUserId', { path: '/' });
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

app.get('/api/chat/unread', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  if (!userId) return res.status(401).json({ error: 'Sign in required.' });
  await storeReady;

  let messages;
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('messages').select('from_id')
      .eq('to_id', String(userId)).is('read_at', null).neq('type', 'call');
    if (error) throw error;
    messages = data || [];
  } else if (firebaseEnabled && firebaseDb) {
    const snapshot = await firebaseDb.collection('messages').where('toId', '==', String(userId)).get();
    messages = snapshot.docs.map((doc) => doc.data())
      .filter((message) => !message.readAt && message.type !== 'call')
      .map((message) => ({ from_id: message.fromId }));
  } else {
    messages = memoryStore.messages
      .filter((message) => message.toId === String(userId) && !message.readAt && message.type !== 'call')
      .map((message) => ({ from_id: message.fromId }));
  }
  const userIds = [...new Set(messages.map((message) => String(message.from_id)).filter((id) => id !== String(userId)))];
  let users;
  if (supabaseEnabled && userIds.length) {
    const { data, error } = await supabase.from('users').select('id, label, avatar_data, about').in('id', userIds);
    if (error) throw error;
    users = (data || []).map(sanitizeUser);
  } else {
    const allUsers = firebaseEnabled && firebaseDb
      ? await getFirestoreUsers()
      : memoryStore.users;
    const unreadUserIds = new Set(userIds);
    users = allUsers.filter((user) => unreadUserIds.has(String(user.id))).map(sanitizeUser);
  }
  res.json({ userIds, users });
});

app.get('/api/chat', async (req, res) => {
  const me = String(req.query.me || '');
  const other = String(req.query.other || '');
  const chatId = String(req.query.chatId || '');

  if (!me) {
    return res.status(400).json({ error: 'Need user id.' });
  }
  if (req.cookies?.sessionUserId !== me) {
    return res.status(403).json({ error: 'Chat access denied.' });
  }

  await storeReady;

  if (chatId) {
    // Group chat history.
    const chat = supabaseEnabled
      ? (await supabase.from('chats').select('*').eq('id', chatId).maybeSingle()).data
      : memoryStore.chats.find((c) => String(c.id) === chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found.' });
    }
    const memberIds = supabaseEnabled
      ? ((await supabase.from('chat_members').select('user_id').eq('chat_id', chatId)).data || []).map((m) => String(m.user_id))
      : getChatMemberIds(chatId);
    if (!memberIds.includes(me)) {
      return res.status(403).json({ error: 'You are not a member of this group.' });
    }

    if (supabaseEnabled) {
      const { data, error } = await supabase.from('messages')
        .select('id, from_id, to_id, text, image_data, audio_data, duration_ms, reply_to, type, call_id, call_mode, call_status, sticker_id, chat_id, read_receipts, pinned_at, pinned_by, reactions, delivered_at, read_at, edited_at, created_at')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return res.json({ chatKey: chatId, messages: (data || []).map(toAppMessage) });
    }

    const allMessages = firebaseEnabled && firebaseDb
      ? await getFirestoreMessages()
      : memoryStore.messages;
    const conversationMessages = allMessages.filter((item) => String(item.chatId) === chatId);
    const incoming = conversationMessages.filter((item) => String(item.fromId) !== me);
    const pendingDelivery = incoming.filter((item) => !item.deliveredAt);
    const deliveredAt = pendingDelivery.length ? new Date().toISOString() : null;
    if (deliveredAt && firebaseEnabled && firebaseDb) {
      await Promise.all(pendingDelivery.map((message) =>
        firebaseDb.collection('messages').doc(String(message.id)).update({ deliveredAt })
      ));
      pendingDelivery.forEach((message) => { message.deliveredAt = deliveredAt; });
      invalidateFirestoreCache();
    } else if (deliveredAt) {
      pendingDelivery.forEach((message) => { message.deliveredAt = deliveredAt; });
      persistStore();
      publishConversationUpdate(me, chatId);
    }
    const messages = conversationMessages
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    res.json({ chatKey: chatId, messages });
    return;
  }

  if (!other) {
    return res.status(400).json({ error: 'Need both ids.' });
  }

  if (supabaseEnabled) {
    const [{ data: sent, error: sentError }, { data: received, error: receivedError }] = await Promise.all([
      supabase.from('messages').select('id, from_id, to_id, text, image_data, audio_data, duration_ms, reply_to, type, call_id, call_mode, call_status, sticker_id, reactions, delivered_at, read_at, edited_at, created_at').eq('from_id', me).eq('to_id', other),
      supabase.from('messages').select('id, from_id, to_id, text, image_data, audio_data, duration_ms, reply_to, type, call_id, call_mode, call_status, sticker_id, reactions, delivered_at, read_at, edited_at, created_at').eq('from_id', other).eq('to_id', me),
    ]);
    if (sentError || receivedError) throw sentError || receivedError;
    const incoming = received || [];
    const pendingDelivery = incoming.some((message) => !message.delivered_at);
    const deliveredAt = pendingDelivery ? new Date().toISOString() : null;
    if (pendingDelivery) {
      const { error } = await supabase.from('messages').update({ delivered_at: deliveredAt })
        .eq('from_id', other).eq('to_id', me).is('delivered_at', null);
      if (error) throw error;
      publishConversationUpdate(other, me);
    }
    const messages = [...(sent || []), ...incoming.map((message) => ({
      ...message,
      delivered_at: message.delivered_at || deliveredAt,
    }))]
      .map(toAppMessage)
      .sort((first, second) => first.createdAt.localeCompare(second.createdAt));
    return res.json({ chatKey: [me, other].sort().join('::'), messages });
  }

  // Never serve chat history from the process cache when Firestore is enabled:
  // Railway can route the two users' requests to different server instances.
  const allMessages = firebaseEnabled && firebaseDb
    ? await getFirestoreMessages()
    : memoryStore.messages;
  const conversationMessages = allMessages.filter((item) =>
    (item.fromId === me && item.toId === other) || (item.fromId === other && item.toId === me)
  );
  const incoming = conversationMessages.filter((item) => item.fromId === other && item.toId === me);
  const pendingDelivery = incoming.filter((item) => !item.deliveredAt);
  const deliveredAt = pendingDelivery.length ? new Date().toISOString() : null;
  if (deliveredAt && firebaseEnabled && firebaseDb) {
    await Promise.all(pendingDelivery.map((message) =>
      firebaseDb.collection('messages').doc(String(message.id)).update({ deliveredAt })
    ));
    pendingDelivery.forEach((message) => { message.deliveredAt = deliveredAt; });
    invalidateFirestoreCache();
  } else if (deliveredAt) {
    pendingDelivery.forEach((message) => { message.deliveredAt = deliveredAt; });
    persistStore();
    publishConversationUpdate(other, me);
  }
  const messages = conversationMessages
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  res.json({ chatKey: [me, other].sort().join('::'), messages });
});

app.post('/api/chat', async (req, res) => {
  try {
    const {
      fromId, toId, chatId, text = '', imageData = null, stickerId = null,
      audioData = null, durationMs = null, replyToId = null,
      fileData = null, fileName = null, fileType = null,
    } = req.body || {};

    const senderId = String(fromId || '');
    const targetId = String(toId || '');
    const groupChatId = String(chatId || '');

    if (!senderId
      || (!String(text).trim() && !imageData && !stickerId && !audioData && !fileData)
      || String(text).length > 4000
      || (imageData && !validImageData(imageData))
      || (audioData && !validAudioData(audioData))
      || (stickerId && stickerId !== 'eto-realno')
      || (fileData && !validFileData(fileData))) {
      return res.status(400).json({ error: 'Invalid message.' });
    }
    if (fileData && (!fileName || String(fileName).length > 200)) {
      return res.status(400).json({ error: 'Invalid file name.' });
    }
    if (durationMs !== null && (!Number.isFinite(Number(durationMs)) || Number(durationMs) < 0 || Number(durationMs) > 10 * 60 * 1000)) {
      return res.status(400).json({ error: 'Invalid message.' });
    }
    if (req.cookies?.sessionUserId !== senderId) {
      return res.status(403).json({ error: 'Chat access denied.' });
    }

    // Group chat: sender must be a member; target is the chat itself.
    let isGroup = false;
    if (groupChatId) {
      isGroup = true;
    } else if (!targetId) {
      return res.status(400).json({ error: 'Invalid message.' });
    }

    await storeReady;

    if (isGroup) {
      let memberIds;
      let blockedIds;
      if (supabaseEnabled) {
        const { data: chat, error: chatError } = await supabase.from('chats').select('id').eq('id', groupChatId).maybeSingle();
        if (chatError) throw chatError;
        if (!chat) return res.status(400).json({ error: 'Group chat not found.' });
        const [
          { data: members, error: membersError },
          { data: blocked, error: blockedError },
        ] = await Promise.all([
          supabase.from('chat_members').select('user_id').eq('chat_id', groupChatId),
          supabase.from('user_blocks').select('blocked_id').eq('blocker_id', senderId),
        ]);
        if (membersError || blockedError) throw membersError || blockedError;
        memberIds = (members || []).map((member) => String(member.user_id));
        blockedIds = new Set((blocked || []).map((entry) => String(entry.blocked_id)));
      } else {
        const chat = memoryStore.chats.find((c) => String(c.id) === groupChatId);
        if (!chat || chat.type !== 'group') {
          return res.status(400).json({ error: 'Group chat not found.' });
        }
        memberIds = getChatMemberIds(groupChatId);
        blockedIds = getBlockedByUser(senderId);
      }
      if (!memberIds.includes(senderId)) {
        return res.status(403).json({ error: 'You are not a member of this group.' });
      }
      // Blocked members cannot send to the group.
      if (memberIds.some((memberId) => blockedIds.has(memberId))) {
        return res.status(403).json({ error: 'You have blocked a member of this group.' });
      }
    } else {
      // Direct message: neither user may have blocked the other.
      let blocked = isUserBlocked(senderId, targetId) || isUserBlocked(targetId, senderId);
      if (supabaseEnabled) {
        const [
          { data: senderBlock, error: senderBlockError },
          { data: recipientBlock, error: recipientBlockError },
        ] = await Promise.all([
          supabase.from('user_blocks').select('blocker_id').eq('blocker_id', senderId).eq('blocked_id', targetId).maybeSingle(),
          supabase.from('user_blocks').select('blocker_id').eq('blocker_id', targetId).eq('blocked_id', senderId).maybeSingle(),
        ]);
        if (senderBlockError || recipientBlockError) throw senderBlockError || recipientBlockError;
        blocked = Boolean(senderBlock || recipientBlock);
      }
      if (blocked) {
        return res.status(403).json({ error: 'You cannot message this user.' });
      }
      if (!supabaseEnabled) {
        if (!memoryStore.users.some((user) => user.id === senderId)) {
          ensureUser(senderId, senderId);
        }
        if (!memoryStore.users.some((user) => user.id === targetId)) {
          ensureUser(targetId, targetId);
        }
      }
    }

    // A reply is stored as a small denormalized snapshot of the original
    // message, so quotes keep working even if the original is deleted later.
    let replyTo = null;
    if (replyToId) {
      const findReply = async () => {
        if (supabaseEnabled) {
          const { data, error } = await supabase.from('messages')
            .select('id, from_id, to_id, text, type, sticker_id, chat_id')
            .eq('id', String(replyToId)).maybeSingle();
          if (error) throw error;
          return data ? { id: data.id, from_id: data.from_id, to_id: data.to_id, text: data.text, type: data.type, sticker_id: data.sticker_id, chat_id: data.chat_id } : null;
        }
        if (firebaseEnabled && firebaseDb) {
          const doc = await firebaseDb.collection('messages').doc(String(replyToId)).get();
          return doc.exists ? { id: doc.id, ...doc.data() } : null;
        }
        return memoryStore.messages.find((item) => item.id === String(replyToId)) || null;
      };
      const replySource = await findReply();
      if (replySource) {
        const sourceFrom = String(replySource.from_id ?? replySource.fromId ?? '');
        const sourceTo = String(replySource.to_id ?? replySource.toId ?? '');
        const sourceChatId = replySource.chat_id || replySource.chatId || null;
        const sameConversation = isGroup
          ? String(sourceChatId) === groupChatId
          : (sourceFrom === senderId && sourceTo === targetId)
            || (sourceFrom === targetId && sourceTo === senderId);
        if (sameConversation) {
          replyTo = {
            id: String(replySource.id),
            fromId: sourceFrom,
            text: String(replySource.text || '').slice(0, 300),
            type: String(replySource.type || 'text'),
            stickerId: replySource.sticker_id || replySource.stickerId || null,
          };
        }
      }
    }

    const message = {
      id: randomUUID(),
      fromId: senderId,
      toId: isGroup ? groupChatId : targetId,
      chatId: isGroup ? groupChatId : null,
      text: String(text),
      imageData,
      audioData,
      fileData,
      fileName: fileData ? String(fileName || 'file') : null,
      fileType: fileData ? String(fileType || 'application/octet-stream') : null,
      durationMs: durationMs === null ? null : Number(durationMs),
      replyTo,
      type: stickerId ? 'sticker' : imageData ? 'image' : audioData ? 'audio' : fileData ? 'file' : 'text',
      stickerId,
      reactions: {},
      readReceipts: {},
      readAt: null,
      createdAt: new Date().toISOString(),
    };

    if (supabaseEnabled) {
      const { error } = await supabase.from('messages').insert(toDatabaseMessage(message));
      if (error) {
        console.error('Supabase insert failed for chat message:', error);
        return res.status(500).json({ error: 'Unable to send message.' });
      }
    } else if (firebaseEnabled && firebaseDb) {
      // A message is one independent document. Replacing the entire collection
      // caused concurrent requests to delete each other's messages.
      await Promise.all([
        firebaseDb.collection('messages').doc(message.id).set(message),
        firebaseDb.collection('users').doc(String(senderId)).set({ id: String(senderId) }, { merge: true }),
      ]);
      if (!isGroup) {
        await firebaseDb.collection('users').doc(String(targetId)).set({ id: String(targetId) }, { merge: true });
      }
      invalidateFirestoreCache();
    } else {
      memoryStore.messages.push(message);
      persistStore();
    }

    publishChatMessage(message);
    res.json({ ok: true, message });
  } catch (error) {
    console.error('Failed to send chat message:', error);
    return res.status(500).json({ error: 'Unable to send message.' });
  }
});

app.patch('/api/chat/:id', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const messageId = String(req.params.id || '');
  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
  if (!userId || !messageId || !text || text.length > 4000) {
    return res.status(400).json({ error: 'Enter a message between 1 and 4000 characters.' });
  }

  await storeReady;
  const editedAt = new Date().toISOString();
  let message = null;
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('messages')
      .update({ text, edited_at: editedAt })
      .eq('id', messageId)
      .eq('from_id', String(userId))
      .eq('type', 'text')
      .select('id, from_id, to_id, text, type, created_at, edited_at')
      .maybeSingle();
    if (error) throw error;
    message = data;
  } else if (firebaseEnabled && firebaseDb) {
    const ref = firebaseDb.collection('messages').doc(messageId);
    const snapshot = await ref.get();
    const storedMessage = snapshot.data();
    if (snapshot.exists && storedMessage.fromId === String(userId) && (storedMessage.type || 'text') === 'text') {
      await ref.update({ text, editedAt });
      message = { ...storedMessage, text, editedAt };
      invalidateFirestoreCache();
    }
  } else {
    const storedMessage = memoryStore.messages.find((item) =>
      item.id === messageId && item.fromId === String(userId) && (item.type || 'text') === 'text'
    );
    if (storedMessage) {
      storedMessage.text = text;
      storedMessage.editedAt = editedAt;
      message = storedMessage;
      persistStore();
    }
  }

  if (!message) return res.status(404).json({ error: 'Message not found or cannot be edited.' });
  publishChatMessage(message);
  res.json({ ok: true, message: supabaseEnabled ? toAppMessage(message) : message });
});

app.delete('/api/chat/:id', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const messageId = String(req.params.id || '');
  if (!userId || !messageId) return res.status(400).json({ error: 'Invalid message.' });

  await storeReady;
  let conversation = null;
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('messages').delete()
      .eq('id', messageId).eq('from_id', String(userId)).select('from_id, to_id').maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Message not found or cannot be deleted.' });
    conversation = { fromId: data.from_id, toId: data.to_id };
  } else if (firebaseEnabled && firebaseDb) {
    const ref = firebaseDb.collection('messages').doc(messageId);
    const snapshot = await ref.get();
    if (!snapshot.exists || snapshot.data().fromId !== String(userId)) {
      return res.status(404).json({ error: 'Message not found or cannot be deleted.' });
    }
    conversation = { fromId: snapshot.data().fromId, toId: snapshot.data().toId };
    await ref.delete();
    invalidateFirestoreCache();
  } else {
    const index = memoryStore.messages.findIndex((message) =>
      message.id === messageId && message.fromId === String(userId)
    );
    if (index < 0) return res.status(404).json({ error: 'Message not found or cannot be deleted.' });
    const [message] = memoryStore.messages.splice(index, 1);
    conversation = { fromId: message.fromId, toId: message.toId };
    persistStore();
  }
  publishConversationUpdate(conversation.fromId, conversation.toId);
  res.json({ ok: true, deletedMessageId: messageId });
});

app.post('/api/calls/log', async (req, res) => {
  const { callId, fromId, toId, mode, status = 'missed' } = req.body || {};
  if (!callId || !fromId || !toId || !['audio', 'video'].includes(mode)) return res.status(400).json({ error: 'Invalid call log.' });
  const message = {
    id: String(callId), fromId: String(fromId), toId: String(toId), text: '', type: 'call',
    callId: String(callId), callMode: mode, callStatus: status, createdAt: new Date().toISOString(),
  };
  if (supabaseEnabled) {
    const { error } = await supabase.from('messages').upsert(toDatabaseMessage(message), { onConflict: 'id' });
    if (error) throw error;
  } else if (firebaseEnabled && firebaseDb) {
    await firebaseDb.collection('messages').doc(message.id).set(message, { merge: true });
    invalidateFirestoreCache();
  } else {
    const index = memoryStore.messages.findIndex((item) => item.id === message.id);
    if (index >= 0) memoryStore.messages[index] = { ...memoryStore.messages[index], ...message };
    else memoryStore.messages.push(message);
    persistStore();
  }
  res.json({ ok: true });
});

app.post('/api/chat/read', async (req, res) => {
  const { me, other } = req.body || {};
  if (!me || !other) return res.status(400).json({ error: 'Need both ids.' });
  if (req.cookies?.sessionUserId !== String(me)) return res.status(403).json({ error: 'Chat access denied.' });
  await storeReady;
  const readAt = new Date().toISOString();
  if (supabaseEnabled) {
    const { error } = await supabase.from('messages').update({ read_at: readAt })
      .eq('from_id', String(other)).eq('to_id', String(me)).is('read_at', null);
    if (error) throw error;
  } else if (firebaseEnabled && firebaseDb) {
    const snapshot = await firebaseDb.collection('messages').where('fromId', '==', String(other)).where('toId', '==', String(me)).get();
    const batch = firebaseDb.batch();
    snapshot.docs.filter((doc) => !doc.data().readAt).forEach((doc) => batch.update(doc.ref, { readAt }));
    if (!snapshot.empty) await batch.commit();
    invalidateFirestoreCache();
  } else {
    memoryStore.messages.forEach((message) => {
      if (message.fromId === String(other) && message.toId === String(me) && !message.readAt) message.readAt = readAt;
    });
    persistStore();
  }
  publishUserEvent(other, 'chat-message', { fromId: other, toId: me });
  res.json({ ok: true, readAt });
});

app.post('/api/chat/reactions', async (req, res) => {
  const { messageId, reaction } = req.body || {};
  const userId = req.cookies?.sessionUserId;
  if (!messageId || !userId || !['heart', 'like', 'poop'].includes(reaction)) return res.status(400).json({ error: 'Invalid reaction.' });
  await storeReady;
  let message = null;
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('messages').select('id, from_id, to_id, reactions').eq('id', String(messageId)).maybeSingle();
    if (error) throw error;
    message = data;
  } else if (firebaseEnabled && firebaseDb) {
    const doc = await firebaseDb.collection('messages').doc(String(messageId)).get();
    message = doc.exists ? { id: doc.id, ...doc.data() } : null;
  } else message = memoryStore.messages.find((item) => item.id === String(messageId));
  if (!message) return res.status(404).json({ error: 'Message not found.' });
  if (message.from_id !== String(userId) && message.to_id !== String(userId)
      && message.fromId !== String(userId) && message.toId !== String(userId)) {
    return res.status(403).json({ error: 'Chat access denied.' });
  }

  const reactions = { ...(message.reactions || {}) };
  const users = new Set(reactions[reaction] || []);
  if (users.has(String(userId))) users.delete(String(userId)); else users.add(String(userId));
  reactions[reaction] = [...users];
  if (supabaseEnabled) {
    const { error } = await supabase.from('messages').update({ reactions }).eq('id', String(messageId));
    if (error) throw error;
  } else if (firebaseEnabled && firebaseDb) {
    await firebaseDb.collection('messages').doc(String(messageId)).update({ reactions });
    invalidateFirestoreCache();
  } else {
    message.reactions = reactions;
    persistStore();
  }
  publishConversationUpdate(message.from_id || message.fromId, message.to_id || message.toId);
  res.json({ ok: true, reactions });
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

  publishUserEvent(signal.toId, 'call-signal', signal);
  res.json({ ok: true });
});

// ============================================================================
// Groups, forwarding, pinning, blocking, search, export
// ============================================================================

app.get('/api/chats', asyncHandler(async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  if (!userId) return res.status(401).json({ error: 'Sign in required.' });
  await storeReady;

  const chats = [];
  if (supabaseEnabled) {
    const { data: memberships, error: membershipsError } = await supabase
      .from('chat_members').select('chat_id, user_id').eq('user_id', userId);
    if (membershipsError) throw membershipsError;
    const chatIds = (memberships || []).map((m) => String(m.chat_id));
    if (chatIds.length) {
      const [
        { data: groupChats, error: groupChatsError },
        { data: allMembers, error: allMembersError },
        { data: groupMessages, error: groupMessagesError },
      ] = await Promise.all([
        supabase.from('chats').select('*').in('id', chatIds),
        supabase.from('chat_members').select('chat_id').in('chat_id', chatIds),
        supabase.from('messages')
          .select('id, chat_id, from_id, to_id, text, type, sticker_id, created_at')
          .in('chat_id', chatIds)
          .order('created_at', { ascending: false }),
      ]);
      if (groupChatsError || allMembersError || groupMessagesError) {
        throw groupChatsError || allMembersError || groupMessagesError;
      }
      const memberCounts = new Map();
      (allMembers || []).forEach((member) => {
        const id = String(member.chat_id);
        memberCounts.set(id, (memberCounts.get(id) || 0) + 1);
      });
      const latestGroupMessages = new Map();
      (groupMessages || []).forEach((message) => {
        const id = String(message.chat_id);
        if (!latestGroupMessages.has(id) && message.type !== 'call') {
          latestGroupMessages.set(id, toAppMessage(message));
        }
      });
      (groupChats || []).forEach((chat) => {
        const id = String(chat.id);
        chats.push({
          id, type: 'group', name: chat.name || 'Групповой чат',
          avatarData: chat.avatar_data || null, createdBy: String(chat.created_by || ''),
          createdAt: String(chat.created_at), pinnedAt: chat.pinned_at || null,
          memberCount: memberCounts.get(id) || 0,
          lastMessage: latestGroupMessages.get(id) || null,
        });
      });
    }
    // Direct conversations derived from messages.
    const [{ data: sent, error: sentError }, { data: received, error: receivedError }] = await Promise.all([
      supabase.from('messages').select('id, from_id, to_id, created_at, text, type, sticker_id').eq('from_id', userId).is('chat_id', null),
      supabase.from('messages').select('id, from_id, to_id, created_at, text, type, sticker_id').eq('to_id', userId).is('chat_id', null),
    ]);
    if (sentError || receivedError) throw sentError || receivedError;
    const directPartners = new Set();
    const latestDirectMessages = new Map();
    [...(sent || []), ...(received || [])].forEach((message) => {
      const partner = String(message.from_id) === userId ? String(message.to_id) : String(message.from_id);
      if (partner === userId) return;
      directPartners.add(partner);
      if (message.type === 'call') return;
      const latest = latestDirectMessages.get(partner);
      if (!latest || Date.parse(message.created_at) > Date.parse(latest.createdAt)) {
        latestDirectMessages.set(partner, toAppMessage(message));
      }
    });
    directPartners.forEach((partnerId) => {
      chats.push({
        id: `direct::${partnerId}`,
        type: 'direct',
        partnerId,
        lastMessage: latestDirectMessages.get(partnerId) || null,
      });
    });
  } else {
    const blockedByMe = getBlockedByUser(userId);
    getDirectConversations(userId).forEach((c) => {
      if (!blockedByMe.has(c.partnerId)) chats.push(c);
    });
    getUserGroupChats(userId).forEach((chat) => {
      const memberIds = getChatMemberIds(chat.id);
      chats.push({
        id: String(chat.id), type: 'group', name: chat.name || 'Групповой чат',
        avatarData: chat.avatarData || null, createdBy: String(chat.createdBy || ''),
        createdAt: String(chat.createdAt), pinnedAt: chat.pinnedAt || null,
        memberCount: memberIds.length,
      });
    });
  }

  // Attach last message per chat.
  const me = String(userId);
  if (!supabaseEnabled) {
    chats.forEach((chat) => {
      const last = chat.type === 'direct'
        ? lastMessageForConversation(chat.partnerId, me)
        : lastMessageForGroup(chat.id);
      if (last) {
        chat.lastMessage = {
          id: last.id,
          fromId: last.fromId,
          text: last.text,
          type: last.type || 'text',
          createdAt: last.createdAt,
          stickerId: last.stickerId || null,
        };
      }
    });
  }
  chats.sort((a, b) => {
    const pa = a.pinnedAt ? 1 : 0;
    const pb = b.pinnedAt ? 1 : 0;
    if (pb !== pa) return pb - pa;
    const ta = a.lastMessage ? Date.parse(a.lastMessage.createdAt) : 0;
    const tb = b.lastMessage ? Date.parse(b.lastMessage.createdAt) : 0;
    return tb - ta;
  });

  res.json({ chats });
}));

app.post('/api/chats', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const { name, memberIds = [], avatarData } = req.body || {};
  if (!userId) return res.status(401).json({ error: 'Sign in required.' });
  if (!name || !String(name).trim() || String(name).trim().length > 80) {
    return res.status(400).json({ error: 'Неверное имя группы.' });
    }
  if (avatarData !== null && avatarData !== undefined && !validImageData(avatarData)) {
    return res.status(400).json({ error: 'Неверная картинка группы.' });
  }

  await storeReady;
  const cleanMemberIds = [...new Set(memberIds.map(String).filter(Boolean))];
  if (!cleanMemberIds.includes(userId)) cleanMemberIds.push(userId);
  if (cleanMemberIds.length < 2) {
    return res.status(400).json({ error: 'В группе должно быть как минимум два участника.' });
  }

  const chat = {
    id: randomUUID(),
    type: 'group',
    name: String(name).trim(),
    avatarData: avatarData || null,
    createdBy: String(userId),
    createdAt: new Date().toISOString(),
    pinnedAt: null,
  };

  if (supabaseEnabled) {
    const { data, error } = await supabase.from('chats').insert({
      id: chat.id, name: chat.name, avatar_data: chat.avatarData,
      created_by: chat.createdBy, created_at: chat.createdAt,
    }).select().single();
    if (error) throw error;
    const members = cleanMemberIds.map((memberId) => ({
      chat_id: chat.id, user_id: memberId,
      role: memberId === userId ? 'admin' : 'member',
      joined_at: new Date().toISOString(),
    }));
    const { error: membersError } = await supabase.from('chat_members').insert(members);
    if (membersError) throw membersError;
  } else if (firebaseEnabled && firebaseDb) {
    const chatRef = firebaseDb.collection('chats').doc(chat.id);
    await chatRef.set({
      id: chat.id, name: chat.name, avatar_data: chat.avatarData,
      created_by: chat.createdBy, created_at: chat.createdAt,
    });
    const batch = firebaseDb.batch();
    cleanMemberIds.forEach((memberId) => {
      const ref = firebaseDb.collection('chat_members').doc();
      batch.set(ref, {
        chat_id: chat.id, user_id: memberId,
        role: memberId === userId ? 'admin' : 'member',
        joined_at: new Date().toISOString(),
      });
    });
    await batch.commit();
    invalidateFirestoreCache();
  } else {
    memoryStore.chats.push(chat);
    cleanMemberIds.forEach((memberId) => {
      memoryStore.chatMembers.push({
        chatId: chat.id, userId: memberId,
        role: memberId === userId ? 'admin' : 'member',
        joinedAt: new Date().toISOString(),
      });
    });
    persistStore();
  }

  res.json({ ok: true, chat: { ...chat, memberCount: cleanMemberIds.length } });
});

app.get('/api/chats/:chatId', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const chatId = String(req.params.chatId || '');
  if (!userId || !chatId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  let chat, members;
  if (supabaseEnabled) {
    const { data: chatData, error: chatError } = await supabase.from('chats').select('*').eq('id', chatId).maybeSingle();
    if (chatError) throw chatError;
    if (!chatData) return res.status(404).json({ error: 'Chat not found.' });
    chat = { id: String(chatData.id), type: 'group', name: chatData.name, avatarData: chatData.avatar_data, createdBy: String(chatData.created_by), createdAt: String(chatData.created_at), pinnedAt: chatData.pinned_at };
    const { data: memberData, error: membersError } = await supabase.from('chat_members').select('user_id, role').eq('chat_id', chatId);
    if (membersError) throw membersError;
    members = (memberData || []).map((m) => ({ userId: String(m.user_id), role: m.role }));
  } else {
    chat = memoryStore.chats.find((c) => String(c.id) === chatId);
    if (!chat) return res.status(404).json({ error: 'Chat not found.' });
    members = getChatMembers(chatId).map((m) => ({ userId: String(m.userId), role: m.role }));
  }

  if (!members.some((member) => member.userId === userId)) {
    return res.status(403).json({ error: 'You are not a member of this group.' });
  }

  const userMap = new Map();
  if (supabaseEnabled) {
    const ids = members.map((m) => m.userId);
    if (ids.length) {
      const { data: users, error: usersError } = await supabase.from('users').select('id, label, avatar_data, about').in('id', ids);
      if (usersError) throw usersError;
      (users || []).forEach((u) => userMap.set(String(u.id), sanitizeUser(u)));
    }
  } else {
    const allUsers = firebaseEnabled && firebaseDb ? await getFirestoreUsers() : memoryStore.users;
    members.forEach((m) => {
      const u = allUsers.find((user) => String(user.id) === m.userId);
      if (u) userMap.set(m.userId, sanitizeUser(u));
    });
  }

  res.json({ ok: true, chat: { ...chat, memberCount: members.length }, members: members.map((m) => ({ ...m, user: userMap.get(m.userId) || { id: m.userId, label: m.userId } })) });
});

app.patch('/api/chats/:chatId', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const chatId = String(req.params.chatId || '');
  const { name, avatarData } = req.body || {};
  if (!userId || !chatId) return res.status(400).json({ error: 'Invalid request.' });
  if (name !== undefined && (!String(name).trim() || String(name).trim().length > 80)) {
    return res.status(400).json({ error: 'Неверное имя группы.' });
  }
  if (avatarData !== null && avatarData !== undefined && !validImageData(avatarData)) {
    return res.status(400).json({ error: 'Неверная картинка группы.' });
  }
  await storeReady;

  if (supabaseEnabled) {
    const membership = (await supabase.from('chat_members').select('role').eq('chat_id', chatId).eq('user_id', userId).maybeSingle()).data;
    if (!membership || membership.role !== 'admin') {
      return res.status(403).json({ error: 'Only group admin can edit the group.' });
    }
    const update = {};
    if (name !== undefined) update.name = String(name).trim();
    if (avatarData !== null && avatarData !== undefined) update.avatar_data = avatarData;
    const { data, error } = await supabase.from('chats').update(update).eq('id', chatId).select().single();
    if (error) throw error;
    return res.json({ ok: true, chat: { id: String(data.id), name: data.name, avatarData: data.avatar_data } });
  }

  const chat = memoryStore.chats.find((c) => String(c.id) === chatId);
  if (!chat) return res.status(404).json({ error: 'Chat not found.' });
  const membership = memoryStore.chatMembers.find((m) => String(m.chatId) === chatId && String(m.userId) === userId);
  if (!membership || membership.role !== 'admin') {
    return res.status(403).json({ error: 'Only group admin can edit the group.' });
  }
  if (name !== undefined) chat.name = String(name).trim();
  if (avatarData !== null && avatarData !== undefined) chat.avatarData = avatarData;
  persistStore();
  res.json({ ok: true, chat: { id: chat.id, name: chat.name, avatarData: chat.avatarData } });
});

app.delete('/api/chats/:chatId', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const chatId = String(req.params.chatId || '');
  if (!userId || !chatId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  if (supabaseEnabled) {
    const membership = (await supabase.from('chat_members').select('role').eq('chat_id', chatId).eq('user_id', userId).maybeSingle()).data;
    if (!membership) return res.status(403).json({ error: 'You are not a member of this group.' });
    await supabase.from('chat_members').delete().eq('chat_id', chatId).eq('user_id', userId);
    const remaining = (await supabase.from('chat_members').select('user_id').eq('chat_id', chatId)).data || [];
    if (remaining.length === 0 && membership.role === 'admin') {
      await supabase.from('messages').delete().eq('chat_id', chatId);
      await supabase.from('chats').delete().eq('id', chatId);
    }
    return res.json({ ok: true, left: true });
  }

  const chat = memoryStore.chats.find((c) => String(c.id) === chatId);
  if (!chat) return res.status(404).json({ error: 'Chat not found.' });
  const membership = memoryStore.chatMembers.find((m) => String(m.chatId) === chatId && String(m.userId) === userId);
  if (!membership) return res.status(403).json({ error: 'You are not a member of this group.' });
  memoryStore.chatMembers = memoryStore.chatMembers.filter((m) => !(String(m.chatId) === chatId && String(m.userId) === userId));
  const remaining = memoryStore.chatMembers.filter((m) => String(m.chatId) === chatId);
  if (remaining.length === 0 && membership.role === 'admin') {
    memoryStore.chats = memoryStore.chats.filter((c) => String(c.id) !== chatId);
    memoryStore.messages = memoryStore.messages.filter((m) => String(m.chatId) !== chatId);
  }
  persistStore();
  res.json({ ok: true, left: true, deleted: remaining.length === 0 && membership.role === 'admin' });
});

app.post('/api/chats/:chatId/members', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const chatId = String(req.params.chatId || '');
  const { memberIds = [] } = req.body || {};
  if (!userId || !chatId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  const addIds = [...new Set(memberIds.map(String).filter(Boolean))];
  if (addIds.length === 0) return res.status(400).json({ error: 'Need member ids.' });

  if (supabaseEnabled) {
    const membership = (await supabase.from('chat_members').select('role').eq('chat_id', chatId).eq('user_id', userId).maybeSingle()).data;
    if (!membership || membership.role !== 'admin') {
      return res.status(403).json({ error: 'Only group admin can add members.' });
    }
    const rows = addIds.filter((id) => id !== userId).map((memberId) => ({
      chat_id: chatId, user_id: memberId, role: 'member', joined_at: new Date().toISOString(),
    }));
    if (rows.length) {
      const { error } = await supabase.from('chat_members').insert(rows);
      if (error) throw error;
    }
  } else {
    const chat = memoryStore.chats.find((c) => String(c.id) === chatId);
    if (!chat) return res.status(404).json({ error: 'Chat not found.' });
    const membership = memoryStore.chatMembers.find((m) => String(m.chatId) === chatId && String(m.userId) === userId);
    if (!membership || membership.role !== 'admin') {
      return res.status(403).json({ error: 'Only group admin can add members.' });
    }
    addIds.forEach((memberId) => {
      if (memberId === userId) return;
      if (memoryStore.chatMembers.some((m) => String(m.chatId) === chatId && String(m.userId) === memberId)) return;
      memoryStore.chatMembers.push({ chat_id: chatId, user_id: memberId, role: 'member', joined_at: new Date().toISOString() });
    });
    persistStore();
  }
  res.json({ ok: true, added: addIds.length });
});

app.delete('/api/chats/:chatId/members/:userId', async (req, res) => {
  const actorId = req.cookies?.sessionUserId;
  const chatId = String(req.params.chatId || '');
  const targetId = String(req.params.userId || '');
  if (!actorId || !chatId || !targetId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  if (supabaseEnabled) {
    const actor = (await supabase.from('chat_members').select('role').eq('chat_id', chatId).eq('user_id', actorId).maybeSingle()).data;
    const target = (await supabase.from('chat_members').select('role').eq('chat_id', chatId).eq('user_id', targetId).maybeSingle()).data;
    if (!target) return res.status(404).json({ error: 'Member not found.' });
    if (String(targetId) === actorId) {
      if (actor && actor.role === 'admin') {
        const remaining = (await supabase.from('chat_members').select('user_id').eq('chat_id', chatId)).data || [];
        if (remaining.length === 1) {
          return res.status(400).json({ error: 'The last admin cannot leave the group.' });
        }
      }
      await supabase.from('chat_members').delete().eq('chat_id', chatId).eq('user_id', actorId);
    } else {
      if (!actor || actor.role !== 'admin') {
        return res.status(403).json({ error: 'Only group admin can remove members.' });
      }
      await supabase.from('chat_members').delete().eq('chat_id', chatId).eq('user_id', targetId);
    }
    return res.json({ ok: true });
  }

  const membership = memoryStore.chatMembers.find((m) => String(m.chatId) === chatId && String(m.userId) === actorId);
  const targetMembership = memoryStore.chatMembers.find((m) => String(m.chatId) === chatId && String(m.userId) === targetId);
  if (!targetMembership) return res.status(404).json({ error: 'Member not found.' });
  if (String(targetId) === actorId) {
    if (!membership || membership.role !== 'admin') {
      return res.status(403).json({ error: 'Only group admin can leave.' });
    }
    const remaining = memoryStore.chatMembers.filter((m) => String(m.chatId) === chatId);
    if (remaining.length === 1) {
      return res.status(400).json({ error: 'The last admin cannot leave the group.' });
    }
    memoryStore.chatMembers = memoryStore.chatMembers.filter((m) => !(String(m.chatId) === chatId && String(m.userId) === actorId));
  } else {
    if (!membership || membership.role !== 'admin') {
      return res.status(403).json({ error: 'Only group admin can remove members.' });
    }
    memoryStore.chatMembers = memoryStore.chatMembers.filter((m) => !(String(m.chatId) === chatId && String(m.userId) === targetId));
  }
  persistStore();
  res.json({ ok: true });
});

app.post('/api/chat/forward', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const { messageId, toId, chatId } = req.body || {};
  if (!userId || !messageId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  let source;
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('messages').select('*').eq('id', String(messageId)).maybeSingle();
    if (error) throw error;
    source = data ? toAppMessage(data) : null;
  } else if (firebaseEnabled && firebaseDb) {
    const doc = await firebaseDb.collection('messages').doc(String(messageId)).get();
    source = doc.exists ? toAppMessage({ id: doc.id, ...doc.data() }) : null;
  } else {
    source = memoryStore.messages.find((item) => item.id === String(messageId)) || null;
  }
  if (!source) return res.status(404).json({ error: 'Message not found.' });
  if (source.type === 'call') return res.status(400).json({ error: 'Cannot forward a call message.' });

  const targetChatId = String(chatId || '');
  const targetUserId = String(toId || '');
  let isGroup = false;
  if (targetChatId) isGroup = true;
  else if (!targetUserId) return res.status(400).json({ error: 'Need recipient.' });

  if (isGroup) {
    if (!getChatMemberIds(targetChatId).includes(userId)) {
      return res.status(403).json({ error: 'You are not a member of this group.' });
    }
  } else {
    if (isUserBlocked(userId, targetUserId) || isUserBlocked(targetUserId, userId)) {
      return res.status(403).json({ error: 'You cannot message this user.' });
    }
    if (!memoryStore.users.some((u) => u.id === targetUserId)) {
      ensureUser(targetUserId, targetUserId);
    }
  }

  const forwarded = {
    id: randomUUID(),
    fromId: userId,
    toId: isGroup ? targetChatId : targetUserId,
    chatId: isGroup ? targetChatId : null,
    text: source.text,
    imageData: source.imageData,
    audioData: source.audioData,
    durationMs: source.durationMs,
    replyTo: null,
    type: source.type,
    stickerId: source.stickerId,
    reactions: {},
    readReceipts: {},
    forwardedFrom: { id: source.id, fromId: source.fromId },
    readAt: null,
    createdAt: new Date().toISOString(),
  };

  if (supabaseEnabled) {
    const { error } = await supabase.from('messages').insert(toDatabaseMessage(forwarded));
    if (error) throw error;
  } else if (firebaseEnabled && firebaseDb) {
    await firebaseDb.collection('messages').doc(forwarded.id).set(forwarded);
    invalidateFirestoreCache();
  } else {
    memoryStore.messages.push(forwarded);
    persistStore();
  }
  publishChatMessage(forwarded);
  res.json({ ok: true, message: forwarded });
});

app.post('/api/chat/:messageId/pin', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const messageId = String(req.params.messageId || '');
  if (!userId || !messageId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  let message;
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('messages').select('*').eq('id', messageId).maybeSingle();
    if (error) throw error;
    message = data ? toAppMessage(data) : null;
  } else if (firebaseEnabled && firebaseDb) {
    const doc = await firebaseDb.collection('messages').doc(messageId).get();
    message = doc.exists ? toAppMessage({ id: doc.id, ...doc.data() }) : null;
  } else {
    message = memoryStore.messages.find((item) => item.id === messageId) || null;
  }
  if (!message) return res.status(404).json({ error: 'Message not found.' });

  const pinned = message.pinnedAt === null;
  const pinnedAt = pinned ? new Date().toISOString() : null;

  if (supabaseEnabled) {
    const { error } = await supabase.from('messages').update({ pinned_at: pinnedAt, pinned_by: pinned ? userId : null }).eq('id', messageId);
    if (error) throw error;
  } else if (firebaseEnabled && firebaseDb) {
    await firebaseDb.collection('messages').doc(messageId).update({ pinnedAt, pinnedBy: pinned ? userId : null });
    invalidateFirestoreCache();
  } else {
    const stored = memoryStore.messages.find((item) => item.id === messageId);
    if (stored) { stored.pinnedAt = pinnedAt; stored.pinnedBy = pinned ? userId : null; persistStore(); }
  }
  res.json({ ok: true, pinned, messageId });
});

app.get('/api/chat/:messageId/read-receipts', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const messageId = String(req.params.messageId || '');
  if (!userId || !messageId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  let message;
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('messages').select('from_id, to_id, chat_id, read_receipts').eq('id', messageId).maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Message not found.' });
    const receipts = data.read_receipts || {};
    return res.json({ ok: true, receipts: Object.entries(receipts).map(([userId, ts]) => ({ userId, at: ts })) });
  }
  if (firebaseEnabled && firebaseDb) {
    const doc = await firebaseDb.collection('messages').doc(messageId).get();
    if (!doc.exists) return res.status(404).json({ error: 'Message not found.' });
    const receipts = doc.data().readReceipts || {};
    return res.json({ ok: true, receipts: Object.entries(receipts).map(([userId, ts]) => ({ userId, at: ts })) });
  }
  const stored = memoryStore.messages.find((item) => item.id === messageId);
  if (!stored) return res.status(404).json({ error: 'Message not found.' });
  const receipts = stored.readReceipts || {};
  res.json({ ok: true, receipts: Object.entries(receipts).map(([userId, ts]) => ({ userId, at: ts })) });
});

app.post('/api/chat/:messageId/read', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const messageId = String(req.params.messageId || '');
  if (!userId || !messageId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  const now = new Date().toISOString();
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('messages').select('from_id, to_id, chat_id, read_receipts').eq('id', messageId).maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Message not found.' });
    const receipts = { ...(data.read_receipts || {}) };
    receipts[String(userId)] = now;
    await supabase.from('messages').update({ read_receipts: receipts }).eq('id', messageId);
    return res.json({ ok: true, receipts });
  }
  let stored;
  if (firebaseEnabled && firebaseDb) {
    const doc = await firebaseDb.collection('messages').doc(messageId).get();
    if (!doc.exists) return res.status(404).json({ error: 'Message not found.' });
    stored = { id: doc.id, ...doc.data() };
    const receipts = { ...(stored.readReceipts || {}) };
    receipts[String(userId)] = now;
    await firebaseDb.collection('messages').doc(messageId).update({ readReceipts: receipts });
    invalidateFirestoreCache();
    return res.json({ ok: true, receipts });
  }
  stored = memoryStore.messages.find((item) => item.id === messageId);
  if (!stored) return res.status(404).json({ error: 'Message not found.' });
  if (!stored.readReceipts) stored.readReceipts = {};
  stored.readReceipts[String(userId)] = now;
  persistStore();
  res.json({ ok: true, receipts: stored.readReceipts });
});

app.post('/api/users/:userId/block', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const targetId = String(req.params.userId || '');
  if (!userId || !targetId || userId === targetId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  if (supabaseEnabled) {
    const { error } = await supabase.from('user_blocks').upsert({
      blocker_id: userId, blocked_id: targetId, created_at: new Date().toISOString(),
    }, { onConflict: 'blocker_id,blocked_id' });
    if (error) throw error;
  } else if (firebaseEnabled && firebaseDb) {
    await firebaseDb.collection('userBlocks').doc(`${userId}::${targetId}`).set({
      blockerId: userId, blockedId: targetId, createdAt: new Date().toISOString(),
    });
    invalidateFirestoreCache();
  } else {
    if (!memoryStore.userBlocks.some((b) => String(b.blockerId) === userId && String(b.blockedId) === targetId)) {
      memoryStore.userBlocks.push({ blockerId: userId, blockedId: targetId, createdAt: new Date().toISOString() });
      persistStore();
    }
  }
  res.json({ ok: true, blocked: true });
});

app.delete('/api/users/:userId/block', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const targetId = String(req.params.userId || '');
  if (!userId || !targetId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  if (supabaseEnabled) {
    await supabase.from('user_blocks').delete().eq('blocker_id', userId).eq('blocked_id', targetId);
  } else if (firebaseEnabled && firebaseDb) {
    await firebaseDb.collection('userBlocks').doc(`${userId}::${targetId}`).delete();
    invalidateFirestoreCache();
  } else {
    memoryStore.userBlocks = memoryStore.userBlocks.filter(
      (b) => !(String(b.blockerId) === userId && String(b.blockedId) === targetId)
    );
    persistStore();
  }
  res.json({ ok: true, blocked: false });
});

app.get('/api/users/blocked', asyncHandler(async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  if (!userId) return res.status(401).json({ error: 'Sign in required.' });
  await storeReady;

  let blocks = [];
  if (supabaseEnabled) {
    const { data, error } = await supabase.from('user_blocks').select('blocked_id').eq('blocker_id', userId);
    if (error) throw error;
    blocks = (data || []).map((b) => String(b.blocked_id));
  } else if (firebaseEnabled && firebaseDb) {
    const snap = await firebaseDb.collection('userBlocks').where('blockerId', '==', userId).get();
    blocks = snap.docs.map((doc) => String(doc.data().blockedId));
  } else {
    blocks = memoryStore.userBlocks.filter((b) => String(b.blockerId) === userId).map((b) => String(b.blockedId));
  }

  const users = [];
  if (blocks.length) {
    if (supabaseEnabled) {
      const { data, error } = await supabase.from('users').select('id, label, avatar_data, about').in('id', blocks);
      if (error) throw error;
      (data || []).forEach((u) => users.push(sanitizeUser(u)));
    } else {
      const allUsers = firebaseEnabled && firebaseDb ? await getFirestoreUsers() : memoryStore.users;
      blocks.forEach((id) => {
        const u = allUsers.find((user) => String(user.id) === id);
        if (u) users.push(sanitizeUser(u));
      });
    }
  }
  res.json({ users });
}));

app.get('/api/search', asyncHandler(async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const q = String(req.query.q || '').trim().toLowerCase();
  if (!userId) return res.status(401).json({ error: 'Sign in required.' });
  if (!q) return res.json({ users: [], messages: [] });
  await storeReady;

  let allUsers, allMessages;
  if (supabaseEnabled) {
    const { data: users, error: usersError } = await supabase.from('users').select('id, label, avatar_data, about');
    if (usersError) throw usersError;
    allUsers = (users || []).filter((u) => String(u.id) !== userId);
    const { data: messages, error: messagesError } = await supabase.from('messages')
      .select('id, from_id, to_id, chat_id, text, type, sticker_id, created_at')
      .or(`from_id.eq.${userId},to_id.eq.${userId}`);
    if (messagesError) throw messagesError;
    allMessages = (messages || []).map(toAppMessage);
  } else {
    allUsers = (firebaseEnabled && firebaseDb ? await getFirestoreUsers() : memoryStore.users)
      .filter((u) => String(u.id) !== userId);
    allMessages = (firebaseEnabled && firebaseDb ? await getFirestoreMessages() : memoryStore.messages)
      .map((m) => (m.chatId ? toAppMessage(m) : m));
  }

  const blockedByMe = getBlockedByUser(userId);
  const foundUsers = allUsers.filter((u) =>
    !blockedByMe.has(String(u.id)) &&
    (String(u.label || '').toLowerCase().includes(q) || String(u.id).toLowerCase().includes(q))
  ).map(sanitizeUser);

  const foundMessages = allMessages.filter((message) => {
    if (blockedByMe.has(String(message.fromId))) return false;
    const haystack = (message.text || '').toLowerCase();
    return haystack.includes(q);
  }).slice(0, 50);

  res.json({ users: foundUsers, messages: foundMessages });
}));

app.post('/api/chats/:chatId/pin', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const chatId = String(req.params.chatId || '');
  if (!userId || !chatId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  if (supabaseEnabled) {
    const membership = (await supabase.from('chat_members').select('role').eq('chat_id', chatId).eq('user_id', userId).maybeSingle()).data;
    if (!membership) return res.status(403).json({ error: 'You are not a member of this group.' });
    const chat = (await supabase.from('chats').select('pinned_at').eq('id', chatId).maybeSingle()).data;
    const pinned = !chat.pinned_at;
    await supabase.from('chats').update({ pinned_at: pinned ? new Date().toISOString() : null }).eq('id', chatId);
    return res.json({ ok: true, pinned });
  }

  const chat = memoryStore.chats.find((c) => String(c.id) === chatId);
  if (!chat) return res.status(404).json({ error: 'Chat not found.' });
  const membership = memoryStore.chatMembers.find((m) => String(m.chatId) === chatId && String(m.userId) === userId);
  if (!membership) return res.status(403).json({ error: 'You are not a member of this group.' });
  const pinned = chat.pinnedAt === null;
  chat.pinnedAt = pinned ? new Date().toISOString() : null;
  persistStore();
  res.json({ ok: true, pinned });
});

app.get('/api/export/:chatId', async (req, res) => {
  const userId = req.cookies?.sessionUserId;
  const chatId = String(req.params.chatId || '');
  if (!userId || !chatId) return res.status(400).json({ error: 'Invalid request.' });
  await storeReady;

  let messages = [];
  if (chatId.startsWith('direct::')) {
    const partnerId = chatId.slice('direct::'.length);
    if (req.cookies?.sessionUserId !== userId) return res.status(403).json({ error: 'Access denied.' });
    if (supabaseEnabled) {
      const [{ data: sent }, { data: received }] = await Promise.all([
        supabase.from('messages').select('*').eq('from_id', userId).eq('to_id', partnerId).is('chat_id', null),
        supabase.from('messages').select('*').eq('from_id', partnerId).eq('to_id', userId).is('chat_id', null),
      ]);
      messages = [...(sent || []), ...(received || [])].map(toAppMessage);
    } else {
      messages = memoryStore.messages.filter((m) =>
        !m.chatId &&
        ((m.fromId === userId && m.toId === partnerId) || (m.fromId === partnerId && m.toId === userId))
      );
    }
  } else {
    if (supabaseEnabled) {
      const { data, error } = await supabase.from('messages').select('*').eq('chat_id', chatId);
      if (error) throw error;
      messages = (data || []).map(toAppMessage);
    } else {
      messages = memoryStore.messages.filter((m) => String(m.chatId) === chatId);
    }
  }
  messages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  const lines = messages.map((m) => {
    const time = formatTime(m.createdAt);
    const from = m.fromId === userId ? 'Вы' : (m.fromId || '');
    const body = m.type === 'image' ? '[Фото]' : m.type === 'sticker' ? '[Стикер]' : m.type === 'audio' ? '[Голосовое]' : m.type === 'call' ? '[Звонок]' : m.text;
    return `${time} ${from}: ${body}`;
  });

  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.set('Content-Disposition', `attachment; filename="export-${chatId}.txt"`);
  res.send(lines.join('\n'));
});

function formatTime(isoStr) {
  if (!isoStr) return '';
  try {
    return new Date(isoStr).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  } catch (e) { return ''; }
}

app.use((error, req, res, next) => {
  console.error(`API request failed (${req.method} ${req.path}):`, error.message);
  if (res.headersSent) return next(error);
  res.status(500).json({ error: 'The request could not be completed. Please try again later.' });
});

app.listen(PORT, () => {
  console.log(`Messenger running on http://localhost:${PORT}`);
  if (!ADMIN_PASSWORD || ADMIN_SESSION_SECRET.length < 32) {
    console.warn('Admin panel is disabled until ADMIN_PASSWORD and an ADMIN_SESSION_SECRET of at least 32 characters are configured.');
  }
});
