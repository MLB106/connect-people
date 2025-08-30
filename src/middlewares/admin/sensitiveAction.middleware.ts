// src/middlewares/admin/sensitiveAction.middleware.ts
import { Response, NextFunction } from 'express';
import type { AppRequest } from '../../types/request';

import {
  PERMISSION_MATRIX,
  type AdminRole,
} from '../../config/adminRoles';

import { isStaticIPAllowed, isBusinessHours } from '../../services/security.service';
import { authorizeAdmin } from './authorizeAdmin';
import { logger } from '../../services/logger.service';

/**
 * Middleware composite pour les actions sensibles.
 * Vérifie :
 * 1. Authentification admin (JWT + rôle suffisant)
 * 2. MFA
 * 3. Code de confirmation à usage unique
 * 4. IP whitelist
 * 5. Heures ouvrables
 * 6. Niveau de permission requis dans la matrice
 *
 * @param resource  Nom du domaine concerné (ex: 'users', 'finance', 'security'…)
 * @param level     Niveau minimum requis dans la matrice
 */
export const sensitiveAction =
  (resource: keyof typeof PERMISSION_MATRIX[AdminRole], level = 1) =>
  [
    // 1. Vérification du rôle et du niveau via la matrice
    authorizeAdmin(resource, level),

    // 2. Vérifications métier
    (req: AppRequest, res: Response, next: NextFunction) => {
      // 2.1 Rôle présent
      const userRole = req.user?.role as AdminRole;
      if (!userRole) {
        return res.status(403).json({ message: 'Rôle non défini', error: 'ROLE_MISSING' });
      }

      // 2.2 MFA obligatoire
      if (!req.user?.authentificationMultiFacteurs) {
        return res.status(403).json({ message: 'MFA requis', error: 'MFA_REQUIRED' });
      }

      // 2.3 Code de confirmation (stocké en session)
      const expectedCode = (req.session as any)?.confirmationCode;
      if (req.body.confirmationCode !== expectedCode) {
        return res.status(403).json({ message: 'Code de confirmation invalide', error: 'INVALID_CODE' });
      }

      // 2.4 IP whitelist
      if (!isStaticIPAllowed(req.ip ?? '')) {
        logger.warn(`IP non autorisée : ${req.ip}`, { userId: req.user.id });
        return res.status(403).json({ message: 'IP non autorisée', error: 'IP_NOT_ALLOWED' });
      }

      // 2.5 Heures ouvrables
      if (!isBusinessHours()) {
        return res.status(403).json({ message: 'Hors heures ouvrables', error: 'OUTSIDE_BUSINESS_HOURS' });
      }

      // 2.6 Niveau de permission (second check après la matrice)
      const userLevel = PERMISSION_MATRIX[userRole]?.[resource] ?? 0;
      if (userLevel < level) {
        logger.warn('Permission insuffisante', {
          userId: req.user.id,
          role: userRole,
          resource,
          requiredLevel: level,
          userLevel,
        });
        return res.status(403).json({ message: 'Permission insuffisante', error: 'INSUFFICIENT_PERMISSION' });
      }

      // Tout est ok : laisser passer
      logger.info('Sensitive action autorisée', {
        userId: req.user.id,
        role: userRole,
        resource,
        level,
        url: req.originalUrl,
      });
      next();
      return; // ← pour satisfaire TS strict
    },
  ];