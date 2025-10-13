// src/middlewares/user/authenticateUser.ts
import jwt from 'jsonwebtoken';
import { log } from '../../services/logger.service';
export const authenticateUser = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Token missing' });
        return;
    }
    try {
        const token = auth.slice(7);
        const payload = jwt.verify(token, process.env.JWT_USER_ACCESS_SECRET);
        req.user = payload;
        log.user('login', payload.email, { ip: req.ip });
        next();
    }
    catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};
//# sourceMappingURL=authenticateUser.js.map