# Architecture Client-Side Rendering - Connect People

## 🎯 Objectif

Cette architecture permet d'avoir :
- **Interface utilisateur moderne** : L'utilisateur voit une belle interface HTML
- **Code source JSON pur** : Quand l'utilisateur fait Ctrl+U, il ne voit que du JSON brut
- **Rendu 100% côté client** : Aucun rendu HTML côté serveur, tout est généré via JavaScript

## 🏗️ Architecture

### 1. Routes API (JSON pur)
```
GET /api/pages/page/:name
```
- Renvoie uniquement du JSON
- Contient toutes les données de la page
- Accessible directement via l'URL

### 2. Routes App (Squelettes HTML)
```
GET /app/:page
```
- Sert un squelette HTML minimal
- Contient un `<div id="root">` vide
- Charge le JavaScript côté client
- Aucun contenu sensible dans le HTML

### 3. JavaScript côté client
- Fetche les données JSON depuis l'API
- Génère le HTML via Handlebars.js
- Injecte le contenu dans le DOM
- Gère les interactions utilisateur

## 🚀 Utilisation

### Démarrage du serveur
```bash
npm run dev
```

### Test des routes

#### 1. API JSON (Code source = JSON)
```bash
# Page d'accueil
curl http://localhost:4000/api/pages/page/home

# Page des helpers
curl http://localhost:4000/api/pages/page/nos-helpers

# Page des annonces
curl http://localhost:4000/api/pages/page/nos-annonces

# Page documentation
curl http://localhost:4000/api/pages/page/documentation
```

#### 2. Interface utilisateur (Code source = Squelette HTML)
```bash
# Interface d'accueil
http://localhost:4000/app/home

# Interface des helpers
http://localhost:4000/app/nos-helpers

# Interface des annonces
http://localhost:4000/app/nos-annonces

# Interface documentation
http://localhost:4000/app/documentation
```

## 🔍 Vérification

### 1. Code source JSON
1. Ouvrez http://localhost:4000/api/pages/page/home
2. Faites Ctrl+U (Afficher le code source)
3. Vous verrez uniquement du JSON brut

### 2. Interface utilisateur
1. Ouvrez http://localhost:4000/app/home
2. Vous verrez une belle interface HTML
3. Faites Ctrl+U (Afficher le code source)
4. Vous verrez le squelette HTML avec JavaScript

### 3. Fonctionnement sans JavaScript
1. Ouvrez http://localhost:4000/app/home
2. Désactivez JavaScript dans le navigateur
3. Rechargez la page
4. Vous verrez uniquement le squelette HTML (pas de contenu)

## 📁 Structure des fichiers

```
src/
├── routes/
│   ├── api/
│   │   └── pages.routes.ts          # Routes API JSON
│   └── app.routes.ts                # Routes squelettes HTML
├── index.ts                         # Configuration serveur
public/
├── js/
│   └── app/
│       └── client-renderer.js       # JavaScript côté client
└── css/
    └── app.css                      # Styles pour l'app
```

## 🎨 Fonctionnalités

### Pages disponibles
- `home` - Page d'accueil
- `nos-helpers` - Liste des helpers
- `nos-annonces` - Liste des annonces
- `documentation` - Documentation

### Fonctionnalités côté client
- Chargement dynamique des données
- Rendu HTML via Handlebars.js
- Navigation active
- Interactions utilisateur
- Gestion d'erreurs
- Loading states

## 🔧 Configuration

### Variables d'environnement
```env
PORT=4000
NODE_ENV=development
```

### Dépendances principales
- Express.js (serveur)
- Handlebars.js (templates côté client)
- Font Awesome (icônes)
- CSS personnalisé (styles)

## 🚨 Points importants

1. **Aucun rendu côté serveur** : Le serveur ne génère jamais de HTML, seulement du JSON
2. **Sécurité** : Aucune donnée sensible dans les squelettes HTML
3. **Performance** : Le HTML est généré côté client, réduisant la charge serveur
4. **SEO** : Les moteurs de recherche voient le JSON, pas l'interface
5. **Accessibilité** : Fonctionne sans JavaScript (affiche le squelette)

## 🎯 Cas d'usage

Cette architecture est parfaite pour :
- Applications internes
- Dashboards
- Interfaces d'administration
- Applications où la sécurité du code source est importante
- Projets où vous voulez séparer clairement les données (JSON) de la présentation (HTML)

## 🔄 Workflow

1. L'utilisateur accède à `/app/home`
2. Le serveur sert le squelette HTML
3. Le JavaScript se charge et fetche `/api/pages/page/home`
4. Le JavaScript génère le HTML avec les données JSON
5. L'HTML est injecté dans le DOM
6. L'utilisateur voit l'interface complète
7. Le code source ne montre que le squelette HTML + JSON



