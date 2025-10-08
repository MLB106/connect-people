/* ===========================  NAV - TRADUCTION  =========================== */
document.addEventListener('DOMContentLoaded', () => {
  /* ----- options principales ----- */
  document.querySelectorAll('.traduction-option').forEach(opt =>
    opt.addEventListener('click', e => {
      const val = e.currentTarget.dataset.option;
      if (val === 'Acts notariés') return; // a un sous-menu
      closeAllDropdowns();
      showNotification(`Option « ${val} » sélectionnée`, 'info');
    })
  );

  /* ----- sous-options acts notariés ----- */
  document.querySelectorAll('.sub_acts_list').forEach(sub =>
    sub.addEventListener('click', e => {
      e.stopPropagation();
      closeAllDropdowns();
      showNotification(`Sous-option « ${e.currentTarget.dataset.option} » sélectionnée`, 'info');
    })
  );

  /* ----- hover desktop ----- */
  setupActsNotariesHover(); // déjà défini globalement
});