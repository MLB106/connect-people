import { Response, NextFunction } from 'express';
import type { AppRequest } from '../../types/request';
import { PERMISSION_MATRIX, type AdminRole } from '../../config/adminRoles';
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
export declare const sensitiveAction: (resource: keyof (typeof PERMISSION_MATRIX)[AdminRole], level?: number) => (((req: import("express").Request, res: Response, next: NextFunction) => void) | ((req: AppRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined))[];
