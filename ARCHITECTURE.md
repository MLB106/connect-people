# ARCHITECTURE.md - Architecture actuelle de Connect People

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
- **i18n** - Internationalisation (7 langues)

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
- **Internationalisation** avec 7 langues supportées

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
