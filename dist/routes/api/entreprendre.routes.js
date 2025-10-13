// src/routes/api/entreprendre.routes.ts
import { Router } from 'express';
import { getEntreprendreOptions } from '../../controllers/nav-entreprendre.controller.js';
export const entreprendreApiRouter = Router();
entreprendreApiRouter.get('/nav/entreprendre', getEntreprendreOptions);
//# sourceMappingURL=entreprendre.routes.js.map