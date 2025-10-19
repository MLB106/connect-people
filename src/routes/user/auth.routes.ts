// src/routes/user/auth.routes.ts
import { Router } from 'express';
import { validateRequest } from '../../utils/validation.js';
import { turnstileGuard } from '../../middlewares/turnstile.middleware.js';
import { userLoginSchema, userRegisterSchema } from '../../schemas/user.schema.js';
import { userLogin, userRegister } from '../../controllers/users/auth.controller.js'; 

const router: Router = Router();

router.post('/login', validateRequest(userLoginSchema), turnstileGuard, userLogin);
router.post('/register', validateRequest(userRegisterSchema), turnstileGuard, userRegister);
export default router;