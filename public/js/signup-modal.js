/* ===========================  SIGNUP MODAL  =========================== */

class SignupModal {
    constructor() {
        this.modalId = 'signup-modal';
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        // Vérifier si la modal existe déjà
        if (document.getElementById(this.modalId)) {
            return;
        }

        const modal = document.createElement('div');
        modal.id = this.modalId;
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content signup-modal-content">
                <div class="modal-header">
                    <h3>Rejoignez Connect People</h3>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="signup-options">
                        <div class="signup-option" data-type="helper">
                            <div class="option-icon">
                                <i class="fas fa-heart"></i>
                            </div>
                            <div class="option-content">
                                <h4>Devenir Helper</h4>
                                <p>Proposez vos services et aidez votre communauté tout en générant des revenus</p>
                                <ul class="option-benefits">
                                    <li><i class="fas fa-check"></i> Fixez vos propres tarifs</li>
                                    <li><i class="fas fa-check"></i> Travaillez quand vous voulez</li>
                                    <li><i class="fas fa-check"></i> Développez votre réseau</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div class="signup-option" data-type="seeker">
                            <div class="option-icon">
                                <i class="fas fa-search"></i>
                            </div>
                            <div class="option-content">
                                <h4>Chercher de l'aide</h4>
                                <p>Trouvez des helpers qualifiés pour tous vos besoins du quotidien</p>
                                <ul class="option-benefits">
                                    <li><i class="fas fa-check"></i> Accès à des milliers de helpers</li>
                                    <li><i class="fas fa-check"></i> Paiements sécurisés</li>
                                    <li><i class="fas fa-check"></i> Support client 24/7</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="signup-form" style="display: none;">
                        <div class="form-header">
                            <button class="back-btn" type="button">
                                <i class="fas fa-arrow-left"></i> Retour
                            </button>
                            <h4 class="form-title">Inscription</h4>
                        </div>
                        
                        <form id="signup-form">
                            <input type="hidden" id="user-type" name="type" value="">
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="firstName">Prénom *</label>
                                    <input type="text" id="firstName" name="firstName" required>
                                </div>
                                <div class="form-group">
                                    <label for="lastName">Nom *</label>
                                    <input type="text" id="lastName" name="lastName" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="email">Email *</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="password">Mot de passe *</label>
                                <input type="password" id="password" name="password" required>
                                <small class="form-help">Au moins 8 caractères avec une majuscule et un chiffre</small>
                            </div>
                            
                            <div class="form-group">
                                <label for="confirmPassword">Confirmer le mot de passe *</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="phone">Téléphone</label>
                                <input type="tel" id="phone" name="phone">
                            </div>
                            
                            <div class="form-group">
                                <label for="city">Ville *</label>
                                <input type="text" id="city" name="city" required>
                            </div>
                            
                            <div class="helper-specific" style="display: none;">
                                <div class="form-group">
                                    <label for="skills">Vos compétences principales</label>
                                    <textarea id="skills" name="skills" placeholder="Décrivez brièvement vos compétences et services que vous proposez..."></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label for="experience">Années d'expérience</label>
                                    <select id="experience" name="experience">
                                        <option value="">Sélectionnez...</option>
                                        <option value="0-1">Moins d'1 an</option>
                                        <option value="1-3">1 à 3 ans</option>
                                        <option value="3-5">3 à 5 ans</option>
                                        <option value="5-10">5 à 10 ans</option>
                                        <option value="10+">Plus de 10 ans</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="terms" name="terms" required>
                                    <span class="checkmark"></span>
                                    J'accepte les <a href="/termes-conditions" target="_blank">conditions d'utilisation</a> et la <a href="/politique-confidentialite" target="_blank">politique de confidentialité</a>
                                </label>
                            </div>
                            
                            <div class="form-group checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="newsletter" name="newsletter">
                                    <span class="checkmark"></span>
                                    Je souhaite recevoir les actualités et offres spéciales de Connect People
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="footer-options">
                        <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">Annuler</button>
                        <button type="button" class="btn btn-primary continue-btn">Continuer</button>
                    </div>
                    <div class="footer-form" style="display: none;">
                        <button type="button" class="btn btn-secondary" onclick="modalManager.closeModal()">Annuler</button>
                        <button type="submit" form="signup-form" class="btn btn-primary">Créer mon compte</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    bindEvents() {
        const modal = document.getElementById(this.modalId);
        if (!modal) return;

        // Boutons de sélection du type d'utilisateur
        modal.querySelectorAll('.signup-option').forEach(option => {
            option.addEventListener('click', () => {
                this.selectUserType(option.dataset.type);
            });
        });

        // Bouton retour
        modal.querySelector('.back-btn').addEventListener('click', () => {
            this.showOptions();
        });

        // Bouton continuer
        modal.querySelector('.continue-btn').addEventListener('click', () => {
            const selectedOption = modal.querySelector('.signup-option.selected');
            if (selectedOption) {
                this.showForm(selectedOption.dataset.type);
            }
        });

        // Soumission du formulaire
        modal.querySelector('#signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Validation en temps réel
        this.setupValidation();
    }

    selectUserType(type) {
        const modal = document.getElementById(this.modalId);
        const options = modal.querySelectorAll('.signup-option');
        
        options.forEach(option => {
            option.classList.remove('selected');
        });
        
        modal.querySelector(`[data-type="${type}"]`).classList.add('selected');
        modal.querySelector('.continue-btn').style.display = 'block';
    }

    showOptions() {
        const modal = document.getElementById(this.modalId);
        modal.querySelector('.signup-options').style.display = 'block';
        modal.querySelector('.signup-form').style.display = 'none';
        modal.querySelector('.footer-options').style.display = 'flex';
        modal.querySelector('.footer-form').style.display = 'none';
        modal.querySelector('.modal-header h3').textContent = 'Rejoignez Connect People';
    }

    showForm(type) {
        const modal = document.getElementById(this.modalId);
        modal.querySelector('.signup-options').style.display = 'none';
        modal.querySelector('.signup-form').style.display = 'block';
        modal.querySelector('.footer-options').style.display = 'none';
        modal.querySelector('.footer-form').style.display = 'flex';
        
        // Mettre à jour le titre
        const title = type === 'helper' ? 'Devenir Helper' : 'Chercher de l\'aide';
        modal.querySelector('.modal-header h3').textContent = title;
        modal.querySelector('.form-title').textContent = `Inscription - ${title}`;
        
        // Définir le type d'utilisateur
        modal.querySelector('#user-type').value = type;
        
        // Afficher/masquer les champs spécifiques aux helpers
        const helperFields = modal.querySelector('.helper-specific');
        if (type === 'helper') {
            helperFields.style.display = 'block';
        } else {
            helperFields.style.display = 'none';
        }
    }

    setupValidation() {
        const modal = document.getElementById(this.modalId);
        const form = modal.querySelector('#signup-form');
        
        // Validation du mot de passe
        const password = form.querySelector('#password');
        const confirmPassword = form.querySelector('#confirmPassword');
        
        password.addEventListener('input', () => {
            this.validatePassword(password.value);
        });
        
        confirmPassword.addEventListener('input', () => {
            this.validatePasswordMatch(password.value, confirmPassword.value);
        });
        
        // Validation de l'email
        const email = form.querySelector('#email');
        email.addEventListener('blur', () => {
            this.validateEmail(email.value);
        });
    }

    validatePassword(password) {
        const isValid = password.length >= 8 && 
                       /[A-Z]/.test(password) && 
                       /[0-9]/.test(password);
        
        const passwordField = document.getElementById('password');
        if (isValid) {
            passwordField.classList.remove('error');
            passwordField.classList.add('valid');
        } else {
            passwordField.classList.remove('valid');
            passwordField.classList.add('error');
        }
        
        return isValid;
    }

    validatePasswordMatch(password, confirmPassword) {
        const isMatch = password === confirmPassword && password.length > 0;
        const confirmField = document.getElementById('confirmPassword');
        
        if (isMatch) {
            confirmField.classList.remove('error');
            confirmField.classList.add('valid');
        } else {
            confirmField.classList.remove('valid');
            confirmField.classList.add('error');
        }
        
        return isMatch;
    }

    validateEmail(email) {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const emailField = document.getElementById('email');
        
        if (isValid) {
            emailField.classList.remove('error');
            emailField.classList.add('valid');
        } else {
            emailField.classList.remove('valid');
            emailField.classList.add('error');
        }
        
        return isValid;
    }

    async handleSubmit() {
        const form = document.getElementById('signup-form');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validation finale
        if (!this.validateForm(data)) {
            return;
        }
        
        // Convertir les checkboxes en booléens
        data.terms = data.terms === 'on';
        data.newsletter = data.newsletter === 'on';
        
        try {
            // Afficher un indicateur de chargement
            this.showLoading(true);
            
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                this.showSuccess('Inscription réussie ! Bienvenue sur Connect People.');
                setTimeout(() => {
                    modalManager.closeModal();
                    // Rediriger vers le dashboard ou la page d'accueil
                    window.location.href = '/dashboard';
                }, 2000);
            } else {
                this.showError(result.error || 'Une erreur est survenue lors de l\'inscription');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            this.showError('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            this.showLoading(false);
        }
    }

    validateForm(data) {
        const errors = [];
        
        if (!data.firstName?.trim()) errors.push('Le prénom est requis');
        if (!data.lastName?.trim()) errors.push('Le nom est requis');
        if (!this.validateEmail(data.email)) errors.push('Email invalide');
        if (!this.validatePassword(data.password)) errors.push('Mot de passe invalide');
        if (!this.validatePasswordMatch(data.password, data.confirmPassword)) errors.push('Les mots de passe ne correspondent pas');
        if (!data.city?.trim()) errors.push('La ville est requise');
        if (!data.terms) errors.push('Vous devez accepter les conditions d\'utilisation');
        
        if (errors.length > 0) {
            this.showError(errors.join('<br>'));
            return false;
        }
        
        return true;
    }

    showLoading(show) {
        const submitBtn = document.querySelector('#signup-modal .btn-primary[type="submit"]');
        if (show) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription en cours...';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Créer mon compte';
        }
    }

    showSuccess(message) {
        const modal = document.getElementById(this.modalId);
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="success-message">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Inscription réussie !</h3>
                <p>${message}</p>
                <p class="redirect-info">Vous allez être redirigé dans quelques secondes...</p>
            </div>
        `;
        modal.querySelector('.modal-footer').style.display = 'none';
    }

    showError(message) {
        // Créer ou mettre à jour le message d'erreur
        let errorDiv = document.querySelector('#signup-modal .error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            const modalBody = document.querySelector('#signup-modal .modal-body');
            modalBody.insertBefore(errorDiv, modalBody.firstChild);
        }
        
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-triangle"></i>
                <div>${message}</div>
            </div>
        `;
        
        // Faire défiler vers le haut pour voir l'erreur
        document.querySelector('#signup-modal .modal-content').scrollTop = 0;
    }

    show(type = null) {
        modalManager.showModal(this.modalId);
        
        if (type) {
            // Si un type est spécifié, sélectionner automatiquement et passer au formulaire
            this.selectUserType(type);
            setTimeout(() => {
                this.showForm(type);
            }, 100);
        } else {
            // Sinon, afficher les options
            this.showOptions();
        }
    }
}

// Initialiser la modal d'inscription
const signupModal = new SignupModal();

// Fonctions globales pour faciliter l'utilisation
function showSignupModal(type = null) {
    signupModal.show(type);
}

function showRegister(type) {
    signupModal.show(type);
}

// Export pour les modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SignupModal, showSignupModal, showRegister };
}