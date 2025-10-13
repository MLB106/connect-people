// src/routes/admin/sensitive.routes.ts
import express from 'express';
import { sensitiveAction } from '../../middlewares/admin/sensitiveAction.middleware';
import { turnstileGuard } from '../../middlewares/turnstile.middleware';
const router = express.Router();
router.post('/suppression-utilisateur', ...sensitiveAction('users', 4), // ← resource + level
turnstileGuard, (_req, res) => {
    res.json({ ok: true });
});
export default router;
//# sourceMappingURL=sensitive.routes.js.map