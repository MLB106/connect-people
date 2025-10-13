// fichier: src/routes/admin/auth.routes.ts

import { Router } from 'express'; // majuscule
import { validate } from '../../middlewares/validate.js';
import { adminIPWhitelist } from '../../middlewares/admin/adminIP.middleware.js';
import { turnstileGuard } from '../../middlewares/turnstile.middleware.js'; 
import { adminLoginSchema } from '../../schemas/adminUser.schema.js';
import { adminLogin } from '../../controllers/admin/auth.controller.js';

const router = Router();  

router.post(
  '/login',
  adminIPWhitelist,          // 1. check IP
  validate(adminLoginSchema), // 2. validate body
  turnstileGuard,            // 3. Turnstile + Redis
  adminLogin                 // 4. contrôleur
);

export default router;

