/* ===========================  HEADER  =========================== */
document.addEventListener('DOMContentLoaded', () => {
  /* ----------- auth ----------- */
  document.querySelectorAll('[data-action="login"]').forEach(b =>
    b.addEventListener('click', showLogin)
  );
  document.querySelectorAll('[data-action="register"]').forEach(b =>
    b.addEventListener('click', () => showRegister())
  );

  /* ----------- language ----------- */
  setupLanguageSelector(); // déjà dans home.js (on le rappelle ici)

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
    b.addEventListener('click', e => { e.preventDefault(); openChat(0); }) // 0 = chat général
  );

  /* ----------- mobile menu ----------- */
  document.querySelectorAll('[data-action="mobile-menu-toggle"]').forEach(b =>
    b.addEventListener('click', e => {
      e.preventDefault();
      toggleMobileMenu();
      const nav = document.getElementById('global-nav');
      const isOpen = nav && nav.classList.contains('mobile-open');
      b.setAttribute('aria-expanded', String(!!isOpen));
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
  // Entreprendre dropdown
  const entreprendreTrigger = document.getElementById('entreprendre-trigger');
  const entreprendreDropdown = document.getElementById('entreprendre-dropdown');
  
  if (entreprendreTrigger && entreprendreDropdown) {
    entreprendreTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown('entreprendre');
    });
  }

  // Immobilier dropdown
  const immobilierTrigger = document.getElementById('immobilier-trigger');
  const immobilierDropdown = document.getElementById('immobilier-dropdown');
  
  if (immobilierTrigger && immobilierDropdown) {
    immobilierTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown('immobilier');
    });
  }

  // Traduction dropdown
  const traductionTrigger = document.getElementById('traduction-trigger');
  const traductionDropdown = document.getElementById('traduction-dropdown');
  
  if (traductionTrigger && traductionDropdown) {
    traductionTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown('traduction');
    });
  }

  // Fermer les dropdowns en cliquant à l'extérieur
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.entreprendre-dropdown') && 
        !e.target.closest('.immobilier-dropdown') && 
        !e.target.closest('.traduction-dropdown')) {
      closeAllDropdowns();
    }
  });
}

function toggleDropdown(type) {
  // Fermer tous les autres dropdowns
  closeAllDropdowns();
  
  // Ouvrir le dropdown sélectionné
  const dropdown = document.getElementById(`${type}-dropdown`);
  if (dropdown) {
    dropdown.classList.add('active');
  }
}

function closeAllDropdowns() {
  const dropdowns = ['entreprendre', 'immobilier', 'traduction'];
  dropdowns.forEach(type => {
    const dropdown = document.getElementById(`${type}-dropdown`);
    if (dropdown) {
      dropdown.classList.remove('active');
    }
  });
}

