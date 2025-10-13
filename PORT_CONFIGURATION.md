# Configuration des Ports - Connect-People

## Problème résolu

Il y avait une incohérence dans la configuration des ports :
- `src/index.ts` utilisait le port **4000** par défaut
- `src/config/env.ts` utilisait le port **3000** par défaut

## Solution appliquée

1. **Standardisation sur le port 3000** : Port standard pour les applications web
2. **Configuration centralisée** : Utilisation de `env.ts` pour toutes les configurations
3. **Import centralisé** : L'import de `env` est maintenant en haut du fichier `index.ts`

## Configuration actuelle

### Port par défaut
- **Port de développement** : 3000
- **Variable d'environnement** : `PORT` (optionnelle)
- **Configuration** : `src/config/env.ts`

### Comment changer le port

1. **Via variable d'environnement** (recommandé) :
   ```bash
   PORT=8080 npm run dev
   ```

2. **Via fichier .env** :
   ```
   PORT=8080
   ```

3. **Modification directe** dans `src/config/env.ts` :
   ```typescript
   port: parseInt(process.env.PORT || '8080', 10),
   ```

## Vérification

Pour vérifier que le serveur fonctionne :
```bash
# Démarrer le serveur
npm run dev

# Vérifier le port
netstat -an | findstr :3000

# Tester la route de santé
curl http://localhost:3000/health
```

## Avantages de cette solution

1. **Cohérence** : Un seul endroit pour configurer le port
2. **Flexibilité** : Possibilité de changer le port via les variables d'environnement
3. **Maintenabilité** : Configuration centralisée et documentée
4. **Standards** : Utilisation du port 3000 (standard web)






