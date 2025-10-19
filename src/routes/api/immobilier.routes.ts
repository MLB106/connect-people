// src/routes/api/immobilier.routes.ts
import { Router } from 'express';
import { getImmobilierOptions } from '../../controllers/nav-immobilier.controller.js';

export const immobilierApiRouter: Router = Router();
immobilierApiRouter.get('/api/nav/immobilier', getImmobilierOptions);