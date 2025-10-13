// src/utils/validation.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { ApiResponseUtil } from './apiResponse.js';

/**
 * Middleware de validation des données d'entrée avec Zod
 */
export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = schema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errors = validationResult.error.issues.map((err: any) => 
          `${err.path.join('.')}: ${err.message}`
        );
        return ApiResponseUtil.validationError(res, errors);
      }
      
      // Remplacer req.body par les données validées
      req.body = validationResult.data;
      next();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erreur de validation:', error instanceof Error ? error.message : 'Erreur inconnue');
      }
      ApiResponseUtil.error(res, 500, 'Erreur de validation');
    }
  };
};

/**
 * Middleware de validation des paramètres d'URL
 */
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = schema.safeParse(req.params);
      
      if (!validationResult.success) {
        const errors = validationResult.error.issues.map((err: any) => 
          `${err.path.join('.')}: ${err.message}`
        );
        return ApiResponseUtil.validationError(res, errors);
      }
      
      // Remplacer req.params par les paramètres validés
      req.params = validationResult.data as any;
      next();
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Erreur de validation des parametres:', error instanceof Error ? error.message : 'Erreur inconnue');
        }
      ApiResponseUtil.error(res, 500, 'Erreur de validation des paramètres');
    }
  };
};

/**
 * Middleware de validation des query parameters
 */
export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationResult = schema.safeParse(req.query);
      
      if (!validationResult.success) {
        const errors = validationResult.error.issues.map((err: any) => 
          `${err.path.join('.')}: ${err.message}`
        );
        return ApiResponseUtil.validationError(res, errors);
      }
      
      // Remplacer req.query par les query parameters validés
      req.query = validationResult.data as any;
      next();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erreur de validation des query parameters:', error instanceof Error ? error.message : 'Erreur inconnue');
      }
      ApiResponseUtil.error(res, 500, 'Erreur de validation des query parameters');
    }
  };
};

/**
 * Schémas de validation communs
 */
export const commonSchemas = {
  // Validation d'ID MongoDB
  mongoId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID MongoDB invalide'),
  
  // Validation de pagination
  pagination: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).default(1),
    limit: z.string().regex(/^\d+$/).transform(Number).default(10),
    sort: z.string().optional(),
    order: z.enum(['asc', 'desc']).default('desc')
  }),
  
  // Validation de recherche
  search: z.object({
    q: z.string().min(1).max(100),
    category: z.string().optional(),
    filters: z.record(z.string(), z.any()).optional()
  })
};
