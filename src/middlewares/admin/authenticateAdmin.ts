// src/middlewares/admin/authenticateAdmin.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { log } from '../../services/logger.service';

declare global {
  namespace Express {
    interface Request {
      admin?: { id: string; email: string; role: string };
    }
  }
}

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token missing' });
    return;
  }
  try {
  const token = auth.slice(7);
  const payload = jwt.verify(token, process.env.JWT_ADMIN_ACCESS_SECRET!) as { id: string; email: string; role: string };
  req.admin = payload;
  log.admin('login', payload.email, { ip: req.ip });
  next();
} catch {
  res.status(401).json({ error: 'Invalid token' });
}
};