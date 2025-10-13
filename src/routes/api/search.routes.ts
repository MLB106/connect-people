// src/routes/api/search.routes.ts
import { Router } from 'express';
import { getSearchCategories } from '../../controllers/search.controller.js';

export const searchApiRouter = Router();
searchApiRouter.get('/categories', getSearchCategories);