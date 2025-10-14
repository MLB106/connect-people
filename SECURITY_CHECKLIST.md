# 🔐 Checklist Sécurité - Connect People

## ✅ FAIT (Déjà en place)

- [x] Helmet activé (protection headers HTTP)
- [x] Rate Limiting global (100 req/15min)
- [x] CORS configuré
- [x] CSRF protection
- [x] express-session avec cookies sécurisés
- [x] bcrypt pour mots de passe (12 rounds)
- [x] JWT avec secrets séparés admin/user
- [x] MongoDB (pas d'injection SQL)
- [x] Validation express-validator
- [x] Logs avec Winston
- [x] Limites body parser (1mb)

---

## ⚠️ À FAIRE AVANT PRODUCTION

### 🔑 **Secrets & Tokens**

- [ ] Générer TOUS les secrets avec 64+ caractères
- [ ] Vérifier que `.env` n'est PAS commité
- [ ] Créer `.env.production` avec secrets différents
- [ ] Documenter où sont stockés les secrets prod (coffre-fort physique/numérique)
- [ ] Tester que l'app démarre avec les nouveaux secrets

**Commande pour générer un secret :**
```bash
openssl rand -base64 64
```

---

### 🌐 **HTTPS & Production**

- [ ] Acheter certificat SSL (ou Let's Encrypt gratuit)
- [ ] Configurer HTTPS (nginx/Apache)
- [ ] Forcer HTTPS (redirect HTTP → HTTPS)
- [ ] Tester SSL avec : https://www.ssllabs.com/ssltest/
- [ ] Activer HSTS (HTTP Strict Transport Security)

---

### 🔒 **Cookies & Sessions**

- [ ] Vérifier `secure: true` en production (cookies HTTPS only)
- [ ] Vérifier `sameSite: 'strict'` activé
- [ ] Tester durée de session (24h par défaut)
- [ ] Implémenter logout qui détruit la session

---

### 🛡️ **Headers de sécurité**

- [ ] Tester headers avec : https://securityheaders.com/
- [ ] Score A minimum requis
- [ ] Vérifier CSP (Content Security Policy)
- [ ] Vérifier X-Frame-Options (protection clickjacking)

---

### 🚫 **Validation & Sanitization**

- [ ] Valider TOUTES les entrées utilisateur
- [ ] Sanitizer les données avant MongoDB
- [ ] Protéger contre NoSQL injection
- [ ] Limiter taille des uploads (déjà 1mb ✓)
- [ ] Vérifier types MIME des fichiers uploadés

---

### 👥 **Authentification**

- [ ] Implémenter limite tentatives login (3-5 max)
- [ ] Blocage temporaire après échecs (15min)
- [ ] Email de confirmation obligatoire
- [ ] 2FA pour admins (optionnel mais recommandé)
- [ ] Politique mot de passe fort (8+ chars, majuscule, chiffre, symbole)

---

### 📊 **Monitoring & Logs**

- [ ] Configurer alertes erreurs critiques
- [ ] Logger les tentatives d'accès admin
- [ ] Rotation des logs (déjà avec winston ✓)
- [ ] Backup logs sur serveur externe
- [ ] Monitoring uptime (UptimeRobot gratuit)

---

### 🔐 **Base de données**

- [ ] MongoDB avec authentification activée
- [ ] Créer utilisateur MongoDB avec droits limités (pas root)
- [ ] Firewall : MongoDB accessible UNIQUEMENT depuis l'app
- [ ] Backup automatique quotidien
- [ ] Tester restauration backup

---

### 🌍 **Infrastructure**

- [ ] Firewall configuré (ports 80, 443 ouverts uniquement)
- [ ] SSH avec clés (pas de password)
- [ ] Fail2ban installé (protection brute force SSH)
- [ ] Mises à jour système automatiques
- [ ] Serveur derrière Cloudflare (optionnel, DDoS protection)

---

### 📝 **Code & Git**

- [ ] Aucun secret dans le code source
- [ ] Scan dépendances : `npm audit`
- [ ] Fixer vulnérabilités critiques
- [ ] `.env` dans `.gitignore` (déjà fait ✓)
- [ ] Code review avant merge en main

---

### 🧪 **Tests de sécurité**

- [ ] Test injection SQL/NoSQL
- [ ] Test XSS (Cross-Site Scripting)
- [ ] Test CSRF bypass
- [ ] Test force brute login
- [ ] Test session hijacking
- [ ] Scan vulnérabilités : OWASP ZAP ou Burp Suite

---

### 📖 **Documentation**

- [ ] Procédure rotation secrets
- [ ] Procédure incident sécurité
- [ ] Contacts urgence (qui appeler si hack)
- [ ] Plan de reprise après incident

---

## 🎯 **Score Sécurité Actuel : 70/100**

**Pour atteindre 95/100 :**
1. Générer vrais secrets forts (15 min)
2. Configurer HTTPS (1h)
3. Tester avec outils sécurité (2h)
4. Backup automatique MongoDB (1h)
5. 2FA admins (2h)

---

## 🚨 **En cas de Hack**

1. **Déconnecter immédiatement** le serveur d'Internet
2. **Changer TOUS les secrets** (JWT, session, CSRF, DB passwords)
3. **Analyser les logs** pour identifier la faille
4. **Notifier les utilisateurs** (obligation légale RGPD)
5. **Corriger la faille** avant de remettre en ligne
6. **Audit complet** de sécurité

---

## 📞 **Ressources**

- OWASP Top 10 : https://owasp.org/www-project-top-ten/
- Test SSL : https://www.ssllabs.com/ssltest/
- Test Headers : https://securityheaders.com/
- Test général : https://observatory.mozilla.org/
