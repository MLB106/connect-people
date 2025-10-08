/* ===========================  NAV - IMMOBILIER  =========================== */
document.addEventListener('DOMContentLoaded', () => {
  /* ----- options principales ----- */
  document.querySelectorAll('.immobilier-option').forEach(opt =>
    opt.addEventListener('click', e => {
      const val = e.currentTarget.dataset.option;
      if (['Achat - Vente', 'Location', 'Terrain'].includes(val)) return; // ont un sous-menu
      closeAllDropdowns();
      showNotification(`Option « ${val} » sélectionnée`, 'info');
    })
  );

  /* ----- sous-options vente ----- */
  document.querySelectorAll('.sub_vente').forEach(sub =>
    sub.addEventListener('click', e => {
      e.stopPropagation();
      closeAllDropdowns();
      showNotification(`Sous-option « ${e.currentTarget.dataset.option} » sélectionnée`, 'info');
    })
  );

  /* ----- sous-options location ----- */
  document.querySelectorAll('.sub_location').forEach(sub =>
    sub.addEventListener('click', e => {
      e.stopPropagation();
      closeAllDropdowns();
      showNotification(`Sous-option « ${e.currentTarget.dataset.option} » sélectionnée`, 'info');
    })
  );

  /* ----- sous-options terrain ----- */
  document.querySelectorAll('.sub_terrain').forEach(sub =>
    sub.addEventListener('click', e => {
      e.stopPropagation();
      closeAllDropdowns();
      showNotification(`Sous-option « ${e.currentTarget.dataset.option} » sélectionnée`, 'info');
    })
  );

  /* ----- hover desktop ----- */
  setupVenteHover(); setupLocationHover(); setupTerrainHover(); // déjà définis globalement
});