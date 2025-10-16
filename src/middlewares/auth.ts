/**
 * @file src/middlewares/auth.ts
 * @description Authentication middleware with strict ES2023 syntax
 * @version 1.0.0
 * @author MLB <connect_project_dz@yahoo.com>
 */

import { type Request, type Response, type NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Extended Request interface with user data
 */
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Authentication middleware
 * @description Validates JWT tokens and attaches user data to request
 * @param {AuthenticatedRequest} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>}
 */
export const authenticate = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ 
        success: false,
        error: 'Token manquant ou invalide',
        data: null
      });
      return;
    }

    const token = authHeader.slice(7);
    
    if (!token) {
      res.status(401).json({ 
        success: false,
        error: 'Token manquant',
        data: null
      });
      return;
    }

    const decoded = jwt.verify(token, env.jwt.secret) as JwtPayload;
    
    if (!decoded.id || !decoded.email || !decoded.role) {
      res.status(401).json({ 
        success: false,
        error: 'Token invalide - données manquantes',
        data: null
      });
      return;
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ 
      success: false,
      error: 'Token expiré ou corrompu',
      data: null
    });
  }
};

/**
 * Optional authentication middleware
 * @description Validates JWT tokens if present, but doesn't require them
 * @param {AuthenticatedRequest} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 * @returns {Promise<void>}
 */
export const optionalAuthenticate = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.slice(7);
    
    if (!token) {
      next();
      return;
    }

    const decoded = jwt.verify(token, env.jwt.secret) as JwtPayload;
    
    if (decoded.id && decoded.email && decoded.role) {
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      };
    }

    next();
  } catch (error) {
    console.error('Optional authentication error:', error);
    next();
  }
};