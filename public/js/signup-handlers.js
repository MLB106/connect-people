/* ===========================  SIGNUP HANDLERS  =========================== */

document.addEventListener('DOMContentLoaded', function() {
    // Gestionnaire pour tous les boutons "devenir helper"
    document.querySelectorAll('[data-action="become-helper"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupModal('helper');
        });
    });

    // Gestionnaire pour tous les boutons "register-helper" (page d'accueil)
    document.querySelectorAll('[data-action="register-helper"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupModal('helper');
        });
    });

    // Gestionnaire pour tous les boutons "register-seeker" (page d'accueil)
    document.querySelectorAll('[data-action="register-seeker"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupModal('seeker');
        });
    });

    // Gestionnaire pour les liens "demander de l'aide" dans le footer
    document.querySelectorAll('a[href="/demander-aide"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupModal('seeker');
        });
    });

    // Gestionnaire pour les liens "proposer de l'aide"
    document.querySelectorAll('a[href="/proposer-aide"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupModal('helper');
        });
    });

    // Gestionnaire pour les boutons "Trouver un Helper"
    document.querySelectorAll('[data-action="find-helper"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupModal('seeker');
        });
    });

    // Gestionnaire pour les boutons génériques "Trouver un Helper" (sans data-action)
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.trim() === 'Trouver un Helper') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showSignupModal('seeker');
            });
        }
    });

    // Gestionnaire pour les liens vers l'inscription avec paramètre type
    document.querySelectorAll('a[href*="/auth/register"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = new URL(this.href);
            const type = url.searchParams.get('type');
            showSignupModal(type || null);
        });
    });

    // Gestionnaire pour les boutons "Commencer maintenant" sur la page demander-aide
    document.querySelectorAll('a[href="/auth/register"]').forEach(link => {
        if (link.textContent.includes('Commencer maintenant')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showSignupModal('seeker');
            });
        }
    });
});

// Fonction pour intercepter la navigation vers les pages d'aide
function interceptHelpNavigation() {
    // Intercepter les clics sur les liens de navigation
    const helpLinks = [
        '/demander-aide',
        '/proposer-aide',
        '/auth/register?type=helper',
        '/auth/register?type=seeker',
        '/auth/register'
    ];

    helpLinks.forEach(href => {
        document.querySelectorAll(`a[href="${href}"]`).forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (href.includes('type=helper') || href === '/proposer-aide') {
                    showSignupModal('helper');
                } else if (href.includes('type=seeker') || href === '/demander-aide') {
                    showSignupModal('seeker');
                } else {
                    showSignupModal();
                }
            });
        });
    });
}

// Appeler l'interception après le chargement du DOM
document.addEventListener('DOMContentLoaded', interceptHelpNavigation);

// Observer les changements dans le DOM pour les nouveaux éléments ajoutés dynamiquement
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Réappliquer les gestionnaires aux nouveaux éléments
                    interceptHelpNavigation();
                }
            });
        }
    });
});

// Commencer à observer
observer.observe(document.body, {
    childList: true,
    subtree: true
});