let currentUser = null;
let selectedPartner = null;

const myIdInput = document.getElementById('myId');
const myNameInput = document.getElementById('myName');
const createUserBtn = document.getElementById('createUserBtn');
const searchInput = document.getElementById('searchInput');
const userList = document.getElementById('userList');
const messagesBox = document.getElementById('messages');
const chatPartner = document.getElementById('chatPartner');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

function renderUsers(users) {
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
  const search = searchInput.value.trim();
  const response = await fetch(`/api/users?search=${encodeURIComponent(search)}`);
  const users = await response.json();
  renderUsers(users);
}

setInterval(() => {
  searchUsers();
}, 2000);

async function createUser() {
  const id = myIdInput.value.trim();
  const label = myNameInput.value.trim();

  if (!id || !label) {
    alert('Введите user id и имя.');
    return;
  }

  currentUser = { id, label };
  await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, label }),
  });

  searchUsers();
}

async function loadMessages() {
  if (!currentUser || !selectedPartner) return;

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
    alert('Сначала сохраните профиль и выберите собеседника.');
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

searchInput.addEventListener('input', searchUsers);
createUserBtn.addEventListener('click', createUser);
sendBtn.addEventListener('click', sendMessage);
startChatRefresh();
searchUsers();

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

searchUsers();
