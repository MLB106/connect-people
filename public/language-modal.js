console.log('🌍 language-modal.js chargé !');

// Messages pour chaque langue
const languageMessages = {
  'fr': { text: 'Vous avez choisi de poursuivre en français', flag: '🇫🇷' },
  'en': { text: 'You have chosen to continue in English', flag: '🇬🇧' },
  'de': { text: 'Sie haben gewählt, auf Deutsch fortzufahren', flag: '🇩🇪' },
  'es': { text: 'Has elegido continuar en español', flag: '🇪🇸' },
  'it': { text: 'Hai scelto di continuare in italiano', flag: '🇮🇹' },
  'pt': { text: 'Você escolheu continuar em português', flag: '🇵🇹' },
  'ar': { text: 'لقد اخترت المتابعة باللغة العربية', flag: '🇸🇦' }
};

// Styles CSS pour la modal
const modalStyles = `
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
    from { opacity: 0; }
    to { opacity: 1; }
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
function injectStyles() {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = modalStyles;
  document.head.appendChild(styleSheet);
  console.log('✅ Styles CSS injectés');
}

// Fonction pour afficher la modal
function showLanguageModal(language) {
  console.log('🎯 showLanguageModal appelée avec:', language);
  
  const message = languageMessages[language];
  if (!message) {
    console.log('❌ Message non trouvé pour:', language);
    return;
  }
  
  console.log('✅ Message trouvé:', message);

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
  
  console.log('✅ Modal ajoutée au DOM');

  // Auto-suppression après 3 secondes
  setTimeout(() => {
    modal.style.animation = 'modalSlideOut 0.3s ease-out forwards';
    overlay.style.animation = 'fadeIn 0.3s ease-out reverse forwards';
    
    setTimeout(() => {
      if (modal.parentElement) modal.remove();
      if (overlay.parentElement) overlay.remove();
      console.log('🗑️ Modal supprimée');
    }, 300);
  }, 3000);
}

// Fonction de test globale
window.testLanguageModal = function(lang = 'fr') {
  console.log('🧪 Test manuel de la modal:', lang);
  showLanguageModal(lang);
};

// Initialisation
function initLanguageModal() {
  console.log('🚀 Initialisation du système de modal de langue');
  
  // Injecter les styles
  injectStyles();
  
  // Fonction pour ajouter l'event listener
  function addLanguageListener() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      if (!languageSelect.hasAttribute('data-language-listener')) {
        console.log('✅ Sélecteur de langue trouvé, ajout du listener');
        languageSelect.setAttribute('data-language-listener', 'true');
        
        languageSelect.addEventListener('change', function(e) {
          console.log('🔄 Changement de langue détecté:', e.target.value);
          showLanguageModal(e.target.value);
        });
        
        return true;
      }
    }
    return false;
  }
  
  // Essayer immédiatement
  if (!addLanguageListener()) {
    console.log('🔍 Sélecteur non trouvé, recherche en cours...');
    
    // Essayer toutes les 500ms pendant 10 secondes
    let attempts = 0;
    const maxAttempts = 20;
    
    const interval = setInterval(() => {
      attempts++;
      console.log(`🔍 Tentative ${attempts}/${maxAttempts}`);
      
      if (addLanguageListener() || attempts >= maxAttempts) {
        clearInterval(interval);
        if (attempts >= maxAttempts) {
          console.log('⏰ Arrêt de la recherche après', maxAttempts, 'tentatives');
        }
      }
    }, 500);
  }
}

// Démarrage
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageModal);
} else {
  initLanguageModal();
}

console.log('📋 Fonctions disponibles: testLanguageModal("fr"), testLanguageModal("en"), etc.');