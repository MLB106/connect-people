// src/routes/api/header.routes.ts
import { Router } from 'express';
import { getSearchCategories } from '../../controllers/header.controller.js';
export const headerApiRouter = Router();
headerApiRouter.get('/search/categories', getSearchCategories);
//# sourceMappingURL=header.routes.js.map