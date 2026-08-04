let currentUser = null;
let selectedPartner = null;

const authPage = document.getElementById('authPage');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const authMessage = document.getElementById('authMessage');

const searchInput = document.getElementById('searchInput');
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

function renderUsers(users) {
  if (!userList) return;

  userList.innerHTML = '';
  users.forEach((user) => {
    const button = document.createElement('div');
    button.className = 'user-item';
    button.textContent = `${user.label} (${user.id})`;
    button.addEventListener('click', () => {
      selectedPartner = user;
      chatPartner.textContent = `${user.label} (${user.id})`;
      document.querySelectorAll('.user-item').forEach((el) => el.classList.remove('active'));
      button.classList.add('active');
      loadMessages();
      startChatRefresh();
    });
    userList.appendChild(button);
  });
}

async function searchUsers() {
  if (!searchInput) return;
  const search = searchInput.value.trim();
  const response = await fetch(`/api/users?search=${encodeURIComponent(search)}`);
  const users = await response.json();
  renderUsers(users);
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
  ensureAuthSession();
  registerForm.addEventListener('submit', (event) => handleAuthSubmit(event, 'register'));
  loginForm.addEventListener('submit', (event) => handleAuthSubmit(event, 'login'));
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  });
}

if (searchInput && userList && messagesBox) {
  searchInput.addEventListener('input', searchUsers);
  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
  bootChatPage();
}
