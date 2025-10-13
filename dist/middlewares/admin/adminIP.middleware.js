import { isIPAllowed } from '../../services/security.service.js';
export const adminIPWhitelist = (req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] ||
        req.socket.remoteAddress ||
        req.ip;
    if (!isIPAllowed(ip)) {
        res.status(403).json({ error: 'IP non autorisée' });
        return;
    }
    next();
};
//# sourceMappingURL=adminIP.middleware.js.map