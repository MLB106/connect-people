/* ===========================  NAV - ENTREPRENDRE  =========================== */
document.addEventListener('DOMContentLoaded', () => {
  /* ----- options principales ----- */
  document.querySelectorAll('.entreprendre-option').forEach(opt =>
    opt.addEventListener('click', e => {
      const val = e.currentTarget.dataset.option;
      if (val === 'Sourcing') return; // a un sous-menu
      closeAllDropdowns();
      showNotification(`Option « ${val} » sélectionnée`, 'info');
    })
  );

  /* ----- sous-options sourcing ----- */
  document.querySelectorAll('.sub_sourcing').forEach(sub =>
    sub.addEventListener('click', e => {
      e.stopPropagation();
      closeAllDropdowns();
      showNotification(`Sous-option « ${e.currentTarget.dataset.option} » sélectionnée`, 'info');
    })
  );

  /* ----- hover desktop ----- */
  setupSourcingHover(); // déjà défini dans nav-globale (home.js)
});