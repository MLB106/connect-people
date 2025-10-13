import { Request, Response, NextFunction } from 'express';
/**
 * Middleware pour détecter si l'utilisateur veut voir la vue HTML ou l'API JSON
 *
 * Détection automatique basée sur :
 * 1. Header Accept: text/html vs application/json
 * 2. Paramètre ?view=true dans l'URL
 * 3. Header X-View-Mode: html
 * 4. Variable d'environnement FORCE_VIEW_MODE
 */
export declare const viewModeMiddleware: (req: Request, _res: Response, next: NextFunction) => void;
/**
 * Middleware pour forcer le mode vue HTML (utile pour les tests)
 */
export declare const forceViewMode: (req: Request, _res: Response, next: NextFunction) => void;
/**
 * Middleware pour forcer le mode API JSON
 */
export declare const forceApiMode: (req: Request, _res: Response, next: NextFunction) => void;
/**
 * Middleware pour ajouter des informations de debug en mode développement
 */
export declare const debugInfoMiddleware: (req: Request, res: Response, next: NextFunction) => void;
declare global {
    namespace Express {
        interface Request {
            viewMode?: 'html' | 'json';
        }
    }
}
