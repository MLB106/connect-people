// src/middlewares/user/authorizeUser.ts
import { Request, Response, NextFunction } from 'express';
import { USER_PERMISSIONS, UserRole } from '../../config/userRoles';

export const authorizeUser =
  (resource: string, level = 1) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const role = (req as any).user?.role as UserRole;
    if (!role) {
      res.status(401).json({ error: 'Role missing' });
      return;
    }
    const granted = USER_PERMISSIONS[role]?.[resource] ?? 0;
    if (granted < level) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
  };