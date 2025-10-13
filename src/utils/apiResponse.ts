// src/utils/apiResponse.ts
import { Response } from 'express';

// Interface pour les réponses API uniformes
export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  error: string | null;
  timestamp: string;
}

// Classe utilitaire pour les réponses API standardisées
export class ApiResponseUtil {
  /**
   * Envoie une réponse de succès
   */
  static success<T>(res: Response, statusCode: number = 200, data: T | null = null): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      error: null,
      timestamp: new Date().toISOString()
    };
    res.status(statusCode).json(response);
  }

  /**
   * Envoie une réponse d'erreur
   */
  static error(res: Response, statusCode: number = 500, error: string = 'Erreur interne du serveur'): void {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error,
      timestamp: new Date().toISOString()
    };
    res.status(statusCode).json(response);
  }

  /**
   * Envoie une réponse de validation d'erreur
   */
  static validationError(res: Response, errors: string[]): void {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: `Erreur de validation: ${errors.join(', ')}`,
      timestamp: new Date().toISOString()
    };
    res.status(400).json(response);
  }

  /**
   * Envoie une réponse de ressource non trouvée
   */
  static notFound(res: Response, message: string = 'Ressource non trouvée'): void {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: message,
      timestamp: new Date().toISOString()
    };
    res.status(404).json(response);
  }

  /**
   * Envoie une réponse de conflit
   */
  static conflict(res: Response, message: string = 'Conflit de ressource'): void {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: message,
      timestamp: new Date().toISOString()
    };
    res.status(409).json(response);
  }

  /**
   * Envoie une réponse d'accès non autorisé
   */
  static unauthorized(res: Response, message: string = 'Accès non autorisé'): void {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: message,
      timestamp: new Date().toISOString()
    };
    res.status(401).json(response);
  }

  /**
   * Envoie une réponse d'accès interdit
   */
  static forbidden(res: Response, message: string = 'Accès interdit'): void {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: message,
      timestamp: new Date().toISOString()
    };
    res.status(403).json(response);
  }
}

// Fonction utilitaire pour wrapper les contrôleurs avec gestion d'erreur automatique
export const asyncHandler = (fn: Function) => {
  return (req: any, res: Response, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Erreur dans le controleur:', error instanceof Error ? error.message : 'Erreur inconnue');
        }
      ApiResponseUtil.error(res, 500, 'Erreur interne du serveur');
    });
  };
};

