// Configuration et gestionnaire CSRF pour Express
import csrf from 'csurf';
export const configureCsrf = () => csrf({
    cookie: true,
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    value: (req) => req.body._csrf || req.query._csrf || req.headers['x-csrf-token'],
});
export const addCsrfToken = (_req, res, next) => {
    res.locals.csrfToken = res.req._csrf;
    next();
};
export const handleCsrfError = (err, _req, res, _next) => {
    if (err.code !== 'EBADCSRFTOKEN')
        return _next(err);
    res.status(403).json({
        error: 'Session expirée ou token CSRF invalide. Veuillez rafraîchir la page et réessayer.',
    });
};
//# sourceMappingURL=csrfConfig.js.map