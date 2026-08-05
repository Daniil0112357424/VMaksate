let currentUser = null;
let selectedPartner = null;
let currentUserList = [];
const unreadUsers = new Set();
const lastSeenMessageIds = new Map();

const authPage = document.getElementById('authPage');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const authMessage = document.getElementById('authMessage');
const registerPanel = document.getElementById('registerPanel');
const loginPanel = document.getElementById('loginPanel');
const goToLoginBtn = document.getElementById('goToLoginBtn');
const goToRegisterBtn = document.getElementById('goToRegisterBtn');
const authToggleButtons = Array.from(document.querySelectorAll('.auth-toggle-btn'));

const adminPage = document.getElementById('adminPage');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminLoginSection = document.getElementById('adminLoginSection');
const adminDashboard = document.getElementById('adminDashboard');
const adminMessage = document.getElementById('adminMessage');
const adminUserList = document.getElementById('adminUserList');
const deleteAllUsersBtn = document.getElementById('deleteAllUsersBtn');
const logoutAdminBtn = document.getElementById('logoutAdminBtn');

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const userList = document.getElementById('userList');
const messagesBox = document.getElementById('messages');
const chatPartner = document.getElementById('chatPartner');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const logoutBtn = document.getElementById('logoutBtn');

async function showAuthMessage(text, isError = false) {
  if (!authMessage) return;
  authMessage.textContent = text;
  authMessage.style.color = isError ? '#fca5a5' : '#93c5fd';
}

async function createUserFromAuth(id, label, password) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, label, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Не удалось зарегистрировать аккаунт.');
  }

  return data.user;
}

async function loginUser(id, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Не удалось войти.');
  }

  return data.user;
}

async function ensureAuthSession() {
  if (!authPage) return;

  const response = await fetch('/api/auth/me');
  const data = await response.json();
  if (data.user) {
    window.location.href = '/chat.html';
  }
}

async function handleAuthSubmit(event, mode) {
  event.preventDefault();
  if (!authPage) return;

  const form = mode === 'register' ? registerForm : loginForm;
  const id = form.querySelector('input[name="id"]').value.trim();
  const label = form.querySelector('input[name="label"]')?.value.trim() || '';
  const password = form.querySelector('input[name="password"]').value.trim();

  try {
    if (mode === 'register') {
      await createUserFromAuth(id, label, password);
      showAuthMessage('Аккаунт создан. Сейчас вы войдёте в чат.');
      currentUser = { id, label };
      window.location.href = '/chat.html';
    } else {
      currentUser = await loginUser(id, password);
      showAuthMessage('Добро пожаловать!');
      window.location.href = '/chat.html';
    }
  } catch (error) {
    showAuthMessage(error.message, true);
  }
}

function setAuthMode(mode) {
  if (!registerPanel || !loginPanel) return;

  const showRegister = mode === 'register';
  registerPanel.classList.toggle('active', showRegister);
  loginPanel.classList.toggle('active', !showRegister);

  authToggleButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle('active', isActive);
  });
}

function renderUsers(users) {
  if (!userList) return;

  userList.innerHTML = '';
  currentUserList = users;

  users.forEach((user) => {
    const button = document.createElement('div');
    button.className = 'user-item';

    const text = document.createElement('span');
    text.textContent = `${user.label} (${user.id})`;

    const meta = document.createElement('div');
    meta.className = 'user-item-meta';

    const dot = document.createElement('span');
    dot.className = 'notification-dot';
    if (unreadUsers.has(user.id)) {
      dot.classList.add('visible');
    }

    meta.appendChild(dot);
    button.appendChild(text);
    button.appendChild(meta);

    button.addEventListener('click', () => {
      selectedPartner = user;
      chatPartner.textContent = `${user.label} (${user.id})`;
      document.querySelectorAll('.user-item').forEach((el) => el.classList.remove('active'));
      button.classList.add('active');
      unreadUsers.delete(user.id);
      dot.classList.remove('visible');
      loadMessages();
      startChatRefresh();
    });
    userList.appendChild(button);
  });
}

async function refreshUnreadIndicators() {
  if (!currentUser || currentUserList.length === 0) return;

  for (const user of currentUserList) {
    if (user.id === currentUser.id) continue;

    const response = await fetch(`/api/chat?me=${encodeURIComponent(currentUser.id)}&other=${encodeURIComponent(user.id)}`);
    const data = await response.json();
    const messages = data.messages || [];

    if (!messages.length) {
      lastSeenMessageIds.delete(user.id);
      continue;
    }

    const lastMessage = messages[messages.length - 1];
    const previousId = lastSeenMessageIds.get(user.id);
    const isIncoming = lastMessage.fromId === user.id && lastMessage.toId === currentUser.id;

    if (isIncoming && previousId !== lastMessage.id) {
      unreadUsers.add(user.id);
      lastSeenMessageIds.set(user.id, lastMessage.id);
    }

    if (selectedPartner && selectedPartner.id === user.id) {
      unreadUsers.delete(user.id);
      lastSeenMessageIds.set(user.id, lastMessage.id);
    }
  }
}

async function searchUsers() {
  if (!searchInput) return;
  const search = searchInput.value.trim();
  const me = currentUser?.id || '';
  const response = await fetch(`/api/users?search=${encodeURIComponent(search)}&me=${encodeURIComponent(me)}`);
  const users = await response.json();
  renderUsers(users);
  await refreshUnreadIndicators();
}

setInterval(() => {
  if (searchInput) {
    searchUsers();
  }
}, 2000);

async function loadMessages() {
  if (!currentUser || !selectedPartner || !messagesBox) return;

  const response = await fetch(`/api/chat?me=${encodeURIComponent(currentUser.id)}&other=${encodeURIComponent(selectedPartner.id)}`);
  const data = await response.json();
  messagesBox.innerHTML = '';

  data.messages.forEach((item) => {
    const div = document.createElement('div');
    div.className = `message ${item.fromId === currentUser.id ? 'me' : ''}`;
    div.textContent = `${item.fromId}: ${item.text}`;
    messagesBox.appendChild(div);
  });

  const lastMessage = data.messages[data.messages.length - 1];
  if (lastMessage) {
    lastSeenMessageIds.set(selectedPartner.id, lastMessage.id);
    unreadUsers.delete(selectedPartner.id);
  }

  messagesBox.scrollTop = messagesBox.scrollHeight;
}

let chatRefreshTimer = null;

function startChatRefresh() {
  if (chatRefreshTimer) return;

  chatRefreshTimer = setInterval(() => {
    if (currentUser && selectedPartner) {
      loadMessages();
    }
  }, 2000);
}

async function sendMessage() {
  if (!currentUser || !selectedPartner) {
    alert('Сначала войдите в аккаунт и выберите собеседника.');
    return;
  }

  const text = messageInput.value.trim();
  if (!text) return;

  await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fromId: currentUser.id,
      toId: selectedPartner.id,
      text,
    }),
  });

  messageInput.value = '';
  loadMessages();
}

async function loadCurrentUser() {
  const response = await fetch('/api/auth/me');
  const data = await response.json();
  return data.user;
}

async function showAdminMessage(text, isError = false) {
  if (!adminMessage) return;
  adminMessage.textContent = text;
  adminMessage.style.color = isError ? '#fca5a5' : '#93c5fd';
}

async function loadAdminUsers() {
  if (!adminUserList) return;

  const response = await fetch('/api/admin/users');
  const data = await response.json();

  if (!response.ok) {
    showAdminMessage(data.error || 'Нет доступа к админке.', true);
    return;
  }

  adminUserList.innerHTML = '';
  data.users.forEach((user) => {
    const card = document.createElement('div');
    card.className = 'admin-user-card';
    card.innerHTML = `<div><strong>${user.label}</strong><br /><span>${user.id}</span></div><button type="button" class="admin-delete-btn">Удалить</button>`;

    card.querySelector('.admin-delete-btn').addEventListener('click', async () => {
      const deleteResponse = await fetch(`/api/admin/users/${encodeURIComponent(user.id)}`, { method: 'DELETE' });
      const result = await deleteResponse.json();
      if (!deleteResponse.ok) {
        showAdminMessage(result.error || 'Не удалось удалить пользователя.', true);
        return;
      }
      showAdminMessage(`Аккаунт ${user.id} удалён.`);
      await loadAdminUsers();
    });

    adminUserList.appendChild(card);
  });
}

async function checkAdminAccess() {
  if (!adminPage) return;

  const response = await fetch('/api/admin/me');
  const data = await response.json();
  if (!data.admin) {
    adminLoginSection?.classList.add('active');
    adminDashboard?.classList.remove('active');
    return;
  }

  adminLoginSection?.classList.remove('active');
  adminDashboard?.classList.add('active');
  await loadAdminUsers();
}

async function bootChatPage() {
  if (!searchInput || !userList || !messagesBox) return;

  currentUser = await loadCurrentUser();
  if (!currentUser) {
    window.location.href = '/';
    return;
  }

  chatPartner.textContent = 'Выберите собеседника';
  searchUsers();
  startChatRefresh();
}

if (authPage) {
  setAuthMode('register');
  ensureAuthSession();
  registerForm.addEventListener('submit', (event) => handleAuthSubmit(event, 'register'));
  loginForm.addEventListener('submit', (event) => handleAuthSubmit(event, 'login'));
  goToLoginBtn?.addEventListener('click', () => setAuthMode('login'));
  goToRegisterBtn?.addEventListener('click', () => setAuthMode('register'));
  authToggleButtons.forEach((button) => {
    button.addEventListener('click', () => setAuthMode(button.dataset.mode));
  });
}

if (adminPage) {
  adminLoginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const password = adminLoginForm.querySelector('input[name="password"]').value.trim();
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();

    if (!response.ok) {
      showAdminMessage(data.error || 'Неверный пароль.', true);
      return;
    }

    await checkAdminAccess();
  });

  deleteAllUsersBtn?.addEventListener('click', async () => {
    const response = await fetch('/api/admin/users', { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) {
      showAdminMessage(data.error || 'Не удалось удалить всех пользователей.', true);
      return;
    }
    showAdminMessage('Все пользователи удалены.');
    await loadAdminUsers();
  });

  logoutAdminBtn?.addEventListener('click', async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    await checkAdminAccess();
  });

  checkAdminAccess();
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  });
}

if (searchInput && userList && messagesBox) {
  searchInput.addEventListener('input', searchUsers);
  searchBtn?.addEventListener('click', searchUsers);
  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
  bootChatPage();
}
