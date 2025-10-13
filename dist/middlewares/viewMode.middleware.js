/**
 * Middleware pour détecter si l'utilisateur veut voir la vue HTML ou l'API JSON
 *
 * Détection automatique basée sur :
 * 1. Header Accept: text/html vs application/json
 * 2. Paramètre ?view=true dans l'URL
 * 3. Header X-View-Mode: html
 * 4. Variable d'environnement FORCE_VIEW_MODE
 */
export const viewModeMiddleware = (req, _res, next) => {
    // Le système dual fonctionne maintenant en développement ET en production
    // 1. Vérifier le paramètre ?view=true dans l'URL
    if (req.query.view === 'true') {
        req.viewMode = 'html';
        return next();
    }
    // 1.5. Vérifier le paramètre ?json=true dans l'URL (pour forcer le mode JSON)
    if (req.query.json === 'true') {
        req.viewMode = 'json';
        return next();
    }
    // 2. Vérifier le header X-View-Mode
    if (req.headers['x-view-mode'] === 'html') {
        req.viewMode = 'html';
        return next();
    }
    // 3. Vérifier le header Accept
    const acceptHeader = req.headers.accept || '';
    if (acceptHeader.includes('application/json') || acceptHeader.includes('*/*')) {
        req.viewMode = 'json';
        return next();
    }
    if (acceptHeader.includes('text/html')) {
        req.viewMode = 'html';
        return next();
    }
    // 4. Vérifier la variable d'environnement FORCE_VIEW_MODE
    if (process.env.FORCE_VIEW_MODE === 'html') {
        req.viewMode = 'html';
        return next();
    }
    // 5. Par défaut, mode API JSON
    req.viewMode = 'json';
    next();
};
/**
 * Middleware pour forcer le mode vue HTML (utile pour les tests)
 */
export const forceViewMode = (req, _res, next) => {
    req.viewMode = 'html';
    next();
};
/**
 * Middleware pour forcer le mode API JSON
 */
export const forceApiMode = (req, _res, next) => {
    req.viewMode = 'json';
    next();
};
/**
 * Middleware pour ajouter des informations de debug en mode développement
 */
export const debugInfoMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        // Ajouter des informations de debug dans les headers
        res.set('X-View-Mode', req.viewMode || 'json');
        res.set('X-Debug-Info', JSON.stringify({
            url: req.originalUrl,
            method: req.method,
            viewMode: req.viewMode,
            acceptHeader: req.headers.accept,
            query: req.query,
            timestamp: new Date().toISOString()
        }));
        // Log dans la console pour debug
        if (process.env.NODE_ENV === 'development') {
            console.log(`Debug ViewMode: ${req.method} ${req.originalUrl} -> Mode: ${req.viewMode}`);
        }
    }
    next();
};
//# sourceMappingURL=viewMode.middleware.js.map