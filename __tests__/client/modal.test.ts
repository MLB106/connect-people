/**
 * @jest-environment jsdom
 * // __tests__/client/modal.test.ts
 */
import {
  showModal,
  closeModal,
  closeAllModals,
  initModals,
} from '../../src/client/modal.js';

// Petit helper pour créer une modale HTML dans le DOM
const createModal = (id: string): HTMLElement => {
  const modal = document.createElement('div');
  modal.id = id;
  modal.className = 'modal';
  modal.style.display = 'none';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <p>Contenu de la modale</p>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
};

describe('modal.ts', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // On recrée deux modales propres
    createModal('modal1');
    createModal('modal2');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('showModal affiche une modale', () => {
    const modal = document.getElementById('modal1') as HTMLElement;
    expect(modal.style.display).toBe('none');
    showModal('modal1');
    expect(modal.style.display).toBe('block');
  });

  test('closeModal masque une modale', () => {
    const modal = document.getElementById('modal1') as HTMLElement;
    modal.style.display = 'block';
    closeModal('modal1');
    expect(modal.style.display).toBe('none');
  });

test('closeAllModals masque toutes les modales', () => {
  const m1 = document.getElementById('modal1') as HTMLElement;
  const m2 = document.getElementById('modal2') as HTMLElement;

  // Simule l’ouverture via showModal pour remplir activeModals
  showModal(m1);
  showModal(m2);

  // Vérifie qu’elles sont bien ouvertes
  expect(m1.style.display).toBe('block');
  expect(m2.style.display).toBe('block');

  closeAllModals();

  // Vérifie qu’elles sont fermées
  expect(m1.style.display).toBe('none');
  expect(m2.style.display).toBe('none');
});

  test('initModals attache un listener sur le bouton .close', () => {
    initModals();
    const modal = document.getElementById('modal1') as HTMLElement;
    const closeBtn = modal.querySelector('.close') as HTMLElement;
    modal.style.display = 'block';
    closeBtn.click();
    expect(modal.style.display).toBe('none');
  });

  test('outsideClickHandler ferme la modale si on clique sur le backdrop', () => {
    const modal = document.getElementById('modal1') as HTMLElement;
    showModal(modal);
    modal.click(); // simule un clic sur le fond de la modale
    expect(modal.style.display).toBe('none');
  });
});