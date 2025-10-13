# Migration MySQL vers MongoDB + Mongoose

## Résumé des changements

Cette migration remplace intégralement MySQL par MongoDB + Mongoose dans tout le projet.

## Fichiers modifiés

### 1. Configuration
- `package.json` - Ajout du script `npm run seed`
- `src/config/database.ts` - Déjà configuré pour MongoDB
- `src/config/env.ts` - Déjà configuré pour MongoDB
- `env.example` - Nouveau fichier avec configuration MongoDB

### 2. Modèles Mongoose créés
- `src/models/user.model.ts` - Modèle utilisateur avec validation
- `src/models/adminUser.model.ts` - Modèle administrateur avec rôles
- `src/models/searchCategory.model.ts` - Catégories de recherche multilingues
- `src/models/socialLink.model.ts` - Liens sociaux
- `src/models/appStoreLink.model.ts` - Liens des app stores
- `src/models/navOption.model.ts` - Options de navigation multilingues
- `src/models/report.model.ts` - Déjà existant, modèle de signalement

### 3. Contrôleurs mis à jour
- `src/controllers/search.controller.ts` - Remplacement SQL par Mongoose
- `src/controllers/footer.controller.ts` - Remplacement SQL par Mongoose
- `src/controllers/header.controller.ts` - Remplacement SQL par Mongoose
- `src/controllers/nav-entreprendre.controller.ts` - Remplacement SQL par Mongoose
- `src/controllers/nav-immobilier.controller.ts` - Remplacement SQL par Mongoose
- `src/controllers/nav-traduction.controller.ts` - Remplacement SQL par Mongoose

### 4. Tests mis à jour
- `__tests__/setup/database.health.test.ts` - Remplacement Sequelize par Mongoose

### 5. Script de seed
- `scripts/seed.ts` - Script pour créer des données de test

## Utilisation

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration
Copiez `env.example` vers `.env` et configurez vos variables d'environnement :
```bash
cp env.example .env
```

### 3. Démarrage de MongoDB
Assurez-vous que MongoDB est démarré sur `mongodb://localhost:27017`

### 4. Seed de la base de données
```bash
npm run seed
```

### 5. Démarrage de l'application
```bash
npm run dev
```

## Structure des données

### Collections MongoDB
- `users` - Utilisateurs de l'application
- `adminUsers` - Administrateurs
- `searchCategories` - Catégories de recherche
- `socialLinks` - Liens sociaux
- `appStoreLinks` - Liens des app stores
- `navOptions` - Options de navigation
- `reports` - Signalements

### Caractéristiques
- Tous les modèles incluent des timestamps automatiques
- Validation des données avec Mongoose
- Support multilingue pour les contenus
- Gestion des rôles et permissions
- Indexation automatique sur les champs uniques

## Avantages de la migration

1. **Flexibilité** - Schéma dynamique adapté aux besoins
2. **Performance** - Requêtes optimisées avec Mongoose
3. **Scalabilité** - MongoDB gère mieux la montée en charge
4. **Développement** - Moins de migrations de schéma
5. **JSON natif** - Support natif des objets JSON complexes

## Notes importantes

- Tous les imports utilisent l'extension `.js` pour la conformité ES-Module
- Les requêtes SQL ont été remplacées par des méthodes Mongoose équivalentes
- La logique métier et les routes restent inchangées
- Les tests ont été adaptés pour MongoDB






