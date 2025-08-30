// src/routes/user/auth.routes.ts
import { Router } from 'express';
import { validate } from '../../middlewares/validate';
import { turnstileGuard } from '../../middlewares/turnstile.middleware';
import { userLoginSchema, userRegisterSchema } from '../../schemas/user.schema';
import { userLogin, userRegister } from '../../controllers/users/auth.controller'; 

const router = Router();

router.post('/login', validate(userLoginSchema), turnstileGuard, userLogin);
router.post('/register', validate(userRegisterSchema), turnstileGuard, userRegister);
export default router;