const translations = {
  ru: {
    appTitle: 'ВМаксате',
    authSubtitle: 'Регистрация и вход в ваш аккаунт',
    tabRegister: 'Регистрация',
    tabLogin: 'Войти',
    labelYourUserId: 'Ваш user id',
    phRegisterId: 'Например: user-42',
    labelYourName: 'Ваше имя',
    phRegisterLabel: 'Например: Иван',
    labelPassword: 'Пароль',
    phRegisterPassword: 'Придумайте пароль',
    btnRegister: 'Зарегистрироваться',
    labelUserId: 'User id',
    phLoginId: 'Введите ваш id',
    phLoginPassword: 'Введите пароль',
    btnLogin: 'Войти',
    msgAccountCreated: 'Аккаунт создан. Сейчас вы войдёте в чат.',
    msgWelcome: 'Добро пожаловать!',
    errRegister: 'Не удалось зарегистрировать аккаунт.',
    errLogin: 'Не удалось войти.',

    // Chat page
    yourIdLabel: 'Ваш ID:',
    logoutBtn: 'Выйти',
    searchLabel: 'Поиск собеседника',
    phSearch: 'Ищите по user id или имени',
    searchBtn: 'Найти',
    dialogCaption: 'Диалог',
    selectPartnerPlaceholder: 'Выберите собеседника',
    phMessage: 'Напишите сообщение...',
    sendBtn: 'Отправить',
    alertSelectPartner: 'Сначала войдите в аккаунт и выберите собеседника.',

    // Admin page
    adminTitle: 'Admin Panel',
    adminSubtitle: 'Доступ только по паролю',
    phAdminPassword: 'Введите пароль',
    btnAdminLogin: 'Войти в админку',
    btnDeleteAll: 'Удалить всех',
    btnDeleteUser: 'Удалить',
    msgUserDeleted: 'Аккаунт {id} удалён.',
    msgAllDeleted: 'Все пользователи удалены.',
    errNoAdminAccess: 'Нет доступа к админке.',
    errDeleteUser: 'Не удалось удалить пользователя.',
    errDeleteAll: 'Не удалось удалить всех пользователей.',
    errInvalidPassword: 'Неверный пароль.'
  },
  en: {
    appTitle: 'VMaksate',
    authSubtitle: 'Registration and sign in to your account',
    tabRegister: 'Register',
    tabLogin: 'Sign In',
    labelYourUserId: 'Your User ID',
    phRegisterId: 'Example: user-42',
    labelYourName: 'Your Name',
    phRegisterLabel: 'Example: John',
    labelPassword: 'Password',
    phRegisterPassword: 'Create a password',
    btnRegister: 'Sign Up',
    labelUserId: 'User ID',
    phLoginId: 'Enter your ID',
    phLoginPassword: 'Enter password',
    btnLogin: 'Sign In',
    msgAccountCreated: 'Account created. Entering chat...',
    msgWelcome: 'Welcome!',
    errRegister: 'Failed to register account.',
    errLogin: 'Failed to sign in.',

    // Chat page
    yourIdLabel: 'Your ID:',
    logoutBtn: 'Log Out',
    searchLabel: 'Search contacts',
    phSearch: 'Search by User ID or name',
    searchBtn: 'Search',
    dialogCaption: 'Conversation',
    selectPartnerPlaceholder: 'Select a conversation',
    phMessage: 'Type a message...',
    sendBtn: 'Send',
    alertSelectPartner: 'Please sign in and select a user first.',

    // Admin page
    adminTitle: 'Admin Panel',
    adminSubtitle: 'Password restricted access',
    phAdminPassword: 'Enter password',
    btnAdminLogin: 'Log in as Admin',
    btnDeleteAll: 'Delete All Users',
    btnDeleteUser: 'Delete',
    msgUserDeleted: 'Account {id} deleted.',
    msgAllDeleted: 'All users have been deleted.',
    errNoAdminAccess: 'No admin access.',
    errDeleteUser: 'Failed to delete user.',
    errDeleteAll: 'Failed to delete all users.',
    errInvalidPassword: 'Invalid password.'
  },
  es: {
    appTitle: 'VMaksate',
    authSubtitle: 'Registro e inicio de sesión en su cuenta',
    tabRegister: 'Registro',
    tabLogin: 'Iniciar sesión',
    labelYourUserId: 'Su ID de usuario',
    phRegisterId: 'Ejemplo: user-42',
    labelYourName: 'Su nombre',
    phRegisterLabel: 'Ejemplo: Juan',
    labelPassword: 'Contraseña',
    phRegisterPassword: 'Cree una contraseña',
    btnRegister: 'Registrarse',
    labelUserId: 'ID de usuario',
    phLoginId: 'Ingrese su ID',
    phLoginPassword: 'Ingrese contraseña',
    btnLogin: 'Iniciar sesión',
    msgAccountCreated: 'Cuenta creada. Entrando al chat...',
    msgWelcome: '¡Bienvenido!',
    errRegister: 'No se pudo registrar la cuenta.',
    errLogin: 'No se pudo iniciar sesión.',

    // Chat page
    yourIdLabel: 'Su ID:',
    logoutBtn: 'Cerrar sesión',
    searchLabel: 'Buscar interlocutor',
    phSearch: 'Buscar por ID de usuario o nombre',
    searchBtn: 'Buscar',
    dialogCaption: 'Diálogo',
    selectPartnerPlaceholder: 'Seleccione un interlocutor',
    phMessage: 'Escriba un mensaje...',
    sendBtn: 'Enviar',
    alertSelectPartner: 'Primero inicie sesión y seleccione un interlocutor.',

    // Admin page
    adminTitle: 'Panel de Admin',
    adminSubtitle: 'Acceso restringido por contraseña',
    phAdminPassword: 'Ingrese contraseña',
    btnAdminLogin: 'Entrar como Admin',
    btnDeleteAll: 'Eliminar a todos',
    btnDeleteUser: 'Eliminar',
    msgUserDeleted: 'Cuenta {id} eliminada.',
    msgAllDeleted: 'Todos los usuarios han sido eliminados.',
    errNoAdminAccess: 'Sin acceso de administrador.',
    errDeleteUser: 'No se pudo eliminar el usuario.',
    errDeleteAll: 'No se pudo eliminar a todos los usuarios.',
    errInvalidPassword: 'Contraseña incorrecta.'
  }
};

let currentLang = localStorage.getItem('app_lang') || 'ru';
if (!['ru', 'en', 'es'].includes(currentLang)) {
  currentLang = 'ru';
}

function t(key, params = {}) {
  const dict = translations[currentLang] || translations.ru;
  let str = dict[key] || translations.ru[key] || key;
  for (const [k, v] of Object.entries(params)) {
    str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return str;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
const currentUserBadge = document.getElementById('currentUserBadge');

function renderCurrentUserBadge() {
  if (!currentUserBadge) return;
  if (!currentUser) {
    currentUserBadge.innerHTML = '';
    return;
  }
  const labelText = t('yourIdLabel');
  currentUserBadge.innerHTML = `
    <div class="user-badge-box">
      <div class="user-badge-label">${escapeHtml(labelText)}</div>
      <div class="user-badge-id">${escapeHtml(currentUser.id)}</div>
      <div class="user-badge-sub">${escapeHtml(currentUser.label)}</div>
    </div>
  `;
}

function applyLanguage(lang) {
  if (!['ru', 'en', 'es'].includes(lang)) lang = 'ru';
  currentLang = lang;
  localStorage.setItem('app_lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    const key = el.getAttribute('data-i18n-ph');
    if (key) {
      el.placeholder = t(key);
    }
  });

  document.querySelectorAll('.langSelect').forEach((select) => {
    select.value = lang;
  });

  if (currentUser) {
    renderCurrentUserBadge();
  }

  if (chatPartner && !selectedPartner) {
    chatPartner.textContent = t('selectPartnerPlaceholder');
  }

  if (adminUserList && adminPage && adminDashboard?.classList.contains('active')) {
    loadAdminUsers();
  }
}

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
    throw new Error(data.error || t('errRegister'));
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
    throw new Error(data.error || t('errLogin'));
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
      showAuthMessage(t('msgAccountCreated'));
      currentUser = { id, label };
      window.location.href = '/chat.html';
    } else {
      currentUser = await loginUser(id, password);
      showAuthMessage(t('msgWelcome'));
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
    alert(t('alertSelectPartner'));
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
    showAdminMessage(data.error || t('errNoAdminAccess'), true);
    return;
  }

  adminUserList.innerHTML = '';
  data.users.forEach((user) => {
    const card = document.createElement('div');
    card.className = 'admin-user-card';
    const deleteBtnText = t('btnDeleteUser');
    card.innerHTML = `<div><strong>${escapeHtml(user.label)}</strong><br /><span>${escapeHtml(user.id)}</span></div><button type="button" class="admin-delete-btn">${escapeHtml(deleteBtnText)}</button>`;

    card.querySelector('.admin-delete-btn').addEventListener('click', async () => {
      const deleteResponse = await fetch(`/api/admin/users/${encodeURIComponent(user.id)}`, { method: 'DELETE' });
      const result = await deleteResponse.json();
      if (!deleteResponse.ok) {
        showAdminMessage(result.error || t('errDeleteUser'), true);
        return;
      }
      showAdminMessage(t('msgUserDeleted', { id: user.id }));
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

  renderCurrentUserBadge();
  chatPartner.textContent = t('selectPartnerPlaceholder');
  searchUsers();
  startChatRefresh();
}

document.querySelectorAll('.langSelect').forEach((select) => {
  select.value = currentLang;
  select.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
  });
});
applyLanguage(currentLang);

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
      showAdminMessage(data.error || t('errInvalidPassword'), true);
      return;
    }

    await checkAdminAccess();
  });

  deleteAllUsersBtn?.addEventListener('click', async () => {
    const response = await fetch('/api/admin/users', { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) {
      showAdminMessage(data.error || t('errDeleteAll'), true);
      return;
    }
    showAdminMessage(t('msgAllDeleted'));
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
