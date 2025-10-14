# Guide : Externalisation des Tokens JWT

## 🎯 Pourquoi externaliser ?

**Avantages :**
- Sécurité accrue (tokens hors du code source)
- Rotation des secrets simplifiée
- Multi-environnements (dev/staging/prod)
- Audit centralisé

---

## 📋 Option 1 : Variables d'environnement (ACTUEL)

**Vous utilisez déjà ceci :**
```bash
JWT_SECRET=votre-secret
JWT_ADMIN_ACCESS_SECRET=admin-secret
```

**Pour externaliser :**
1. Créez un fichier `.env.production` (git ignoré)
2. Utilisez des secrets complexes générés :
```bash
openssl rand -base64 64
```
3. Ne commitez JAMAIS les `.env`

---

## 📋 Option 2 : Service de secrets managé

### **A) AWS Secrets Manager**
```javascript
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

async function getJWTSecret() {
  const client = new SecretsManagerClient({ region: "eu-west-1" });
  const response = await client.send(
    new GetSecretValueCommand({ SecretId: "prod/jwt/secret" })
  );
  return JSON.parse(response.SecretString).JWT_SECRET;
}
```

### **B) HashiCorp Vault**
```javascript
const vault = require('node-vault')({
  endpoint: 'http://vault:8200',
  token: process.env.VAULT_TOKEN
});

const secrets = await vault.read('secret/data/jwt');
const JWT_SECRET = secrets.data.data.JWT_SECRET;
```

### **C) Azure Key Vault**
```javascript
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new SecretClient(
  "https://your-vault.vault.azure.net",
  new DefaultAzureCredential()
);

const secret = await client.getSecret("JWT-SECRET");
```

---

## 📋 Option 3 : Serveur d'authentification séparé

### **Architecture :**
```
┌─────────────────┐       ┌──────────────────┐
│                 │       │  Auth Service    │
│  Votre App      │◄─────►│  (port 5000)     │
│  (port 4000)    │       │  - Génère tokens │
│                 │       │  - Valide tokens │
└─────────────────┘       │  - Refresh       │
                          └──────────────────┘
```

### **Implémentation :**

**1. Service Auth (serveur séparé) :**
```javascript
// auth-service/server.js
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const JWT_SECRET = process.env.JWT_SECRET; // Stocké UNIQUEMENT ici

// Endpoint : Générer token
app.post('/auth/generate', (req, res) => {
  const { userId, role } = req.body;
  const token = jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Endpoint : Valider token
app.post('/auth/verify', (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, JWT_SECRET);
    res.json({ valid: true, data: decoded });
  } catch {
    res.json({ valid: false });
  }
});

app.listen(5000);
```

**2. Votre App (appelle le service) :**
```javascript
// src/middlewares/auth.ts
import axios from 'axios';

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  // Appel au service auth
  const response = await axios.post('http://auth-service:5000/auth/verify', {
    token
  });
  
  if (response.data.valid) {
    req.user = response.data.data;
    next();
  } else {
    res.status(401).json({ error: 'Non autorisé' });
  }
};
```

---

## 📋 Option 4 : Solutions clé en main

### **Auth0**
```javascript
import { auth } from 'express-openid-connect';

app.use(auth({
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:4000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: 'https://your-tenant.auth0.com'
}));
```

### **Keycloak**
- Interface admin complète
- Gestion des utilisateurs, rôles, permissions
- Compatible OAuth2, OpenID Connect

---

## 🎯 Recommandation pour vous

**Maintenant (dev/petit site) :**
- ✅ Fichiers `.env` (actuel)
- ✅ Secrets complexes générés
- ✅ `.env` jamais commité

**Plus tard (production/scale) :**
- Option 2A (AWS Secrets Manager) si hébergé sur AWS
- Option 3 (Auth Service séparé) si vous voulez le contrôle total
- Option 4 (Auth0) si vous voulez zéro maintenance

---

## 🔐 Bonnes pratiques

1. **Rotation des secrets** : Changez tous les 3-6 mois
2. **Secrets différents** : Dev ≠ Staging ≠ Prod
3. **Accès limité** : Seuls les devs senior ont accès aux secrets prod
4. **Audit logs** : Tracez qui accède aux secrets
5. **Backup** : Sauvegardez les secrets dans un coffre-fort sécurisé

---

## 📝 Checklist avant production

- [ ] Générer de nouveaux secrets forts (64+ caractères)
- [ ] Créer `.env.production` avec vrais secrets
- [ ] Ajouter `.env.production` dans `.gitignore`
- [ ] Tester avec les nouveaux secrets
- [ ] Documenter où sont stockés les secrets (coffre-fort)
- [ ] Configurer rotation automatique (si service managé)
