// src/controllers/nav-entreprendre.controller.ts
import { Request, Response } from 'express';
import { NavOption } from '../models/navOption.model.js';
import { ApiResponseUtil, asyncHandler } from '../utils/apiResponse.js';
import { Logger } from '../utils/logger.js';

export const getEntreprendreOptions = asyncHandler(async (_req: Request, res: Response) => {
  const options = await NavOption.find({ 
    menu: 'entreprendre', 
    isActive: true 
  })
    .select('code name parentCode')
    .sort({ parentCode: 1, order: 1 });
  
  Logger.info('Options entreprendre récupérées avec succès', { count: options.length });
  ApiResponseUtil.success(res, 200, options);
});