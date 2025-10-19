// src/routes/api/footer.routes.ts
import { Router } from 'express';
import { getFooterLinks } from '../../controllers/footer.controller.js';

export const footerApiRouter: Router = Router();
footerApiRouter.get('/footer/links', getFooterLinks);