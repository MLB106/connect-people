// src/routes/api/search.routes.ts
import { Router } from 'express';
import { getSearchCategories } from '../../controllers/search.controller.js';

export const searchApiRouter = Router();
searchApiRouter.get('/api/search/categories', getSearchCategories);