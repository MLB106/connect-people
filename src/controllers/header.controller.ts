// src/controllers/header.controller.ts
import { Request, Response } from 'express';
import { SearchCategory } from '../models/searchCategory.model.js';
import { ApiResponseUtil, asyncHandler } from '../utils/apiResponse.js';
import { Logger } from '../utils/logger.js';

export const getSearchCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await SearchCategory.find({ isActive: true })
    .select('code name')
    .sort({ order: 1 });
  
  Logger.info('Catégories de recherche récupérées avec succès', { count: categories.length });
  ApiResponseUtil.success(res, 200, categories);
});