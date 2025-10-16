/* ===========================  HEADER  =========================== */
document.addEventListener('DOMContentLoaded', async () => {
  // Initialiser le système i18n
  await window.i18n.loadTranslations();
  /* ----------- auth ----------- */
  document.querySelectorAll('[data-action="login"]').forEach(b =>
    b.addEventListener('click', showLogin)
  );
  document.querySelectorAll('[data-action="register"]').forEach(b =>
    b.addEventListener('click', () => showRegister())
  );

  /* ----------- language ----------- */
  setupLanguageSelector();

  /* ----------- user-menu ----------- */
  document.querySelectorAll('[data-action="profile"]').forEach(b =>
    b.addEventListener('click', e => { e.preventDefault(); showProfile(); })
  );
  document.querySelectorAll('[data-action="wallet"]').forEach(b =>
    b.addEventListener('click', e => { e.preventDefault(); showWallet(); })
  );
  document.querySelectorAll('[data-action="logout"]').forEach(b =>
    b.addEventListener('click', e => { e.preventDefault(); logout(); })
  );
  document.querySelectorAll('[data-action="open-chat"]').forEach(b =>
    b.addEventListener('click', e => { e.preventDefault(); openChat(0); })
  );

  /* ----------- mobile menu ----------- */
  document.querySelectorAll('[data-action="mobile-menu-toggle"]').forEach(b =>
    b.addEventListener('click', e => {
      e.preventDefault();
      toggleMobileMenu();
    })
  );

  /* ----------- nav-links ----------- */
  document.querySelectorAll('[data-page="nos-helpers"]').forEach(l =>
    l.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = '/nos-helpers';
    })
  );
  
  document.querySelectorAll('[data-page="nos-annonces"]').forEach(l =>
    l.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = '/nos-annonces';
    })
  );
  
  document.querySelectorAll('[data-page="documentation"]').forEach(l =>
    l.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = '/documentation';
    })
  );

  /* ----------- dropdowns ----------- */
  setupDropdowns();

  /* ----------- navbar scroll ----------- */
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('global-nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });
});

/* ===========================  DROPDOWNS  =========================== */
function setupDropdowns() {
  const entreprendreTrigger = document.getElementById('entreprendre-trigger');
  const entreprendreDropdown = document.getElementById('entreprendre-dropdown');
  if (entreprendreTrigger && entreprendreDropdown) {
    entreprendreTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown('entreprendre');
    });
  }

  const immobilierTrigger = document.getElementById('immobilier-trigger');
  const immobilierDropdown = document.getElementById('immobilier-dropdown');
  if (immobilierTrigger && immobilierDropdown) {
    immobilierTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown('immobilier');
    });
  }

  const traductionTrigger = document.getElementById('traduction-trigger');
  const traductionDropdown = document.getElementById('traduction-dropdown');
  if (traductionTrigger && traductionDropdown) {
    traductionTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown('traduction');
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.entreprendre-dropdown') && 
        !e.target.closest('.immobilier-dropdown') && 
        !e.target.closest('.traduction-dropdown')) {
      closeAllDropdowns();
    }
  });
}

function toggleDropdown(type) {
  closeAllDropdowns();
  const dropdown = document.getElementById(`${type}-dropdown`);
  if (dropdown) dropdown.classList.add('active');
}

function closeAllDropdowns() {
  ['entreprendre', 'immobilier', 'traduction'].forEach(type => {
    const dropdown = document.getElementById(`${type}-dropdown`);
    if (dropdown) dropdown.classList.remove('active');
  });
}

/* ===========================  LANGUAGE SELECTOR  =========================== */
function setupLanguageSelector() {
  const languageSelect = document.getElementById('language-select');
  if (!languageSelect) return;

  const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
  languageSelect.value = savedLanguage;

  languageSelect.addEventListener('change', handleLanguageChange);
}

async function handleLanguageChange(event) {
  const selectedLanguage = event.target.value;
  const selectedOption = event.target.options[event.target.selectedIndex];
  const languageText = selectedOption.textContent;

  // Mettre à jour la langue dans le système i18n
  window.i18n.setLanguage(selectedLanguage);
  
  // Attendre que les traductions soient chargées
  await window.i18n.loadTranslations();

  showLanguageConfirmationModal(selectedLanguage, languageText);

  localStorage.setItem('selectedLanguage', selectedLanguage);
  updatePageLanguage(selectedLanguage);

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

/* -------------------------------------------------- */
/*  VERSION DEFINITIVE : affiche la modal             */
/* -------------------------------------------------- */
function showLanguageConfirmationModal(languageCode, languageText) {
  // 1. Créer la modal si elle manque
  let modal = document.getElementById('language-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'language-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="language-modal-title"></h3>
          <span class="close" id="language-modal-close">&times;</span>
        </div>
        <div class="modal-body">
          <div class="language-confirmation">
            <div class="language-icon" id="language-modal-icon"></div>
            <p id="language-modal-message"></p>
            <p class="language-sub-message" id="language-modal-sub-message"></p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // 2. Remplir avec les traductions i18n
  const languageNames = window.i18n.getLanguageNames();
  const languageName = languageNames[languageCode] || languageText;

  // on lit directement le JSON local sans passer par window.__()
  (async () => {
    try {
      const res  = await fetch(`/locales/${languageCode}.json`);
      const json = await res.json();   // { modal: { languageConfirmation: {...} } }
      const mc   = json.modal.languageConfirmation;
      document.getElementById('language-modal-title').textContent       = mc.title;
      document.getElementById('language-modal-icon').textContent        = getLanguageFlag(languageCode);
      document.getElementById('language-modal-message').textContent     = mc.activated.replace('{{language}}', languageName);
      document.getElementById('language-modal-sub-message').textContent = mc.success;
    } catch (e) {
      // fallback anglais si jamais le fichier manque
      const fall = await fetch('/locales/en.json').then(r => r.json());
      const mc   = fall.modal.languageConfirmation;
      document.getElementById('language-modal-title').textContent       = mc.title;
      document.getElementById('language-modal-icon').textContent        = getLanguageFlag(languageCode);
      document.getElementById('language-modal-message').textContent     = mc.activated.replace('{{language}}', languageName);
      document.getElementById('language-modal-sub-message').textContent = mc.success;
    }
  })();

  // 4. AFFICHAGE
  modal.style.display = 'flex';
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  // 5. Fermer auto après 3 s
  setTimeout(() => {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 3000);
}

// Fonction helper pour les drapeaux
function getLanguageFlag(languageCode) {
  const flags = {
    fr: '🇫🇷', it: '🇮🇹', en: '🇬🇧', es: '🇪🇸', 
    ar: '🇸🇦', de: '🇩🇪', pt: '🇵🇹'
  };
  return flags[languageCode] || '🇬🇧';
}

function getLanguageData(languageCode) {
  const map = {
    fr: { flag: '🇫🇷', activatedMessage: 'Langue française activée', successMessage: 'La langue a été changée avec succès' },
    it: { flag: '🇮🇹', activatedMessage: 'Lingua italiana attivata', successMessage: 'La lingua è stata cambiata con successo' },
    en: { flag: '🇬🇧', activatedMessage: 'English language activated', successMessage: 'Language changed successfully' },
    es: { flag: '🇪🇸', activatedMessage: 'Idioma español activado', successMessage: 'El idioma se ha cambiado exitosamente' },
    ar: { flag: '🇸🇦', activatedMessage: 'تم تفعيل اللغة العربية', successMessage: 'تم تغيير اللغة بنجاح' },
    de: { flag: '🇩🇪', activatedMessage: 'Deutsche Sprache aktiviert', successMessage: 'Sprache erfolgreich geändert' },
    pt: { flag: '🇵🇹', activatedMessage: 'Idioma português ativado', successMessage: 'Idioma alterado com sucesso' }
  };
  return map[languageCode] || map.fr;
}

function updatePageLanguage(languageCode) {
  console.log(`Language changed to: ${languageCode}`);
}