// src/middlewares/admin/rateLimitAdmin.middleware.ts
import { hit } from '../../services/rateLimitService';
import type { Request, Response, NextFunction } from 'express';

export const rateLimitAdmin = (windowSeconds = 900, maxHits = 100) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = `admin:${req.ip}`;           // clé séparée des users
    const status = await hit(id, windowSeconds, maxHits);
    if (status === 'BLOCKED') {
      return res.status(429).json({ message: 'Trop de requêtes, ré-essayez plus tard' });
    }
    next();
    return;         
  };

};

// MONTER CE MIDDLEWARE DANS TOUTES LES ROUTES ADMIN 

// import { rateLimitAdmin } from './middlewares/admin/rateLimitAdmin.middleware';

// app.use('/admin', rateLimitAdmin());  // 100 req / 15 min par IP