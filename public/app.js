const translations = {
  ru: {
    appTitle: 'ВМаксате',
    authSubtitle: 'Регистрация и вход в ваш аккаунт',
    tabRegister: 'Регистрация',
    tabLogin: 'Войти',
    labelYourUserId: 'Ваш user id',
    phRegisterId: 'Например: user-42',
    userIdRuleAllowed: 'Только латинские буквы и цифры',
    userIdRuleLength: 'От 3 до 20 символов',
    userIdRuleLetters: 'Есть латинские буквы',
    userIdRuleDigits: 'Есть цифры',
    userIdInvalid: 'User ID должен соответствовать правилам ниже.',
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
    createGroup: 'Создать группу',
    previewYou: 'Вы',
    previewImage: 'Фото',
    previewSticker: 'Стикер',
    previewVoice: 'Голосовое сообщение',
    previewCall: 'Звонок',
    groupInfo: 'Информация о группе',
    groupChat: 'Групповой чат',
    partnerInfo: 'Информация о собеседнике',
    blockUser: 'Заблокировать',
    unblockUser: 'Разблокировать',
    blocked: 'Пользователь заблокирован.',
    unblocked: 'Пользователь разблокирован.',
    exportChat: 'Экспорт чата',
    globalSearch: 'Поиск по всем чатам',
    searchResults: 'Результаты поиска',
    searchContacts: 'Контакты',
    searchMessages: 'Сообщения',
    searchPrompt: 'Поиск по сообщениям и контактам:',
    searchNoResults: 'Ничего не найдено.',
    groupNamePrompt: 'Название группы:',
    groupMembersPrompt: 'Введите ID участников через запятую:',
    groupCreated: 'Группа создана.',
    groupMembers: 'Участники',
    closeBtnLabel: 'Закрыть',
    copyMessage: 'Копировать',
    fileTooLarge: 'Файл слишком большой.',
    errLoadChats: 'Не удалось загрузить чаты.',
    errSearchUsers: 'Не удалось выполнить поиск.',
    errBlockUser: 'Не удалось изменить блокировку.',
    errCreateGroup: 'Не удалось создать группу.',
    errSendMessage: 'Не удалось отправить сообщение.',
    errEditMessage: 'Не удалось изменить сообщение.',
    errGroupInfo: 'Не удалось загрузить информацию о группе.',
    errExport: 'Не удалось экспортировать чат.',
    errSendSticker: 'Не удалось отправить стикер.',
    confirmBlockUser: 'Заблокировать этого пользователя?',
    confirmUnblockUser: 'Разблокировать этого пользователя?',
    groupAdmin: 'Администратор',
    dialogCaption: 'Диалог',
    selectPartnerPlaceholder: 'Выберите собеседника',
    phMessage: 'Напишите сообщение...',
    sendBtn: 'Отправить',
    alertSelectPartner: 'Сначала войдите в аккаунт и выберите собеседника.',
    audioCallTitle: 'Аудиозвонок', videoCallTitle: 'Видеозвонок', acceptCallTitle: 'Ответить', declineCallTitle: 'Отклонить', endCallTitle: 'Завершить звонок',
    callIncoming: 'Входящий звонок...', callCalling: 'Звоним...', callConnecting: 'Подключение...', callInProgress: 'В звонке', callDeclined: 'Звонок отклонён', callBusy: 'Пользователь уже разговаривает',
    callMediaError: 'Не удалось получить доступ к микрофону или камере.', callUnsupported: 'Звонки не поддерживаются этим браузером.',
    profileBtn: 'Профиль', profileTitle: 'Профиль', profileNameLabel: 'Имя', profileUserIdLabel: 'User ID', saveProfileBtn: 'Сохранить', attachPhotoTitle: 'Прикрепить фото',
    errImageTooLarge: 'Фото должно быть не больше 5 МБ.',
    callAudio: 'Аудиозвонок', callVideo: 'Видеозвонок', callMissed: 'Пропущенный {mode}', callCompleted: '{mode}', callDeclinedLog: 'Отклонённый {mode}',
    messageSent: 'Отправлено', messageDelivered: 'Доставлено', messageRead: 'Прочитано',
    deleteMessage: 'Удалить', confirmDeleteMessage: 'Удалить это сообщение? Это действие нельзя отменить.',
    reactionHeart: 'Сердце', reactionLike: 'Нравится', reactionPoop: 'Какашка',
    messageActionsTitle: 'Действия с сообщением',
    replyMessage: 'Ответить',
    editMessage: 'Редактировать',
    saveChanges: 'Сохранить',
    cancelEdit: 'Отмена',

    // Admin page
    adminTitle: 'Admin Panel',
    adminSubtitle: 'Доступ только по паролю',
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
    errInvalidPassword: 'Неверный пароль.'
  },
  en: {
    appTitle: 'VMaksate',
    authSubtitle: 'Registration and sign in to your account',
    tabRegister: 'Register',
    tabLogin: 'Sign In',
    labelYourUserId: 'Your User ID',
    phRegisterId: 'Example: user-42',
    userIdRuleAllowed: 'Latin letters and digits only',
    userIdRuleLength: '3 to 20 characters',
    userIdRuleLetters: 'Contains Latin letters',
    userIdRuleDigits: 'Contains digits',
    userIdInvalid: 'User ID must follow the rules below.',
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
    createGroup: 'Create group',
    previewYou: 'You',
    previewImage: 'Photo',
    previewSticker: 'Sticker',
    previewVoice: 'Voice message',
    previewCall: 'Call',
    groupInfo: 'Group info',
    groupChat: 'Group chat',
    partnerInfo: 'Contact info',
    blockUser: 'Block user',
    unblockUser: 'Unblock user',
    blocked: 'User blocked.',
    unblocked: 'User unblocked.',
    exportChat: 'Export chat',
    globalSearch: 'Search all chats',
    searchResults: 'Search results',
    searchContacts: 'Contacts',
    searchMessages: 'Messages',
    searchPrompt: 'Search messages and contacts:',
    searchNoResults: 'No results found.',
    groupNamePrompt: 'Group name:',
    groupMembersPrompt: 'Enter member IDs separated by commas:',
    groupCreated: 'Group created.',
    groupMembers: 'Members',
    closeBtnLabel: 'Close',
    copyMessage: 'Copy',
    fileTooLarge: 'File is too large.',
    errLoadChats: 'Unable to load chats.',
    errSearchUsers: 'Unable to search.',
    errBlockUser: 'Unable to update the block.',
    errCreateGroup: 'Unable to create the group.',
    errSendMessage: 'Unable to send the message.',
    errEditMessage: 'Unable to edit the message.',
    errGroupInfo: 'Unable to load group information.',
    errExport: 'Unable to export the chat.',
    errSendSticker: 'Unable to send the sticker.',
    confirmBlockUser: 'Block this user?',
    confirmUnblockUser: 'Unblock this user?',
    groupAdmin: 'Admin',
    dialogCaption: 'Conversation',
    selectPartnerPlaceholder: 'Select a conversation',
    phMessage: 'Type a message...',
    sendBtn: 'Send',
    alertSelectPartner: 'Please sign in and select a user first.',
    audioCallTitle: 'Audio call', videoCallTitle: 'Video call', acceptCallTitle: 'Answer', declineCallTitle: 'Decline', endCallTitle: 'End call',
    callIncoming: 'Incoming call...', callCalling: 'Calling...', callConnecting: 'Connecting...', callInProgress: 'In call', callDeclined: 'Call declined', callBusy: 'User is already in a call',
    callMediaError: 'Unable to access the microphone or camera.', callUnsupported: 'Calls are not supported by this browser.',
    profileBtn: 'Profile', profileTitle: 'Profile', profileNameLabel: 'Name', profileUserIdLabel: 'User ID', saveProfileBtn: 'Save', attachPhotoTitle: 'Attach photo',
    errImageTooLarge: 'Image must be 5 MB or smaller.',
    callAudio: 'Audio call', callVideo: 'Video call', callMissed: 'Missed {mode}', callCompleted: '{mode}', callDeclinedLog: 'Declined {mode}',
    messageSent: 'Sent', messageDelivered: 'Delivered', messageRead: 'Read',
    deleteMessage: 'Delete', confirmDeleteMessage: 'Delete this message? This cannot be undone.',
    reactionHeart: 'Heart', reactionLike: 'Like', reactionPoop: 'Poop',
    messageActionsTitle: 'Message actions',
    replyMessage: 'Reply',
    editMessage: 'Edit',
    saveChanges: 'Save',
    cancelEdit: 'Cancel',

    // Admin page
    adminTitle: 'Admin Panel',
    adminSubtitle: 'Password restricted access',
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
    errInvalidPassword: 'Invalid password.'
  },
  es: {
    appTitle: 'VMaksate',
    authSubtitle: 'Registro e inicio de sesión en su cuenta',
    tabRegister: 'Registro',
    tabLogin: 'Iniciar sesión',
    labelYourUserId: 'Su ID de usuario',
    phRegisterId: 'Ejemplo: user-42',
    userIdRuleAllowed: 'Solo letras latinas y números',
    userIdRuleLength: 'De 3 a 20 caracteres',
    userIdRuleLetters: 'Contiene letras latinas',
    userIdRuleDigits: 'Contiene números',
    userIdInvalid: 'El ID de usuario debe cumplir las reglas siguientes.',
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
    createGroup: 'Crear grupo',
    previewYou: 'Tú',
    previewImage: 'Foto',
    previewSticker: 'Sticker',
    previewVoice: 'Mensaje de voz',
    previewCall: 'Llamada',
    groupInfo: 'Información del grupo',
    groupChat: 'Chat grupal',
    partnerInfo: 'Información del contacto',
    blockUser: 'Bloquear usuario',
    unblockUser: 'Desbloquear usuario',
    blocked: 'Usuario bloqueado.',
    unblocked: 'Usuario desbloqueado.',
    exportChat: 'Exportar chat',
    globalSearch: 'Buscar en todos los chats',
    searchResults: 'Resultados de búsqueda',
    searchContacts: 'Contactos',
    searchMessages: 'Mensajes',
    searchPrompt: 'Buscar mensajes y contactos:',
    searchNoResults: 'No se encontraron resultados.',
    groupNamePrompt: 'Nombre del grupo:',
    groupMembersPrompt: 'Ingrese los ID separados por comas:',
    groupCreated: 'Grupo creado.',
    groupMembers: 'Miembros',
    closeBtnLabel: 'Cerrar',
    copyMessage: 'Copiar',
    fileTooLarge: 'El archivo es demasiado grande.',
    errLoadChats: 'No se pudieron cargar los chats.',
    errSearchUsers: 'No se pudo realizar la búsqueda.',
    errBlockUser: 'No se pudo actualizar el bloqueo.',
    errCreateGroup: 'No se pudo crear el grupo.',
    errSendMessage: 'No se pudo enviar el mensaje.',
    errEditMessage: 'No se pudo editar el mensaje.',
    errGroupInfo: 'No se pudo cargar la información del grupo.',
    errExport: 'No se pudo exportar el chat.',
    errSendSticker: 'No se pudo enviar el sticker.',
    confirmBlockUser: '¿Bloquear a este usuario?',
    confirmUnblockUser: '¿Desbloquear a este usuario?',
    groupAdmin: 'Administrador',
    dialogCaption: 'Diálogo',
    selectPartnerPlaceholder: 'Seleccione un interlocutor',
    phMessage: 'Escriba un mensaje...',
    sendBtn: 'Enviar',
    alertSelectPartner: 'Primero inicie sesión y seleccione un interlocutor.',
    audioCallTitle: 'Llamada de audio', videoCallTitle: 'Videollamada', acceptCallTitle: 'Responder', declineCallTitle: 'Rechazar', endCallTitle: 'Finalizar llamada',
    callIncoming: 'Llamada entrante...', callCalling: 'Llamando...', callConnecting: 'Conectando...', callInProgress: 'En llamada', callDeclined: 'Llamada rechazada', callBusy: 'El usuario ya está en una llamada',
    callMediaError: 'No se pudo acceder al micrófono o la cámara.', callUnsupported: 'Este navegador no admite llamadas.',
    profileBtn: 'Perfil', profileTitle: 'Perfil', profileNameLabel: 'Nombre', profileUserIdLabel: 'ID de usuario', saveProfileBtn: 'Guardar', attachPhotoTitle: 'Adjuntar foto',
    errImageTooLarge: 'La imagen debe tener 5 MB o menos.',
    callAudio: 'Llamada de audio', callVideo: 'Videollamada', callMissed: 'Llamada perdida: {mode}', callCompleted: '{mode}', callDeclinedLog: '{mode} rechazada',
    messageSent: 'Enviado', messageDelivered: 'Entregado', messageRead: 'Leído',
    deleteMessage: 'Eliminar', confirmDeleteMessage: '¿Eliminar este mensaje? Esta acción no se puede deshacer.',
    reactionHeart: 'Corazón', reactionLike: 'Me gusta', reactionPoop: 'Caca',
    messageActionsTitle: 'Acciones del mensaje',
    replyMessage: 'Responder',
    editMessage: 'Editar',
    saveChanges: 'Guardar',
    cancelEdit: 'Cancelar',

    // Admin page
    adminTitle: 'Panel de Admin',
    adminSubtitle: 'Acceso restringido por contraseña',
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

function getUserIdRuleStatuses(value) {
  return {
    allowed: /^[A-Za-z0-9]*$/.test(value),
    length: value.length >= 3 && value.length <= 20,
    letters: /[A-Za-z]/.test(value),
    digits: /[0-9]/.test(value),
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
let blockedUsersCache = [];

const authPage = document.getElementById('authPage');
const registerForm = document.getElementById('registerForm');
const registerIdInput = document.getElementById('registerId');
const userIdRules = document.getElementById('userIdRules');
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
const globalSearchBtn = document.getElementById('globalSearchBtn');
const userList = document.getElementById('userList');
const messagesBox = document.getElementById('messages');
const chatPanel = document.querySelector('.chat-panel');
const chatPartner = document.getElementById('chatPartner');
const partnerAvatar = document.getElementById('partnerAvatar');
const partnerAbout = document.getElementById('partnerAbout');
const partnerPresence = document.getElementById('partnerPresence');
const chatSearchBtn = document.getElementById('chatSearchBtn');
const chatSearchBar = document.getElementById('chatSearchBar');
const chatSearchInput = document.getElementById('chatSearchInput');
const chatSearchStatus = document.getElementById('chatSearchStatus');
const chatSearchPrev = document.getElementById('chatSearchPrev');
const chatSearchNext = document.getElementById('chatSearchNext');
const chatSearchClose = document.getElementById('chatSearchClose');
const replyBar = document.getElementById('replyBar');
const replyBarName = document.getElementById('replyBarName');
const replyBarText = document.getElementById('replyBarText');
const replyCancelBtn = document.getElementById('replyCancelBtn');
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
const fileInput = document.getElementById('fileInput');
const emojiBtn = document.getElementById('emojiBtn');
const emojiMenu = document.getElementById('emojiMenu');
const stickerBtn = document.getElementById('stickerBtn');
const stickerMenu = document.getElementById('stickerMenu');
const etoRealnoSticker = document.getElementById('etoRealnoSticker');
const newGroupBtn = document.getElementById('newGroupBtn');
const groupInfoBtn = document.getElementById('groupInfoBtn');
const blockUserBtn = document.getElementById('blockUserBtn');
const exportChatBtn = document.getElementById('exportChatBtn');
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
let pendingReplyMessage = null;

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
    chatPanel?.classList.add('no-chat');
    if (partnerAbout) {
      partnerAbout.textContent = '';
      partnerAbout.classList.add('hidden');
    }
    if (chatSearchBtn) chatSearchBtn.disabled = true;
    chatSearchBar?.classList.add('hidden');
    if (groupInfoBtn) groupInfoBtn.hidden = true;
    if (blockUserBtn) blockUserBtn.hidden = true;
    if (exportChatBtn) exportChatBtn.disabled = true;
    if (partnerAvatar) partnerAvatar.classList.add('hidden');
    if (audioCallBtn) audioCallBtn.disabled = true;
    if (videoCallBtn) videoCallBtn.disabled = true;
    return;
  }
  chatPanel?.classList.remove('no-chat');
  if (chatSearchBtn) chatSearchBtn.disabled = false;
  if (groupInfoBtn) {
    groupInfoBtn.hidden = false;
    groupInfoBtn.title = t(user.type === 'group' ? 'groupInfo' : 'partnerInfo');
    groupInfoBtn.setAttribute('aria-label', groupInfoBtn.title);
  }
  if (blockUserBtn) {
    blockUserBtn.hidden = user.type === 'group';
    const isBlocked = blockedUsersCache.some((entry) => String(entry.id) === String(user.partnerId || user.id));
    blockUserBtn.title = t(isBlocked ? 'unblockUser' : 'blockUser');
    blockUserBtn.setAttribute('aria-label', blockUserBtn.title);
  }
  if (exportChatBtn) exportChatBtn.disabled = false;
  chatPartner.textContent = user.label;
  if (partnerAbout) {
    partnerAbout.textContent = user.type === 'group'
      ? `${user.memberCount || 0} ${t('groupMembers').toLowerCase()}`
      : user.about || '';
    partnerAbout.classList.toggle('hidden', !partnerAbout.textContent);
  }
  if (partnerAvatar) {
    partnerAvatar.classList.remove('hidden');
    partnerAvatar.style.background = user.avatarData ? `url("${user.avatarData}") center / cover` : getAvatarBg(user.label || user.id);
    partnerAvatar.classList.toggle('avatar-photo', Boolean(user.avatarData));
    partnerAvatar.textContent = (user.label || user.id).charAt(0).toUpperCase();
  }
  const callsUnavailable = user.type === 'group' || !window.RTCPeerConnection || !navigator.mediaDevices?.getUserMedia;
  if (audioCallBtn) audioCallBtn.disabled = callsUnavailable;
  if (videoCallBtn) videoCallBtn.disabled = callsUnavailable;
}

function getLastMessagePreview(message) {
  if (!message) return '';
  if (message.type === 'image') return t('previewImage');
  if (message.type === 'sticker') return t('previewSticker');
  if (message.type === 'audio') return t('previewVoice');
  if (message.type === 'call') return t('previewCall');
  return String(message.text || '');
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
  updateUserIdRules();

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
  const idInput = form.querySelector('input[name="id"]');
  const id = mode === 'register' ? idInput.value : idInput.value.trim();
  const label = form.querySelector('input[name="label"]')?.value.trim() || '';
  const password = form.querySelector('input[name="password"]').value.trim();

  if (mode === 'register' && !isValidUserId(id)) {
    updateUserIdRules();
    idInput.reportValidity();
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
    if (user.lastMessage) {
      const preview = document.createElement('div');
      preview.className = 'user-item-preview';
      const previewText = getLastMessagePreview(user.lastMessage);
      preview.textContent = user.lastMessage.fromId === currentUser?.id
        ? `${t('previewYou')}: ${previewText}`
        : previewText;
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
      setReplyToMessage(null);
      selectedPartner = user;
      updateChatHeader(user);
      document.querySelector('.chat-panel')?.classList.remove('no-chat');
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
      currentUserList.push(user);
      knownUsers.add(user.id);
    }
  });
  unreadUsers.clear();
  (data.userIds || []).forEach((userId) => {
    if (selectedPartner?.id !== userId) unreadUsers.add(userId);
  });
  await loadChats();
}

async function loadChats() {
  if (!currentUser || !userList) return;
  try {
    const [chatsResponse, usersResponse, blockedResponse] = await Promise.all([
      fetch('/api/chats'),
      fetch(`/api/users?me=${encodeURIComponent(currentUser.id)}`),
      fetch('/api/users/blocked'),
    ]);
    const [chatsData, users, blockedData] = await Promise.all([
      chatsResponse.json(),
      usersResponse.json(),
      blockedResponse.json(),
    ]);
    for (const [response, data] of [
      [chatsResponse, chatsData],
      [usersResponse, users],
      [blockedResponse, blockedData],
    ]) {
      if (!response.ok) throw new Error(data.error || t('errLoadChats'));
    }

    blockedUsersCache = Array.isArray(blockedData.users) ? blockedData.users : [];
    const usersById = new Map((users || []).map((user) => [String(user.id), user]));
    const conversations = (chatsData.chats || []).map((chat) => {
      if (chat.type === 'group') {
        return {
          id: String(chat.id),
          chatId: String(chat.id),
          type: 'group',
          label: chat.name || t('groupChat'),
          avatarData: chat.avatarData || null,
          memberCount: chat.memberCount || 0,
          lastMessage: chat.lastMessage || null,
        };
      }
      const partnerId = String(chat.partnerId || '');
      const user = usersById.get(partnerId);
      return {
        id: partnerId,
        partnerId,
        type: 'direct',
        label: user?.label || chat.partnerLabel || partnerId,
        avatarData: user?.avatarData || null,
        about: user?.about || '',
        lastMessage: chat.lastMessage || user?.lastMessage || null,
      };
    }).filter((conversation) => conversation.type === 'group'
      || !blockedUsersCache.some((user) => String(user.id) === String(conversation.partnerId)));
    renderUsers(conversations);
    if (selectedPartner) {
      const latest = conversations.find((user) => user.id === selectedPartner.id);
      if (latest) {
        selectedPartner = { ...selectedPartner, ...latest };
        updateChatHeader(selectedPartner);
      }
    }
  } catch (error) {
    console.error('Unable to load chats:', error);
    alert(error.message || t('errLoadChats'));
  }
}

async function searchUsers() {
  if (!searchInput) return;
  const search = searchInput.value.trim();
  if (!search) {
    await loadChats();
    return;
  }
  const me = currentUser?.id || '';
  try {
    const response = await fetch(`/api/users?search=${encodeURIComponent(search)}&me=${encodeURIComponent(me)}`);
    const users = await response.json();
    if (!response.ok) throw new Error(users.error || t('errSearchUsers'));
    renderUsers(users);
  } catch (error) {
    console.error('Unable to search users:', error);
    alert(error.message || t('errSearchUsers'));
  }
}

async function updateBlock(targetId, block) {
  const response = await fetch(`/api/users/${encodeURIComponent(targetId)}/block`, {
    method: block ? 'POST' : 'DELETE',
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || t('errBlockUser'));
  await loadChats();
}

async function openConversationInfo() {
  if (!selectedPartner) return;
  let details = selectedPartner;
  let members = [];
  if (selectedPartner.type === 'group') {
    const response = await fetch(`/api/chats/${encodeURIComponent(selectedPartner.chatId || selectedPartner.id)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || t('errGroupInfo'));
    details = data.chat;
    members = data.members || [];
  }

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const modal = document.createElement('div');
  modal.className = 'modal card';
  const header = document.createElement('div');
  header.className = 'modal-header';
  const title = document.createElement('strong');
  title.textContent = t(selectedPartner.type === 'group' ? 'groupInfo' : 'partnerInfo');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'close-btn';
  close.textContent = '×';
  close.setAttribute('aria-label', t('closeBtnLabel'));
  close.addEventListener('click', () => overlay.remove());
  header.append(title, close);
  modal.appendChild(header);

  const body = document.createElement('div');
  body.style.cssText = 'padding:16px 20px;max-height:60vh;overflow:auto;';
  const name = document.createElement('strong');
  name.textContent = details.label || details.name || selectedPartner.label || '';
  body.appendChild(name);
  const id = document.createElement('div');
  id.style.cssText = 'margin-top:6px;color:var(--muted);font-size:13px;';
  id.textContent = selectedPartner.type === 'group' ? details.id : `@${details.id || selectedPartner.id}`;
  body.appendChild(id);
  if (details.about) {
    const about = document.createElement('p');
    about.style.cssText = 'margin:12px 0 0;white-space:pre-wrap;';
    about.textContent = details.about;
    body.appendChild(about);
  }
  if (members.length) {
    const heading = document.createElement('h3');
    heading.style.cssText = 'margin:18px 0 8px;font-size:14px;';
    heading.textContent = `${t('groupMembers')} (${members.length})`;
    body.appendChild(heading);
    members.forEach((member) => {
      const row = document.createElement('div');
      row.style.cssText = 'padding:6px 0;border-top:1px solid var(--border);font-size:13px;';
      row.textContent = `${member.user?.label || member.userId}${member.role === 'admin' ? ` · ${t('groupAdmin')}` : ''}`;
      body.appendChild(row);
    });
  }
  modal.appendChild(body);
  overlay.appendChild(modal);
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
}

async function exportChat() {
  if (!selectedPartner) return;
  try {
    const chatId = selectedPartner.type === 'group'
      ? selectedPartner.chatId || selectedPartner.id
      : `direct::${selectedPartner.partnerId || selectedPartner.id}`;
    const response = await fetch(`/api/export/${encodeURIComponent(chatId)}`);
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || t('errExport'));
    }
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-${selectedPartner.id}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } catch (error) {
    alert(error.message || t('errExport'));
  }
}

async function globalSearch() {
  const query = window.prompt(t('searchPrompt'));
  if (!query?.trim()) return;
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || t('errSearchUsers'));

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'modal card';
    modal.style.cssText = 'max-height:75vh;display:flex;flex-direction:column;';
    const header = document.createElement('div');
    header.className = 'modal-header';
    const heading = document.createElement('strong');
    heading.textContent = t('searchResults');
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'close-btn';
    close.textContent = '×';
    close.setAttribute('aria-label', t('closeBtnLabel'));
    close.addEventListener('click', () => overlay.remove());
    header.append(heading, close);
    modal.appendChild(header);
    const results = document.createElement('div');
    results.style.cssText = 'padding:12px 20px;overflow:auto;';
    const appendSection = (titleText, rows, format) => {
      const sectionTitle = document.createElement('h3');
      sectionTitle.style.cssText = 'margin:8px 0;font-size:13px;';
      sectionTitle.textContent = titleText;
      results.appendChild(sectionTitle);
      if (!rows.length) {
        const empty = document.createElement('div');
        empty.style.cssText = 'padding:6px 0;color:var(--muted);font-size:13px;';
        empty.textContent = t('searchNoResults');
        results.appendChild(empty);
      }
      rows.forEach((rowData) => {
        const row = document.createElement('div');
        row.style.cssText = 'padding:8px 0;border-top:1px solid var(--border);font-size:13px;';
        row.textContent = format(rowData);
        results.appendChild(row);
      });
    };
    appendSection(t('searchContacts'), data.users || [], (user) => `${user.label || user.id} (@${user.id})`);
    appendSection(t('searchMessages'), data.messages || [], (message) =>
      `${message.fromId === currentUser?.id ? t('previewYou') : message.fromId}: ${message.text || getLastMessagePreview(message)}`
    );
    modal.appendChild(results);
    overlay.appendChild(modal);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) overlay.remove();
    });
    document.body.appendChild(overlay);
  } catch (error) {
    alert(error.message || t('errSearchUsers'));
  }
}

let chatSearchMatches = [];
let chatSearchIndex = -1;

function applyChatSearch() {
  if (!messagesBox) return;
  const query = chatSearchInput?.value.trim().toLowerCase() || '';
  messagesBox.querySelectorAll('.message').forEach((message) => {
    message.classList.remove('search-hit', 'search-current');
  });
  chatSearchMatches = query
    ? Array.from(messagesBox.querySelectorAll('.message'))
      .filter((message) => (message.dataset.searchText || '').includes(query))
    : [];
  chatSearchMatches.forEach((message) => message.classList.add('search-hit'));
  chatSearchIndex = chatSearchMatches.length ? chatSearchMatches.length - 1 : -1;
  if (chatSearchIndex >= 0) {
    const match = chatSearchMatches[chatSearchIndex];
    match.classList.add('search-current');
    match.scrollIntoView({ block: 'center', behavior: 'smooth' });
    chatSearchStatus.textContent = `${chatSearchMatches.length}/${chatSearchMatches.length}`;
  } else {
    chatSearchStatus.textContent = query ? t('searchNoResults') : '';
  }
}

function moveChatSearch(direction) {
  if (!chatSearchMatches.length) return;
  chatSearchMatches[chatSearchIndex]?.classList.remove('search-current');
  chatSearchIndex = (chatSearchIndex + direction + chatSearchMatches.length) % chatSearchMatches.length;
  const match = chatSearchMatches[chatSearchIndex];
  match.classList.add('search-current');
  match.scrollIntoView({ block: 'center', behavior: 'smooth' });
  chatSearchStatus.textContent = `${chatSearchIndex + 1}/${chatSearchMatches.length}`;
}

function insertEmoji(emoji) {
  if (!messageInput) return;
  const start = messageInput.selectionStart ?? messageInput.value.length;
  const end = messageInput.selectionEnd ?? start;
  messageInput.setRangeText(emoji, start, end, 'end');
  messageInput.focus();
}

function buildEmojiMenu() {
  if (!emojiMenu || emojiMenu.childElementCount) return;
  const emojis = ['😀', '😄', '😊', '😍', '🤔', '😎', '😂', '😭', '😡', '🥳', '🤗', '👍', '👎', '🙏', '👏', '💪', '🔥', '❤️', '🎉', '💩'];
  emojis.forEach((emoji) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'emoji-option';
    option.textContent = emoji;
    option.addEventListener('click', () => {
      insertEmoji(emoji);
      emojiMenu.classList.add('hidden');
    });
    emojiMenu.appendChild(option);
  });
}

async function sendSticker(stickerId) {
  if (!currentUser || !selectedPartner) {
    alert(t('alertSelectPartner'));
    return;
  }
  try {
    const body = { fromId: currentUser.id, stickerId };
    if (selectedPartner.type === 'group') body.chatId = selectedPartner.chatId || selectedPartner.id;
    else body.toId = selectedPartner.partnerId || selectedPartner.id;
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || t('errSendSticker'));
    stickerMenu?.classList.add('hidden');
    await loadMessages();
  } catch (error) {
    alert(error.message || t('errSendSticker'));
  }
}

async function sendEmojiSticker(emoji) {
  if (!currentUser || !selectedPartner) {
    alert(t('alertSelectPartner'));
    return;
  }
  const body = { fromId: currentUser.id, text: emoji };
  if (selectedPartner.type === 'group') body.chatId = selectedPartner.chatId || selectedPartner.id;
  else body.toId = selectedPartner.partnerId || selectedPartner.id;
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || t('errSendSticker'));
    stickerMenu?.classList.add('hidden');
    await loadMessages();
  } catch (error) {
    alert(error.message || t('errSendSticker'));
  }
}

let latestMessagesRequest = 0;
let renderedMessagesPartnerId = null;
let renderedMessagesSignature = '';
let mobileActionsTimeout = null;

function getMessagesSignature(messages) {
  return JSON.stringify(messages.map((message) => [
    message.id,
    message.text,
    message.editedAt,
    message.replyTo,
    message.deliveredAt,
    message.readAt,
    message.reactions,
  ]));
}

function setReplyToMessage(message) {
  pendingReplyMessage = message || null;
  if (!replyBar || !replyBarName || !replyBarText) return;
  if (!message) {
    replyBar.classList.add('hidden');
    replyBarName.textContent = '';
    replyBarText.textContent = '';
    return;
  }
  replyBarName.textContent = message.fromId === currentUser?.id
    ? t('previewYou')
    : selectedPartner?.type === 'group' ? message.fromId : selectedPartner?.label || message.fromId;
  replyBarText.textContent = getLastMessagePreview(message) || message.text || '';
  replyBar.classList.remove('hidden');
  messageInput?.focus();
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
  const chatUrl = selectedPartner.type === 'group'
    ? `/api/chat?me=${encodeURIComponent(currentUser.id)}&chatId=${encodeURIComponent(selectedPartner.chatId || partnerId)}`
    : `/api/chat?me=${encodeURIComponent(currentUser.id)}&other=${encodeURIComponent(selectedPartner.partnerId || partnerId)}`;
  const response = await fetch(chatUrl);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Unable to load chat.');

  // Requests from the interval may finish out of order. Do not let an old
  // response replace a newer chat or the newly selected conversation.
  if (requestNumber !== latestMessagesRequest || !selectedPartner || selectedPartner.id !== partnerId) return;

  const messages = data.messages || [];

  const hasUnreadIncoming = selectedPartner.type !== 'group' && messages.some((message) =>
    message.fromId === (selectedPartner.partnerId || partnerId) && message.toId === currentUser.id && !message.readAt
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
    div.dataset.messageId = String(item.id);
    div.dataset.searchText = String(item.text || '').toLowerCase();

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

    if (item.replyTo) {
      const quote = document.createElement('button');
      quote.type = 'button';
      quote.className = 'message-quote';
      const author = document.createElement('span');
      author.className = 'message-quote-author';
      author.textContent = item.replyTo.fromId === currentUser.id
        ? t('previewYou')
        : selectedPartner.type === 'group' ? item.replyTo.fromId : selectedPartner.label || item.replyTo.fromId;
      const quotedText = document.createElement('span');
      quotedText.className = 'message-quote-text';
      quotedText.textContent = item.replyTo.text || getLastMessagePreview(item.replyTo);
      quote.append(author, quotedText);
      quote.addEventListener('click', () => {
        const original = Array.from(messagesBox.querySelectorAll('.message'))
          .find((message) => message.dataset.messageId === String(item.replyTo.id));
        original?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        original?.classList.add('search-current');
        setTimeout(() => original?.classList.remove('search-current'), 1200);
      });
      div.appendChild(quote);
    }

    const stickerUrl = item.type === 'sticker' ? (item.imageData || '/stickers/eto-realno.jpg') : null;
    if (stickerUrl) {
      const sticker = document.createElement('img');
      sticker.className = 'message-sticker';
      sticker.src = stickerUrl;
      sticker.alt = 'Sticker';
      div.appendChild(sticker);
    }

    let messageText = null;
    if (item.text && item.type !== 'sticker') {
      messageText = document.createElement('div');
      messageText.className = 'message-text';
      messageText.textContent = item.text;
      div.appendChild(messageText);
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
      actionsMenu.classList.remove('opens-up');
      if (open) {
        const menuRect = actionsMenu.getBoundingClientRect();
        const messageRect = div.getBoundingClientRect();
        const messagesRect = messagesBox.getBoundingClientRect();
        const belowSpace = messagesRect.bottom - messageRect.bottom;
        const aboveSpace = messageRect.top - messagesRect.top;
        const fitsAbove = aboveSpace >= menuRect.height + 20;
        if (menuRect.bottom > messagesRect.bottom - 8 && (fitsAbove || aboveSpace > belowSpace)) {
          actionsMenu.classList.add('opens-up');
        }
      }
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
    const reactionButtons = [];
    const summaryButtons = [];
    const renderReactionSummary = () => {
      reactionSummary.replaceChildren();
      reactionOptions.forEach(({ key, emoji, label }) => {
        const users = Array.isArray(item.reactions?.[key]) ? item.reactions[key] : [];
        if (!users.length) return;
        const badge = document.createElement('button');
        badge.type = 'button';
        badge.className = 'message-reaction-summary';
        const active = users.includes(currentUser.id);
        badge.classList.toggle('active', active);
        badge.setAttribute('aria-label', `${label}: ${users.length}`);
        badge.setAttribute('aria-pressed', String(active));
        badge.textContent = `${emoji} ${users.length}`;
        badge.addEventListener('click', () => toggleReaction(key));
        summaryButtons.push(badge);
        reactionSummary.appendChild(badge);
      });
      reactionSummary.classList.toggle('hidden', reactionSummary.childElementCount === 0);
    };

    const reactions = document.createElement('div');
    reactions.className = 'message-reaction-picker';
    const updateReactionButtons = () => {
      reactionButtons.forEach(({ button, key, emoji, label }) => {
        const users = Array.isArray(item.reactions?.[key]) ? item.reactions[key] : [];
        const active = users.includes(currentUser.id);
        button.disabled = false;
        button.classList.toggle('active', active);
        button.setAttribute('aria-label', `${label}: ${users.length}`);
        button.setAttribute('aria-pressed', String(active));
        button.textContent = emoji;
      });
    };
    const toggleReaction = async (key) => {
      [...reactionButtons.map(({ button }) => button), ...summaryButtons].forEach((button) => {
        button.disabled = true;
      });
      try {
        const response = await fetch('/api/chat/reactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messageId: item.id, reaction: key }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Unable to update reaction.');
        item.reactions = result.reactions;
        summaryButtons.length = 0;
        updateReactionButtons();
        renderReactionSummary();
        renderedMessagesSignature = getMessagesSignature(messages);
      } catch (error) {
        [...reactionButtons.map(({ button }) => button), ...summaryButtons].forEach((button) => {
          button.disabled = false;
        });
        alert(error.message);
      }
    };
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
      button.addEventListener('click', () => toggleReaction(key));
      reactions.appendChild(button);
    });

    renderReactionSummary();
    div.appendChild(reactionSummary);

    const replyButton = document.createElement('button');
    replyButton.type = 'button';
    replyButton.className = 'message-copy-btn';
    replyButton.textContent = t('replyMessage');
    replyButton.addEventListener('click', () => {
      setReplyToMessage(item);
      actionsMenu.classList.add('hidden');
      actionsToggle.setAttribute('aria-expanded', 'false');
    });
    actionsMenu.appendChild(replyButton);

    if (isMe && item.type !== 'call') {
      const status = document.createElement('div');
      status.className = 'message-delivery-status';
      status.textContent = item.readAt ? t('messageRead')
        : item.deliveredAt ? t('messageDelivered')
          : t('messageSent');
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
      if (item.type === 'text') {
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'message-edit-btn';
        editButton.textContent = t('editMessage');
        editButton.addEventListener('click', () => {
          const form = document.createElement('form');
          form.className = 'message-edit-form';
          const input = document.createElement('textarea');
          input.className = 'message-edit-input';
          input.maxLength = 4000;
          input.value = item.text || '';
          const controls = document.createElement('div');
          controls.className = 'message-edit-controls';
          const cancel = document.createElement('button');
          cancel.type = 'button';
          cancel.className = 'message-edit-cancel';
          cancel.textContent = t('cancelEdit');
          const save = document.createElement('button');
          save.type = 'submit';
          save.className = 'message-edit-save';
          save.textContent = t('saveChanges');
          controls.append(cancel, save);
          form.append(input, controls);
          messageText?.replaceWith(form);
          actionsMenu.classList.add('hidden');
          actionsToggle.setAttribute('aria-expanded', 'false');
          input.focus();

          cancel.addEventListener('click', () => form.replaceWith(messageText));
          form.addEventListener('submit', async (event) => {
            event.preventDefault();
            save.disabled = true;
            try {
              const response = await fetch(`/api/chat/${encodeURIComponent(item.id)}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: input.value }),
              });
              const result = await response.json();
              if (!response.ok) throw new Error(result.error || t('errEditMessage'));
              item.text = result.message?.text || input.value.trim();
              item.editedAt = result.message?.editedAt || result.message?.edited_at || new Date().toISOString();
              renderedMessagesSignature = '';
              await loadMessages();
            } catch (error) {
              save.disabled = false;
              alert(error.message || t('errEditMessage'));
            }
          });
        });
        actionsMenu.appendChild(editButton);
      }
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

  isSendingMessage = true;
  sendBtn.disabled = true;
  try {
    const body = {
      fromId: currentUser.id,
      text,
      imageData: pendingMessageImage,
    };
    if (pendingReplyMessage) body.replyToId = pendingReplyMessage.id;
    if (selectedPartner.type === 'group') body.chatId = selectedPartner.chatId || selectedPartner.id;
    else body.toId = selectedPartner.partnerId || selectedPartner.id;
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || t('errSendMessage'));
    }

    messageInput.value = '';
    pendingMessageImage = null;
    setReplyToMessage(null);
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
        const hasIncomingDirectMessage = messages.some((message) =>
          !message.chatId && message.toId === currentUser.id && message.fromId !== currentUser.id
        );
        if (hasIncomingDirectMessage) {
          refreshUnreadIndicators().catch((error) => console.error('Unable to refresh chat list:', error));
        } else if (messages.length) {
          loadChats().catch((error) => console.error('Unable to refresh chat list:', error));
        }
        if (selectedPartner && messages.some((message) => message.fromId === selectedPartner.id || message.toId === selectedPartner.id)) {
          loadMessages().catch((error) => console.error('Unable to refresh chat messages:', error));
        }
      }, 150);
    } catch (error) {
      console.error('Unable to process realtime chat event:', error);
    }
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
  startRealtimeEvents();
  loadMessages();
  loadChats();
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
  replyCancelBtn?.addEventListener('click', () => setReplyToMessage(null));
  searchInput.addEventListener('input', searchUsers);
  searchBtn?.addEventListener('click', searchUsers);
  stickerBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    stickerMenu?.classList.toggle('hidden');
    emojiMenu?.classList.add('hidden');
  });
  emojiBtn?.addEventListener('click', (event) => {
    event.stopPropagation();
    buildEmojiMenu();
    emojiMenu?.classList.toggle('hidden');
    stickerMenu?.classList.add('hidden');
  });
  document.addEventListener('click', (event) => {
    if (stickerMenu && stickerBtn && !stickerMenu.contains(event.target) && !stickerBtn.contains(event.target)) {
      stickerMenu.classList.add('hidden');
    }
    if (emojiMenu && emojiBtn && !emojiMenu.contains(event.target) && !emojiBtn.contains(event.target)) {
      emojiMenu.classList.add('hidden');
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
  etoRealnoSticker?.addEventListener('click', () => sendSticker('eto-realno'));
  stickerMenu?.querySelectorAll('[data-sticker]').forEach((button) => {
    button.addEventListener('click', () => sendEmojiSticker(button.dataset.sticker));
  });
  chatSearchBtn?.addEventListener('click', () => {
    if (!chatSearchBar) return;
    chatSearchBar.classList.toggle('hidden');
    chatSearchBtn.setAttribute('aria-expanded', String(!chatSearchBar.classList.contains('hidden')));
    if (!chatSearchBar.classList.contains('hidden')) {
      chatSearchInput?.focus();
      applyChatSearch();
    } else {
      chatSearchInput.value = '';
      applyChatSearch();
    }
  });
  chatSearchInput?.addEventListener('input', applyChatSearch);
  chatSearchPrev?.addEventListener('click', () => moveChatSearch(-1));
  chatSearchNext?.addEventListener('click', () => moveChatSearch(1));
  chatSearchClose?.addEventListener('click', () => {
    chatSearchBar?.classList.add('hidden');
    chatSearchBtn?.setAttribute('aria-expanded', 'false');
    if (chatSearchInput) chatSearchInput.value = '';
    applyChatSearch();
  });
  groupInfoBtn?.addEventListener('click', () => {
    openConversationInfo().catch((error) => alert(error.message || t('errGroupInfo')));
  });
  blockUserBtn?.addEventListener('click', async () => {
    if (!selectedPartner || selectedPartner.type === 'group') return;
    const targetId = selectedPartner.partnerId || selectedPartner.id;
    const isBlocked = blockedUsersCache.some((entry) => String(entry.id) === String(targetId));
    const confirmation = t(isBlocked ? 'confirmUnblockUser' : 'confirmBlockUser');
    if (!window.confirm(confirmation)) return;
    try {
      await updateBlock(targetId, !isBlocked);
    } catch (error) {
      alert(error.message || t('errBlockUser'));
    }
  });
  exportChatBtn?.addEventListener('click', exportChat);
  globalSearchBtn?.addEventListener('click', globalSearch);
  newGroupBtn?.addEventListener('click', async () => {
    const name = window.prompt(t('groupNamePrompt'));
    if (!name?.trim()) return;
    const input = window.prompt(t('groupMembersPrompt'));
    if (!input?.trim()) return;
    const memberIds = [...new Set([currentUser?.id, ...input.split(/[,;]/).map((id) => id.trim()).filter(Boolean)])];
    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), memberIds }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || t('errCreateGroup'));
      await loadChats();
      const chat = data.chat;
      selectedPartner = {
        id: chat.id,
        chatId: chat.id,
        type: 'group',
        label: chat.name,
        memberCount: chat.memberCount,
      };
      updateChatHeader(selectedPartner);
      await loadMessages();
    } catch (error) {
      alert(error.message || t('errCreateGroup'));
    }
  });
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
