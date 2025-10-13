// src/middlewares/turnstile.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyTurnstile } from '../services/turnstile.service.js';
import { hit }             from '../services/rateLimitService.js'; // ← CHANGÉ
import { logger }          from '../services/logger.service.js';

interface TurnstileReq extends Request {
  body: { turnstileToken?: string };
}

export async function turnstileGuard(
  req: TurnstileReq,
  res: Response,
  next: NextFunction
): Promise<void> {          // ← type explicite
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  // 1. Rate-limit
  const status = await hit(ip, 900, 10);
  if (status === 'BLOCKED') {
    logger.warn('Rate-limit exceeded', { ip });
    res.status(429).json({ message: 'Too many attempts' });
    return;                 // ← on sort
  }

  // 2. Turnstile
  const token = req.body.turnstileToken;
  if (!token || !(await verifyTurnstile(token, ip))) {
    res.status(400).json({ message: 'Invalid or missing token' });
    return;                 // ← on sort
  }

  // 3. OK
  return next();            // ← explicitement retourner void
}
