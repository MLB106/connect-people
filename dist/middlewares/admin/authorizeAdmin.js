import { PERMISSION_MATRIX } from '../../config/adminRoles';
export const authorizeAdmin = (resource, level = 1) => (req, res, next) => {
    const role = req.admin?.role;
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
//# sourceMappingURL=authorizeAdmin.js.map