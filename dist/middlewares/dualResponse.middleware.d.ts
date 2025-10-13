import { Request, Response, NextFunction } from 'express';
/**
 * Middleware pour gérer la double réponse (JSON API + HTML View)
 * Utilise le viewMode détecté pour choisir le type de réponse
 */
export declare const dualResponseMiddleware: (viewPath: string, pageData: any) => (req: Request, res: Response, _next: NextFunction) => Promise<void>;
/**
 * Helper pour créer des routes avec double réponse
 */
export declare const createDualRoute: (viewPath: string, pageData: any) => (req: Request, res: Response, _next: NextFunction) => Promise<void>;
