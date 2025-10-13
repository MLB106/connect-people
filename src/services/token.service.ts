// src/services/token.service.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { JWT_CONFIG } from '../config/jwt.config';

type TokenType = 'adminAccess' | 'adminRefresh' | 'userAccess' | 'userRefresh';

export const generateAccessToken = (payload: object, type: TokenType): string => {
  const secret = JWT_CONFIG.secrets[type];
  return jwt.sign(payload, secret, { expiresIn: '15m' });
};

export const generateRefreshToken = (payload: object, type: TokenType): string => {
  const secret = JWT_CONFIG.secrets[type];
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const verifyToken = (token: string, type: TokenType) =>
  jwt.verify(token, JWT_CONFIG.secrets[type]) as jwt.JwtPayload;

export const generateCSRFToken = () => crypto.randomBytes(32).toString('hex');
export const verifyCSRFToken = (token: string, stored: string) =>
  crypto.timingSafeEqual(Buffer.from(token), Buffer.from(stored));