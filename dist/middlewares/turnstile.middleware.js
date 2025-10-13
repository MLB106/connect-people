import { verifyTurnstile } from '../services/turnstile.service.js';
import { hit } from '../services/rateLimitService.js'; // ← CHANGÉ
import { logger } from '../services/logger.service.js';
export async function turnstileGuard(req, res, next) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    // 1. Rate-limit
    const status = await hit(ip, 900, 10);
    if (status === 'BLOCKED') {
        logger.warn('Rate-limit exceeded', { ip });
        res.status(429).json({ message: 'Too many attempts' });
        return; // ← on sort
    }
    // 2. Turnstile
    const token = req.body.turnstileToken;
    if (!token || !(await verifyTurnstile(token, ip))) {
        res.status(400).json({ message: 'Invalid or missing token' });
        return; // ← on sort
    }
    // 3. OK
    return next(); // ← explicitement retourner void
}
//# sourceMappingURL=turnstile.middleware.js.map