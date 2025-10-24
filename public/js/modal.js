// Fichier : public/js/modal.js

/* ========== SYSTÈME DE MODALES CENTRALISÉ - NON UTILISÉ ========== */
/* 
 * CLASSE : ModalManager - Système centralisé pour gérer toutes les modales
 * RELATION : Ce système n'est PAS utilisé dans l'application, remplacé par header.js et login.hbs
 * PROBLÈME : Code mort qui entre en conflit avec les systèmes existants
 * CSS UTILISÉ : Classes .modal, .modal-content, .modal-header, .modal-body, .modal-footer (définies dans modal.css)
 * DANGER : Peut entrer en conflit avec les modales créées dynamiquement dans header.js
 */
class ModalManager {
    constructor() {
        this.activeModal = null;
        this.init();
    }

    init() {
        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal();
            }
        });

        // Close modal with close button
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close') || e.target.closest('.close')) {
                this.closeModal();
            }
        });
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
  if (!modal) {
            console.error(`Modal with id "${modalId}" not found`);
    return;
  }
  
        // Close any existing modal
        if (this.activeModal) {
            this.closeModal();
        }

        this.activeModal = modal;
  modal.style.display = 'flex';
        
        // Force reflow
        modal.offsetHeight;
  modal.classList.add('show');

        // Focus management
        const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (!this.activeModal) return;
  
        const modal = this.activeModal;
  modal.classList.remove('show');
  
  setTimeout(() => {
    modal.style.display = 'none';
            this.activeModal = null;
            document.body.style.overflow = '';
  }, 300);
    }

    // Create a simple confirmation modal
    showConfirm(title, message, onConfirm, onCancel = null) {
        const modalId = 'confirm-modal';
        let modal = document.getElementById(modalId);
        
        if (!modal) {
            modal = this.createConfirmModal(modalId);
        }

        // Update content
        modal.querySelector('.modal-header h3').textContent = title;
        modal.querySelector('.modal-body p').textContent = message;

        // Update buttons
        const confirmBtn = modal.querySelector('.btn-confirm');
        const cancelBtn = modal.querySelector('.btn-cancel');

        // Remove existing event listeners
        const newConfirmBtn = confirmBtn.cloneNode(true);
        const newCancelBtn = cancelBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

        // Add new event listeners
        newConfirmBtn.addEventListener('click', () => {
            this.closeModal();
            if (onConfirm) onConfirm();
        });

        newCancelBtn.addEventListener('click', () => {
            this.closeModal();
            if (onCancel) onCancel();
        });

        this.showModal(modalId);
    }

    createConfirmModal(id) {
        const modal = document.createElement('div');
        modal.id = id;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Confirmation</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Êtes-vous sûr de vouloir continuer ?</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary btn-cancel">Annuler</button>
                    <button class="btn btn-primary btn-confirm">Confirmer</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    // Create a simple alert modal
    showAlert(title, message, onOk = null) {
        const modalId = 'alert-modal';
        let modal = document.getElementById(modalId);
        
        if (!modal) {
            modal = this.createAlertModal(modalId);
        }

        // Update content
        modal.querySelector('.modal-header h3').textContent = title;
        modal.querySelector('.modal-body p').textContent = message;

        // Update button
        const okBtn = modal.querySelector('.btn-ok');
        const newOkBtn = okBtn.cloneNode(true);
        okBtn.parentNode.replaceChild(newOkBtn, okBtn);

        newOkBtn.addEventListener('click', () => {
            this.closeModal();
            if (onOk) onOk();
        });

        this.showModal(modalId);
    }

    createAlertModal(id) {
        const modal = document.createElement('div');
        modal.id = id;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Information</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Message d'information</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary btn-ok">OK</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }
}

/* ========== FONCTIONS GLOBALES - CONFLIT AVEC HEADER.JS ========== */
/* 
 * FONCTIONS : showModal(), closeModal(), showConfirm(), showAlert() - Fonctions globales pour les modales
 * RELATION : Ces fonctions ne sont PAS utilisées dans l'application
 * CONFLIT : showModal() entre en conflit avec showSignupModal() de header.js
 * PROBLÈME : Code mort qui peut créer des conflits de noms de fonctions
 * DANGER : Si ces fonctions sont appelées, elles peuvent interférer avec les modales existantes
 */
// Initialize modal manager
const modalManager = new ModalManager();

// Global functions for easy access
function showModal(modalId) {
    modalManager.showModal(modalId);
}

function closeModal() {
    modalManager.closeModal();
}

function showConfirm(title, message, onConfirm, onCancel = null) {
    modalManager.showConfirm(title, message, onConfirm, onCancel);
}

function showAlert(title, message, onOk = null) {
    modalManager.showAlert(title, message, onOk);
}

// Language modal functions are now handled in header.js

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModalManager, showModal, closeModal, showConfirm, showAlert };
}