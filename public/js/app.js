/* ===========================  APP GLOBAL  =========================== */

/* ========== Fonctions globales ========== */
function showNotification(message, type = 'info') {
  // Créer l'élément de notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Ajouter au DOM
  document.body.appendChild(notification);
  
  // Auto-suppression après 5 secondes
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

function showLogin() {
  showNotification('Fonctionnalité de connexion en développement', 'info');
}

function showRegister(type = null) {
  ensureRegisterModalExists();

  const modal = document.getElementById('register-modal');
  if (!modal) {
    showNotification('Impossible d\'ouvrir la fenêtre d\'inscription', 'error');
    return;
  }

  const helperCard = modal.querySelector('[data-role-select="helper"]');
  const seekerCard = modal.querySelector('[data-role-select="seeker"]');
  const continueBtn = modal.querySelector('#register-continue-btn');

  const selectRole = (role) => {
    helperCard.classList.toggle('selected', role === 'helper');
    seekerCard.classList.toggle('selected', role === 'seeker');
    continueBtn.dataset.selectedRole = role;
  };

  if (type === 'helper' || type === 'seeker') {
    selectRole(type);
  } else {
    // Default to seeker for generic register actions
    selectRole('seeker');
  }

  showModal('register-modal');
}

function showProfile() {
  showNotification('Profil en développement', 'info');
}

function showWallet() {
  showNotification('Portefeuille en développement', 'info');
}

function logout() {
  showNotification('Déconnexion en développement', 'info');
}

function openChat(userId) {
  showNotification(`Chat ${userId} en développement`, 'info');
}

function toggleMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('active');
  }
}

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.classList.remove('active');
  });
}

/* ========== Gestionnaires d'événements globaux ========== */
document.addEventListener('DOMContentLoaded', () => {
  // Gestionnaires pour les nouvelles actions
  document.querySelectorAll('[data-action="find-helper"]').forEach(btn =>
    btn.addEventListener('click', () => showNotification('Recherche de helpers en développement', 'info'))
  );
  
  document.querySelectorAll('[data-action="contact-helper"]').forEach(btn =>
    btn.addEventListener('click', () => showNotification('Contact helper en développement', 'info'))
  );
  
  document.querySelectorAll('[data-action="create-announcement"]').forEach(btn =>
    btn.addEventListener('click', () => showNotification('Création d\'annonce en développement', 'info'))
  );
  
  document.querySelectorAll('[data-action="become-helper"]').forEach(btn =>
    btn.addEventListener('click', () => showRegister('helper'))
  );
  
  document.querySelectorAll('[data-action="view-profile"]').forEach(btn =>
    btn.addEventListener('click', () => showNotification('Voir profil en développement', 'info'))
  );
  
  document.querySelectorAll('[data-action="respond-announcement"]').forEach(btn =>
    btn.addEventListener('click', () => showNotification('Répondre à l\'annonce en développement', 'info'))
  );
  
  document.querySelectorAll('[data-action="view-details"]').forEach(btn =>
    btn.addEventListener('click', () => showNotification('Voir détails en développement', 'info'))
  );

  // Intercept generic register links to open the modal instead of navigating
  document.querySelectorAll('a[href^="/auth/register"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        const url = new URL(link.href, window.location.origin);
        const typeParam = url.searchParams.get('type');
        const role = typeParam === 'helper' ? 'helper' : (typeParam === 'seeker' ? 'seeker' : null);
        showRegister(role);
      } catch (_err) {
        showRegister(null);
      }
    });
  });
});

/* ========== Styles pour les notifications ========== */
const notificationStyles = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;
    max-width: 400px;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  }
  
  .notification-info {
    border-left: 4px solid #0057ff;
  }
  
  .notification-success {
    border-left: 4px solid #28a745;
  }
  
  .notification-error {
    border-left: 4px solid #dc3545;
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .notification-close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-left: 12px;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

// Injecter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Exposition globale pour header.js
window.showLogin    = showLogin;
window.showRegister = showRegister;
window.showProfile  = showProfile;
window.showWallet   = showWallet;
window.logout       = logout;
window.openChat     = openChat;

/* ========== Inscription Modal ========== */
function ensureRegisterModalExists() {
  if (document.getElementById('register-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'register-modal';
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content" role="dialog" aria-labelledby="register-modal-title" aria-modal="true">
      <div class="modal-header">
        <h3 id="register-modal-title">Créer un compte</h3>
        <span class="close" aria-label="Fermer">&times;</span>
      </div>
      <div class="modal-body">
        <div class="register-roles">
          <button type="button" class="role-card" data-role-select="helper">
            <div class="role-icon">🤝</div>
            <div class="role-title">Devenir Helper</div>
            <div class="role-desc">Proposez vos services et aidez la communauté</div>
          </button>
          <button type="button" class="role-card" data-role-select="seeker">
            <div class="role-icon">🔎</div>
            <div class="role-title">Demander de l'aide</div>
            <div class="role-desc">Trouvez rapidement un helper vérifié</div>
          </button>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="register-cancel-btn">Annuler</button>
        <button class="btn btn-primary" id="register-continue-btn" data-selected-role="seeker">Continuer</button>
      </div>
    </div>`;

  document.body.appendChild(modal);

  // Wiring internal interactions
  const helperCard = modal.querySelector('[data-role-select="helper"]');
  const seekerCard = modal.querySelector('[data-role-select="seeker"]');
  const continueBtn = modal.querySelector('#register-continue-btn');
  const cancelBtn = modal.querySelector('#register-cancel-btn');

  const selectRole = (role) => {
    helperCard.classList.toggle('selected', role === 'helper');
    seekerCard.classList.toggle('selected', role === 'seeker');
    continueBtn.dataset.selectedRole = role;
  };

  helperCard.addEventListener('click', () => selectRole('helper'));
  seekerCard.addEventListener('click', () => selectRole('seeker'));
  cancelBtn.addEventListener('click', () => closeModal());
  continueBtn.addEventListener('click', () => {
    const role = continueBtn.dataset.selectedRole || 'seeker';
    // For now keep consistent with backend route in README: /user/auth/register (POST)
    // But since registration is not fully implemented, fall back to GET page hints
    const target = role === 'helper' ? '/proposer-aide' : '/demander-aide';
    closeModal();
    window.location.href = target;
  });
}




