// src/middlewares/admin/authorizeAdmin.ts
import { Request, Response, NextFunction } from 'express';
import { PERMISSION_MATRIX, AdminRole } from '../../config/adminRoles';

export const authorizeAdmin =
  (resource: string, level = 1) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const role = (req as any).admin?.role as AdminRole;
    if (!role) {
      res.status(401).json({ error: 'Role missing' });
      return;
    }
    const granted = PERMISSION_MATRIX[role]?.[resource] ?? 0;
    if (granted < level) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
  };