// Classe utilitaire pour les réponses API standardisées
export class ApiResponseUtil {
    /**
     * Envoie une réponse de succès
     */
    static success(res, statusCode = 200, data = null) {
        const response = {
            success: true,
            data,
            error: null,
            timestamp: new Date().toISOString()
        };
        res.status(statusCode).json(response);
    }
    /**
     * Envoie une réponse d'erreur
     */
    static error(res, statusCode = 500, error = 'Erreur interne du serveur') {
        const response = {
            success: false,
            data: null,
            error,
            timestamp: new Date().toISOString()
        };
        res.status(statusCode).json(response);
    }
    /**
     * Envoie une réponse de validation d'erreur
     */
    static validationError(res, errors) {
        const response = {
            success: false,
            data: null,
            error: `Erreur de validation: ${errors.join(', ')}`,
            timestamp: new Date().toISOString()
        };
        res.status(400).json(response);
    }
    /**
     * Envoie une réponse de ressource non trouvée
     */
    static notFound(res, message = 'Ressource non trouvée') {
        const response = {
            success: false,
            data: null,
            error: message,
            timestamp: new Date().toISOString()
        };
        res.status(404).json(response);
    }
    /**
     * Envoie une réponse de conflit
     */
    static conflict(res, message = 'Conflit de ressource') {
        const response = {
            success: false,
            data: null,
            error: message,
            timestamp: new Date().toISOString()
        };
        res.status(409).json(response);
    }
    /**
     * Envoie une réponse d'accès non autorisé
     */
    static unauthorized(res, message = 'Accès non autorisé') {
        const response = {
            success: false,
            data: null,
            error: message,
            timestamp: new Date().toISOString()
        };
        res.status(401).json(response);
    }
    /**
     * Envoie une réponse d'accès interdit
     */
    static forbidden(res, message = 'Accès interdit') {
        const response = {
            success: false,
            data: null,
            error: message,
            timestamp: new Date().toISOString()
        };
        res.status(403).json(response);
    }
}
// Fonction utilitaire pour wrapper les contrôleurs avec gestion d'erreur automatique
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Erreur dans le controleur:', error instanceof Error ? error.message : 'Erreur inconnue');
            }
            ApiResponseUtil.error(res, 500, 'Erreur interne du serveur');
        });
    };
};
//# sourceMappingURL=apiResponse.js.map