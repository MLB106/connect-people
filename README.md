<!-- =========================================================== -->
<!--  README.md – Connect-People (Back-end Node/TypeScript)        -->
<!--  Version équipe – commentée ligne par ligne                   -->
<!--  Dernière maj : 26/08/2025                                  -->
<!-- =========================================================== -->

# 🚀 Connect-People – API & Back-office

> Backend Node.js/Express en **ES2022 (ESM)** pour la plate-forme **Connect-People**.  
> Cible : authentification double-rôle (user + admin), gestion de contenu (chat, vidéos, photos, voix), signalement, 2FA, CSRF, rate-limit, i18n et Redis.

---

## 📦 1. Prérequis

| Logiciel | Version minimum | Pourquoi ? |
|---|---|---|
| Node.js | 18.x | Support natif ESM + top-level await |
| MySQL | 8.0 | utf8mb4, JSON, transactions |
| Redis | 6.x | Sessions, cache, rate-limit |

---

## 🏁 2. Installation rapide (copier-coller dans le terminal)

```bash
# 1. Récupération
git clone https://github.com/<votre-org>/connect-people.git
cd connect-people

# 2. Dépendances
npm install            # installe node_modules à la racine

# 3. Variables d’env
cp .env.example .env   # puis éditer avec vos infos MySQL/Redis

# 4. Base de données
mysql -u root -p -e "CREATE DATABASE connect_people CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 5. Lancement dev
npm run dev            # tsx watch → http://localhost:4000

⚙️ 3. Scripts npm expliqués

| Script               | Ce qu’il fait vraiment                  |
| -------------------- | --------------------------------------- |
| `npm run dev`        | tsx watch → recharge auto à chaque save |
| `npm run build`      | tsc → génère `dist/` (prod ready)       |
| `npm start`          | node dist/index.js (après build)        |
| `npm test`           | Jest en mode CI                         |
| `npm run test:watch` | Jest --watch pendant le dev             |


🔐 4. Variables d’environnement (obligatoires)

    Copier .env.example → .env puis remplir.
    Les secrets doivent être différents entre JWT_ADMIN_* et JWT_USER_*.

    # === Serveur ===
PORT=4000
FRONT_URL=http://localhost:5173      # CORS

# === MySQL ===
DB_HOST=localhost
DB_PORT=3306
DB_NAME=connect_people
DB_USER=root
DB_PASSWORD=********

# === Redis ===
REDIS_URL=redis://localhost:6379

# === JWT ===
JWT_ADMIN_ACCESS_SECRET=change_me_admin_access
JWT_ADMIN_REFRESH_SECRET=change_me_admin_refresh
JWT_USER_ACCESS_SECRET=change_me_user_access
JWT_USER_REFRESH_SECRET=change_me_user_refresh

# === Mail (nodemailer) ===
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# === IP Whitelist admin (CIDR) ===
ADMIN_IP_WHITELIST=203.0.113.42,10.8.0.0/24

🗂️ 5. Arborescence commentée

src/
├── client/              # Code **front** (localStorage, Axios) – ignoré par tsc
├── config/              # Configs pures (pas de logique)
│   ├── database.ts      # Pool MySQL natif + Sequelize
│   ├── csrfConfig.ts    # CSRF tokens & erreurs
│   ├── i18n.ts          # Internationalisation (8 langues)
│   └── env.ts           # Validation stricte des vars d’env
├── controllers/         # Logique métier (vide pour l’instant)
├── locales/             # Fichiers JSON de traduction
├── middlewares/         # Chaîne Express
│   ├── admin/           # Authent + IP + RBAC admin
│   ├── user/            # Authent + RBAC user
│   └── validate.ts      # Validation Zod des bodies
├── models/              # Schémas Sequelize
├── routes/              # Regroupement par « scope »
│   ├── admin/           # Routes back-office
│   ├── api/             # Routes publiques /api/v1
│   ├── user/            # Routes utilisateur
│   └── web/             # Routes SSR (CSRF, i18n)
├── services/            # Accès aux données (Redis, mail, sécurité)
├── utils/               # Helpers DB & signalements
├── __tests__/           # Tests Jest
└── index.ts             # Point d’entrée unique

🚪 6. Endpoints disponibles

| Verbe  | Endpoint              | Authent | Description          | Middlewares actifs  |
| ------ | --------------------- | ------- | -------------------- | ------------------- |
| `POST` | `/admin/auth/login`   | ❌       | Login admin + 2FA    | IP whitelist, Zod   |
| `POST` | `/user/auth/register` | ❌       | Création compte user | Zod                 |
| `POST` | `/user/auth/login`    | ❌       | Login user           | Zod                 |
| `GET`  | `/admin/reports`      | ✅ admin | Liste signalements   | `authenticateAdmin` |
| `POST` | `/api/v1/report`      | ✅ user  | Signaler un contenu  | `authenticateUser`  |
| `GET`  | `/`                   | ❌       | Page d’accueil SSR   | CSRF, i18n          |


🔒 7. Sécurité – mécanismes & fichiers

| Risque                 | Solution                              | Fichier(s) clés                           |
| ---------------------- | ------------------------------------- | ----------------------------------------- |
| Brute-force login      | Tentatives stockées en Redis (15 min) | `services/security.service.ts`            |
| CSRF                   | Token unique par session              | `config/csrfConfig.ts`                    |
| Rate-limit global      | 100 req / 15 min par IP               | `services/rateLimit.ts`                   |
| IP admin non autorisée | Liste blanche CIDR                    | `middlewares/admin/adminIP.middleware.ts` |
| JWT compromis          | Secrets séparés admin/user            | `.env`                                    |
| Injection SQL          | Requêtes préparées (mysql2/Sequelize) | `utils/db.ts`                             |


🧪 8. Tests

# Tous les tests
npm test

# Uniquement le fichier en cours d’édition
npm run test:watch

Ajouter vos fichiers de test dans __tests__/**/*.test.ts.
Jest est déjà configuré en ESM via ts-jest.

🗣️ 9. Internationalisation

    Les clés de traduction sont dans src/locales/*.json.
    Langue par défaut : fr.
    Changer via cookie lang=es ou header Accept-Language: de.

Exemple de clé dans un contrôleur :

res.send(req.__('welcome')); // renverra "Bienvenue" ou la traduction


📈 10. Logs

Winston est installé mais non encore branché (à faire).
Structure prévue :

import logger from './services/logger';
logger.info('User logged in', { userId });


🤝 11. Contribution (workflow Git)

    Créer une branche feature/nom-du-ticket
    Commits en Conventional Commits :

    feat(auth): ajoute refresh token sliding
fix(report): corrige crash si evidence manquant

Push + PR → review → merge sur main
Déploiement auto via CI (GitHub Actions à venir)

📄 12. Licence

MIT – © 2025 MLB & Équipe Connect-People.
Vous êtes libres d’utiliser, modifier et redistribuer tant que la licence MIT est conservée.
📎 Annexe – Liste brute des fichiers sources

.env.example
jest.config.js
package.json
tsconfig.json
tsconfig.build.json
src/
  client/storage.ts
  config/adminRoles.ts
  config/axiosConfig.ts
  config/csrfConfig.ts
  config/database.ts
  config/env.ts
  config/i18n.ts
  config/userRoles.ts
  controllers/admin.controller.ts
  controllers/user.controller.ts
  locales/ar.json
  locales/de.json
  locales/en.json
  locales/es.json
  locales/fr.json
  locales/it.json
  locales/pt.json
  middlewares/admin/adminIP.middleware.ts
  middlewares/admin/authenticateAdmin.ts
  middlewares/admin/authorizeAdmin.ts
  middlewares/user/authenticateUser.ts
  middlewares/user/authorizeUser.ts
  middlewares/csrf.ts
  middlewares/slidingRefresh.ts
  middlewares/validate.ts
  models/report.model.ts
  routes/admin/auth.routes.ts
  routes/admin/reports.routes.ts
  routes/api/report.routes.ts
  routes/user/auth.routes.ts
  routes/web/index.ts
  services/rateLimit.ts
  services/redis.service.ts
  services/security.service.ts
  utils/db.ts
  utils/report.ts
  index.ts

   

  ###13 / 🔐 JWT_CONFIG – module de configuration centralisée

**Fichier :** `src/config/jwt.config.ts`

| Export         | Utilisation                                                         |
|----------------|----------------------------------------------------------------------|
| `JWT_CONFIG`   | Objet **immutable** regroupant :                                    |
|                | • `secrets` – secrets JWT admin & user (lues dans `.env`)           |
|                | • `expiry` – durées de vie des tokens (re-exportées depuis `adminRoles.ts`) |
|                | • `cookie` – options de cookie sécurisées (re-exportées depuis `adminRoles.ts`) |
|                | • `algorithm` – algo de signature (`HS256`)                         |

**Importation :**
```ts
import { JWT_CONFIG } from './config/jwt.config';

Exemples d’usage :

// Middleware d’authentification
const payload = jwt.verify(token, JWT_CONFIG.secrets.adminAccess);

// Pose d’un refresh token
res.cookie('rt', refreshToken, { ...JWT_CONFIG.cookie, maxAge: 7 * 24 * 60 * 60 * 1000 });

✅ Zéro duplication : toutes les valeurs proviennent déjà de adminRoles.ts et de l’environnement.

###14) 🔍 Audit administrateur – middleware global

**Fichier concerné :** `src/index.ts`

Un middleware Express placé **une seule fois** après le `slidingRefresh` intercepte **toutes les requêtes commençant par `/admin/…`** :

```ts
app.use('/admin', slidingRefresh('JWT_ADMIN_REFRESH_SECRET'));
app.use('/admin', (req, _res, next) => {
  if (req.admin) {
    log.admin('view_access', req.admin.email, { view: req.originalUrl });
  }
  next();
});

| Champ      | Contenu                                     |
| ---------- | ------------------------------------------- |
| `scope`    | `admin`                                     |
| `action`   | `view_access`                               |
| `username` | `req.admin.email` (l’admin connecté)        |
| `view`     | `req.originalUrl` (page réellement accédée) |

📁 Logs produits

    Fichier console : couleurs visuelles pendant le développement.
    Fichier rotatif : logs/app-YYYY-MM-DD.log (jusqu’à 20 Mo, 14 jours de rétention).
    Fichier erreur : logs/error-YYYY-MM-DD.log (même rotation, uniquement niveau error).

    🛠️ Utilisation simplifiée
Dans n’importe quel fichier :

import { log } from './services/logger.service';

log.admin('login', 'alice', { ip: '203.0.113.42' });
log.user('password_change', 'bob', { method: 'email' });

Aucune autre configuration requise ; le dossier logs/ est créé automatiquement au premier log.

###15) 📡 Middleware de notification multi-plateforme

**Fichier :** `src/middlewares/notification.middleware.ts`

Ce middleware **intercepte automatiquement** la fin des requêtes réussies (statut 200) et déclenche des notifications **asynchrones** via les services suivants :

| Plateforme       | Service cible (à brancher)                            |
|------------------|--------------------------------------------------------|
| Socket.IO        | `io.emit(...)` – diffusion temps réel Web / Mobile     |
| Email            | `sendMail(...)` – service Brevo déjà créé              |
| Push             | `sendPushNotification(...)` – service à venir          |

---

### 🎯 Middlewares exportés

| Nom                     | Déclenché sur                         | Données utilisées (req)                                  |
|-------------------------|---------------------------------------|----------------------------------------------------------|
| `notifyNewVoiceMessage` | Fin d’une requête de message vocal    | `user.id`, `user.email`, `newMessageId`                  |
| `notifyNewAlert`        | Fin d’une requête d’alerte            | `user.id`, `user.email`, `newAlertId`, `body.alertType`  |

---

### 🧩 Utilisation

Ajoute simplement le middleware sur la route concernée :

```ts
import { notifyNewVoiceMessage } from './middlewares/notification.middleware';

router.post('/voice', authenticateUser, notifyNewVoiceMessage, voiceController);

Le middleware n’attend rien et ne bloque pas la réponse client ; il travaille en arrière-plan dès que res.statusCode === 200.

### 16 Sécurité renforcée (ADMIN uniquement)
Dossier concerné : src/middlewares/admin/ et src/services/security.service.ts
Acteur visé : ADMINISTRATEUR uniquement – aucun impact sur les utilisateurs classiques.
Objectif
Centraliser et appliquer uniquement aux routes commençant par /admin/... un ensemble de vérifications de sécurité très strictes :

    Authentification multi-facteurs (MFA) obligatoire.
    Code de confirmation à usage unique (stocké en session).
    Adresse IP restreinte :
    • liste blanche CIDR (variable d’env IP_WHITELIST) OU IP locale autorisée.
    Heures ouvrables : 09 h – 18 h (fuseau serveur).
    RBAC : rôle president ou admin selon l’action.
        Rate-limit global (Redis) : 100 requêtes / 15 min par IP.

Utilisation
• Le middleware sensitiveAction.middleware.ts encapsule toutes ces vérifications.
• Il est monté exclusivement sur les routes admin ; les routes /user/... ou /api/v1/... ne le traversent jamais.
• Aucune configuration côté utilisateur n’est nécessaire – l’expérience utilisateur reste inchangée.
Structure

src/
├── services/security.service.ts      # fonctions utilitaires partagées
└── middlewares/admin/
    ├── sensitiveAction.middleware.ts # middleware composite (MFA, IP, horaires…)
    └── separationPrivileges.middleware.ts # RBAC spécifique aux actions sensibles

    ### 17) adminToken.service.ts – Génération & vérification des tokens administrateur

| Export                                | Description                                        |
| ------------------------------------- | -------------------------------------------------- |
| `generateAdminAccessToken(id, role)`  | JWT court (15 min) pour accès API.                 |
| `generateAdminRefreshToken(id, role)` | JWT long (7 j) pour renouvellement + `jti` unique. |
| `verifyAdminAccessToken(token)`       | Vérifie & décode le token court.                   |
| `verifyAdminRefreshToken(token)`      | Vérifie & décode le token long.                    |
| `generateAdminCSRFToken()`            | Génère un token CSRF aléatoire (32 bytes).         |
| `verifyAdminCSRFToken(token, stored)` | Comparaison timing-safe CSRF.                      |


⚙️ Variables requises :
JWT_ADMIN_ACCESS_SECRET, JWT_ADMIN_REFRESH_SECRET dans .env

### 18)  redis.service.ts – Client Redis & store Express-Session

| Export           | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `redis`          | Client Redis déjà connecté (singleton).                |
| `connectRedis()` | Appel unique au boot → `await connectRedis()`.         |
| `sessionStore`   | Store prêt pour `express-session` (`connect-redis@7`). |


Configuration par défaut :

    Host : REDIS_URL (.env) ou redis://localhost:6379
    Préfixe clés : sess:
    TTL : 24 h

    ###  19) rbacAction.middleware.ts – Contrôle d’accès RBAC administrateur

    Middleware Express utilisable uniquement sur les routes admin.

    import { rbacAction } from './middlewares/admin/rbacAction.middleware';

router.delete(
  '/users/:id',
  authenticateAdmin,
  rbacAction('users', 3),  // seul président ou rôle ≥ 3
  deleteUserController
);

| Paramètre  | Type                                 | Détail                                                |
| ---------- | ------------------------------------ | ----------------------------------------------------- |
| `resource` | `keyof PERMISSION_MATRIX[AdminRole]` | Domaine (`users`, `finance`, `security`…).            |
| `level`    | `number`                             | Niveau minimum (1-3) défini dans `PERMISSION_MATRIX`. |

Réponses :

    200 → accès accordé.
    403 ROLE_UNKNOWN → rôle absent ou invalide.
    403 RBAC_DENIED → niveau insuffisant (loggué).

    import { connectRedis } from './services/redis.service.js';
      await connectRedis(); // avant app.use(session(...))

  Arborescence simplifiée

  src/services/
├── adminToken.service.ts    # tokens + CSRF
└── redis.service.ts         # client + store Redis
src/middlewares/admin/
└── rbacAction.middleware.ts # RBAC admin




### 20) # – Turnstile + Rate-Limit

Intégration de **Cloudflare Turnstile** et du **rate-limit Redis** dans l’architecture existante.
#  PAS ENCORE CONNECTER A TURNSTILLE
#  Prérequis (une seule fois)
# • Compte Cloudflare (gratuit)
# • Dashboard Turnstile → « Add Site » → Mode « Managed » → copier les 2 clés :
# – Site Key (publique)
# – Secret Key (serveur)


---

## 3. Installation rapide

1. Créer un site Turnstile dans Cloudflare → copier **Site Key** et **Secret Key**.  
2. Ajouter dans `.env` :

TURNSTILE_SECRET=0x4AAAA....
TURNSTILE_SITEKEY=0x4AAAA....


3. Installer le script Turnstile côté front (voir `index.html` fourni).  
4. Dans chaque route à protéger, insérer `turnstileGuard` **juste avant le contrôleur** :

```ts
router.post('/login', validate(schema), turnstileGuard, loginController);

---

## 1. Principe

1. **Front** : un script Turnstile génère un token caché (invisible).  
2. **Back** :  
   • `turnstile.middleware.ts`  
   – Vérifie le rate-limit (Redis)  
   – Vérifie le token auprès de Cloudflare  
   – Passe ou rejette la requête.  
3. **Routes protégées** : ajout d’un simple `turnstileGuard` dans la pile des middlewares.

---
src/
├─ services/
│   ├─ redis.service.ts        # Client Redis (déjà existant)
│   ├─ rateLimitService.ts     # logique « hit / reset » (déjà existant)
│   └─ turnstile.service.ts    # Vérification serveur Turnstile (nouveau)
├─ middlewares/
│   └─ turnstile.middleware.ts # Middleware Express « clé-en-main » (nouveau)
├─ routes/
│   ├─ user/auth.routes.ts         # login utilisateur (modifié : + turnstileGuard)
│   ├─ admin/auth.routes.ts        # login admin (modifié : + turnstileGuard)
│   ├─ admin/sensitive.routes.ts   # actions sensibles (modifié : + turnstileGuard)
│   └─ admin/users.routes.ts       # création user (modifié : + turnstileGuard)
└─ types/
└─ turnstile.d.ts          # Typage TypeScript (facultatif)

### 21) les règles et valeurs par défaut utilisées pour les JWT d’accès, refresh, reset et CSRF.
# Les durées sont centralisées dans le fichier src/config/tokens.ts :

| Type de token      | Durée par défaut | Utilité principale                              |
| ------------------ | ---------------- | ----------------------------------------------- |
| Access             | 15 minutes       | Accès rapide aux ressources protégées           |
| Refresh            | 7 jours          | Renouvellement silencieux de l’access           |
| Reset mot de passe | 1 heure          | Validation courte d’un lien de réinitialisation |
| CSRF               | 1 heure          | Protection des formulaires / mutations          |
 Ces valeurs peuvent être surchargées via les variables d’environnement correspondantes (JWT_ACCESS_EXPIRY, JWT_REFRESH_EXPIRY, etc.) sans toucher au code.






