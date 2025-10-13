import { USER_PERMISSIONS } from '../../config/userRoles';
export const authorizeUser = (resource, level = 1) => (req, res, next) => {
    const role = req.user?.role;
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
//# sourceMappingURL=authorizeUser.js.map