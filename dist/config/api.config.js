// src/config/api.config.ts
export const API_CONFIG = {
    // Limites de pagination
    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 10,
        MAX_LIMIT: 100
    },
    // Limites de taille de requête
    REQUEST_LIMITS: {
        JSON_SIZE: '10mb',
        URL_ENCODED_SIZE: '10mb'
    },
    // Codes de statut HTTP personnalisés
    STATUS_CODES: {
        SUCCESS: 200,
        CREATED: 201,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
        VALIDATION_ERROR: 422,
        INTERNAL_SERVER_ERROR: 500
    },
    // Messages d'erreur standardisés
    ERROR_MESSAGES: {
        VALIDATION_ERROR: 'Erreur de validation des données',
        INTERNAL_SERVER_ERROR: 'Erreur interne du serveur',
        NOT_FOUND: 'Ressource non trouvée',
        UNAUTHORIZED: 'Accès non autorisé',
        FORBIDDEN: 'Accès interdit',
        CONFLICT: 'Conflit de ressource',
        INVALID_ID: 'ID invalide',
        DUPLICATE_EMAIL: 'Un utilisateur avec cet email existe déjà',
        USER_NOT_FOUND: 'Utilisateur non trouvé',
        INVALID_CREDENTIALS: 'Identifiants invalides'
    },
    // Messages de succès standardisés
    SUCCESS_MESSAGES: {
        USER_CREATED: 'Utilisateur créé avec succès',
        USER_UPDATED: 'Utilisateur mis à jour avec succès',
        USER_DELETED: 'Utilisateur supprimé avec succès',
        DATA_RETRIEVED: 'Données récupérées avec succès'
    },
    // Configuration des logs
    LOGGING: {
        ENABLE_REQUEST_LOGGING: true,
        ENABLE_RESPONSE_LOGGING: true,
        ENABLE_ERROR_LOGGING: true
    }
};
//# sourceMappingURL=api.config.js.map