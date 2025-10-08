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
    })
  );

  /* ----------- nav-links (pages en dev) ----------- */
  const devPages = ['nos-helpers', 'nos-annonces', 'documentation'];
  devPages.forEach(p =>
    document.querySelectorAll(`[data-page="${p}"]`).forEach(l =>
      l.addEventListener('click', e => {
        e.preventDefault();
        showNotification(`Page ${p} en développement`, 'info');
      })
    )
  );

  /* ----------- navbar scroll ----------- */
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('global-nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });
});

