/* ===========================  FOOTER  =========================== */
document.addEventListener('DOMContentLoaded', () => {
  /* --- liens "en développement" --- */
  document.querySelectorAll('[data-action="dev-notification"]').forEach(l =>
    l.addEventListener('click', e => {
      e.preventDefault();
      showNotification('Page en développement', 'info');
    })
  );

  /* --- boutons stores --- */
  document.querySelectorAll('[data-action="app-store"]').forEach(l =>
    l.addEventListener('click', e => {
      e.preventDefault();
      const store = l.closest('[data-store]')?.dataset.store;
      showNotification(`Lien ${store} en développement`, 'info');
    })
  );

  /* --- réseaux sociaux --- */
  document.querySelectorAll('[data-action="social"]').forEach(l =>
    l.addEventListener('click', e => {
      e.preventDefault();
      const platform = l.closest('[data-platform]')?.dataset.platform;
      showNotification(`Lien ${platform} en développement`, 'info');
    })
  );
});