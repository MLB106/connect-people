// src/routes/api/traduction.routes.ts
import { Router } from 'express';
import { getTraductionOptions } from '../../controllers/nav-traduction.controller.js';

export const traductionApiRouter: Router = Router();
traductionApiRouter.get('/api/nav/traduction', getTraductionOptions);