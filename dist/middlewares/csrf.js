// Middleware CSRF complet (protection + injection token + gestion d’erreur)
import csrf from 'csurf';
export const csrfProtection = csrf({
    cookie: true,
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
});
export const addCsrfToken = (_req, res, next) => {
    res.locals.csrfToken = res.req.csrfToken();
    next();
};
export const handleCsrfError = (err, _req, res, _next) => {
    if (err.code !== 'EBADCSRFTOKEN')
        return _next(err);
    res.status(403).json({ error: 'Token CSRF invalide ou session expirée.' });
};
//# sourceMappingURL=csrf.js.map