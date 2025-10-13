// src/controllers/footer.controller.ts
import { Request, Response } from 'express';
import { SocialLink } from '../models/socialLink.model.js';
import { AppStoreLink } from '../models/appStoreLink.model.js';
import { ApiResponseUtil, asyncHandler } from '../utils/apiResponse.js';
import { Logger } from '../utils/logger.js';

export const getFooterLinks = asyncHandler(async (_req: Request, res: Response) => {
  const socials = await SocialLink.find({ isActive: true })
    .select('platform url icon')
    .sort({ order: 1 });
  
  const stores = await AppStoreLink.find({ isActive: true })
    .select('store url')
    .sort({ order: 1 });
  
  const data = { socials, stores };
  
  Logger.info('Liens du footer récupérés avec succès', { 
    socialsCount: socials.length, 
    storesCount: stores.length 
  });
  
  ApiResponseUtil.success(res, 200, data);
});