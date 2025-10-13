// src/middlewares/apiLogger.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils/logger.js';

export const apiLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // Override de la méthode end pour capturer le temps de réponse
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any, cb?: any) {
    const responseTime = Date.now() - startTime;
    Logger.apiRequest(req, res, responseTime);
    return originalEnd.call(this, chunk, encoding, cb);
  };
  
  next();
};
