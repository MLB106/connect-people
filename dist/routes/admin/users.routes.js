// src/routes/admin/users.routes.ts
import express from 'express';
import { validate } from '../../middlewares/validate';
import { userRegisterSchema } from '../../schemas/user.schema';
import { sensitiveAction } from '../../middlewares/admin/sensitiveAction.middleware';
import { createUserController } from '../../controllers/admin/user.controller';
const router = express.Router();
router.post('/', validate(userRegisterSchema), ...sensitiveAction('users', 4), createUserController);
export default router;
//# sourceMappingURL=users.routes.js.map