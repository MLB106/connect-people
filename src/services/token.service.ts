// src/services/token.service.ts
// A décommenter quand le module « token » sera branché
/*
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { JWT_CONFIG } from '../config/jwt.config';

type TokenType = 'adminAccess' | 'adminRefresh' | 'userAccess' | 'userRefresh';

export const generateAccessToken = (payload: object, type: TokenType) =>
  jwt.sign(payload, JWT_CONFIG.secrets[type], { expiresIn: JWT_CONFIG.expiry.ACCESS });

export const generateRefreshToken = (payload: object, type: TokenType) =>
  jwt.sign(payload, JWT_CONFIG.secrets[type], { expiresIn: JWT_CONFIG.expiry.REFRESH });

export const verifyToken = (token: string, type: TokenType) =>
  jwt.verify(token, JWT_CONFIG.secrets[type]) as jwt.JwtPayload;

export const generateCSRFToken = () => crypto.randomBytes(32).toString('hex');
export const verifyCSRFToken = (token: string, stored: string) =>
  crypto.timingSafeEqual(Buffer.from(token), Buffer.from(stored));
*/