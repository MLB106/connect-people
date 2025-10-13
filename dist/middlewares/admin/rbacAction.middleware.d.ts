import { Response, NextFunction } from 'express';
import type { AppRequest } from '../../types/request';
import { PERMISSION_MATRIX, type AdminRole } from '../../config/adminRoles';
/**
 * Vérifie que l’admin connecté possède le niveau requis
 * pour une action précise (basé sur la matrice).
 *
 * @param resource  Nom du domaine (ex: 'users', 'finance', 'security'…)
 * @param level     Niveau minimum requis
 */
export declare const rbacAction: (resource: keyof (typeof PERMISSION_MATRIX)[AdminRole], level?: number) => (req: AppRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
