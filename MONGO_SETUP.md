# Configuration MongoDB pour Connect-People

## Variables d'environnement

Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
# Base de données
DATABASE_URL="mongodb://localhost:27017/connect-people"
JWT_SECRET="super-secret-key-temporaire"
PORT=3000

# Variables d'environnement pour la compatibilité avec l'ancien système
DB_HOST=localhost
DB_PORT=27017
DB_NAME=connect-people
DB_USER=
DB_PASSWORD=

# Redis (si nécessaire)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Sessions
SESSION_SECRET=super-secret-session-key-temporaire

# JWT
JWT_EXPIRES_IN=7d

# Email (à configurer selon vos besoins)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limit
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# CSRF
CSRF_SECRET=super-secret-csrf-key-temporaire

# Environment
NODE_ENV=development
```

## Installation des dépendances

```bash
npm install
```

## Démarrage de MongoDB

### Option 1: Service Windows (recommandé)
```powershell
# Vérifier le statut
Get-Service MongoDB

# Démarrer si nécessaire
Start-Service MongoDB
```

### Option 2: Manuel
```bash
mongod --port 27017 --dbpath C:\data\db
```

## Utilisation dans le code

```typescript
import { initializeDatabase, mongoose } from './config/database';
import { env } from './config/env';

// Initialiser la connexion
await initializeDatabase();

// Utiliser mongoose pour les modèles
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

## Vérification de la connexion

```typescript
// Dans votre fichier principal (src/index.ts)
import { initializeDatabase } from './config/database';

const startServer = async () => {
  try {
    await initializeDatabase();
    console.log('✅ Serveur démarré avec MongoDB');
  } catch (error) {
    console.error('❌ Erreur de démarrage:', error);
    process.exit(1);
  }
};

startServer();
```

## Changements effectués

1. **src/config/env.ts** : Ajout du support pour `DATABASE_URL` MongoDB
2. **src/config/database.ts** : Remplacement de MySQL/Sequelize par MongoDB/Mongoose
3. **package.json** : Remplacement des dépendances MySQL par Mongoose
4. **Configuration** : Support des variables d'environnement MongoDB

## Prochaines étapes

1. Créer les modèles Mongoose pour vos entités
2. Mettre à jour les contrôleurs pour utiliser Mongoose
3. Adapter les middlewares d'authentification
4. Tester la connexion avec votre base de données






