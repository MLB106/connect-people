/**
 * Middleware pour gérer la double réponse (JSON API + HTML View)
 * Utilise le viewMode détecté pour choisir le type de réponse
 */
export const dualResponseMiddleware = (viewPath, pageData) => {
    return async (req, res, _next) => {
        try {
            // Si on est en mode HTML, rendre la vue
            if (req.viewMode === 'html') {
                res.render(`pages/${viewPath.replace('.hbs', '')}`, {
                    ...pageData,
                    csrfToken: req.csrfToken ? req.csrfToken() : undefined
                });
                return;
            }
            // Sinon, mode API JSON par défaut - retourner les données JSON pures
            res.set('Content-Type', 'application/json; charset=utf-8');
            res.json({
                success: true,
                data: pageData,
                error: null,
                meta: {
                    viewPath,
                    timestamp: new Date().toISOString(),
                    mode: 'api'
                }
            });
        }
        catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error(`Erreur dans dualResponseMiddleware pour ${viewPath}:`, error instanceof Error ? error.message : 'Erreur inconnue');
            }
            if (req.viewMode === 'html') {
                res.status(404).render('pages/404', {
                    title: 'Page non trouvée - Connect People',
                    description: 'La page que vous recherchez n\'existe pas.',
                    locale: 'fr',
                    csrfToken: req.csrfToken ? req.csrfToken() : undefined
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    data: null,
                    error: 'Page non trouvée',
                    meta: {
                        viewPath,
                        timestamp: new Date().toISOString(),
                        mode: 'api'
                    }
                });
            }
        }
    };
};
/**
 * Helper pour créer des routes avec double réponse
 */
export const createDualRoute = (viewPath, pageData) => {
    return dualResponseMiddleware(viewPath, pageData);
};
//# sourceMappingURL=dualResponse.middleware.js.map