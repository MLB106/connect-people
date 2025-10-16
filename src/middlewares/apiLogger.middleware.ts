/**
 * @file src/middlewares/apiLogger.middleware.ts
 * @description API request logging middleware with performance tracking
 * @version 1.0.0
 * @author MLB <connect_project_dz@yahoo.com>
 */

import { type Request, type Response, type NextFunction } from 'express';
import { Logger } from '../utils/logger.js';

/**
 * API request logging middleware
 * @description Logs API requests with response time and status information
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {void}
 */
export const apiLoggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  
  // Override the end method to capture response time
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any, cb?: any): Response {
    const responseTime = Date.now() - startTime;
    Logger.apiRequest(req, res, responseTime);
    return originalEnd.call(this, chunk, encoding, cb);
  };
  
  next();
};
