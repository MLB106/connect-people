Pour commencer voici mon architecture et les moints faibles :  # ARCHITECTURE.md - Architecture actuelle de Connect People

## 🏗️ Vue d'ensemble

Connect People est une application web moderne construite avec **Node.js ES2023**, **TypeScript**, **Express** et **Handlebars**. L'architecture suit le pattern **MVC** avec une séparation claire entre les couches.

## 📁 Structure du projet

```
connect-people/
├── src/                          # Code source principal
│   ├── index.ts                  # Point d'entrée de l'application
│   ├── client/                   # Code côté client (TypeScript)
│   ├── config/                   # Configuration de l'application
│   ├── controllers/              # Contrôleurs (logique métier)
│   ├── middlewares/              # Middlewares Express
│   ├── models/                   # Modèles de données (Mongoose)
│   ├── routes/                   # Routes organisées par domaine
│   ├── services/                 # Services métier
│   ├── utils/                    # Utilitaires
│   ├── views/                    # Templates Handlebars
│   └── locales/                  # Fichiers de traduction
├── public/                       # Assets statiques
│   ├── css/                      # Feuilles de style
│   ├── js/                       # JavaScript côté client
│   └── images/                   # Images
├── dist/                         # Code compilé (TypeScript → JavaScript)
└── __tests__/                    # Tests Jest
```

## 🔧 Technologies utilisées

### Backend
- **Node.js ES2023** - Runtime JavaScript moderne
- **TypeScript** - Typage statique
- **Express.js** - Framework web
- **Mongoose** - ODM pour MongoDB
- **Redis** - Cache et sessions
- **JWT** - Authentification
- **Handlebars** - Moteur de template

### Frontend
- **Handlebars** - Templates côté serveur
- **CSS3** - Styles modernes
- **JavaScript ES6+** - Interactivité côté client
- **i18n** - Internationalisation (8 langues)

### Outils de développement
- **Jest** - Tests unitaires
- **ESLint** - Linting
- **Prettier** - Formatage
- **tsx** - Exécution TypeScript

## 🚀 Architecture des routes

### 1. Routes principales
```
/                           # Page d'accueil (dual HTML/JSON)
/app/*                      # Routes d'application
/api/*                      # API REST
/admin/*                    # Routes d'administration
/user/*                     # Routes utilisateur
/auth/*                     # Authentification
```

### 2. Routes de développement
```
/dev/*                      # Routes de développement
/dev/html/*                 # Rendu HTML pour tests
/view/:page                 # Visualisation de pages
```

### 3. Routes statiques
```
/css/*                      # Feuilles de style
/js/*                       # JavaScript
/img/*                      # Images
/locales/*                  # Fichiers de traduction
```

## 📊 Couches de l'architecture

### 1. **Couche Présentation (Views)**
- **Templates Handlebars** dans `src/views/`
- **Assets statiques** dans `public/`
- **Internationalisation** avec 8 langues supportées

### 2. **Couche Contrôleur (Controllers)**
- **Contrôleurs métier** dans `src/controllers/`
- **Logique d'authentification** (admin/user)
- **Gestion des données** et validation

### 3. **Couche Modèle (Models)**
- **Modèles Mongoose** dans `src/models/`
- **Schémas de données** avec validation
- **Relations entre entités**

### 4. **Couche Service (Services)**
- **Services métier** dans `src/services/`
- **Intégrations externes** (Redis, Mail, etc.)
- **Logique complexe** et utilitaires

### 5. **Couche Middleware**
- **Authentification** et autorisation
- **Validation** des données
- **Logging** et monitoring
- **Sécurité** (CSRF, Rate limiting)

## 🔐 Système d'authentification

### 1. **Authentification utilisateur**
- **JWT** avec refresh tokens
- **Sessions Redis** pour la persistance
- **RBAC** (Role-Based Access Control)
- **2FA** pour les administrateurs

### 2. **Sécurité**
- **CSRF protection** avec tokens
- **Rate limiting** par IP et utilisateur
- **Validation stricte** avec Zod
- **Sanitisation** des entrées utilisateur

## 🌐 Internationalisation

### 1. **Langues supportées**
- Français (fr) - Langue par défaut
- Anglais (en)
- Espagnol (es)
- Italien (it)
- Allemand (de)
- Portugais (pt)
- Arabe (ar)

### 2. **Système i18n**
- **Fichiers JSON** dans `src/locales/`
- **Détection automatique** de la langue
- **Fallback** vers l'anglais
- **Modales de confirmation** multilingues

## 🗄️ Base de données

### 1. **MongoDB** (Principal)
- **Collections** : users, adminUsers, reports, etc.
- **Indexation** pour les performances
- **Validation** des schémas

### 2. **Redis** (Cache)
- **Sessions** utilisateur
- **Tokens** JWT
- **Cache** des données fréquentes
- **Rate limiting** storage

## 📱 Système de modales

### 1. **Modales existantes**
- **Modal bienvenue** (signup-modal) - Créée dynamiquement
- **Modal de connexion** (loginModal) - Intégrée dans login.hbs
- **Modal d'inscription** (registerModal) - Intégrée dans login.hbs
- **Modal de langue** (language-modal) - Confirmation de changement

### 2. **Problèmes identifiés**
- **Conflits de fonctions** entre header.js et login.hbs
- **Styles dupliqués** entre modal.css et auth.css
- **Boucles infinies** causées par les redirections
- **Code dispersé** et mal organisé

## 🔄 Flux de données

### 1. **Requête utilisateur**
```
Client → Express → Middleware → Controller → Service → Model → Database
```

### 2. **Réponse serveur**
```
Database → Model → Service → Controller → View → Client
```

### 3. **Gestion des erreurs**
- **Middleware global** de gestion d'erreurs
- **Logging** avec Winston
- **Réponses uniformes** JSON/HTML

## 🧪 Tests

### 1. **Tests unitaires**
- **Jest** pour les tests
- **Coverage** des fonctions critiques
- **Mocks** pour les dépendances

### 2. **Tests d'intégration**
- **API endpoints** testing
- **Database** integration tests
- **Authentication** flow tests

## 🚀 Déploiement

### 1. **Environnements**
- **Development** - Mode développement avec hot reload
- **Production** - Mode optimisé avec build

### 2. **Scripts disponibles**
```bash
npm run dev          # Développement avec watch
npm run build        # Compilation TypeScript
npm run start        # Démarrage en production
npm run test         # Exécution des tests
```

## 📈 Monitoring et logs

### 1. **Logging**
- **Winston** pour les logs structurés
- **Rotation** des fichiers de logs
- **Niveaux** de log (error, warn, info, debug)

### 2. **Health checks**
- **Endpoint** `/health` pour le monitoring
- **Database** connection status
- **Redis** connection status

## 🔧 Configuration

### 1. **Variables d'environnement**
- **Base de données** (MongoDB, Redis)
- **JWT secrets** et expiration
- **Mail** configuration
- **CORS** et sécurité

### 2. **Ports**
- **Port principal** configurable
- **Fallback ports** automatiques
- **Port management** intelligent

## 🚨 Problèmes actuels

### 1. **Code des modales**
- **Conflits** entre fichiers
- **Duplication** de code
- **Boucles infinies** non résolues
- **Styles** incohérents

### 2. **Architecture**
- **Séparation** des responsabilités floue
- **Code mort** (modal.js non utilisé)
- **Maintenance** difficile

## 📋 Recommandations

### 1. **Refactoring urgent**
- **Centraliser** la gestion des modales
- **Éliminer** les conflits de fonctions
- **Unifier** les styles CSS
- **Nettoyer** le code mort

### 2. **Améliorations**
- **Documentation** technique
- **Tests** plus complets
- **Monitoring** avancé
- **Performance** optimization

---

*Dernière mise à jour : 22 octobre 2025*
*Architecture analysée après les problèmes de modales*

# REPARATION.md - Liste des fichiers contenant des morceaux de code liés aux modales

## 📁 FICHIERS JAVASCRIPT DES MODALES

### 1. **public/js/header.js**
**Morceaux identifiés :**
- **Lignes 14-36** : Déclencheurs de modales (data-action="become-helper", "register-seeker")
- **Lignes 270-381** : Fonction showSignupModal() - Modal bienvenue principale
- **Lignes 383-397** : Fonctions showLogin() et showRegister() - Redirections
- **Lignes 178-236** : Fonction showLanguageConfirmationModal() - Modal de confirmation de langue

**Relations :**
- Utilise les classes CSS de modal.css et auth.css
- Entre en conflit avec les fonctions de login.hbs
- Crée des modales dynamiquement

### 2. **public/js/modal.js**
**Morceaux identifiés :**
- **Lignes 1-8** : Classe ModalManager - Système centralisé (NON UTILISÉ)
- **Lignes 189-215** : Fonctions globales showModal(), closeModal(), showConfirm(), showAlert()

**Relations :**
- Code mort qui n'est pas utilisé dans l'application
- Peut entrer en conflit avec header.js
- Utilise les classes CSS de modal.css

### 3. **src/views/pages/login.hbs**
**Morceaux identifiés :**
- **Lignes 8-16** : Modal de connexion (loginModal) - HTML
- **Lignes 53-62** : Modal d'inscription (registerModal) - HTML
- **Lignes 106-123** : Fonctions showRegisterModal() et showLoginModal() - JavaScript inline
- **Lignes 125-158** : Gestion des événements et paramètres URL - JavaScript inline

**Relations :**
- Utilise les classes CSS de auth.css
- Entre en conflit avec les fonctions de header.js
- Gère les paramètres URL ?show=register

## 📁 FICHIERS CSS DES MODALES

### 4. **public/css/modal.css**
**Morceaux identifiés :**
- **Lignes 1-8** : Styles principaux des modales (.modal, .modal-content, .modal-header, .modal-body)
- **Lignes 9-50** : Styles de base pour toutes les modales
- **Lignes 51-294** : Styles spécialisés (language-modal, form-group, responsive)

**Relations :**
- Utilisé par header.js, login.hbs et modal.js
- Entre en conflit avec auth.css
- Z-index 10000

### 5. **public/css/auth.css**
**Morceaux identifiés :**
- **Lignes 464-471** : Styles spécifiques pour la modal d'inscription (#signup-modal)
- **Lignes 472-520** : Redéfinition des classes .modal, .modal-content
- **Lignes 521-800** : Styles pour les boutons OAuth, séparateurs, footer

**Relations :**
- Utilisé par la fonction showSignupModal() de header.js
- Entre en conflit avec modal.css
- Z-index 1000

### 6. **public/css/style.css**
**Morceaux identifiés :**
- **Lignes 242-257** : Styles généraux des modales (dupliqués)
- **Lignes 258-337** : Styles des boutons et responsive

**Relations :**
- Duplication avec modal.css
- Styles contradictoires

## 📁 FICHIERS HTML/HBS DES MODALES

### 7. **src/views/pages/register.hbs**
**Morceaux identifiés :**
- **Lignes 7-54** : Page d'inscription standalone (pas de modales)

**Relations :**
- Lien vers page de login
- Pas de conflit direct

### 8. **src/views/index.hbs**
**Morceaux identifiés :**
- **Lignes 9-15** : Boutons déclencheurs (data-action="register-helper", "register-seeker")

**Relations :**
- Déclenche les modales via header.js
- Pas de code de modales direct

## 📁 FICHIERS DE TEST DES MODALES

### 9. **test-modal.html**
**Morceaux identifiés :**
- Tests des modales bienvenue
- Tests des boutons OAuth
- Tests de navigation entre modales

### 10. **test-modal-flow.html**
**Morceaux identifiés :**
- Tests du flux complet des modales
- Tests d'ouverture/fermeture
- Tests de redirections

## 🚨 RÉSUMÉ DES CONFLITS IDENTIFIÉS

### Conflits de fonctions :
- `showRegisterModal()` dans header.js ET login.hbs
- `showLoginModal()` dans header.js ET login.hbs
- `showModal()` dans modal.js ET showSignupModal() dans header.js

### Conflits de styles :
- Classes `.modal`, `.modal-content` redéfinies dans modal.css ET auth.css
- Z-index 1000 (auth.css) vs 10000 (modal.css)
- Styles contradictoires entre les fichiers CSS

### Conflits de responsabilités :
- header.js : Redirections + affichage de modales
- login.hbs : Affichage de modales + redirections
- modal.js : Système centralisé (non utilisé)

## 📋 FICHIERS À RÉPARER (par ordre de priorité)

1. **public/js/header.js** - Conflits de fonctions, redirections problématiques
2. **src/views/pages/login.hbs** - Conflits de fonctions, JavaScript inline
3. **public/css/auth.css** - Conflits de styles, Z-index
4. **public/css/modal.css** - Duplication de styles
5. **public/js/modal.js** - Code mort, conflits potentiels
6. **public/css/style.css** - Duplication de styles

---

*Dernière mise à jour : 22 octobre 2025*
*Problème de boucle infinie : IDENTIFIÉ et commenté*

// FIchier : public/js/header.js
/* ===========================  HEADER  =========================== */
document.addEventListener('DOMContentLoaded', async () => {
  // Initialiser le système i18n
  await window.i18n.loadTranslations();
  
  /* ----------- auth ----------- */
  document.querySelectorAll('[data-action="login"]').forEach(b =>
    b.addEventListener('click', showLogin)
  );
  document.querySelectorAll('[data-action="register"]').forEach(b =>
    b.addEventListener('click', () => showRegister())
  );

  
  /* ----------- language ----------- */
  setupLanguageSelector();

  /* ----------- user-menu ----------- */
  document.querySelectorAll('[data-action="profile"]').forEach(b =>
    b.addEventListener('click', e => { e.preventDefault(); showProfile(); })
  );
  document.querySelectorAll('[data-action="wallet"]').forEach(b =>
    b.addEventListener('click', e => { e.preventDefault(); showWallet(); })
  );
  document.querySelectorAll('[data-action="logout"]').forEach(b =>
    b.addEventListener('click', e => { e.preventDefault(); logout(); })
  );
  document.querySelectorAll('[data-action="open-chat"]').forEach(b =>
    b.addEventListener('click', e => { e.preventDefault(); openChat(0); })
  );

  /* ----------- mobile menu ----------- */
  document.querySelectorAll('[data-action="mobile-menu-toggle"]').forEach(b =>
    b.addEventListener('click', e => {
      e.preventDefault();
      toggleMobileMenu();
    })
  );

  /* ----------- nav-links ----------- */
  document.querySelectorAll('[data-page="nos-helpers"]').forEach(l =>
    l.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = '/nos-helpers';
    })
  );
  
  document.querySelectorAll('[data-page="nos-annonces"]').forEach(l =>
    l.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = '/nos-annonces';
    })
  );
  
  document.querySelectorAll('[data-page="documentation"]').forEach(l =>
    l.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = '/documentation';
    })
  );

  /* ----------- dropdowns ----------- */
  setupDropdowns();

  /* ----------- navbar scroll ----------- */
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('global-nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });
});

/* ===========================  DROPDOWNS  =========================== */
function setupDropdowns() {
  const entreprendreTrigger = document.getElementById('entreprendre-trigger');
  const entreprendreDropdown = document.getElementById('entreprendre-dropdown');
  if (entreprendreTrigger && entreprendreDropdown) {
    entreprendreTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown('entreprendre');
    });
  }

  const immobilierTrigger = document.getElementById('immobilier-trigger');
  const immobilierDropdown = document.getElementById('immobilier-dropdown');
  if (immobilierTrigger && immobilierDropdown) {
    immobilierTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown('immobilier');
    });
  }

  const traductionTrigger = document.getElementById('traduction-trigger');
  const traductionDropdown = document.getElementById('traduction-dropdown');
  if (traductionTrigger && traductionDropdown) {
    traductionTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDropdown('traduction');
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.entreprendre-dropdown') && 
        !e.target.closest('.immobilier-dropdown') && 
        !e.target.closest('.traduction-dropdown')) {
      closeAllDropdowns();
    }
  });
}

function toggleDropdown(type) {
  closeAllDropdowns();
  const dropdown = document.getElementById(`${type}-dropdown`);
  if (dropdown) dropdown.classList.add('active');
}

function closeAllDropdowns() {
  ['entreprendre', 'immobilier', 'traduction'].forEach(type => {
    const dropdown = document.getElementById(`${type}-dropdown`);
    if (dropdown) dropdown.classList.remove('active');
  });
}

/* ===========================  LANGUAGE SELECTOR  =========================== */
function setupLanguageSelector() {
  const languageSelect = document.getElementById('language-select');
  if (!languageSelect) return;

  const savedLanguage = localStorage.getItem('selectedLanguage') || 'fr';
  languageSelect.value = savedLanguage;

  languageSelect.addEventListener('change', handleLanguageChange);
}

async function handleLanguageChange(event) {
  const selectedLanguage = event.target.value;
  const selectedOption = event.target.options[event.target.selectedIndex];
  const languageText = selectedOption.textContent;

  // Mettre à jour la langue dans le système i18n
  window.i18n.setLanguage(selectedLanguage);
  
  // Attendre que les traductions soient chargées
  await window.i18n.loadTranslations();

  showLanguageConfirmationModal(selectedLanguage, languageText);

  localStorage.setItem('selectedLanguage', selectedLanguage);
  updatePageLanguage(selectedLanguage);

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

/* ========== MODAL DE CONFIRMATION DE LANGUE ========== */
/* 
 * FONCTION : showLanguageConfirmationModal() - Affiche une modal de confirmation lors du changement de langue
 * RELATION : Appelée par handleLanguageChange() ligne 162
 * CSS UTILISÉ : Classes .modal, .modal-content, .language-confirmation (définies dans modal.css)
 * PROBLÈME : Crée une modal dynamiquement qui peut entrer en conflit avec les autres modales
 */
function showLanguageConfirmationModal(languageCode, languageText) {
  // 1. Créer la modal si elle manque
  let modal = document.getElementById('language-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'language-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="language-modal-title"></h3>
          <span class="close" id="language-modal-close">&times;</span>
        </div>
        <div class="modal-body">
          <div class="language-confirmation">
            <div class="language-icon" id="language-modal-icon"></div>
            <p id="language-modal-message"></p>
            <p class="language-sub-message" id="language-modal-sub-message"></p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // 2. Remplir avec les traductions i18n
  const languageNames = window.i18n.getLanguageNames();
  const languageName = languageNames[languageCode] || languageText;

  // on lit directement le JSON local sans passer par window.__()
  (async () => {
    try {
      const res  = await fetch(`/locales/${languageCode}.json`);
      const json = await res.json();   // { modal: { languageConfirmation: {...} } }
      const mc   = json.modal.languageConfirmation;
      document.getElementById('language-modal-title').textContent       = mc.title;
      document.getElementById('language-modal-icon').textContent        = getLanguageFlag(languageCode);
      document.getElementById('language-modal-message').textContent     = mc.activated.replace('{{language}}', languageName);
      document.getElementById('language-modal-sub-message').textContent = mc.success;
    } catch (e) {
      // fallback anglais si jamais le fichier manque
      const fall = await fetch('/locales/en.json').then(r => r.json());
      const mc   = fall.modal.languageConfirmation;
      document.getElementById('language-modal-title').textContent       = mc.title;
      document.getElementById('language-modal-icon').textContent        = getLanguageFlag(languageCode);
      document.getElementById('language-modal-message').textContent     = mc.activated.replace('{{language}}', languageName);
      document.getElementById('language-modal-sub-message').textContent = mc.success;
    }
  })();

  // 4. AFFICHAGE
  modal.style.display = 'flex';
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';

  // 5. Fermer auto après 3 s
  setTimeout(() => {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 3000);
}

// Fonction helper pour les drapeaux
function getLanguageFlag(languageCode) {
  const flags = {
    fr: '🇫🇷', it: '🇮🇹', en: '🇬🇧', es: '🇪🇸', 
    ar: '🇸🇦', de: '🇩🇪', pt: '🇵🇹'
  };
  return flags[languageCode] || '🇬🇧';
}

function getLanguageData(languageCode) {
  const map = {
    fr: { flag: '🇫🇷', activatedMessage: 'Langue française activée', successMessage: 'La langue a été changée avec succès' },
    it: { flag: '🇮🇹', activatedMessage: 'Lingua italiana attivata', successMessage: 'La lingua è stata cambiata con successo' },
    en: { flag: '🇬🇧', activatedMessage: 'English language activated', successMessage: 'Language changed successfully' },
    es: { flag: '🇪🇸', activatedMessage: 'Idioma español activado', successMessage: 'El idioma se ha cambiado exitosamente' },
    ar: { flag: '🇸🇦', activatedMessage: 'تم تفعيل اللغة العربية', successMessage: 'تم تغيير اللغة بنجاح' },
    de: { flag: '🇩🇪', activatedMessage: 'Deutsche Sprache aktiviert', successMessage: 'Sprache erfolgreich geändert' },
    pt: { flag: '🇵🇹', activatedMessage: 'Idioma português ativado', successMessage: 'Idioma alterado com sucesso' }
  };
  return map[languageCode] || map.fr;
}

function updatePageLanguage(languageCode) {
  console.log(`Language changed to: ${languageCode}`);
}

/* ========== MODAL BIENVENUE - FONCTION PRINCIPALE ========== */
/* 
 * FONCTION : showSignupModal() - Crée et affiche la modal bienvenue
 * RELATION : Appelée par les boutons lignes 25, 31, 35 (data-action="become-helper", "register-seeker")
 * CONFLIT MAJEUR : Cette fonction crée une modal dynamiquement qui entre en conflit avec les modales de login.hbs
 * PROBLÈME : Redirections vers /auth/login et /auth/login?show=register qui peuvent créer des boucles infinies
 * CSS UTILISÉ : Classes .modal, .modal-content, .signup-oauth, .signup-separator (définies dans modal.css et auth.css)
 */
function showSignupModal(preferredRole, continueUrl) {
  console.log('showSignupModal called with:', preferredRole, continueUrl);
  // Create modal if missing
  let modal = document.getElementById('signup-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'signup-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Bienvenue !</h3>
          <span class="close" id="signup-modal-close">&times;</span>
        </div>
        <div class="modal-body">
          <div class="signup-oauth">
            <button class="btn btn-google" id="oauth-google"><span class="google-logo" aria-hidden="true"></span> Continuer avec Google</button>
            <button class="btn btn-apple" id="oauth-apple"><i class="fab fa-apple" aria-hidden="true"></i> Continuer avec Apple</button>
            <button class="btn btn-facebook" id="oauth-facebook"><i class="fab fa-facebook" aria-hidden="true"></i> Continuer avec Facebook</button>
          </div>

          <div class="signup-separator" aria-hidden="true">
            Ou connecte-toi avec ton <a href="#" id="email-login-link">e-mail</a>
          </div>

          <div class="signup-footer" style="margin-top:1rem; text-align:center;">
            <p style="margin: 0; color: #9cafbd; font-size: 0.9rem;">
              Tu n'as pas de compte Connect People ?
              <a href="#" id="email-register-link">S'inscrire</a>
            </p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Wire buttons only once when modal is created
    const googleBtn = modal.querySelector('#oauth-google');
    const appleBtn = modal.querySelector('#oauth-apple');
    const facebookBtn = modal.querySelector('#oauth-facebook');
    const emailLoginLink = modal.querySelector('#email-login-link');
    const emailRegisterLink = modal.querySelector('#email-register-link');

    if (googleBtn) {
      googleBtn.addEventListener('click', () => { window.location.href = '/auth/google'; });
    }
    if (appleBtn) {
      appleBtn.addEventListener('click', () => { window.location.href = '/auth/apple'; });
    }
    if (facebookBtn) {
      facebookBtn.addEventListener('click', () => { window.location.href = '/auth/facebook'; });
    }
    if (emailLoginLink) {
      emailLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Fermer la modal actuelle
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        // Rediriger vers la page login
        window.location.href = '/auth/login';
      });
    }
    if (emailRegisterLink) {
      emailRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Fermer la modal actuelle
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        // Rediriger vers la page login avec modal register
        window.location.href = '/auth/login?show=register';
      });
    }

    // Add close functionality only once
    const closeBtn = modal.querySelector('#signup-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      });
    }

    // Close on backdrop click only once
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  // Show the modal directly
  console.log('Showing modal:', modal);
  modal.style.display = 'flex';
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Force a reflow to ensure the modal is visible
  modal.offsetHeight;
}

/* ========== FONCTIONS DE REDIRECTION - CONFLIT AVEC LOGIN.HBS ========== */
/* 
 * FONCTIONS : showLogin() et showRegister() - Redirections vers les pages d'authentification
 * RELATION : Ces fonctions sont appelées par les boutons data-action="login" et data-action="register"
 * CONFLIT MAJEUR : Ces fonctions redirigent vers /auth/login et /auth/login?show=register
 * PROBLÈME : Ces redirections peuvent créer des boucles infinies avec les modales de login.hbs
 * DANGER : showRegister() redirige vers /auth/login?show=register qui peut déclencher showRegisterModal() dans login.hbs
 */
function showLogin() {
  window.location.href = '/auth/login';
}

function showRegister() {
  window.location.href = '/auth/login?show=register';
}

function showProfile() {
  window.location.href = '/profile';
}

function showWallet() {
  window.location.href = '/wallet';
}

function logout() {
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    window.location.href = '/auth/logout';
  }
}

function openChat(userId) {
  window.location.href = `/chat/${userId}`;
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('active');
  }
}

{{!-- src/views/partials/header.hbs --}}

<header class="site-header">
    <nav id="global-nav" class="global-navbar" aria-label="Navigation principale">
        <div class="nav-container">
            <div class="nav-top-row">
                <a href="/" class="nav-brand" aria-label="Connect People - Accueil">
                    <span aria-hidden="true">Connect People</span>
                </a>

                <div class="nav-search">
                    <form class="search-bar-nav" role="search" action="/recherche" method="get" autocomplete="off">
                        <label for="search-category-select" class="visually-hidden">Catégorie</label>
                        <div class="search-category-wrapper">
                            <select class="search-category-select" id="search-category-select" name="cat">
                                <option value="centre-aide">Centre d'aide</option>
                                <option value="membres">Membres</option>
                                <option value="annonces">Annonces</option>
                            </select>
                        </div>
                        <div class="search-separator" aria-hidden="true"></div>
                        <label for="nav-search-input" class="visually-hidden">Mots-clés</label>
                        <i class="fas fa-search" aria-hidden="true"></i>
                        <input id="nav-search-input" name="q" type="search"
                               placeholder="Tapez votre recherche..."
                               autocomplete="off" aria-required="false">
                        <button type="submit" class="visually-hidden">Rechercher</button>
                    </form>
                </div>

                <div class="nav-right">
                    <div id="auth-buttons" class="auth-buttons">
                        <button class="nav-btn" data-action="login">Se connecter</button>
                        <button class="nav-btn" data-action="register">S'inscrire</button>
                    </div>

                    <div class="language-selector">
                        <select class="language-select" id="language-select" aria-label="Choisir la langue">
                            <option value="fr">🇫🇷 FR</option>
                            <option value="it">🇮🇹 IT</option>
                            <option value="en">🇬🇧 EN</option>
                            <option value="es">🇪🇸 ES</option>
                            <option value="ar">🇸🇦 AR</option>
                        </select>
                    </div>

                    <div id="user-menu" class="user-menu-nav" hidden>
                        <div class="wallet-display">
                            <i class="fas fa-wallet" aria-hidden="true"></i>
                            <span id="wallet-balance-nav">€0.00</span>
                        </div>
                        <div class="user-profile">
                            <img src="https://via.placeholder.com/32" alt="Avatar" class="user-avatar-nav">
                            <span id="user-name-nav">John Doe</span>
                            <div class="dropdown-nav">
                                <a href="#" data-dashboard-section="dashboard"><i class="fas fa-tachometer-alt"></i> Tableau de bord</a>
                                <a href="#" data-action="profile"><i class="fas fa-user"></i> Profil</a>
                                <a href="#" data-action="wallet"><i class="fas fa-wallet"></i> Portefeuille</a>
                                <a href="#" data-action="open-chat"><i class="fas fa-comments"></i> Messages</a>
                                <div class="dropdown-divider"></div>
                                <a href="#" data-action="logout"><i class="fas fa-sign-out-alt"></i> Déconnexion</a>
                            </div>
                        </div>
                    </div>

                    <button class="mobile-menu-toggle" data-action="mobile-menu-toggle"
                            aria-label="Ouvrir le menu" aria-expanded="false">
                        <div class="hamburger-container">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </div>
                    </button>
                </div>
            </div>

            <div class="nav-center" id="nav-center">
                <ul class="nav-links">
                    {{> nav-immobilier}}
                    {{> nav-entreprendre}}
                    {{> nav-traduction}}
                    <li><a href="/nos-helpers" class="nav-link">Nos Helpers</a></li>
                    <li><a href="/nos-annonces" class="nav-link">Nos Annonces</a></li>
                    <li><a href="/documentation" class="nav-link">Documentation</a></li>
                </ul>
            </div><!-- /nav-center -->
        </div><!-- /nav-container -->
    </nav>
</header>

{{!-- src/views/pages/home.hbs --}}

{{#section 'head'}}
<meta name="page-type" content="home">
{{/section}}

<section class="hero">
    <div class="hero-content">
        <div class="hero-text">
            <h1 class="hero-title">
                Prêt à vous entraider
                <span class="gradient-text">au delà des frontières</span>
            </h1>
            <p class="hero-subtitle">
                Trouvez de l'aide ou aidez d'autres personnes partout dans le monde.
                Fixez vos tarifs, communiquez en toute sécurité, et construisez des relations authentiques.
            </p>
            <a href="/auth/login?show=register" class="btn btn-primary">
                <i class="fas fa-rocket"></i> Prêt à commencer
            </a>
        </div>
    </div>
</section>

{{> features}}
{{> security-assurance}}

/* Fichier : public/css/auth.css */
/* ==========  AUTHENTIFICATION  ========== */
.auth-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: var(--gradient-primary);
    margin-top: -80px;
    padding-top: 100px;
}
.auth-card {
    position: relative;
    background: var(--white);
    padding: 1.5rem;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    width: 95%;
    max-width: 937.8px;
}

/* ==========  LOGIN PAGE  ========== */
.login-page {
    min-height: calc(100vh - 80px); /* Augmenté pour plus d'espace */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem; /* Augmenté pour plus d'espace */
    background: var(--gradient-primary);
    margin: 0;
    padding-top: 80px; /* Espace pour la navigation */
    padding-bottom: 80px; /* Espace pour le footer */
}

.login-modal-container {
    width: 90%;
    max-width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 100px;
}

.login-modal-content {
    background: var(--white);
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 500px;
    animation: slideUp 0.3s ease-out;
    position: relative;
    margin: 0;
    max-height: 60vh; /* Augmenté pour plus d'espace */
    overflow: hidden; /* Retire la barre de scroll */
}

.login-modal-header {
    padding: 1rem 1.5rem 0.75rem 1.5rem; /* Augmenté pour plus d'espace */
    text-align: center;
    position: relative;
}

.login-modal-header h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
    text-align: center;
    position: relative;
    display: inline-block;
    width: 100%;
}

.login-modal-body {
    padding: 1rem 1.5rem; /* Augmenté pour plus d'espace */
    text-align: center;
}

.login-logo {
    margin-bottom: 1rem; /* Augmenté pour plus d'espace */
}

.login-logo i {
    font-size: 2rem;
    color: var(--primary);
}

.login-subtitle {
    font-size: 0.8rem; /* Encore plus petit */
    margin-bottom: 0.8rem; /* Encore plus resserré */
    color: var(--dark);
    font-weight: 500;
}

.login-form {
    text-align: left;
    margin: 0.5rem 0; /* Encore plus resserré */
}

.login-form .form-group {
    margin-bottom: 0.5rem; /* Encore plus resserré */
    text-align: left;
}

.login-form .form-group input {
    width: 100%;
    padding: 0.5rem; /* Encore plus resserré */
    border: 2px solid var(--border);
    border-radius: var(--border-radius);
    font-size: 0.85rem; /* Encore plus petit */
    transition: var(--transition);
    box-sizing: border-box;
}

.login-form .form-group input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(210, 193, 182, 0.1);
}

.login-form .form-label {
    display: block;
    margin-bottom: 0.3rem; /* Encore plus resserré */
    font-weight: 600;
    color: var(--dark);
    font-size: 0.8rem; /* Encore plus petit */
}

.login-form .form-actions {
    text-align: center;
    margin-top: 0.8rem; /* Encore plus resserré */
}

.login-form .login-btn {
    width: calc(100% - 200px); /* Réduit de 100px de chaque côté (70px en plus) */
    margin: 0 100px; /* Ajoute 100px de marge de chaque côté (70px en plus) */
    padding: 0.6rem 1rem; /* Encore plus resserré */
    font-size: 0.85rem; /* Encore plus petit */
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem; /* Réduit l'espace entre l'icône et le texte */
}

.login-footer {
    margin-top: 0.8rem; /* Encore plus resserré */
    padding-top: 0.6rem; /* Encore plus resserré */
    border-top: 1px solid #e5e7eb;
}

.login-footer p {
    color: #4b5563;
    margin: 0 0 0.3rem 0; /* Encore plus resserré */
    font-size: 0.8rem; /* Encore plus petit */
}

.forgot-password-link, .register-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.8rem; /* Encore plus petit */
    transition: var(--transition);
    display: inline-block;
    margin-bottom: 0.3rem; /* Encore plus resserré */
}

.forgot-password-link:hover, .register-link:hover {
    color: var(--primary-dark);
    text-decoration: underline;
}

.login-content .error-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
}

.login-content .error-subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
}

.login-content .form-group {
    margin-bottom: 0.75rem;
}

.login-content .form-input {
    padding: 0.75rem;
    font-size: 0.95rem;
}

.login-content .login-btn {
    width: 80%;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
}

.login-content .login-footer {
    margin-top: 1rem;
}

.login-content .login-footer p {
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    color: var(--gray);
}

.login-content .login-footer a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
}

.login-content .login-footer a:hover {
    color: var(--primary-dark);
    text-decoration: underline;
}

.back-btn {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    background: none;
    border: none;
    color: var(--gray);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    transition: var(--transition);
    padding: 0.75rem 1rem;
    border-radius: var(--border-radius);
}

.back-btn:hover {
    background: var(--gray-lighter);
    color: var(--primary);
    transform: translateX(-3px);
}

.back-btn i {
    font-size: 1.1rem;
}

.auth-header {
    text-align: center;
    margin-bottom: 2rem;
}

.auth-header h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 0.5rem;
}

.auth-header p {
    color: var(--gray);
    font-size: 1rem;
}

.form-group {
    margin-bottom: 1rem;
    text-align: left;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid var(--border);
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: var(--transition);
    box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(210, 193, 182, 0.1);
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--dark);
    font-size: 0.9rem;
}

.full-width {
    width: 100%;
}

.auth-footer {
    text-align: center;
    margin-top: 1.5rem;
}

.auth-footer a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
}

.auth-footer a:hover {
    color: var(--primary-dark);
    text-decoration: underline;
}

/* ==========  PAGES DE CONNEXION/INSCRIPTION - STYLES SPÉCIFIQUES  ========== */
/* Styles pour les pages de connexion et d'inscription */
.register-page {
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 1rem;
    background: var(--gradient-primary);
}

.error-content, .register-content {
    position: relative;
    background: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    width: 100%;
    max-width: 1037.8px;
    margin: 0 auto;
    text-align: center;
}

.error-content h1, .register-content h1 {
    font-size: 1.75rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
    font-weight: 700;
}

.error-content h2, .register-content h2 {
    font-size: 1rem;
    margin-bottom: 2rem;
    color: var(--dark);
    font-weight: 500;
}

.error-icon {
    margin-bottom: 1.5rem;
}

.error-icon i {
    font-size: 4rem;
    color: var(--primary);
}

.login-form, .register-form {
    text-align: left;
    margin: 1.5rem 0;
}

.form-actions {
    text-align: center;
    margin-top: 1.5rem;
}

.login-btn, .register-btn {
    width: 80%;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.login-footer, .register-footer {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
}

.login-footer p, .register-footer p {
    color: var(--gray);
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
}

.forgot-password-link, .login-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: var(--transition);
    display: inline-block;
    margin-bottom: 0.5rem;
}

.forgot-password-link:hover, .login-link:hover {
    color: var(--primary-dark);
    text-decoration: underline;
}

.register-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    font-size: 0.9rem;
}

.register-link:hover {
    color: var(--primary-dark);
    text-decoration: underline;
}

/* Responsive pour les pages d'auth */
@media (max-width: 480px) {
    .error-content, .register-content, .login-content {
        padding: 1.5rem;
        margin: 0.5rem;
    }
    
    .error-content h1, .register-content h1, .login-content .error-title {
        font-size: 1.5rem;
    }
    
    .error-content h2, .register-content h2, .login-content .error-subtitle {
        font-size: 0.9rem;
    }
    
    /* Responsive pour la page de connexion */
    .login-page {
        height: calc(100vh - 60px);
        padding: 1rem 0.5rem;
    }
    
    .login-modal-container {
        width: 95%;
        margin: 0 auto;
    }
    
    .login-modal-content {
        width: 100%;
        margin: 0;
    }
    
    .login-modal-header,
    .login-modal-body {
        padding: 1.5rem;
    }
    
    .login-modal-header h3 {
        font-size: 1.25rem;
    }
}

/* ========== MODAL D'INSCRIPTION - STYLES SPÉCIFIQUES - CONFLIT AVEC MODAL.CSS ========== */
/* 
 * FICHIER : auth.css - Styles spécifiques pour la modal d'inscription créée par header.js
 * RELATION : Utilisé par la fonction showSignupModal() dans header.js (lignes 270-381)
 * CONFLIT MAJEUR : Ces styles redéfinissent les classes .modal, .modal-content qui sont déjà définies dans modal.css
 * PROBLÈME : Z-index 1000 vs 10000 dans modal.css, styles contradictoires
 * DANGER : Ces styles peuvent interférer avec les modales de login.hbs
 */
/* Container principal de la modal d'inscription */
#signup-modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    animation: fadeIn 0.3s ease-out;
}

#signup-modal.show {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 25vh;
}

/* Contenu de la modal d'inscription */
#signup-modal .modal-content {
    background: var(--white);
    border-radius: var(--border-radius-lg);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    width: calc(90% - 200px);
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease-out;
    position: relative;
}

#signup-modal .modal-header {
    padding: 1.5rem 2rem 0.5rem 2rem;
    border-bottom: 1px solid var(--border);
    text-align: center;
    position: relative;
}

#signup-modal .modal-header h3 {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--dark);
    margin: 0;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    position: relative;
    display: inline-block;
    width: 100%;
}

#signup-modal .modal-header h3::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 2px;
    background: var(--gradient-primary);
    border-radius: 2px;
}

/* Corps de la modal d'inscription */
#signup-modal .modal-body {
    padding: 1.5rem 2rem;
    text-align: center;
}

/* Bouton de fermeture de la modal d'inscription */
#signup-modal .close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--gray);
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: var(--transition);
}

#signup-modal .close:hover {
    background: var(--gray-lighter);
    color: var(--dark);
    transform: rotate(90deg);
}

/* Section des boutons OAuth pour l'inscription */
#signup-modal .signup-oauth {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    align-items: center;
}

#signup-modal .signup-oauth .btn {
    width: 100%;
    max-width: 280px;
}

/* Bouton Google pour l'inscription */
#signup-modal .btn-google {
    background: #fff;
    color: #333;
    border: 2px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 0.95rem;
    transition: var(--transition);
    text-decoration: none;
    width: 100%;
}

#signup-modal .btn-google:hover {
    background: #f8f9fa;
    border-color: #dadce0;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Logo Google officiel */
.google-logo {
    width: 18px;
    height: 18px;
    display: inline-block;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' fill='%234285f4'/%3E%3Cpath d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' fill='%2334a853'/%3E%3Cpath d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' fill='%23fbbc05'/%3E%3Cpath d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' fill='%23ea4335'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    vertical-align: middle;
}

/* Bouton Apple pour l'inscription */
#signup-modal .btn-apple {
    background: #000;
    color: #fff;
    border: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 0.95rem;
    transition: var(--transition);
    text-decoration: none;
    width: 100%;
}

#signup-modal .btn-apple:hover {
    background: #333;
    border-color: #333;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

#signup-modal .btn-apple i {
    color: #fff;
    font-size: 1.1rem;
}

/* Bouton Facebook pour l'inscription */
#signup-modal .btn-facebook {
    background: #1877f2;
    color: #fff;
    border: 2px solid #1877f2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 0.95rem;
    transition: var(--transition);
    text-decoration: none;
    width: 100%;
}

#signup-modal .btn-facebook:hover {
    background: #166fe5;
    border-color: #166fe5;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(24, 119, 242, 0.3);
}

#signup-modal .btn-facebook i {
    color: #fff;
    font-size: 1.1rem;
}

/* Séparateur pour la modal d'inscription */
#signup-modal .signup-separator {
    position: relative;
    text-align: center;
    color: #9cafbd;
    font-size: 0.9rem;
    margin: 1.5rem 0;
    margin-top: calc(1.5rem + 4mm);
}

/* Traits de décoration supprimés */

#signup-modal .signup-separator a {
    color: var(--primary);
    text-decoration: underline;
    font-weight: 600;
    transition: var(--transition);
}

#signup-modal .signup-separator a:hover {
    color: var(--primary-dark);
    text-decoration: underline;
}

/* Pied de page de la modal d'inscription */
#signup-modal .signup-footer {
    text-align: center;
    color: #9cafbd;
    font-size: 0.9rem;
    margin: 0;
}

#signup-modal .signup-footer a {
    color: var(--primary);
    text-decoration: underline;
    font-weight: 600;
    transition: var(--transition);
}

#signup-modal .signup-footer a:hover {
    color: var(--primary-dark);
    text-decoration: underline;
}

/* Harmoniser les couleurs des liens e-mail et S'inscrire */
#email-login-link,
#email-register-link {
    color: var(--primary) !important;
    text-decoration: underline;
    font-weight: 600;
    transition: var(--transition);
}

#email-login-link:hover,
#email-register-link:hover {
    color: var(--primary-dark) !important;
    text-decoration: underline;
}

/* Animations spécifiques à la modal d'inscription */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Responsive pour la modal d'inscription */
@media (max-width: 480px) {
    #signup-modal .modal-content {
        width: calc(95% - 200px);
        margin: 1rem;
    }
    
    #signup-modal .modal-header,
    #signup-modal .modal-body {
        padding: 1.5rem;
    }
    
    #signup-modal .modal-header h3 {
        font-size: 1.5rem;
    }
}

/* ===========================  STYLES POUR LA MODAL D'INSCRIPTION DANS LOGIN.HBS  =========================== */

/* Boutons OAuth pour la modal d'inscription (registerModal) */
#registerModal .btn-google {
    background: #fff;
    color: #333;
    border: 2px solid #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 0.95rem;
    transition: var(--transition);
    text-decoration: none;
    width: 100%;
    margin-bottom: 0.75rem;
}

#registerModal .btn-google:hover {
    background: #f8f9fa;
    border-color: #dadce0;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

#registerModal .btn-apple {
    background: #000;
    color: #fff;
    border: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 0.95rem;
    transition: var(--transition);
    text-decoration: none;
    width: 100%;
    margin-bottom: 0.75rem;
}

#registerModal .btn-apple:hover {
    background: #333;
    border-color: #333;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

#registerModal .btn-apple i {
    color: #fff;
    font-size: 1.1rem;
}

#registerModal .btn-facebook {
    background: #1877f2;
    color: #fff;
    border: 2px solid #1877f2;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 0.95rem;
    transition: var(--transition);
    text-decoration: none;
    width: 100%;
    margin-bottom: 0.75rem;
}

#registerModal .btn-facebook:hover {
    background: #166fe5;
    border-color: #166fe5;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(24, 119, 242, 0.3);
}

#registerModal .btn-facebook i {
    color: #fff;
    font-size: 1.1rem;
}

/* Séparateur pour la modal d'inscription */
#registerModal .signup-separator {
    position: relative;
    text-align: center;
    color: #9cafbd;
    font-size: 0.9rem;
    margin: 1.5rem 0;
    margin-top: calc(1.5rem + 4mm);
}

#registerModal .signup-separator a {
    color: var(--primary);
    text-decoration: underline;
    font-weight: 600;
    transition: var(--transition);
}

#registerModal .signup-separator a:hover {
    color: var(--primary-dark);
    text-decoration: underline;
}

/* Pied de page de la modal d'inscription */
#registerModal .signup-footer {
    text-align: center;
    color: #9cafbd;
    font-size: 0.9rem;
    margin: 0;
}

#registerModal .signup-footer a {
    color: var(--primary);
    text-decoration: underline;
    font-weight: 600;
    transition: var(--transition);
}

#registerModal .signup-footer a:hover {
    color: var(--primary-dark);
    text-decoration: underline;
}

/* Harmoniser les couleurs des liens */
#register-email-link,
#register-login-link {
    color: var(--primary) !important;
    text-decoration: underline;
    font-weight: 600;
    transition: var(--transition);
}

#register-email-link:hover,
#register-login-link:hover {
    color: var(--primary-dark) !important;
    text-decoration: underline;
}

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

/* Fichier : public/css/modal.css */

/* ========== STYLES PRINCIPAUX DES MODALES - BASE COMMUNE ========== */
/* 
 * FICHIER : modal.css - Styles de base pour toutes les modales
 * RELATION : Utilisé par header.js (modal bienvenue), login.hbs (modales intégrées), modal.js (système centralisé)
 * CONFLIT : Ces styles entrent en conflit avec auth.css qui redéfinit les mêmes classes
 * PROBLÈME : Duplication de styles entre modal.css, auth.css et style.css
 * Z-INDEX : 10000 - Peut entrer en conflit avec d'autres modales
 */
/* Modal Overlay */
.modal {
    display: none;
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal.show {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
}

/* Modal Content */
.modal-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.8);
    transition: transform 0.3s ease;
    position: relative;
}

.modal.show .modal-content {
    transform: scale(1);
}

/* Modal Header */
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem 1rem;
    border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
}

.close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s ease;
}

.close:hover {
    background-color: #f3f4f6;
    color: #374151;
}

/* Modal Body */
.modal-body {
    padding: 1.5rem 2rem;
}

.modal-body p {
    margin: 0 0 1rem 0;
    color: #4b5563;
    line-height: 1.6;
}

.modal-body p:last-child {
    margin-bottom: 0;
}

/* Modal Footer */
.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem 2rem 1.5rem;
    border-top: 1px solid #e5e7eb;
}

/* Buttons */
.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.btn-primary {
    background: linear-gradient(135deg, #3A5F87 0%, #2E5077 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(58, 95, 135, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(58, 95, 135, 0.4);
}

.btn-secondary {
    background: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;
}

.btn-secondary:hover {
    background: #e5e7eb;
    transform: translateY(-1px);
}

.btn-danger {
    background: #ef4444;
    color: white;
}

.btn-danger:hover {
    background: #dc2626;
    transform: translateY(-2px);
}

/* Language Modal Specific */
.language-confirmation {
    text-align: center;
}

.language-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    display: block;
}

.language-sub-message {
    color: #6b7280;
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

/* Form Modal */
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #3A5F87;
    box-shadow: 0 0 0 3px rgba(58, 95, 135, 0.1);
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
}

/* Responsive */
@media (max-width: 768px) {
    .modal-content {
        width: 95%;
        margin: 1rem;
    }
    
    .modal-header,
    .modal-body,
    .modal-footer {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
    
    .modal-footer {
        flex-direction: column;
    }
    
    .btn {
        width: 100%;
        justify-content: center;
    }
}

/* Animation for language modal */
.modal.show .modal-content {
    animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
    from {
        transform: scale(0.8) translateY(-20px);
        opacity: 0;
    }
    to {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

/* ===========================  COMPACT LANGUAGE MODAL  =========================== */

/* Compact Language Modal - positioned near language selector */
.language-modal-compact {
    display: none;
    position: fixed;
    z-index: 10001;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.language-modal-compact.show {
    display: block;
    opacity: 1;
    pointer-events: auto;
}

.language-modal-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 240px; /* 6 cm approximativement */
    max-width: 240px;
    position: relative;
    transform: translateX(-100px);
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border: 1px solid #e5e7eb;
}

.language-modal-compact.show .language-modal-content {
    transform: translateX(0);
}

.language-modal-body {
    padding: 1rem;
}

.language-confirmation-compact {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-align: left;
}

.language-icon-compact {
    font-size: 2rem;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.language-text-compact {
    flex: 1;
    min-width: 0;
}

.language-text-compact p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.4;
    color: #374151;
}

.language-text-compact p:first-child {
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
}

.language-sub-message-compact {
    font-size: 0.75rem !important;
    color: #6b7280 !important;
    font-weight: 400 !important;
}

/* Animation d'apparition de gauche à droite */
@keyframes slideInFromLeft {
    from {
        transform: translateX(-100px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.language-modal-compact.show .language-modal-content {
    animation: slideInFromLeft 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Positionnement relatif au sélecteur de langue */
.language-modal-compact.positioned {
    position: absolute;
    top: 100%;
    left: 0;
    right: auto;
    transform: translateY(8px);
    margin-top: 0;
}

.language-modal-compact.positioned .language-modal-content {
    transform: translateX(-100px);
}

.language-modal-compact.positioned.show .language-modal-content {
    transform: translateX(0);
}

/* Responsive pour mobile */
@media (max-width: 768px) {
    .language-modal-content {
        width: 200px;
        max-width: 200px;
    }
    
    .language-modal-body {
        padding: 0.75rem;
    }
    
    .language-icon-compact {
        font-size: 1.5rem;
        width: 32px;
        height: 32px;
    }
    
    .language-text-compact p {
        font-size: 0.8rem;
    }
    
    .language-sub-message-compact {
        font-size: 0.7rem !important;
    }
}

/* Fichier : public/css/style.css */

/* Reset et base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8fafc;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
header {
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

nav {
    padding: 1rem 0;
}

nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

nav h1 {
    color: #2563eb;
    font-size: 1.5rem;
    font-weight: 700;
}

nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

nav a {
    text-decoration: none;
    color: #64748b;
    font-weight: 500;
    transition: color 0.3s ease;
}

nav a:hover {
    color: #2563eb;
}

/* Hero Section */
.hero {
    /* Background image is defined in home.css */
    color: white;
    padding: 4rem 0;
    text-align: center;
}

.hero h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    background: #2563eb;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background: #1d4ed8;
    transform: translateY(-2px);
}

.btn-secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-secondary:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Features Section */
.features {
    padding: 4rem 0;
    background: white;
}

.features h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #1e293b;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.feature-card {
    text-align: center;
    padding: 2rem;
    border-radius: 1rem;
    background: #f8fafc;
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
}

.feature-card p {
    color: #64748b;
}

/* CTA Section */
.cta {
    background: #1e293b;
    color: white;
    padding: 4rem 0;
    text-align: center;
}

.cta h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.cta p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

/* Footer */
footer {
    background: #0f172a;
    color: white;
    padding: 2rem 0;
    text-align: center;
}

footer p {
    opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        align-items: center;
    }
    
    .features h2,
    .cta h2 {
        font-size: 2rem;
    }
    
    nav .container {
        flex-direction: column;
        gap: 1rem;
    }
    
    nav ul {
        gap: 1rem;
    }
}

/* ===========================  MODAL STYLES  =========================== */
.modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal.show {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    max-width: 400px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.modal.show .modal-content {
    transform: scale(1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1.5rem 0 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1rem;
}

.modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
}

.close {
    color: #6b7280;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s ease;
}

.close:hover {
    color: #374151;
}

.modal-body {
    padding: 0 1.5rem 1.5rem 1.5rem;
}

.language-confirmation {
    text-align: center;
    padding: 1rem 0;
}

.language-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
}

.language-confirmation p {
    margin: 0.5rem 0;
    font-size: 1.1rem;
    color: #374151;
}

.language-sub-message {
    font-size: 0.9rem !important;
    color: #6b7280 !important;
}


.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
    text-align: center;
}

.btn-primary {
    background-color: #2563eb;
    color: white;
}

.btn-primary:hover {
    background-color: #1d4ed8;
    transform: translateY(-1px);
}

.btn-primary:active {
    transform: translateY(0);
}

/* Responsive modal */
@media (max-width: 480px) {
    .modal-content {
        width: 95%;
        margin: 1rem;
    }
    
    .modal-header,
    .modal-body,
    .modal-footer {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    
    .language-icon {
        font-size: 2.5rem;
    }
}

