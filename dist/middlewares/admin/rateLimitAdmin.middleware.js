// src/middlewares/admin/rateLimitAdmin.middleware.ts
import { hit } from '../../services/rateLimitService';
export const rateLimitAdmin = (windowSeconds = 900, maxHits = 100) => {
    return async (req, res, next) => {
        const id = `admin:${req.ip}`; // clé séparée des users
        const status = await hit(id, windowSeconds, maxHits);
        if (status === 'BLOCKED') {
            return res.status(429).json({ message: 'Trop de requêtes, ré-essayez plus tard' });
        }
        next();
        return;
    };
};
// MONTER CE MIDDLEWARE DANS TOUTES LES ROUTES ADMIN 
// import { rateLimitAdmin } from './middlewares/admin/rateLimitAdmin.middleware';
// app.use('/admin', rateLimitAdmin());  // 100 req / 15 min par IP
//# sourceMappingURL=rateLimitAdmin.middleware.js.map