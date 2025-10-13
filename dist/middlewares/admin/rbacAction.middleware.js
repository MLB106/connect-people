import { PERMISSION_MATRIX } from '../../config/adminRoles';
import { logger } from '../../services/logger.service';
/**
 * Vérifie que l’admin connecté possède le niveau requis
 * pour une action précise (basé sur la matrice).
 *
 * @param resource  Nom du domaine (ex: 'users', 'finance', 'security'…)
 * @param level     Niveau minimum requis
 */
export const rbacAction = (resource, level = 1) => (req, res, next) => {
    const role = req.user?.role;
    if (!role) {
        return res.status(403).json({ message: 'Rôle inconnu', error: 'ROLE_UNKNOWN' });
    }
    const userLevel = PERMISSION_MATRIX[role]?.[resource] ?? 0;
    if (userLevel < level) {
        logger.warn('RBAC refusé', {
            userId: req.user?.id,
            role,
            resource,
            requiredLevel: level,
            userLevel,
        });
        return res.status(403).json({ message: 'Action non autorisée', error: 'RBAC_DENIED' });
    }
    logger.debug('RBAC accordé', {
        userId: req.user?.id,
        role,
        resource,
        level,
    });
    next();
    return;
};
//# sourceMappingURL=rbacAction.middleware.js.map