const translations = {
  ru: {
    appTitle: 'ВМаксате',
    authWelcome: 'Добро пожаловать',
    authSubtitle: 'Войдите в аккаунт или создайте новый',
    authKicker: 'Личный мессенджер',
    authHeroTitle: 'Ближе к тем, кто важен.',
    authHeroText: 'Спокойный, быстрый и понятный мессенджер. Всё нужное — под рукой.',
    authFeatureChats: 'Личные диалоги',
    authFeatureMedia: 'Фото и стикеры',
    authFeatureCalls: 'Аудио и видеозвонки',
    authFooter: 'Сделано для спокойного общения',
    themeToggle: 'Сменить тему',
    closeBtnLabel: 'Закрыть',
    tabRegister: 'Регистрация',
    tabLogin: 'Войти',
    labelYourUserId: 'Ваш user id',
    phRegisterId: 'Например: user42',
    userIdRuleAllowed: 'Только латинские буквы и цифры',
    userIdRuleLength: 'От 3 до 20 символов',
    userIdInvalid: 'User ID должен соответствовать правилам ниже.',
    passwordRuleAllowed: 'Только латинские буквы и цифры',
    passwordRuleLength: 'Не менее 6 символов',
    passwordRuleLetters: 'Есть латинские буквы',
    passwordRuleDigits: 'Есть цифры',
    passwordInvalid: 'Пароль должен соответствовать правилам ниже.',
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
    typingIndicator: 'печатает…',
    selectPartnerPlaceholder: 'Выберите собеседника',
    phMessage: 'Напишите сообщение...',
    sendBtn: 'Отправить',
    alertSelectPartner: 'Сначала войдите в аккаунт и выберите собеседника.',
    audioCallTitle: 'Аудиозвонок', videoCallTitle: 'Видеозвонок', acceptCallTitle: 'Ответить', declineCallTitle: 'Отклонить', endCallTitle: 'Завершить звонок',
    callIncoming: 'Входящий звонок...', callCalling: 'Звоним...', callConnecting: 'Подключение...', callInProgress: 'В звонке', callDeclined: 'Звонок отклонён', callBusy: 'Пользователь уже разговаривает',
    callMediaError: 'Не удалось получить доступ к микрофону или камере.', callUnsupported: 'Звонки не поддерживаются этим браузером.',
    profileBtn: 'Профиль', profileTitle: 'Профиль', profileNameLabel: 'Имя', profileUserIdLabel: 'User ID', saveProfileBtn: 'Сохранить', attachPhotoTitle: 'Прикрепить фото', stickersTitle: 'Стикеры',
    profileAboutLabel: 'О себе', profileAboutPlaceholder: 'Расскажите немного о себе',
    errImageTooLarge: 'Фото должно быть не больше 5 МБ.',
    callAudio: 'Аудиозвонок', callVideo: 'Видеозвонок', callMissed: 'Пропущенный {mode}', callCompleted: '{mode}', callDeclinedLog: 'Отклонённый {mode}',
    messageSent: 'Отправлено', messageDelivered: 'Доставлено', messageRead: 'Прочитано',
    editMessage: 'Изменить', saveEdit: 'Сохранить', cancelEdit: 'Отмена', messageEdited: 'изменено',
    errEditMessage: 'Не удалось изменить сообщение.',
    previewYou: 'Вы', previewImage: 'Фото', previewSticker: 'Стикер', previewCall: 'Звонок',
    deleteMessage: 'Удалить', confirmDeleteMessage: 'Удалить это сообщение? Это действие нельзя отменить.',
    reactionHeart: 'Сердце', reactionLike: 'Нравится', reactionPoop: 'Какашка',
    messageActionsTitle: 'Действия с сообщением',

    // Admin page
    adminTitle: 'Admin Panel',
    adminSubtitle: 'Доступ только по паролю',
    adminUsersTitle: 'Пользователи',
    phAdminPassword: 'Введите пароль',
    btnAdminLogin: 'Войти в админку',
    btnDeleteAll: 'Удалить всех',
    btnDeleteUser: 'Удалить',
    confirmDeleteUser: 'Удалить аккаунт {id}? Это действие нельзя отменить.',
    confirmDeleteAll: 'Удалить всех пользователей? Это действие нельзя отменить.',
    msgUserDeleted: 'Аккаунт {id} удалён.',
    msgAllDeleted: 'Все пользователи удалены.',
    errNoAdminAccess: 'Нет доступа к админке.',
    errDeleteUser: 'Не удалось удалить пользователя.',
    errDeleteAll: 'Не удалось удалить всех пользователей.',
    errInvalidPassword: 'Неверный пароль.',
    btnResetPassword: 'Сбросить пароль',
    promptNewPassword: 'Новый пароль для {id}:',
    errResetPassword: 'Не удалось сбросить пароль.',
    msgPasswordReset: 'Пароль аккаунта {id} сброшен.'
  },
  en: {
    appTitle: 'VMaksate',
    authWelcome: 'Welcome',
    authSubtitle: 'Sign in or create a new account',
    authKicker: 'Private messenger',
    authHeroTitle: 'Closer to the people who matter.',
    authHeroText: 'A calm, fast and simple messenger. Everything you need, right where it belongs.',
    authFeatureChats: 'Private conversations',
    authFeatureMedia: 'Photos and stickers',
    authFeatureCalls: 'Audio and video calls',
    authFooter: 'Made for calm conversations',
    themeToggle: 'Toggle theme',
    closeBtnLabel: 'Close',
    tabRegister: 'Register',
    tabLogin: 'Sign In',
    labelYourUserId: 'Your User ID',
    phRegisterId: 'Example: user42',
    userIdRuleAllowed: 'Latin letters and digits only',
    userIdRuleLength: '3 to 20 characters',
    userIdInvalid: 'User ID must follow the rules below.',
    passwordRuleAllowed: 'Latin letters and digits only',
    passwordRuleLength: 'At least 6 characters',
    passwordRuleLetters: 'Contains Latin letters',
    passwordRuleDigits: 'Contains digits',
    passwordInvalid: 'Password must follow the rules below.',
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
    typingIndicator: 'typing…',
    selectPartnerPlaceholder: 'Select a conversation',
    phMessage: 'Type a message...',
    sendBtn: 'Send',
    alertSelectPartner: 'Please sign in and select a user first.',
    audioCallTitle: 'Audio call', videoCallTitle: 'Video call', acceptCallTitle: 'Answer', declineCallTitle: 'Decline', endCallTitle: 'End call',
    callIncoming: 'Incoming call...', callCalling: 'Calling...', callConnecting: 'Connecting...', callInProgress: 'In call', callDeclined: 'Call declined', callBusy: 'User is already in a call',
    callMediaError: 'Unable to access the microphone or camera.', callUnsupported: 'Calls are not supported by this browser.',
    profileBtn: 'Profile', profileTitle: 'Profile', profileNameLabel: 'Name', profileUserIdLabel: 'User ID', saveProfileBtn: 'Save', attachPhotoTitle: 'Attach photo', stickersTitle: 'Stickers',
    profileAboutLabel: 'About', profileAboutPlaceholder: 'Tell a little about yourself',
    errImageTooLarge: 'Image must be 5 MB or smaller.',
    callAudio: 'Audio call', callVideo: 'Video call', callMissed: 'Missed {mode}', callCompleted: '{mode}', callDeclinedLog: 'Declined {mode}',
    messageSent: 'Sent', messageDelivered: 'Delivered', messageRead: 'Read',
    editMessage: 'Edit', saveEdit: 'Save', cancelEdit: 'Cancel', messageEdited: 'edited',
    errEditMessage: 'Unable to edit message.',
    previewYou: 'You', previewImage: 'Photo', previewSticker: 'Sticker', previewCall: 'Call',
    deleteMessage: 'Delete', confirmDeleteMessage: 'Delete this message? This cannot be undone.',
    reactionHeart: 'Heart', reactionLike: 'Like', reactionPoop: 'Poop',
    messageActionsTitle: 'Message actions',

    // Admin page
    adminTitle: 'Admin Panel',
    adminSubtitle: 'Password restricted access',
    adminUsersTitle: 'Users',
    phAdminPassword: 'Enter password',
    btnAdminLogin: 'Log in as Admin',
    btnDeleteAll: 'Delete All Users',
    btnDeleteUser: 'Delete',
    confirmDeleteUser: 'Delete account {id}? This cannot be undone.',
    confirmDeleteAll: 'Delete all users? This cannot be undone.',
    msgUserDeleted: 'Account {id} deleted.',
    msgAllDeleted: 'All users have been deleted.',
    errNoAdminAccess: 'No admin access.',
    errDeleteUser: 'Failed to delete user.',
    errDeleteAll: 'Failed to delete all users.',
    errInvalidPassword: 'Invalid password.',
    btnResetPassword: 'Reset password',
    promptNewPassword: 'New password for {id}:',
    errResetPassword: 'Failed to reset password.',
    msgPasswordReset: 'Password for {id} has been reset.'
  },
  es: {
    appTitle: 'VMaksate',
    authWelcome: 'Bienvenido',
    authSubtitle: 'Inicia sesión o crea una cuenta nueva',
    authKicker: 'Mensajería personal',
    authHeroTitle: 'Más cerca de quienes importan.',
    authHeroText: 'Un mensajero tranquilo, rápido y sencillo. Todo lo necesario, en su sitio.',
    authFeatureChats: 'Conversaciones privadas',
    authFeatureMedia: 'Fotos y stickers',
    authFeatureCalls: 'Llamadas de audio y vídeo',
    authFooter: 'Hecho para conversaciones tranquilas',
    themeToggle: 'Cambiar tema',
    closeBtnLabel: 'Cerrar',
    tabRegister: 'Registro',
    tabLogin: 'Iniciar sesión',
    labelYourUserId: 'Su ID de usuario',
    phRegisterId: 'Ejemplo: user42',
    userIdRuleAllowed: 'Solo letras latinas y números',
    userIdRuleLength: 'De 3 a 20 caracteres',
    userIdInvalid: 'El ID de usuario debe cumplir las reglas siguientes.',
    passwordRuleAllowed: 'Solo letras latinas y números',
    passwordRuleLength: 'Al menos 6 caracteres',
    passwordRuleLetters: 'Contiene letras latinas',
    passwordRuleDigits: 'Contiene números',
    passwordInvalid: 'La contraseña debe cumplir las reglas siguientes.',
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
    typingIndicator: 'escribiendo…',
    selectPartnerPlaceholder: 'Seleccione un interlocutor',
    phMessage: 'Escriba un mensaje...',
    sendBtn: 'Enviar',
    alertSelectPartner: 'Primero inicie sesión y seleccione un interlocutor.',
    audioCallTitle: 'Llamada de audio', videoCallTitle: 'Videollamada', acceptCallTitle: 'Responder', declineCallTitle: 'Rechazar', endCallTitle: 'Finalizar llamada',
    callIncoming: 'Llamada entrante...', callCalling: 'Llamando...', callConnecting: 'Conectando...', callInProgress: 'En llamada', callDeclined: 'Llamada rechazada', callBusy: 'El usuario ya está en una llamada',
    callMediaError: 'No se pudo acceder al micrófono o la cámara.', callUnsupported: 'Este navegador no admite llamadas.',
    profileBtn: 'Perfil', profileTitle: 'Perfil', profileNameLabel: 'Nombre', profileUserIdLabel: 'ID de usuario', saveProfileBtn: 'Guardar', attachPhotoTitle: 'Adjuntar foto', stickersTitle: 'Stickers',
    profileAboutLabel: 'Acerca de mí', profileAboutPlaceholder: 'Cuéntanos un poco sobre ti',
    errImageTooLarge: 'La imagen debe tener 5 MB o menos.',
    callAudio: 'Llamada de audio', callVideo: 'Videollamada', callMissed: 'Llamada perdida: {mode}', callCompleted: '{mode}', callDeclinedLog: '{mode} rechazada',
    messageSent: 'Enviado', messageDelivered: 'Entregado', messageRead: 'Leído',
    editMessage: 'Editar', saveEdit: 'Guardar', cancelEdit: 'Cancelar', messageEdited: 'editado',
    errEditMessage: 'No se pudo editar el mensaje.',
    previewYou: 'Tú', previewImage: 'Foto', previewSticker: 'Sticker', previewCall: 'Llamada',
    deleteMessage: 'Eliminar', confirmDeleteMessage: '¿Eliminar este mensaje? Esta acción no se puede deshacer.',
    reactionHeart: 'Corazón', reactionLike: 'Me gusta', reactionPoop: 'Caca',
    messageActionsTitle: 'Acciones del mensaje',

    // Admin page
    adminTitle: 'Panel de Admin',
    adminSubtitle: 'Acceso restringido por contraseña',
    adminUsersTitle: 'Usuarios',
    phAdminPassword: 'Ingrese contraseña',
    btnAdminLogin: 'Entrar como Admin',
    btnDeleteAll: 'Eliminar a todos',
    btnDeleteUser: 'Eliminar',
    confirmDeleteUser: '¿Eliminar la cuenta {id}? Esta acción no se puede deshacer.',
    confirmDeleteAll: '¿Eliminar todos los usuarios? Esta acción no se puede deshacer.',
    msgUserDeleted: 'Cuenta {id} eliminada.',
    msgAllDeleted: 'Todos los usuarios han sido eliminados.',
    errNoAdminAccess: 'Sin acceso de administrador.',
    errDeleteUser: 'No se pudo eliminar el usuario.',
    errDeleteAll: 'No se pudo eliminar a todos los usuarios.',
    errInvalidPassword: 'Contraseña incorrecta.',
    btnResetPassword: 'Restablecer contraseña',
    promptNewPassword: 'Nueva contraseña para {id}:',
    errResetPassword: 'No se pudo restablecer la contraseña.',
    msgPasswordReset: 'La contraseña de {id} se ha restablecido.'
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

function getUserIdRuleStatuses(value) {
  return {
    allowed: /^[A-Za-z0-9]*$/.test(value),
    length: value.length >= 3 && value.length <= 20,
  };
}

function isValidUserId(value) {
  return Object.values(getUserIdRuleStatuses(value)).every(Boolean);
}

function updateUserIdRules() {
  if (!registerIdInput || !userIdRules) return;
  const value = registerIdInput.value;
  const rules = getUserIdRuleStatuses(value);
  const valid = isValidUserId(value);
  userIdRules.hidden = !value || valid;
  userIdRules.querySelectorAll('[data-user-id-rule]').forEach((rule) => {
    const ruleName = rule.dataset.userIdRule;
    rule.classList.toggle('is-valid', Boolean(rules[ruleName]));
    rule.classList.toggle('is-invalid', !rules[ruleName]);
  });
  registerIdInput.setCustomValidity(value && !valid ? t('userIdInvalid') : '');
}

function getPasswordRuleStatuses(value) {
  return {
    allowed: /^[A-Za-z0-9]*$/.test(value),
    length: value.length >= 6,
    letters: /[A-Za-z]/.test(value),
    digits: /[0-9]/.test(value),
  };
}

function isValidRegistrationPassword(value) {
  return Object.values(getPasswordRuleStatuses(value)).every(Boolean);
}

function updatePasswordRules() {
  if (!registerPasswordInput || !passwordRules) return;
  const value = registerPasswordInput.value;
  const rules = getPasswordRuleStatuses(value);
  const valid = isValidRegistrationPassword(value);
  passwordRules.hidden = !value || valid;
  passwordRules.querySelectorAll('[data-password-rule]').forEach((rule) => {
    const ruleName = rule.dataset.passwordRule;
    rule.classList.toggle('is-valid', Boolean(rules[ruleName]));
    rule.classList.toggle('is-invalid', !rules[ruleName]);
  });
  registerPasswordInput.setCustomValidity(value && !valid ? t('passwordInvalid') : '');
}

function getAvatarBg(name) {
  const colors = [
    'linear-gradient(140deg, #5b57e8, #8b7cff)',
    'linear-gradient(140deg, #0d9488, #2dd4bf)',
    'linear-gradient(140deg, #d97706, #fbbf24)',
    'linear-gradient(140deg, #db2777, #f472b6)',
    'linear-gradient(140deg, #2563eb, #38bdf8)',
    'linear-gradient(140deg, #7c3aed, #c084fc)',
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
const lastMessageByUser = new Map();

const authPage = document.getElementById('authPage');
const registerForm = document.getElementById('registerForm');
const registerIdInput = document.getElementById('registerId');
const userIdRules = document.getElementById('userIdRules');
const registerPasswordInput = document.getElementById('registerPassword');
const passwordRules = document.getElementById('passwordRules');
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
const partnerAbout = document.getElementById('partnerAbout');
const typingIndicator = document.getElementById('typingIndicator');
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
const attachmentPreview = document.getElementById('attachmentPreview');
const attachmentPreviewImage = document.getElementById('attachmentPreviewImage');
const attachmentPreviewName = document.getElementById('attachmentPreviewName');
const removeAttachmentBtn = document.getElementById('removeAttachmentBtn');
const stickerBtn = document.getElementById('stickerBtn');
const stickerMenu = document.getElementById('stickerMenu');
const etoRealnoSticker = document.getElementById('etoRealnoSticker');
const profileBtn = document.getElementById('profileBtn');
const profileModal = document.getElementById('profileModal');
const profileForm = document.getElementById('profileForm');
const profileNameInput = document.getElementById('profileNameInput');
const profileAboutInput = document.getElementById('profileAboutInput');
const profileUserId = document.getElementById('profileUserId');
const profileImageInput = document.getElementById('profileImageInput');
const profileAvatarPreview = document.getElementById('profileAvatarPreview');
const closeProfileBtn = document.getElementById('closeProfileBtn');
let pendingMessageImage = null;
let pendingAvatarImage = null;
let typingIdleTimeout = null;
let typingIndicatorTimeout = null;
let lastTypingSentAt = 0;
let isTypingSent = false;

function renderCurrentUserBadge() {
  if (!currentUserBadge) return;
  if (!currentUser) {
    currentUserBadge.innerHTML = '';
    return;
  }
  const initial = (currentUser.label || currentUser.id).charAt(0).toUpperCase();
  currentUserBadge.innerHTML = `
    <div class="user-badge-box">
      <div class="user-badge-avatar" style="background:${getAvatarBg(currentUser.label || currentUser.id)}">${escapeHtml(initial)}</div>
      <div class="user-badge-info">
        <div class="user-badge-sub">${escapeHtml(currentUser.label)}</div>
        <div class="user-badge-id">@${escapeHtml(currentUser.id)}</div>
      </div>
    </div>
  `;
}

function updateChatHeader(user) {
  if (!chatPartner) return;
  clearTimeout(typingIndicatorTimeout);
  typingIndicator?.classList.remove('visible');
  const chatPanel = chatPartner.closest('.chat-panel');
  if (!user) {
    chatPartner.textContent = t('selectPartnerPlaceholder');
    if (partnerAbout) {
      partnerAbout.textContent = '';
      partnerAbout.classList.add('hidden');
    }
    if (partnerAvatar) partnerAvatar.classList.add('hidden');
    if (audioCallBtn) audioCallBtn.disabled = true;
    if (videoCallBtn) videoCallBtn.disabled = true;
    chatPanel?.classList.add('no-chat');
    return;
  }
  chatPanel?.classList.remove('no-chat');
  chatPartner.textContent = user.label;
  if (partnerAbout) {
    partnerAbout.textContent = user.about || '';
    partnerAbout.title = user.about || '';
    partnerAbout.classList.toggle('hidden', !user.about);
  }
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

function sendTypingState(isTyping) {
  if (!currentUser || !selectedPartner) return;
  if (isTyping) {
    if (Date.now() - lastTypingSentAt < 1500) return;
    lastTypingSentAt = Date.now();
  } else if (!isTypingSent) {
    return;
  }

  isTypingSent = isTyping;
  fetch('/api/chat/typing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ toId: selectedPartner.id, isTyping }),
    keepalive: !isTyping,
  }).catch((error) => console.error('Unable to send typing status:', error));
}

function receiveTypingState(event) {
  if (!selectedPartner || event.fromId !== selectedPartner.id || !typingIndicator) return;
  clearTimeout(typingIndicatorTimeout);
  if (!event.isTyping) {
    typingIndicator.classList.remove('visible');
    return;
  }
  typingIndicator.textContent = t('typingIndicator');
  typingIndicator.classList.add('visible');
  typingIndicatorTimeout = setTimeout(() => typingIndicator.classList.remove('visible'), 3500);
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
  if (userList) renderUsers(currentUserList);
  updateUserIdRules();
  updatePasswordRules();

  if (selectedPartner) {
    updateChatHeader(selectedPartner);
  } else {
    updateChatHeader(null);
  }

  if (adminUserList && adminPage && adminDashboard?.classList.contains('active')) {
    loadAdminUsers();
  }
}

function applyTheme(theme) {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.setAttribute('aria-pressed', String(nextTheme === 'dark'));
  });
  try {
    localStorage.setItem('vmakstate_theme', nextTheme);
  } catch (error) {
    // Theme preference is optional; ignore storage errors.
  }
}

document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });
});

applyTheme(document.documentElement.dataset.theme || 'light');

async function showAuthMessage(text, isError = false) {
  if (!authMessage) return;
  authMessage.textContent = text;
  authMessage.style.color = isError ? 'var(--danger-text)' : 'var(--accent-ink)';
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
  const idInput = form.querySelector('input[name="id"]');
  const id = mode === 'register' ? idInput.value : idInput.value.trim();
  const label = form.querySelector('input[name="label"]')?.value.trim() || '';
  const passwordInput = form.querySelector('input[name="password"]');
  const password = mode === 'register' ? passwordInput.value : passwordInput.value.trim();

  if (mode === 'register' && !isValidUserId(id)) {
    updateUserIdRules();
    idInput.reportValidity();
    return;
  }
  if (mode === 'register' && !isValidRegistrationPassword(password)) {
    updatePasswordRules();
    passwordInput.reportValidity();
    return;
  }

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
  currentUserList = users
    .map((user) => ({ ...user, lastMessage: lastMessageByUser.get(user.id) || user.lastMessage || null }))
    .sort((a, b) => Date.parse(b.lastMessage?.createdAt || 0) - Date.parse(a.lastMessage?.createdAt || 0));

  currentUserList.forEach((user) => {
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

    if (user.lastMessage) {
      const preview = document.createElement('div');
      preview.className = 'user-item-preview';
      const message = user.lastMessage;
      const previewText = message.type === 'image' ? t('previewImage')
        : message.type === 'sticker' ? t('previewSticker')
          : message.type === 'call' ? t('previewCall')
            : message.text || '';
      preview.textContent = `${message.fromId === currentUser?.id ? `${t('previewYou')}: ` : ''}${previewText}`;
      info.appendChild(preview);
    }

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
      clearTimeout(typingIdleTimeout);
      sendTypingState(false);
      selectedPartner = user;
      lastTypingSentAt = 0;
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
    });

    userList.appendChild(item);
  });
}

async function refreshUnreadIndicators() {
  if (!currentUser) return;
  const response = await fetch('/api/chat/unread');
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Unable to refresh unread messages.');
  const knownUsers = new Set(currentUserList.map((user) => user.id));
  const search = searchInput?.value.trim().toLowerCase() || '';
  (data.users || []).forEach((user) => {
    const matchesSearch = !search || user.id.toLowerCase().includes(search) || user.label.toLowerCase().includes(search);
    if (!knownUsers.has(user.id) && matchesSearch) {
      currentUserList.push({ ...user, lastMessage: lastMessageByUser.get(user.id) || null });
      knownUsers.add(user.id);
    }
  });
  unreadUsers.clear();
  (data.userIds || []).forEach((userId) => {
    if (selectedPartner?.id !== userId) unreadUsers.add(userId);
  });
  renderUsers(currentUserList);
}

function updateChatListFromMessage(message) {
  if (!message.createdAt || message.type === 'call') return;
  const partnerId = message.fromId === currentUser?.id ? message.toId
    : message.toId === currentUser?.id ? message.fromId
      : null;
  if (!partnerId) return;

  const lastMessage = {
    id: message.messageId,
    fromId: message.fromId,
    text: message.text || '',
    type: message.type || 'text',
    createdAt: message.createdAt,
    stickerId: message.stickerId || null,
  };
  const previousMessage = lastMessageByUser.get(partnerId)
    || currentUserList.find((user) => user.id === partnerId)?.lastMessage;
  if (previousMessage && Date.parse(previousMessage.createdAt) > Date.parse(lastMessage.createdAt)) return;
  lastMessageByUser.set(partnerId, lastMessage);
  const partner = currentUserList.find((user) => user.id === partnerId)
    || (selectedPartner?.id === partnerId ? selectedPartner : null);
  if (partner) {
    partner.lastMessage = lastMessage;
    if (!currentUserList.some((user) => user.id === partnerId)) currentUserList.push(partner);
    renderUsers(currentUserList);
  }
}

async function searchUsers() {
  if (!searchInput) return;
  const search = searchInput.value.trim();
  const me = currentUser?.id || '';
  const response = await fetch(`/api/users?search=${encodeURIComponent(search)}&me=${encodeURIComponent(me)}`);
  const users = await response.json();
  if (!response.ok) throw new Error(users.error || 'Unable to load users.');
  renderUsers(users);
  await refreshUnreadIndicators();
}

let latestMessagesRequest = 0;
let renderedMessagesPartnerId = null;
let renderedMessagesSignature = '';
let mobileActionsTimeout = null;

function getMessagesSignature(messages) {
  return JSON.stringify(messages.map((message) => [
    message.id,
    message.deliveredAt,
    message.readAt,
    message.editedAt,
    message.text,
    message.reactions,
  ]));
}

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
  if (!response.ok) throw new Error(data.error || 'Unable to load chat.');

  // Requests from the interval may finish out of order. Do not let an old
  // response replace a newer chat or the newly selected conversation.
  if (requestNumber !== latestMessagesRequest || !selectedPartner || selectedPartner.id !== partnerId) return;

  const messages = data.messages || [];

  const hasUnreadIncoming = messages.some((message) =>
    message.fromId === partnerId && message.toId === currentUser.id && !message.readAt
  );
  if (hasUnreadIncoming) {
    try {
      const readResponse = await fetch('/api/chat/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ me: currentUser.id, other: partnerId }),
      });
      if (!readResponse.ok) throw new Error('Unable to mark chat messages as read.');
      const { readAt } = await readResponse.json();
      messages.forEach((message) => {
        if (message.fromId === partnerId && message.toId === currentUser.id && !message.readAt) {
          message.readAt = readAt;
        }
      });
    } catch (error) {
      console.error('Unable to mark chat messages as read:', error);
    }
  }
  unreadUsers.delete(partnerId);

  if (requestNumber !== latestMessagesRequest || !selectedPartner || selectedPartner.id !== partnerId) return;
  if (messagesBox.querySelector('.message-edit-form')) return;
  const signature = getMessagesSignature(messages);
  if (renderedMessagesPartnerId === partnerId && renderedMessagesSignature === signature) return;
  const wasAtBottom = messagesBox.scrollHeight - messagesBox.scrollTop - messagesBox.clientHeight < 40;
  messagesBox.innerHTML = '';

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
    renderedMessagesPartnerId = partnerId;
    renderedMessagesSignature = signature;
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

    const stickerUrl = item.type === 'sticker' ? (item.imageData || '/stickers/eto-realno.jpg') : null;
    if (stickerUrl) {
      const sticker = document.createElement('img');
      sticker.className = 'message-sticker';
      sticker.src = stickerUrl;
      sticker.alt = 'Sticker';
      div.appendChild(sticker);
    }

    let messageTextElement = null;
    if (item.text && item.type !== 'sticker') {
      const text = document.createElement('div');
      text.className = 'message-text';
      text.textContent = item.text;
      div.appendChild(text);
      messageTextElement = text;
    }

    if (item.imageData && item.type !== 'sticker') {
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
      if (item.editedAt) {
        const edited = document.createElement('span');
        edited.className = 'message-edited';
        edited.textContent = t('messageEdited');
        time.appendChild(edited);
      }
      div.appendChild(time);
    }

    const reactionUsers = item.reactions || {};
    const reactionOptions = [
      { key: 'heart', emoji: '❤️', label: t('reactionHeart') },
      { key: 'like', emoji: '👍', label: t('reactionLike') },
      { key: 'poop', emoji: '💩', label: t('reactionPoop') },
    ];
    const actions = document.createElement('div');
    actions.className = 'message-actions';
    const actionsToggle = document.createElement('button');
    actionsToggle.type = 'button';
    actionsToggle.className = 'message-actions-toggle';
    actionsToggle.setAttribute('aria-label', t('messageActionsTitle'));
    actionsToggle.setAttribute('title', t('messageActionsTitle'));
    actionsToggle.setAttribute('aria-expanded', 'false');
    actionsToggle.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.6" fill="currentColor"></circle><circle cx="12" cy="12" r="1.6" fill="currentColor"></circle><circle cx="19" cy="12" r="1.6" fill="currentColor"></circle></svg>';
    const actionsMenu = document.createElement('div');
    actionsMenu.className = 'message-actions-menu hidden';
    actionsToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = actionsMenu.classList.toggle('hidden') === false;
      actionsToggle.setAttribute('aria-expanded', String(open));
      if (!open && window.matchMedia('(hover: none)').matches) {
        clearTimeout(mobileActionsTimeout);
        mobileActionsTimeout = setTimeout(() => div.classList.remove('actions-visible'), 4000);
      }
    });
    actionsMenu.addEventListener('click', (event) => event.stopPropagation());
    div.addEventListener('click', (event) => {
      if (!window.matchMedia('(hover: none)').matches || event.target.closest('button')) return;
      document.querySelectorAll('.message.actions-visible').forEach((message) => {
        if (message !== div) message.classList.remove('actions-visible');
      });
      div.classList.add('actions-visible');
      clearTimeout(mobileActionsTimeout);
      mobileActionsTimeout = setTimeout(() => {
        if (actionsMenu.classList.contains('hidden')) div.classList.remove('actions-visible');
      }, 4000);
    });

    const reactionSummary = document.createElement('div');
    reactionSummary.className = 'message-reactions';
    const renderReactionSummary = () => {
      reactionSummary.replaceChildren();
      reactionOptions.forEach(({ key, emoji, label }) => {
        const users = Array.isArray(item.reactions?.[key]) ? item.reactions[key] : [];
        if (!users.length) return;
        const badge = document.createElement('span');
        badge.className = 'message-reaction-summary';
        badge.setAttribute('aria-label', `${label}: ${users.length}`);
        badge.textContent = `${emoji} ${users.length}`;
        reactionSummary.appendChild(badge);
      });
      reactionSummary.classList.toggle('hidden', reactionSummary.childElementCount === 0);
    };
    renderReactionSummary();
    div.appendChild(reactionSummary);

    const reactions = document.createElement('div');
    reactions.className = 'message-reaction-picker';
    const reactionButtons = [];
    reactionOptions.forEach(({ key, emoji, label }) => {
      const users = Array.isArray(reactionUsers[key]) ? reactionUsers[key] : [];
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'message-reaction-option';
      button.classList.toggle('active', users.includes(currentUser.id));
      button.setAttribute('aria-label', `${label}: ${users.length}`);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(users.includes(currentUser.id)));
      button.textContent = emoji;
      reactionButtons.push({ button, key, emoji, label });
      button.addEventListener('click', async () => {
        try {
          const response = await fetch('/api/chat/reactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId: item.id, reaction: key }),
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || 'Unable to update reaction.');
          item.reactions = result.reactions;
          reactionButtons.forEach(({ button: reactionButton, key: reactionKey, emoji: reactionEmoji, label: reactionLabel }) => {
            const usersForReaction = Array.isArray(item.reactions[reactionKey]) ? item.reactions[reactionKey] : [];
            const isActive = usersForReaction.includes(currentUser.id);
            reactionButton.classList.toggle('active', isActive);
            reactionButton.setAttribute('aria-label', `${reactionLabel}: ${usersForReaction.length}`);
            reactionButton.setAttribute('aria-pressed', String(isActive));
            reactionButton.textContent = reactionEmoji;
          });
          renderReactionSummary();
          renderedMessagesSignature = getMessagesSignature(messages);
        } catch (error) {
          alert(error.message);
        }
      });
      reactions.appendChild(button);
    });

    if (isMe && item.type !== 'call') {
      if (item.type === 'text' && messageTextElement) {
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'message-edit-btn';
        editButton.textContent = t('editMessage');
        editButton.addEventListener('click', () => {
          actionsMenu.classList.add('hidden');
          actionsToggle.setAttribute('aria-expanded', 'false');

          const form = document.createElement('form');
          form.className = 'message-edit-form';
          const textarea = document.createElement('textarea');
          textarea.className = 'message-edit-input';
          textarea.value = item.text;
          textarea.maxLength = 4000;
          textarea.setAttribute('aria-label', t('editMessage'));
          const controls = document.createElement('div');
          controls.className = 'message-edit-controls';
          const saveButton = document.createElement('button');
          saveButton.type = 'submit';
          saveButton.className = 'message-edit-save';
          saveButton.textContent = t('saveEdit');
          const cancelButton = document.createElement('button');
          cancelButton.type = 'button';
          cancelButton.className = 'message-edit-cancel';
          cancelButton.textContent = t('cancelEdit');
          cancelButton.addEventListener('click', () => {
            form.replaceWith(messageTextElement);
            renderedMessagesSignature = '';
            loadMessages().catch((error) => console.error('Unable to reload chat after cancelling edit:', error));
          });
          controls.append(saveButton, cancelButton);
          form.append(textarea, controls);
          messageTextElement.replaceWith(form);
          textarea.focus();
          textarea.setSelectionRange(textarea.value.length, textarea.value.length);
          form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const updatedText = textarea.value.trim();
            if (!updatedText || updatedText.length > 4000) return;
            saveButton.disabled = true;
            try {
              const response = await fetch(`/api/chat/${encodeURIComponent(item.id)}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: updatedText }),
              });
              const result = await response.json();
              if (!response.ok) throw new Error(result.error || t('errEditMessage'));
              form.remove();
              renderedMessagesSignature = '';
              await loadMessages();
            } catch (error) {
              alert(error.message || t('errEditMessage'));
              saveButton.disabled = false;
            }
          });
        });
        actionsMenu.appendChild(editButton);
      }

      const status = document.createElement('div');
      status.className = 'message-delivery-status';
      const statusKey = item.readAt ? 'messageRead'
        : item.deliveredAt ? 'messageDelivered'
          : 'messageSent';
      status.dataset.i18n = statusKey;
      status.textContent = t(statusKey);
      div.appendChild(status);

      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'message-delete-btn';
      deleteButton.textContent = t('deleteMessage');
      deleteButton.addEventListener('click', async () => {
        if (!window.confirm(t('confirmDeleteMessage'))) return;
        try {
          const response = await fetch(`/api/chat/${encodeURIComponent(item.id)}`, { method: 'DELETE' });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || 'Unable to delete message.');
          renderedMessagesSignature = '';
          await loadMessages();
        } catch (error) {
          alert(error.message);
        }
      });
      actionsMenu.appendChild(deleteButton);
    }

    actionsMenu.appendChild(reactions);
    actions.append(actionsToggle, actionsMenu);
    div.appendChild(actions);
    messagesBox.appendChild(div);
  });

  renderedMessagesPartnerId = partnerId;
  renderedMessagesSignature = signature;
  unreadUsers.delete(selectedPartner.id);

  if (wasAtBottom) messagesBox.scrollTop = messagesBox.scrollHeight;
}

let isSendingMessage = false;

async function sendMessage() {
  if (!currentUser || !selectedPartner) {
    alert(t('alertSelectPartner'));
    return;
  }

  const text = messageInput.value.trim();
  if ((!text && !pendingMessageImage) || isSendingMessage) return;

  clearTimeout(typingIdleTimeout);
  sendTypingState(false);
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
    attachmentPreview?.classList.add('hidden');
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
    if (!file || file.size > 5 * 1024 * 1024) return reject(new Error(t('errImageTooLarge')));
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
  profileAboutInput.value = currentUser.about || '';
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
    body: JSON.stringify({
      label: profileNameInput.value.trim(),
      about: profileAboutInput.value.trim(),
      avatarData: pendingAvatarImage,
    }),
  });
  const data = await response.json();
  if (!response.ok) return alert(data.error || 'Не удалось сохранить профиль.');
  currentUser = data.user;
  renderCurrentUserBadge();
  const currentUserEntry = currentUserList.find((user) => user.id === currentUser.id);
  if (currentUserEntry) Object.assign(currentUserEntry, currentUser);
  if (selectedPartner?.id === currentUser.id) updateChatHeader(currentUser);
  closeProfile();
  searchUsers();
}

const ICE_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }];
let callState = null;
let incomingCall = null;
let callSignalCursor = new Date(Date.now() - 5 * 60 * 1000).toISOString();
let realtimeEventSource = null;
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
    } else if (incomingCall && incomingCall.callId === signal.callId && ['hangup', 'decline', 'busy'].includes(signal.type)) {
      incomingCall = null;
      hideCallOverlay();
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
    console.error('Unable to check pending call signals:', error);
  }
}

function startRealtimeEvents() {
  realtimeEventSource = new EventSource('/api/events');
  const events = realtimeEventSource;
  let pendingChatMessages = [];
  let chatRefreshTimer = null;
  events.addEventListener('chat-message', (event) => {
    try {
      pendingChatMessages.push(JSON.parse(event.data));
      clearTimeout(chatRefreshTimer);
      chatRefreshTimer = setTimeout(() => {
        const messages = pendingChatMessages;
        pendingChatMessages = [];
        const hasNewIncomingChat = messages.some((message) =>
          message.toId === currentUser.id
          && !currentUserList.some((user) => user.id === message.fromId)
          && selectedPartner?.id !== message.fromId
        );
        messages.forEach(updateChatListFromMessage);
        if (messages.some((message) => message.toId === currentUser.id)) {
          const refreshChatList = hasNewIncomingChat ? searchUsers : refreshUnreadIndicators;
          refreshChatList().catch((error) => console.error('Unable to refresh chat list:', error));
        }
        if (selectedPartner && messages.some((message) => message.fromId === selectedPartner.id || message.toId === selectedPartner.id)) {
          loadMessages().catch((error) => console.error('Unable to refresh chat messages:', error));
        }
      }, 150);
    } catch (error) {
      console.error('Unable to process realtime chat event:', error);
    }
  });
  events.addEventListener('chat-typing', (event) => {
    try {
      receiveTypingState(JSON.parse(event.data));
    } catch (error) {
      console.error('Unable to process typing status:', error);
    }
  });
  events.addEventListener('account-deleted', () => {
    window.location.replace('/');
  });
  events.addEventListener('call-signal', (event) => {
    try {
      const signal = JSON.parse(event.data);
      if (signal.createdAt > callSignalCursor) callSignalCursor = signal.createdAt;
      handleCallSignal(signal).catch((error) => console.error('Unable to process call signal:', error));
    } catch (error) {
      console.error('Unable to process realtime call event:', error);
    }
  });
  events.onopen = () => {
    refreshUnreadIndicators().catch((error) => console.error('Unable to refresh chat list:', error));
    if (selectedPartner) loadMessages().catch((error) => console.error('Unable to refresh chat messages:', error));
    pollCallSignals();
  };
  events.onerror = () => console.warn('Realtime connection interrupted; the browser will reconnect automatically.');
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      refreshUnreadIndicators().catch((error) => console.error('Unable to refresh chat list:', error));
      if (selectedPartner) loadMessages().catch((error) => console.error('Unable to refresh chat messages:', error));
    }
  });
}

async function loadCurrentUser() {
  const response = await fetch('/api/auth/me');
  const data = await response.json();
  return data.user;
}

async function showAdminMessage(text, isError = false) {
  if (!adminMessage) return;
  adminMessage.textContent = text;
  adminMessage.style.color = isError ? 'var(--danger-text)' : 'var(--accent-ink)';
}

async function loadAdminUsers() {
  if (!adminUserList) return;

  const response = await fetch('/api/admin/users');
  const data = await response.json();

  if (!response.ok) {
    showAdminMessage(data.error || t('errNoAdminAccess'), true);
    return;
  }

  const adminUserCount = document.getElementById('adminUserCount');
  if (adminUserCount) adminUserCount.textContent = String(data.users.length);

  adminUserList.innerHTML = '';
  data.users.forEach((user) => {
    const card = document.createElement('div');
    card.className = 'admin-user-card';
    const deleteBtnText = t('btnDeleteUser');
    const resetBtnText = t('btnResetPassword');
    const initial = (user.label || user.id).charAt(0).toUpperCase();
    card.innerHTML = `<div class="admin-user-identity"><span class="admin-user-avatar" style="background:${getAvatarBg(user.label || user.id)}">${escapeHtml(initial)}</span><div><strong>${escapeHtml(user.label)}</strong><span>${escapeHtml(user.id)}</span></div></div><div class="admin-user-actions"><button type="button" class="admin-reset-btn">${escapeHtml(resetBtnText)}</button><button type="button" class="admin-delete-btn">${escapeHtml(deleteBtnText)}</button></div>`;

    card.querySelector('.admin-reset-btn').addEventListener('click', async () => {
      const newPassword = window.prompt(t('promptNewPassword', { id: user.id }));
      if (!newPassword) return;
      const resetResponse = await fetch(`/api/admin/users/${encodeURIComponent(user.id)}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      const result = await resetResponse.json();
      if (!resetResponse.ok) {
        showAdminMessage(result.error || t('errResetPassword'), true);
        return;
      }
      showAdminMessage(t('msgPasswordReset', { id: user.id }));
    });

    card.querySelector('.admin-delete-btn').addEventListener('click', async () => {
      if (!window.confirm(t('confirmDeleteUser', { id: user.id }))) return;
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
  adminPage.classList.toggle('dashboard-open', Boolean(data.admin));
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

  async function verifyChatSession() {
    if (!searchInput || !userList || !messagesBox) return;
    try {
      const user = await loadCurrentUser();
      if (!user) window.location.replace('/');
    } catch (error) {
      console.error('Unable to verify the chat session:', error);
    }
  }

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) verifyChatSession();
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) verifyChatSession();
  });

  renderCurrentUserBadge();
  updateChatHeader(null);
  startRealtimeEvents();
  loadMessages();
  searchUsers();
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
  registerIdInput?.addEventListener('input', updateUserIdRules);
  registerPasswordInput?.addEventListener('input', updatePasswordRules);
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
    if (!window.confirm(t('confirmDeleteAll'))) return;
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
  const toggleStickerMenu = () => {
    if (!stickerMenu) return;
    stickerMenu.classList.toggle('hidden');
  };
  stickerBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleStickerMenu();
  });
  document.addEventListener('click', (event) => {
    if (stickerMenu && stickerBtn && !stickerMenu.contains(event.target) && !stickerBtn.contains(event.target)) {
      stickerMenu.classList.add('hidden');
    }
    document.querySelectorAll('.message-actions-menu:not(.hidden)').forEach((menu) => {
      if (menu.contains(event.target)) return;
      menu.classList.add('hidden');
      menu.parentElement?.querySelector('.message-actions-toggle')?.setAttribute('aria-expanded', 'false');
    });
    if (!event.target.closest('.message')) {
      document.querySelectorAll('.message.actions-visible').forEach((message) => message.classList.remove('actions-visible'));
    }
  });
  etoRealnoSticker?.addEventListener('click', async () => {
    if (!currentUser || !selectedPartner) {
      alert(t('alertSelectPartner'));
      return;
    }
    stickerMenu?.classList.add('hidden');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromId: currentUser.id,
          toId: selectedPartner.id,
          stickerId: 'eto-realno',
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to send sticker.');
      }
      await loadMessages();
    } catch (error) {
      alert(error.message);
    }
  });
  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('input', () => {
    clearTimeout(typingIdleTimeout);
    if (!messageInput.value.trim()) {
      sendTypingState(false);
      return;
    }
    sendTypingState(true);
    typingIdleTimeout = setTimeout(() => sendTypingState(false), 2200);
  });
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      clearTimeout(typingIdleTimeout);
      sendTypingState(false);
      sendMessage();
    }
  });
  audioCallBtn?.addEventListener('click', () => startCall('audio'));
  videoCallBtn?.addEventListener('click', () => startCall('video'));
  acceptCallBtn?.addEventListener('click', acceptIncomingCall);
  declineCallBtn?.addEventListener('click', declineIncomingCall);
  endCallBtn?.addEventListener('click', () => endCurrentCall());
  imageInput?.addEventListener('change', async () => {
    try {
      const file = imageInput.files[0];
      pendingMessageImage = await readImage(file);
      attachmentPreviewImage.src = pendingMessageImage;
      attachmentPreviewName.textContent = file.name;
      attachmentPreview?.classList.remove('hidden');
    } catch (error) {
      pendingMessageImage = null;
      imageInput.value = '';
      attachmentPreview?.classList.add('hidden');
      alert(error.message);
    }
  });
  removeAttachmentBtn?.addEventListener('click', () => {
    pendingMessageImage = null;
    if (imageInput) imageInput.value = '';
    attachmentPreview?.classList.add('hidden');
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
