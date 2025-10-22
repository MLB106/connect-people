# Documentation des Modales - Connect People

## Vue d'ensemble
Ce document répertorie tous les fichiers qui gèrent les modales dans l'application Connect People.

## Fichiers concernés par les modales

### 1. **public/js/header.js**
**Rôle :** Gestion des modales principales et des boutons d'action
**Fonctions principales :**
- `showSignupModal(preferredRole, continueUrl)` - Affiche la modal bienvenue
- `showLogin()` - Redirige vers la page de login
- `showRegister()` - Redirige vers la page de register
- `showProfile()` - Redirige vers le profil
- `showWallet()` - Redirige vers le portefeuille
- `logout()` - Déconnexion

**Modales gérées :**
- Modal bienvenue (signup-modal)
- Boutons OAuth (Google, Apple, Facebook)
- Liens de navigation entre modales

### 2. **src/views/pages/login.hbs**
**Rôle :** Page de login avec modales intégrées
**Modales incluses :**
- `loginModal` - Modal de connexion
- `registerModal` - Modal d'inscription

**Fonctions JavaScript :**
- `showRegisterModal()` - Affiche la modal d'inscription
- `showLoginModal()` - Affiche la modal de connexion

**Gestion des paramètres URL :**
- `?show=register` - Affiche automatiquement la modal d'inscription

### 3. **src/client/modal.ts**
**Rôle :** Gestion TypeScript des modales (si utilisé)
**Fonctions :**
- Gestion des types de modales
- Interface pour les modales

### 4. **public/css/auth.css**
**Rôle :** Styles CSS pour les modales d'authentification
**Classes principales :**
- `.modal` - Style de base des modales
- `.modal-content` - Contenu des modales
- `.login-modal-container` - Conteneur des modales de login
- `.signup-oauth` - Boutons OAuth
- `.signup-separator` - Séparateur visuel

### 5. **test-modal.html**
**Rôle :** Fichier de test pour les modales
**Contenu :**
- Tests des modales bienvenue
- Tests des boutons OAuth
- Tests de navigation entre modales

### 6. **test-modal-flow.html**
**Rôle :** Tests du flux complet des modales
**Fonctionnalités testées :**
- Ouverture des modales
- Navigation entre modales
- Fermeture des modales
- Redirections

## Flux des modales

### 1. Modal Bienvenue (signup-modal)
**Déclencheurs :**
- Boutons "Devenir Helper" (`data-action="become-helper"`)
- Boutons "Chercher de l'aide" (`data-action="register-seeker"`)
- Liens vers "/demander-aide"

**Actions possibles :**
- OAuth (Google, Apple, Facebook) → Redirection vers `/auth/{provider}`
- "Se connecter" → Redirection vers `/auth/login`
- "S'inscrire" → Redirection vers `/auth/login?show=register`

### 2. Modal de Connexion (loginModal)
**Déclencheurs :**
- Lien "Se connecter" dans la modal bienvenue
- Lien "Se connecter" dans la modal d'inscription
- Boutons avec `data-action="login"`

**Actions possibles :**
- Soumission du formulaire → POST vers `/auth/login`
- "S'inscrire" → Affiche la modal d'inscription
- "Mot de passe oublié" → Redirection vers `/auth/forgot-password`

### 3. Modal d'Inscription (registerModal)
**Déclencheurs :**
- Lien "S'inscrire" dans la modal bienvenue
- Lien "S'inscrire" dans la modal de connexion
- Paramètre URL `?show=register`

**Actions possibles :**
- OAuth (Google, Apple, Facebook) → Redirection vers `/auth/{provider}`
- "Se connecter" → Affiche la modal de connexion
- "Inscription par email" → Reste dans la modal

## Problèmes connus et solutions

### Boucle infinie (RÉSOLU)
**Cause :** Conflit entre les fonctions `showLoginModal()` et `showRegisterModal()` dans `header.js` et `login.hbs`
**Solution :** Suppression des fonctions conflictuelles dans `header.js`

### Redirections multiples
**Cause :** Mélange entre redirections et affichage de modales
**Solution :** Séparation claire entre redirections (header.js) et affichage de modales (login.hbs)

## Bonnes pratiques

1. **Séparation des responsabilités :**
   - `header.js` : Redirections et modales globales
   - `login.hbs` : Modales spécifiques à la page de login

2. **Gestion des événements :**
   - Utiliser `preventDefault()` pour éviter les comportements par défaut
   - Un seul event listener par élément

3. **Navigation entre modales :**
   - Utiliser les fonctions locales plutôt que les redirections
   - Éviter les conflits de noms de fonctions

## Maintenance

Pour ajouter une nouvelle modale :
1. Créer le HTML dans le fichier approprié
2. Ajouter les styles CSS dans `auth.css`
3. Créer les fonctions JavaScript dans le bon fichier
4. Tester avec les fichiers de test existants
5. Mettre à jour cette documentation

## Tests

Utiliser les fichiers de test :
- `test-modal.html` - Tests unitaires des modales
- `test-modal-flow.html` - Tests du flux complet

## Dernière mise à jour
22 octobre 2025 - Correction de la boucle infinie dans les modales
