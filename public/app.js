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
  const message = type ? `Inscription ${type} en développement` : 'Inscription en développement';
  showNotification(message, 'info');
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

/* ========== Fonctions pour la gestion des langues ========== */
const languageMessages = {
  'fr': { text: 'Vous avez choisi de poursuivre en français', flag: '🇫🇷' },
  'en': { text: 'You have chosen to continue in English', flag: '🇬🇧' },
  'de': { text: 'Sie haben gewählt, auf Deutsch fortzufahren', flag: '🇩🇪' },
  'es': { text: 'Has elegido continuar en español', flag: '🇪🇸' },
  'it': { text: 'Hai scelto di continuare in italiano', flag: '🇮🇹' },
  'pt': { text: 'Você escolheu continuar em português', flag: '🇵🇹' },
  'ar': { text: 'لقد اخترت المتابعة باللغة العربية', flag: '🇸🇦' }
};

function showLanguageModal(language) {
  console.log('showLanguageModal appelée avec:', language);
  const message = languageMessages[language];
  if (!message) {
    console.log('Message non trouvé pour la langue:', language);
    return;
  }
  console.log('Message trouvé:', message);

  // Créer l'overlay
  const overlay = document.createElement('div');
  overlay.className = 'language-modal-overlay';

  // Créer la modal
  const modal = document.createElement('div');
  modal.className = 'language-modal';
  modal.innerHTML = `
    <div class="language-modal-icon">🌍</div>
    <div class="language-modal-text">${message.text}</div>
    <div class="language-modal-flag">${message.flag}</div>
  `;

  // Ajouter au DOM
  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  // Auto-suppression après 3 secondes
  setTimeout(() => {
    modal.style.animation = 'modalSlideOut 0.3s ease-out forwards';
    overlay.style.animation = 'fadeIn 0.3s ease-out reverse forwards';
    
    setTimeout(() => {
      if (modal.parentElement) modal.remove();
      if (overlay.parentElement) overlay.remove();
    }, 300);
  }, 3000);
}

// Fonction de test - vous pouvez l'appeler dans la console du navigateur
window.testLanguageModal = function(lang = 'fr') {
  console.log('Test de la modal avec la langue:', lang);
  showLanguageModal(lang);
};

/* ========== Gestionnaires d'événements globaux ========== */
function initLanguageSelector() {
  const languageSelect = document.getElementById('language-select');
  if (languageSelect) {
    console.log('Sélecteur de langue trouvé !');
    languageSelect.addEventListener('change', (e) => {
      const selectedLanguage = e.target.value;
      console.log('Langue sélectionnée:', selectedLanguage);
      showLanguageModal(selectedLanguage);
    });
  } else {
    console.log('Sélecteur de langue non trouvé, nouvelle tentative...');
    // Réessayer après un délai si l'élément n'est pas encore dans le DOM
    setTimeout(initLanguageSelector, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM chargé, initialisation...');
  initLanguageSelector();
  
  // Aussi essayer après le rendu du client
  setTimeout(initLanguageSelector, 1000);
  
  // Méthode alternative avec délégation d'événements
  document.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'language-select') {
      console.log('Changement de langue détecté via délégation:', e.target.value);
      showLanguageModal(e.target.value);
    }
  });

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

  .language-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #3A5F87 0%, #2E5077 100%);
    color: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    z-index: 10001;
    text-align: center;
    min-width: 320px;
    animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .language-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
    animation: fadeIn 0.3s ease-out;
  }

  .language-modal-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }

  .language-modal-text {
    font-size: 1.1rem;
    font-weight: 500;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }

  .language-modal-flag {
    font-size: 1.5rem;
    margin-left: 0.5rem;
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

  @keyframes modalSlideIn {
    from {
      transform: translate(-50%, -60%);
      opacity: 0;
      scale: 0.9;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes modalSlideOut {
    from {
      transform: translate(-50%, -50%);
      opacity: 1;
      scale: 1;
    }
    to {
      transform: translate(-50%, -40%);
      opacity: 0;
      scale: 0.95;
    }
  }
`;

// Injecter les styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);






