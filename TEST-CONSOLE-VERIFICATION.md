# Vérification Console - JSON Brut Uniquement

## Objectif
Vérifier que la console du navigateur affiche **UNIQUEMENT du JSON brut** et **AUCUNE balise HTML** lors de l'appel à `http://localhost:4000/?view=true`.

## Modifications effectuées

### 1. Fichier `public/js/app/client-renderer.js`
- **Ligne 201-204** : Ajout d'un `console.log` qui affiche uniquement les données JSON (pas de HTML)
- **Ligne 647-684** : Suppression des `console.log` qui affichaient du HTML formaté avec des styles CSS

### 2. Fichier `src/routes/api/pages.routes.ts`
- **Ligne 138-159** : Ajout d'une page de test `t` pour faciliter les tests

## Tests à effectuer

### Test 1 : Vérifier l'API directement
```bash
# PowerShell
Invoke-WebRequest -Uri "http://localhost:4000/api/pages/page/t" | Select-Object -ExpandProperty Content
```

**Résultat attendu** : JSON brut sans balises HTML
```json
{
  "success": true,
  "data": {
    "title": "Test Page - Connect People",
    "description": "Page de test pour vérifier que la console affiche uniquement du JSON brut",
    "locale": "fr",
    "content": {
      "hero": {
        "title": "Page de Test",
        "subtitle": "Cette page est utilisée pour tester l'affichage JSON dans la console",
        "cta": "Tester"
      },
      "testData": {
        "string": "Ceci est une chaîne de test",
        "number": 42,
        "boolean": true,
        "array": ["item1", "item2", "item3"],
        "object": {
          "key1": "value1",
          "key2": "value2"
        }
      }
    }
  },
  "error": null
}
```

### Test 2 : Vérifier la console du navigateur

1. **Démarrer le serveur** (si ce n'est pas déjà fait)
   ```bash
   npm start
   ```

2. **Ouvrir le navigateur**
   - Aller sur `http://localhost:4000/test-api-console.html?view=true`
   - Ou aller sur `http://localhost:4000/?view=true`

3. **Ouvrir les DevTools**
   - Appuyer sur `F12`
   - Aller dans l'onglet **Console**

4. **Vérifier la console**
   - La console doit afficher **UNIQUEMENT du JSON brut**
   - **AUCUNE balise HTML** ne doit être visible (pas de `<div>`, `<p>`, `<section>`, etc.)
   - Les messages doivent ressembler à :
     ```
     Page data: {title: "Test Page - Connect People", description: "...", ...}
     ```

5. **Vérifier le Network**
   - Aller dans l'onglet **Network**
   - Filtrer sur **Fetch/XHR**
   - Recharger la page
   - Cliquer sur la requête `/api/pages/page/t` (ou autre page)
   - Dans l'onglet **Response**, vérifier que c'est du JSON brut
   - Dans l'onglet **Preview**, vérifier que c'est un objet JSON structuré

## Résultat attendu

### ✅ Console correcte (JSON brut uniquement)
```
Page data: {
  title: "Test Page - Connect People",
  description: "Page de test pour vérifier que la console affiche uniquement du JSON brut",
  locale: "fr",
  content: {
    hero: {
      title: "Page de Test",
      subtitle: "Cette page est utilisée pour tester l'affichage JSON dans la console",
      cta: "Tester"
    },
    testData: {
      string: "Ceci est une chaîne de test",
      number: 42,
      boolean: true,
      array: ["item1", "item2", "item3"],
      object: {
        key1: "value1",
        key2: "value2"
      }
    }
  }
}
```

### ❌ Console incorrecte (HTML affiché)
```
<div class="hero-section">
  <h1>Page de Test</h1>
  <p>Cette page est utilisée pour tester...</p>
</div>
```

## Fichiers de test créés

1. **`public/test-api-console.html`** : Page de test interactive avec boutons pour tester les différentes routes API
2. **`test-console-output.html`** : Page de test simple pour vérifier l'affichage console

## Commandes utiles

```bash
# Rebuild le projet TypeScript
npm run build

# Démarrer le serveur
npm start

# Tester l'API avec curl (PowerShell)
Invoke-WebRequest -Uri "http://localhost:4000/api/pages/page/t" | Select-Object -ExpandProperty Content

# Tester l'API avec curl (Bash/Linux)
curl http://localhost:4000/api/pages/page/t
```

## Conclusion

Après ces modifications :
- ✅ L'API retourne du JSON brut
- ✅ La console affiche uniquement du JSON brut (pas de HTML)
- ✅ Le HTML est injecté dans le DOM (visible dans la page)
- ✅ Le HTML n'est PAS affiché dans la console

**La tâche est terminée lorsque la console affiche UNIQUEMENT du JSON brut, sans aucune balise HTML.**




