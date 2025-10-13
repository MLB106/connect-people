# Structure API REST Moderne - Connect People

## 🎯 Architecture

Votre projet utilise maintenant une **architecture API REST moderne** avec une séparation claire entre :

1. **Routes Web** : API REST pures (JSON uniquement)
2. **Routes API** : Endpoints API organisés par domaine
3. **Routes Dev** : Rendu HTML pour le développement

## 📁 Structure des Fichiers

```
src/routes/
├── api/                          # 🚀 API REST organisées par domaine
│   ├── index.ts                  # Routeur principal API
│   ├── home.routes.ts           # API page d'accueil
│   ├── immobilier-complete.routes.ts  # API immobilier complète
│   ├── entreprendre-complete.routes.ts # API entreprendre complète
│   ├── traduction-complete.routes.ts  # API traduction complète
│   ├── footer-complete.routes.ts      # API pages footer
│   ├── pages.routes.ts          # API pages principales
│   └── users.routes.ts          # API utilisateurs (existant)
├── web/
│   └── api-only.routes.ts       # 🌐 Routes web = API REST pures
└── dev/
    └── html-view.routes.ts      # 🖥️ Rendu HTML pour développement
```

## 🔄 Comment ça marche

### 1. Routes Web (API REST pures)
- **URL** : `http://localhost:4000/`
- **Retour** : JSON uniquement
- **Exemple** : `GET /` → JSON de la page d'accueil

### 2. Routes API (Organisées par domaine)
- **URL** : `http://localhost:4000/api/`
- **Retour** : JSON uniquement
- **Exemples** :
  - `GET /api/home` → JSON page d'accueil
  - `GET /api/immobilier/achat-vente` → JSON immobilier
  - `GET /api/entreprendre/sourcing` → JSON sourcing

### 3. Routes Dev (Rendu HTML)
- **URL** : `http://localhost:4000/dev/html/`
- **Retour** : HTML rendu
- **Exemples** :
  - `GET /dev/html/home` → Page d'accueil HTML
  - `GET /dev/html/immobilier/achat-vente` → Page immobilier HTML

## 🚀 Utilisation

### Pour les API (JSON)
```bash
# Page d'accueil
curl http://localhost:4000/

# API spécifique
curl http://localhost:4000/api/home
curl http://localhost:4000/api/immobilier/achat-vente
curl http://localhost:4000/api/entreprendre/sourcing
```

### Pour le développement (HTML)
```bash
# Voir le rendu HTML
http://localhost:4000/dev/html/home
http://localhost:4000/dev/html/immobilier/achat-vente
http://localhost:4000/dev/html/entreprendre/sourcing
```

## 📋 Format de Réponse Uniforme

Toutes les réponses API suivent ce format :

```json
{
  "success": boolean,
  "data": any | null,
  "error": string | null,
  "meta": {
    "viewPath": "string",
    "timestamp": "string",
    "mode": "api",
    "csrfToken": "string" // si applicable
  }
}
```

## 🎨 Avantages

1. **Séparation claire** : API et vues sont séparées
2. **Maintenabilité** : Chaque vue a son fichier API correspondant
3. **Flexibilité** : Possibilité de voir HTML pour le développement
4. **Cohérence** : Format de réponse uniforme
5. **Évolutivité** : Facile d'ajouter de nouvelles routes

## 🔧 Développement

### Ajouter une nouvelle page

1. **Créer la route API** dans le bon fichier `src/routes/api/`
2. **Ajouter la route web** dans `src/routes/web/api-only.routes.ts`
3. **Ajouter la route dev** dans `src/routes/dev/html-view.routes.ts`

### Exemple d'ajout

```typescript
// 1. Dans src/routes/api/pages.routes.ts
router.get('/ma-nouvelle-page', createApiRoute('ma-nouvelle-page.hbs', {
  title: 'Ma Nouvelle Page - Connect People',
  description: 'Description de ma nouvelle page'
}));

// 2. Dans src/routes/web/api-only.routes.ts
router.get('/ma-nouvelle-page', createApiRoute('ma-nouvelle-page.hbs', {
  title: 'Ma Nouvelle Page - Connect People',
  description: 'Description de ma nouvelle page'
}));

// 3. Dans src/routes/dev/html-view.routes.ts
router.get('/ma-nouvelle-page', createHtmlRoute('ma-nouvelle-page.hbs', {
  title: 'Ma Nouvelle Page - Connect People',
  description: 'Description de ma nouvelle page'
}));
```

## 🎯 Résultat

- ✅ **Toutes les vues sont en API REST moderne**
- ✅ **Chaque vue a son fichier API correspondant**
- ✅ **Possibilité de voir le rendu HTML pour le développement**
- ✅ **Structure claire et maintenable**
- ✅ **Format de réponse uniforme**

Votre projet est maintenant parfaitement organisé avec une architecture API REST moderne ! 🚀



