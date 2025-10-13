import { Response } from 'express';
export interface ApiResponse<T = any> {
    success: boolean;
    data: T | null;
    error: string | null;
    timestamp: string;
}
export declare class ApiResponseUtil {
    /**
     * Envoie une réponse de succès
     */
    static success<T>(res: Response, statusCode?: number, data?: T | null): void;
    /**
     * Envoie une réponse d'erreur
     */
    static error(res: Response, statusCode?: number, error?: string): void;
    /**
     * Envoie une réponse de validation d'erreur
     */
    static validationError(res: Response, errors: string[]): void;
    /**
     * Envoie une réponse de ressource non trouvée
     */
    static notFound(res: Response, message?: string): void;
    /**
     * Envoie une réponse de conflit
     */
    static conflict(res: Response, message?: string): void;
    /**
     * Envoie une réponse d'accès non autorisé
     */
    static unauthorized(res: Response, message?: string): void;
    /**
     * Envoie une réponse d'accès interdit
     */
    static forbidden(res: Response, message?: string): void;
}
export declare const asyncHandler: (fn: Function) => (req: any, res: Response, next: any) => void;
