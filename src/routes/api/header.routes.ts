// src/routes/api/header.routes.ts
import { Router } from 'express';
import { getSearchCategories } from '../../controllers/header.controller.js';

export const headerApiRouter: Router = Router();
headerApiRouter.get('/search/categories', getSearchCategories);