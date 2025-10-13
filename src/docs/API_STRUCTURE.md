# Structure API - Connect People

## Vue d'ensemble

Cette documentation décrit la structure standardisée de l'API Connect People, conçue pour améliorer la cohérence et la maintenabilité du code.

## Architecture

### 1. Utilitaires communs (`src/utils/`)

#### `apiResponse.ts`
- **ApiResponseUtil** : Classe utilitaire pour les réponses API standardisées
- **asyncHandler** : Wrapper pour la gestion automatique des erreurs dans les contrôleurs
- **Interface ApiResponse** : Format uniforme pour toutes les réponses API

#### `validation.ts`
- **validateRequest** : Middleware de validation des données d'entrée avec Zod
- **validateParams** : Middleware de validation des paramètres d'URL
- **validateQuery** : Middleware de validation des query parameters
- **commonSchemas** : Schémas de validation réutilisables

#### `logger.ts`
- **Logger** : Classe de logging standardisée avec différents niveaux
- **LogContext** : Interface pour le contexte des logs
- **apiRequest** : Méthode spécialisée pour les logs de requêtes API

### 2. Configuration (`src/config/`)

#### `api.config.ts`
- **API_CONFIG** : Configuration centralisée pour l'API
- Constantes pour la pagination, les limites de requête, les codes de statut
- Messages d'erreur et de succès standardisés

### 3. Middlewares (`src/middlewares/`)

#### `apiLogger.middleware.ts`
- Middleware de logging automatique pour les routes API
- Capture le temps de réponse et les détails de la requête

## Format des réponses API

Toutes les réponses API suivent le format standard :

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: string | null;
  timestamp: string;
}
```

### Exemples de réponses

#### Succès
```json
{
  "success": true,
  "data": { "id": "123", "name": "John Doe" },
  "error": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### Erreur
```json
{
  "success": false,
  "data": null,
  "error": "Utilisateur non trouvé",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Structure des routes

Toutes les routes API sont préfixées par `/api` :

- `/api/users` - Gestion des utilisateurs
- `/api/nav/entreprendre` - Options de navigation entreprendre
- `/api/footer/links` - Liens du footer
- `/api/search/categories` - Catégories de recherche
- `/api/reports` - Rapports

## Bonnes pratiques

### 1. Contrôleurs
- Utiliser `asyncHandler` pour la gestion automatique des erreurs
- Utiliser `ApiResponseUtil` pour les réponses standardisées
- Utiliser `Logger` pour le logging structuré

### 2. Validation
- Utiliser les middlewares de validation Zod
- Définir des schémas de validation réutilisables
- Valider les paramètres d'URL et les query parameters

### 3. Gestion d'erreurs
- Utiliser les méthodes appropriées d'`ApiResponseUtil`
- Logger les erreurs avec le contexte approprié
- Retourner des messages d'erreur cohérents

### 4. Logging
- Logger les actions importantes avec le contexte
- Utiliser les niveaux de log appropriés
- Inclure des informations utiles dans le contexte

## Migration

Pour migrer un contrôleur existant :

1. Importer les utilitaires nécessaires
2. Wrapper la fonction avec `asyncHandler`
3. Remplacer les réponses manuelles par `ApiResponseUtil`
4. Ajouter le logging approprié
5. Utiliser les middlewares de validation si nécessaire

## Exemple de migration

### Avant
```typescript
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
```

### Après
```typescript
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  Logger.info('Users retrieved successfully', { count: users.length });
  ApiResponseUtil.success(res, 200, users);
});
```




