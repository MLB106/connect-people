// src/client/modal.ts
const activeModals = new Set<HTMLElement>();

const outsideClickHandler = (e: MouseEvent): void => {
  activeModals.forEach(m => {
    if (e.target === m) closeModal(m);
  });
};

export const showModal = (selector: string | HTMLElement): void => {
  const modal = typeof selector === 'string' ? document.getElementById(selector) : selector;
  if (!modal) {
    console.warn('Modal not found');
    return;
  }
  activeModals.add(modal);
  modal.style.display = 'block';
  document.addEventListener('click', outsideClickHandler);
};

export const closeModal = (selector: string | HTMLElement): void => {
  const modal = typeof selector === 'string' ? document.getElementById(selector) : selector;
  if (!modal) return;
  activeModals.delete(modal);
  modal.style.display = 'none';
  if (activeModals.size === 0) {
    document.removeEventListener('click', outsideClickHandler);
  }
};

export const closeAllModals = (): void => {
  [...activeModals].forEach(closeModal);
};

export const initModals = (): void => {
  document.querySelectorAll<HTMLElement>('.modal').forEach(modal => {
    modal.querySelector<HTMLElement>('.close')?.addEventListener('click', () => closeModal(modal));
  });
};

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', initModals);
}


// Utilisation dans une vue Handlebars :

// <script type="module">
//   import { showModal } from '/js/modal.js';
//   document.getElementById('openBtn')?.addEventListener('click', () => showModal('loginModal'));
// </script>

// Après la bascules plus tard vers un framework,  supprimer ce fichier sans regret.