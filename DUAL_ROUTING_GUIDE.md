# Guide du Système de Double Routage (API + Vues)

## 🎯 Objectif

Ce système vous permet de conserver votre structure API REST tout en ayant un accès facile aux vues HTML pour le développement. **C'est un jeu d'enfant !** 🚀

## 🔧 Comment ça marche

### 1. Détection Automatique du Mode

Le système détecte automatiquement si vous voulez voir la vue HTML ou l'API JSON basé sur :

1. **Header Accept** : `text/html` vs `application/json`
2. **Paramètre URL** : `?view=true`
3. **Header personnalisé** : `X-View-Mode: html`
4. **Variable d'environnement** : `FORCE_VIEW_MODE=html`

### 2. Utilisation Simple

#### Pour voir la vue HTML :
```bash
# Via navigateur (détection automatique)
http://localhost:3000/

# Via paramètre
http://localhost:3000/?view=true

# Via header
curl -H "Accept: text/html" http://localhost:3000/
curl -H "X-View-Mode: html" http://localhost:3000/
```

#### Pour l'API JSON :
```bash
# Via paramètre
http://localhost:3000/?view=false

# Via header
curl -H "Accept: application/json" http://localhost:3000/
curl -H "X-View-Mode: json" http://localhost:3000/
```

## 🚀 Mise en place

### 1. Mise à jour de `src/index.ts`

```typescript
// Ajouter les nouvelles routes duales
import dualWebRouter from './routes/web/dual.routes.js';

// Remplacer la ligne existante
// app.use('/', webRouter);
app.use('/', dualWebRouter);
```

### 2. Variables d'environnement (optionnel)

```bash
# Dans votre .env
FORCE_VIEW_MODE=html  # Force le mode HTML partout
NODE_ENV=development  # Active les fonctionnalités de debug
```

## 📝 Exemples d'utilisation

### Développement Frontend
```bash
# Voir la page d'accueil en HTML
http://localhost:3000/

# Voir la page immobilier en HTML
http://localhost:3000/immobilier/achat-vente

# Voir la page entreprendre en HTML
http://localhost:3000/entreprendre/sourcing
```

### Tests API
```bash
# Tester l'API JSON
curl http://localhost:3000/ | jq

# Tester avec des données spécifiques
curl -H "Accept: application/json" http://localhost:3000/nos-helpers
```

### Développement avec Postman/Insomnia
- **Pour HTML** : Ajouter header `Accept: text/html`
- **Pour JSON** : Ajouter header `Accept: application/json`

## 🔍 Debug et Monitoring

### Headers de Debug (mode développement)
```
X-View-Mode: html|json
X-Debug-Info: {"url":"/","method":"GET","viewMode":"html","timestamp":"..."}
```

### Logs Console
```
🔧 Mode DEV-VIEW activé - Routes /dev/* disponibles
📊 Environnement: development
🔗 Base de données: mongodb://...
```

## 🎨 Avantages

1. **Structure API REST préservée** ✅
2. **Accès facile aux vues** ✅
3. **Détection automatique** ✅
4. **Debug intégré** ✅
5. **Flexibilité maximale** ✅

## 🛠️ Personnalisation

### Ajouter une nouvelle route duale

```typescript
// Dans src/routes/web/dual.routes.ts
router.get('/ma-nouvelle-page', createDualRoute('ma-nouvelle-page.hbs', {
  title: 'Ma Nouvelle Page - Connect People',
  description: 'Description de ma page',
  locale: 'fr'
}));
```

### Forcer un mode spécifique

```typescript
// Forcer le mode HTML
router.get('/ma-page', forceViewMode, createDualRoute('ma-page.hbs', {...}));

// Forcer le mode API
router.get('/mon-api', forceApiMode, createDualRoute('mon-api.hbs', {...}));
```

## 🚨 Notes importantes

1. **En production** : Le système fonctionne normalement (pas de détection automatique)
2. **Performance** : Aucun impact sur les performances
3. **Sécurité** : Les middlewares de sécurité restent actifs
4. **Compatibilité** : Compatible avec votre structure existante

## 🎉 Résultat

Vous pouvez maintenant :
- **Développer vos vues** en accédant directement aux URLs
- **Tester vos APIs** avec les mêmes URLs
- **Basculer facilement** entre les deux modes
- **Conserver votre architecture** existante

**C'est vraiment un jeu d'enfant !** 🎮✨




