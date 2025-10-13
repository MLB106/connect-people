// src/controllers/nav-immobilier.controller.ts
import { Request, Response } from 'express';
import { NavOption } from '../models/navOption.model.js';

export const getImmobilierOptions = async (_req: Request, res: Response) => {
  try {
    const options = await NavOption.find({ 
      menu: 'immobilier', 
      isActive: true 
    })
      .select('code name parentCode')
      .sort({ parentCode: 1, order: 1 });
    
    res.json(options);
  } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Erreur lors de la recuperation des options immobilier:', error instanceof Error ? error.message : 'Erreur inconnue');
          }
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};