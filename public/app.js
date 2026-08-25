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
    audioCallTitle: 'Аудиозвонок', videoCallTitle: 'Видеозвонок', acceptCallTitle: 'Ответить', declineCallTitle: 'Отклонить', endCallTitle: 'Завершить звонок',
    callIncoming: 'Входящий звонок...', callCalling: 'Звоним...', callConnecting: 'Подключение...', callInProgress: 'В звонке', callDeclined: 'Звонок отклонён', callBusy: 'Пользователь уже разговаривает',
    callMediaError: 'Не удалось получить доступ к микрофону или камере.', callUnsupported: 'Звонки не поддерживаются этим браузером.',
    profileBtn: 'Профиль', profileTitle: 'Профиль', profileNameLabel: 'Имя', profileUserIdLabel: 'User ID', saveProfileBtn: 'Сохранить', attachPhotoTitle: 'Прикрепить фото',
    callAudio: 'Аудиозвонок', callVideo: 'Видеозвонок', callMissed: 'Пропущенный {mode}', callCompleted: '{mode}', callDeclinedLog: 'Отклонённый {mode}',

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
    audioCallTitle: 'Audio call', videoCallTitle: 'Video call', acceptCallTitle: 'Answer', declineCallTitle: 'Decline', endCallTitle: 'End call',
    callIncoming: 'Incoming call...', callCalling: 'Calling...', callConnecting: 'Connecting...', callInProgress: 'In call', callDeclined: 'Call declined', callBusy: 'User is already in a call',
    callMediaError: 'Unable to access the microphone or camera.', callUnsupported: 'Calls are not supported by this browser.',
    profileBtn: 'Profile', profileTitle: 'Profile', profileNameLabel: 'Name', profileUserIdLabel: 'User ID', saveProfileBtn: 'Save', attachPhotoTitle: 'Attach photo',
    callAudio: 'Audio call', callVideo: 'Video call', callMissed: 'Missed {mode}', callCompleted: '{mode}', callDeclinedLog: 'Declined {mode}',

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
    audioCallTitle: 'Llamada de audio', videoCallTitle: 'Videollamada', acceptCallTitle: 'Responder', declineCallTitle: 'Rechazar', endCallTitle: 'Finalizar llamada',
    callIncoming: 'Llamada entrante...', callCalling: 'Llamando...', callConnecting: 'Conectando...', callInProgress: 'En llamada', callDeclined: 'Llamada rechazada', callBusy: 'El usuario ya está en una llamada',
    callMediaError: 'No se pudo acceder al micrófono o la cámara.', callUnsupported: 'Este navegador no admite llamadas.',
    profileBtn: 'Perfil', profileTitle: 'Perfil', profileNameLabel: 'Nombre', profileUserIdLabel: 'ID de usuario', saveProfileBtn: 'Guardar', attachPhotoTitle: 'Adjuntar foto',
    callAudio: 'Llamada de audio', callVideo: 'Videollamada', callMissed: 'Llamada perdida: {mode}', callCompleted: '{mode}', callDeclinedLog: '{mode} rechazada',

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

function getAvatarBg(name) {
  const colors = [
    'linear-gradient(135deg, #2563eb, #3b82f6)',
    'linear-gradient(135deg, #7c3aed, #8b5cf6)',
    'linear-gradient(135deg, #059669, #10b981)',
    'linear-gradient(135deg, #d97706, #f59e0b)',
    'linear-gradient(135deg, #dc2626, #ef4444)',
    'linear-gradient(135deg, #db2777, #ec4899)',
  ];
  let hash = 0;
  const str = String(name || '');
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function formatTime(isoStr) {
  if (!isoStr) return '';
  try {
    const d = new Date(isoStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '';
  }
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
const partnerAvatar = document.getElementById('partnerAvatar');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const logoutBtn = document.getElementById('logoutBtn');
const currentUserBadge = document.getElementById('currentUserBadge');
const mobileBackBtn = document.getElementById('mobileBackBtn');
const audioCallBtn = document.getElementById('audioCallBtn');
const videoCallBtn = document.getElementById('videoCallBtn');
const callOverlay = document.getElementById('callOverlay');
const remoteVideo = document.getElementById('remoteVideo');
const localVideo = document.getElementById('localVideo');
const callAvatar = document.getElementById('callAvatar');
const callPartnerName = document.getElementById('callPartnerName');
const callStatus = document.getElementById('callStatus');
const acceptCallBtn = document.getElementById('acceptCallBtn');
const declineCallBtn = document.getElementById('declineCallBtn');
const endCallBtn = document.getElementById('endCallBtn');
const imageInput = document.getElementById('imageInput');
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profileModal');
const profileForm = document.getElementById('profileForm');
const profileNameInput = document.getElementById('profileNameInput');
const profileUserId = document.getElementById('profileUserId');
const profileImageInput = document.getElementById('profileImageInput');
const profileAvatarPreview = document.getElementById('profileAvatarPreview');
const closeProfileBtn = document.getElementById('closeProfileBtn');
let pendingMessageImage = null;
let pendingAvatarImage = null;

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

function updateChatHeader(user) {
  if (!chatPartner) return;
  if (!user) {
    chatPartner.textContent = t('selectPartnerPlaceholder');
    if (partnerAvatar) partnerAvatar.classList.add('hidden');
    if (audioCallBtn) audioCallBtn.disabled = true;
    if (videoCallBtn) videoCallBtn.disabled = true;
    return;
  }
  chatPartner.textContent = user.label;
  if (partnerAvatar) {
    partnerAvatar.classList.remove('hidden');
    partnerAvatar.style.background = user.avatarData ? `url("${user.avatarData}") center / cover` : getAvatarBg(user.label || user.id);
    partnerAvatar.classList.toggle('avatar-photo', Boolean(user.avatarData));
    partnerAvatar.textContent = (user.label || user.id).charAt(0).toUpperCase();
  }
  const callsUnavailable = !window.RTCPeerConnection || !navigator.mediaDevices?.getUserMedia;
  if (audioCallBtn) audioCallBtn.disabled = callsUnavailable;
  if (videoCallBtn) videoCallBtn.disabled = callsUnavailable;
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

  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      el.title = t(key);
      el.setAttribute('aria-label', t(key));
    }
  });

  document.querySelectorAll('.langSelect').forEach((select) => {
    select.value = lang;
  });

  if (currentUser) {
    renderCurrentUserBadge();
  }

  if (selectedPartner) {
    updateChatHeader(selectedPartner);
  } else {
    updateChatHeader(null);
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
    const item = document.createElement('div');
    item.className = `user-item ${selectedPartner && selectedPartner.id === user.id ? 'active' : ''}`;

    const avatar = document.createElement('div');
    avatar.className = 'user-avatar-circle';
    avatar.style.background = user.avatarData ? `url("${user.avatarData}") center / cover` : getAvatarBg(user.label || user.id);
    avatar.classList.toggle('avatar-photo', Boolean(user.avatarData));
    avatar.textContent = (user.label || user.id).charAt(0).toUpperCase();

    const info = document.createElement('div');
    info.className = 'user-item-info';

    const name = document.createElement('div');
    name.className = 'user-item-name';
    name.textContent = user.label;

    info.appendChild(name);

    const meta = document.createElement('div');
    meta.className = 'user-item-meta';

    const dot = document.createElement('span');
    dot.className = 'notification-dot';
    if (unreadUsers.has(user.id)) {
      dot.classList.add('visible');
    }

    meta.appendChild(dot);

    item.appendChild(avatar);
    item.appendChild(info);
    item.appendChild(meta);

    item.addEventListener('click', () => {
      selectedPartner = user;
      updateChatHeader(user);
      document.querySelectorAll('.user-item').forEach((el) => el.classList.remove('active'));
      item.classList.add('active');
      unreadUsers.delete(user.id);
      dot.classList.remove('visible');

      const appShell = document.getElementById('appShell');
      if (appShell) {
        appShell.classList.add('mobile-show-chat');
      }

      loadMessages();
      startChatRefresh();
    });

    userList.appendChild(item);
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

let latestMessagesRequest = 0;

async function loadMessages() {
  if (!currentUser || !messagesBox) return;

  if (!selectedPartner) {
    messagesBox.innerHTML = `
      <div class="empty-chat-state">
        <div class="empty-chat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        <p>${escapeHtml(t('selectPartnerPlaceholder'))}</p>
      </div>
    `;
    return;
  }

  const partnerId = selectedPartner.id;
  const requestNumber = ++latestMessagesRequest;
  const response = await fetch(`/api/chat?me=${encodeURIComponent(currentUser.id)}&other=${encodeURIComponent(partnerId)}`);
  const data = await response.json();

  // Requests from the interval may finish out of order. Do not let an old
  // response replace a newer chat or the newly selected conversation.
  if (requestNumber !== latestMessagesRequest || !selectedPartner || selectedPartner.id !== partnerId) return;

  messagesBox.innerHTML = '';

  const messages = data.messages || [];

  if (messages.length === 0) {
    messagesBox.innerHTML = `
      <div class="empty-chat-state">
        <div class="empty-chat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </div>
        <p>${escapeHtml(t('phMessage'))}</p>
      </div>
    `;
    return;
  }

  messages.forEach((item) => {
    const isMe = item.fromId === currentUser.id;
    const div = document.createElement('div');
    div.className = `message ${item.type === 'call' ? 'call-message' : isMe ? 'me' : 'other'}`;

    if (item.type === 'call') {
      const mode = item.callMode === 'video' ? t('callVideo') : t('callAudio');
      const callText = item.callStatus === 'completed' ? t('callCompleted', { mode })
        : item.callStatus === 'declined' ? t('callDeclinedLog', { mode })
        : t('callMissed', { mode });
      div.textContent = callText;
      messagesBox.appendChild(div);
      return;
    }

    if (!isMe) {
      const sender = document.createElement('div');
      sender.className = 'message-sender';
      sender.textContent = selectedPartner.label || item.fromId;
      div.appendChild(sender);
    }

    if (item.text) {
      const text = document.createElement('div');
      text.className = 'message-text';
      text.textContent = item.text;
      div.appendChild(text);
    }

    if (item.imageData) {
      const image = document.createElement('img');
      image.className = 'message-image';
      image.src = item.imageData;
      image.alt = '';
      div.appendChild(image);
    }

    if (item.createdAt) {
      const time = document.createElement('div');
      time.className = 'message-time';
      time.textContent = formatTime(item.createdAt);
      div.appendChild(time);
    }

    messagesBox.appendChild(div);
  });

  const lastMessage = messages[messages.length - 1];
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

let isSendingMessage = false;

async function sendMessage() {
  if (!currentUser || !selectedPartner) {
    alert(t('alertSelectPartner'));
    return;
  }

  const text = messageInput.value.trim();
  if ((!text && !pendingMessageImage) || isSendingMessage) return;

  isSendingMessage = true;
  sendBtn.disabled = true;
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fromId: currentUser.id,
        toId: selectedPartner.id,
        text,
        imageData: pendingMessageImage,
      }),
    });

    if (!response.ok) {
      throw new Error('Unable to send message.');
    }

    messageInput.value = '';
    pendingMessageImage = null;
    if (imageInput) imageInput.value = '';
    await loadMessages();
  } catch (error) {
    alert(error.message);
  } finally {
    isSendingMessage = false;
    sendBtn.disabled = false;
  }
}

function readImage(file) {
  return new Promise((resolve, reject) => {
    if (!file || file.size > 1_100_000) return reject(new Error('Фото должно быть меньше 1 МБ.'));
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Не удалось прочитать фото.'));
    reader.readAsDataURL(file);
  });
}

function openProfile() {
  if (!currentUser || !profileModal) return;
  pendingAvatarImage = currentUser.avatarData || null;
  profileNameInput.value = currentUser.label;
  profileUserId.textContent = currentUser.id;
  profileAvatarPreview.textContent = currentUser.label.charAt(0).toUpperCase();
  profileAvatarPreview.parentElement.style.backgroundImage = pendingAvatarImage ? `url("${pendingAvatarImage}")` : '';
  profileAvatarPreview.style.color = pendingAvatarImage ? 'transparent' : '';
  profileModal.classList.remove('hidden');
}

function closeProfile() { profileModal?.classList.add('hidden'); }

async function saveProfile(event) {
  event.preventDefault();
  const response = await fetch('/api/auth/profile', {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ label: profileNameInput.value.trim(), avatarData: pendingAvatarImage }),
  });
  const data = await response.json();
  if (!response.ok) return alert(data.error || 'Не удалось сохранить профиль.');
  currentUser = data.user;
  renderCurrentUserBadge();
  if (selectedPartner?.id === currentUser.id) updateChatHeader(currentUser);
  closeProfile();
  searchUsers();
}

const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];
let callState = null;
let incomingCall = null;
let callSignalCursor = new Date(Date.now() - 1000).toISOString();
let callSignalTimer = null;
const handledCallSignals = new Set();
const queuedCandidates = new Map();

async function logCall(state, status) {
  if (!state || state.loggedStatus === status) return;
  state.loggedStatus = status;
  await fetch('/api/calls/log', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callId: state.callId, fromId: state.initiatorId || currentUser.id, toId: state.initiatorId ? currentUser.id : state.partnerId, mode: state.mode, status }),
  }).catch(() => {});
}

function setCallOverlay(partner, status, incoming = false) {
  if (!callOverlay) return;
  callOverlay.classList.remove('hidden');
  callPartnerName.textContent = partner?.label || partner?.id || '';
  callStatus.textContent = status;
  callAvatar.textContent = (partner?.label || partner?.id || '?').charAt(0).toUpperCase();
  callAvatar.style.background = getAvatarBg(partner?.label || partner?.id);
  acceptCallBtn?.classList.toggle('hidden', !incoming);
  declineCallBtn?.classList.toggle('hidden', !incoming);
  endCallBtn?.classList.toggle('hidden', incoming);
}

function hideCallOverlay() {
  callOverlay?.classList.add('hidden');
  if (remoteVideo) remoteVideo.srcObject = null;
  if (localVideo) {
    localVideo.srcObject = null;
    localVideo.classList.add('hidden');
  }
}

async function sendCallSignal(toId, callId, type, payload = null) {
  const response = await fetch('/api/calls/signal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callId, fromId: currentUser.id, toId, type, payload }),
  });
  if (!response.ok) throw new Error('Unable to send call signal.');
}

async function getLocalMedia(mode) {
  try {
    return await navigator.mediaDevices.getUserMedia({ audio: true, video: mode === 'video' });
  } catch (error) {
    throw new Error(t('callMediaError'));
  }
}

function createPeerConnection(state) {
  const peerConnection = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  state.localStream.getTracks().forEach((track) => peerConnection.addTrack(track, state.localStream));
  peerConnection.addEventListener('track', (event) => {
    if (remoteVideo) remoteVideo.srcObject = event.streams[0];
    document.querySelector('.call-surface')?.classList.add('has-remote-video');
  });
  peerConnection.addEventListener('icecandidate', ({ candidate }) => {
    if (candidate && callState === state) {
      sendCallSignal(state.partnerId, state.callId, 'candidate', candidate.toJSON()).catch(() => {});
    }
  });
  peerConnection.addEventListener('connectionstatechange', () => {
    if (callState !== state) return;
    if (peerConnection.connectionState === 'connected') { state.connected = true; callStatus.textContent = t('callInProgress'); }
    if (['failed', 'closed'].includes(peerConnection.connectionState)) endCurrentCall(false);
  });
  return peerConnection;
}

async function applyQueuedCandidates(state) {
  const candidates = queuedCandidates.get(state.callId) || [];
  for (const candidate of candidates) await state.peerConnection.addIceCandidate(candidate);
  queuedCandidates.delete(state.callId);
}

async function startCall(mode) {
  if (!selectedPartner) return;
  if (!window.RTCPeerConnection || !navigator.mediaDevices?.getUserMedia) return alert(t('callUnsupported'));
  if (callState || incomingCall) return;

  try {
    const localStream = await getLocalMedia(mode);
    const state = { callId: crypto.randomUUID(), partnerId: selectedPartner.id, partner: selectedPartner, mode, localStream, peerConnection: null };
    callState = state;
    if (localVideo && mode === 'video') {
      localVideo.srcObject = localStream;
      localVideo.classList.remove('hidden');
    }
    setCallOverlay(selectedPartner, t('callCalling'));
    state.peerConnection = createPeerConnection(state);
    await logCall(state, 'missed');
    const offer = await state.peerConnection.createOffer();
    await state.peerConnection.setLocalDescription(offer);
    await sendCallSignal(state.partnerId, state.callId, 'offer', { description: offer, mode });
  } catch (error) {
    endCurrentCall(false);
    alert(error.message || t('callMediaError'));
  }
}

async function acceptIncomingCall() {
  if (!incomingCall || callState) return;
  const incoming = incomingCall;
  incomingCall = null;
  try {
    const localStream = await getLocalMedia(incoming.mode);
    const state = { ...incoming, initiatorId: incoming.partnerId, localStream, peerConnection: null };
    callState = state;
    if (localVideo && state.mode === 'video') {
      localVideo.srcObject = localStream;
      localVideo.classList.remove('hidden');
    }
    setCallOverlay(state.partner, t('callConnecting'));
    state.peerConnection = createPeerConnection(state);
    await state.peerConnection.setRemoteDescription(incoming.description);
    await applyQueuedCandidates(state);
    const answer = await state.peerConnection.createAnswer();
    await state.peerConnection.setLocalDescription(answer);
    await sendCallSignal(state.partnerId, state.callId, 'answer', { description: answer });
    await logCall(state, 'completed');
  } catch (error) {
    await sendCallSignal(incoming.partnerId, incoming.callId, 'decline').catch(() => {});
    endCurrentCall(false);
    alert(error.message || t('callMediaError'));
  }
}

async function declineIncomingCall() {
  if (!incomingCall) return;
  const incoming = incomingCall;
  incomingCall = null;
  await sendCallSignal(incoming.partnerId, incoming.callId, 'decline').catch(() => {});
  hideCallOverlay();
}

async function endCurrentCall(notify = true) {
  const state = callState;
  const incoming = incomingCall;
  callState = null;
  incomingCall = null;
  if (state) {
    state.localStream?.getTracks().forEach((track) => track.stop());
    state.peerConnection?.close();
    if (notify) await sendCallSignal(state.partnerId, state.callId, 'hangup').catch(() => {});
    await logCall(state, state.connected ? 'completed' : 'missed');
  }
  if (incoming && notify) await sendCallSignal(incoming.partnerId, incoming.callId, 'decline').catch(() => {});
  hideCallOverlay();
  document.querySelector('.call-surface')?.classList.remove('has-remote-video');
}

function partnerForSignal(signal) {
  return currentUserList.find((user) => user.id === signal.fromId) || { id: signal.fromId, label: signal.fromId };
}

async function handleCallSignal(signal) {
  if (handledCallSignals.has(signal.id)) return;
  handledCallSignals.add(signal.id);
  if (handledCallSignals.size > 500) handledCallSignals.clear();

  if (signal.type === 'offer') {
    if (callState || incomingCall) {
      return sendCallSignal(signal.fromId, signal.callId, 'busy').catch(() => {});
    }
    const partner = partnerForSignal(signal);
    incomingCall = { callId: signal.callId, partnerId: signal.fromId, partner, mode: signal.payload?.mode === 'video' ? 'video' : 'audio', description: signal.payload?.description };
    setCallOverlay(partner, t('callIncoming'), true);
    return;
  }

  const state = callState;
  if (!state || state.callId !== signal.callId || state.partnerId !== signal.fromId) {
    if (incomingCall && incomingCall.callId === signal.callId && signal.type === 'candidate' && signal.payload) {
      queuedCandidates.set(signal.callId, [...(queuedCandidates.get(signal.callId) || []), signal.payload]);
    }
    return;
  }
  if (signal.type === 'answer') {
    await state.peerConnection.setRemoteDescription(signal.payload?.description);
    await applyQueuedCandidates(state);
    await logCall(state, 'completed');
  } else if (signal.type === 'candidate' && signal.payload) {
    if (state.peerConnection.remoteDescription) await state.peerConnection.addIceCandidate(signal.payload);
    else queuedCandidates.set(signal.callId, [...(queuedCandidates.get(signal.callId) || []), signal.payload]);
  } else if (['hangup', 'decline', 'busy'].includes(signal.type)) {
    if (signal.type !== 'hangup') await logCall(state, 'declined');
    const status = signal.type === 'busy' ? t('callBusy') : t('callDeclined');
    callStatus.textContent = status;
    setTimeout(() => endCurrentCall(false), 800);
  }
}

async function pollCallSignals() {
  if (!currentUser) return;
  try {
    const response = await fetch(`/api/calls/signals?for=${encodeURIComponent(currentUser.id)}&after=${encodeURIComponent(callSignalCursor)}`);
    if (!response.ok) return;
    const { signals = [] } = await response.json();
    for (const signal of signals) {
      if (signal.createdAt > callSignalCursor) callSignalCursor = signal.createdAt;
      await handleCallSignal(signal);
    }
  } catch (error) {
    // Signalling retries on the next short poll; a chat remains usable meanwhile.
  }
}

function startCallSignalPolling() {
  if (callSignalTimer) return;
  pollCallSignals();
  callSignalTimer = setInterval(pollCallSignals, 1200);
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
  updateChatHeader(null);
  loadMessages();
  searchUsers();
  startChatRefresh();
  startCallSignalPolling();
}

if (mobileBackBtn) {
  mobileBackBtn.addEventListener('click', () => {
    const appShell = document.getElementById('appShell');
    if (appShell) {
      appShell.classList.remove('mobile-show-chat');
    }
  });
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
  audioCallBtn?.addEventListener('click', () => startCall('audio'));
  videoCallBtn?.addEventListener('click', () => startCall('video'));
  acceptCallBtn?.addEventListener('click', acceptIncomingCall);
  declineCallBtn?.addEventListener('click', declineIncomingCall);
  endCallBtn?.addEventListener('click', () => endCurrentCall());
  imageInput?.addEventListener('change', async () => {
    try { pendingMessageImage = await readImage(imageInput.files[0]); }
    catch (error) { imageInput.value = ''; alert(error.message); }
  });
  profileBtn?.addEventListener('click', openProfile);
  closeProfileBtn?.addEventListener('click', closeProfile);
  profileForm?.addEventListener('submit', saveProfile);
  profileImageInput?.addEventListener('change', async () => {
    try {
      pendingAvatarImage = await readImage(profileImageInput.files[0]);
      profileAvatarPreview.parentElement.style.backgroundImage = `url("${pendingAvatarImage}")`;
      profileAvatarPreview.style.color = 'transparent';
    } catch (error) { profileImageInput.value = ''; alert(error.message); }
  });
  bootChatPage();
}

window.addEventListener('beforeunload', () => {
  if (callState && currentUser) {
    navigator.sendBeacon('/api/calls/signal', new Blob([JSON.stringify({
      callId: callState.callId,
      fromId: currentUser.id,
      toId: callState.partnerId,
      type: 'hangup',
    })], { type: 'application/json' }));
  }
  callState?.localStream?.getTracks().forEach((track) => track.stop());
});
