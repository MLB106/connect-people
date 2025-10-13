export declare const API_CONFIG: {
    readonly PAGINATION: {
        readonly DEFAULT_PAGE: 1;
        readonly DEFAULT_LIMIT: 10;
        readonly MAX_LIMIT: 100;
    };
    readonly REQUEST_LIMITS: {
        readonly JSON_SIZE: "10mb";
        readonly URL_ENCODED_SIZE: "10mb";
    };
    readonly STATUS_CODES: {
        readonly SUCCESS: 200;
        readonly CREATED: 201;
        readonly NO_CONTENT: 204;
        readonly BAD_REQUEST: 400;
        readonly UNAUTHORIZED: 401;
        readonly FORBIDDEN: 403;
        readonly NOT_FOUND: 404;
        readonly CONFLICT: 409;
        readonly VALIDATION_ERROR: 422;
        readonly INTERNAL_SERVER_ERROR: 500;
    };
    readonly ERROR_MESSAGES: {
        readonly VALIDATION_ERROR: "Erreur de validation des données";
        readonly INTERNAL_SERVER_ERROR: "Erreur interne du serveur";
        readonly NOT_FOUND: "Ressource non trouvée";
        readonly UNAUTHORIZED: "Accès non autorisé";
        readonly FORBIDDEN: "Accès interdit";
        readonly CONFLICT: "Conflit de ressource";
        readonly INVALID_ID: "ID invalide";
        readonly DUPLICATE_EMAIL: "Un utilisateur avec cet email existe déjà";
        readonly USER_NOT_FOUND: "Utilisateur non trouvé";
        readonly INVALID_CREDENTIALS: "Identifiants invalides";
    };
    readonly SUCCESS_MESSAGES: {
        readonly USER_CREATED: "Utilisateur créé avec succès";
        readonly USER_UPDATED: "Utilisateur mis à jour avec succès";
        readonly USER_DELETED: "Utilisateur supprimé avec succès";
        readonly DATA_RETRIEVED: "Données récupérées avec succès";
    };
    readonly LOGGING: {
        readonly ENABLE_REQUEST_LOGGING: true;
        readonly ENABLE_RESPONSE_LOGGING: true;
        readonly ENABLE_ERROR_LOGGING: true;
    };
};
export type ApiStatusCode = typeof API_CONFIG.STATUS_CODES[keyof typeof API_CONFIG.STATUS_CODES];
export type ErrorMessage = typeof API_CONFIG.ERROR_MESSAGES[keyof typeof API_CONFIG.ERROR_MESSAGES];
export type SuccessMessage = typeof API_CONFIG.SUCCESS_MESSAGES[keyof typeof API_CONFIG.SUCCESS_MESSAGES];
