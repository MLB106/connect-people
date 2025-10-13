# API REST Documentation

## Base URL
```
http://localhost:4000/api
```

## Format de réponse uniforme
Toutes les réponses suivent le format :
```json
{
  "success": boolean,
  "data": any | null,
  "error": string | null
}
```

## Endpoints

### 1. Liste des utilisateurs
**GET** `/api/users`

**Description :** Récupère la liste de tous les utilisateurs actifs (champs publics uniquement)

**Réponse :**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true,
      "emailVerified": false,
      "lastLogin": "2024-01-15T10:30:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "error": null
}
```

### 2. Détail d'un utilisateur
**GET** `/api/users/:id`

**Description :** Récupère les détails d'un utilisateur spécifique

**Paramètres :**
- `id` (string, requis) : ID MongoDB de l'utilisateur (24 caractères)

**Réponse :**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true,
    "emailVerified": false,
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "error": null
}
```

### 3. Création d'un utilisateur
**POST** `/api/users`

**Description :** Crée un nouvel utilisateur (le mot de passe est automatiquement hashé)

**Body :**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse123",
  "role": "user"
}
```

**Champs :**
- `name` (string, requis) : Nom complet (2-100 caractères)
- `email` (string, requis) : Adresse email valide
- `password` (string, requis) : Mot de passe (minimum 8 caractères)
- `role` (string, optionnel) : Rôle utilisateur (`publicist`, `professional`, `user`) - défaut: `user`

**Réponse :**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true,
    "emailVerified": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

### 4. Mise à jour d'un utilisateur
**PATCH** `/api/users/:id`

**Description :** Met à jour partiellement un utilisateur existant

**Paramètres :**
- `id` (string, requis) : ID MongoDB de l'utilisateur (24 caractères)

**Body :**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "role": "professional",
  "isActive": true,
  "emailVerified": true
}
```

**Champs (tous optionnels) :**
- `name` (string) : Nom complet (2-100 caractères)
- `email` (string) : Adresse email valide
- `role` (string) : Rôle utilisateur (`publicist`, `professional`, `user`)
- `isActive` (boolean) : Statut actif/inactif
- `emailVerified` (boolean) : Statut de vérification email

**Réponse :**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "role": "professional",
    "isActive": true,
    "emailVerified": true,
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  },
  "error": null
}
```

### 5. Suppression d'un utilisateur
**DELETE** `/api/users/:id`

**Description :** Supprime logiquement un utilisateur (marque comme inactif)

**Paramètres :**
- `id` (string, requis) : ID MongoDB de l'utilisateur (24 caractères)

**Réponse :**
```json
{
  "success": true,
  "data": {
    "message": "Utilisateur supprimé avec succès"
  },
  "error": null
}
```

## Codes d'erreur

### 400 - Bad Request
```json
{
  "success": false,
  "data": null,
  "error": "Données invalides: email: Email invalide, password: String must contain at least 8 character(s)"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "data": null,
  "error": "Utilisateur non trouvé"
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "data": null,
  "error": "Erreur interne du serveur"
}
```

## Sécurité

- Les mots de passe sont automatiquement hashés avec bcrypt (12 rounds)
- Les champs sensibles (passwordHash, tokens) sont masqués dans toutes les réponses
- Validation stricte des données d'entrée avec Zod
- Gestion d'erreur uniforme et sécurisée

## Santé de l'API

**GET** `/health`

**Description :** Vérifie l'état de l'API

**Réponse :**
```json
{
  "success": true,
  "data": {
    "status": "OK",
    "timestamp": "2024-01-15T12:00:00.000Z",
    "uptime": 3600
  },
  "error": null
}
```






