/* ===========================  HOME  =========================== */
document.addEventListener('DOMContentLoaded', () => {
  /* ----- boutons héros ----- */
  document.querySelectorAll('[data-action="register-helper"]').forEach(btn =>
    btn.addEventListener('click', () => showRegister('helper'))
  );
  document.querySelectorAll('[data-action="register-seeker"]').forEach(btn =>
    btn.addEventListener('click', () => showRegister('seeker'))
  );
});

