// Fichier : public/js/dashboardUser.js

/* ===========================  DASHBOARD  =========================== */
function showDashboardSection(sectionId) {
  console.log(`📊 Section ${sectionId}`);
  document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
  document.getElementById(`${sectionId}-section`)?.classList.add('active');
  document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
}
function showCreateService() { showNotification('Fonctionnalité en développement', 'info'); }
function showProfile()      { showNotification('Profil en développement', 'info'); }
function showWallet()       { showNotification('Portefeuille en développement', 'info'); }

/* ===========================  CHAT  =========================== */
function openChat(userId) {
  console.log(`💬 Open chat ${userId}`);
  showPage('chat'); loadChatMessages(userId);
}
function closeChatAndReturn() {
  console.log('💬 Close chat'); showPage('dashboard');
}
function sendMessage() {
  const input = document.getElementById('message-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  const msg = { id: Date.now(), text, sender: 'user', timestamp: new Date(), read: false };
  addMessageToChat(msg); input.value = '';
  // réponse auto
  setTimeout(() => {
    const rep = { id: Date.now() + 1, text: getRandomResponse(), sender: 'other', timestamp: new Date(), read: false };
    addMessageToChat(rep);
  }, 1000 + Math.random() * 2000);
}
function addMessageToChat(message) {
  const box = document.getElementById('chat-messages');
  if (!box) return;
  const div = document.createElement('div');
  div.className = `message ${message.sender === 'user' ? 'sent' : 'received'}`;
  const time = message.timestamp.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  div.innerHTML = `
    <div class="message-content">
      <p>${message.text}</p>
      <span class="message-time">${time}</span>
    </div>`;
  box.appendChild(div); box.scrollTop = box.scrollHeight;
  if (process.env.NODE_ENV === 'development') {
    console.log(`Message ${message.sender} ajoute`);
  }
}
function loadChatMessages(userId) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Load messages for ${userId}`);
  }
  const mock = [
    { text: 'Bonjour ! Comment puis-je vous aider ?', sender: 'other', timestamp: new Date(Date.now() - 3600000) },
    { text: 'Salut ! J\'aurais besoin d\'aide pour une traduction.', sender: 'user', timestamp: new Date(Date.now() - 3000000) },
    { text: 'Bien sûr ! De quelle langue vers quelle langue ?', sender: 'other', timestamp: new Date(Date.now() - 2400000) }
  ];
  const box = document.getElementById('chat-messages');
  if (box) { box.innerHTML = ''; mock.forEach(m => addMessageToChat(m)); }
}
function startVoiceCall() { showNotification('Appel vocal en développement', 'info'); }
function startVideoCall() { showNotification('Appel vidéo en développement', 'info'); }

/* helper réponse auto */
function getRandomResponse() {
  const reps = [
    'Merci pour votre message ! Je vais pouvoir vous aider.',
    'C\'est parfait ! Quand souhaitez-vous commencer ?',
    'Excellent ! Je suis disponible pour cette tâche.',
    'Pas de problème ! J\'ai de l\'expérience dans ce domaine.',
    'Super ! Envoyez-moi plus de détails si possible.',
    'D\'accord ! Je peux m\'en occuper rapidement.'
  ];
  return reps[Math.floor(Math.random() * reps.length)];
}

/* ========== écouteurs dashboard ========== */
document.addEventListener('DOMContentLoaded', () => {
  /* menu sections */
  document.querySelectorAll('[data-dashboard-section]').forEach(l => l.addEventListener('click', e => {
    e.preventDefault(); showDashboardSection(l.dataset.dashboardSection);
  }));
  /* actions header */
  document.querySelectorAll('[data-action="create-service"]').forEach(b => b.addEventListener('click', showCreateService));
  document.querySelectorAll('[data-action="profile"]').forEach(b => b.addEventListener('click', showProfile));
  document.querySelectorAll('[data-action="wallet"]').forEach(b => b.addEventListener('click', showWallet));
  /* chat */
  document.querySelectorAll('[data-action="close-chat"]').forEach(b => b.addEventListener('click', closeChatAndReturn));
  document.querySelectorAll('[data-action="voice-call"]').forEach(b => b.addEventListener('click', startVoiceCall));
  document.querySelectorAll('[data-action="video-call"]').forEach(b => b.addEventListener('click', startVideoCall));
  document.querySelectorAll('[data-action="send-message"]').forEach(b => b.addEventListener('click', sendMessage));
  /* Entrée dans l'input */
  const input = document.getElementById('message-input');
  if (input) input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
});