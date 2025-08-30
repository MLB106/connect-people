// src/middlewares/admin/adminIP.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { isIPAllowed } from '../../services/security.service';

export const adminIPWhitelist = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0] ||
    req.socket.remoteAddress ||
    req.ip;
  if (!isIPAllowed(ip!)) {
    res.status(403).json({ error: 'IP non autorisée' });
    return;
  }
  next();
};