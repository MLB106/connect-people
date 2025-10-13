// src/services/token.service.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { JWT_CONFIG } from '../config/jwt.config';
export const generateAccessToken = (payload, type) => {
    const secret = JWT_CONFIG.secrets[type];
    return jwt.sign(payload, secret, { expiresIn: '15m' });
};
export const generateRefreshToken = (payload, type) => {
    const secret = JWT_CONFIG.secrets[type];
    return jwt.sign(payload, secret, { expiresIn: '7d' });
};
export const verifyToken = (token, type) => jwt.verify(token, JWT_CONFIG.secrets[type]);
export const generateCSRFToken = () => crypto.randomBytes(32).toString('hex');
export const verifyCSRFToken = (token, stored) => crypto.timingSafeEqual(Buffer.from(token), Buffer.from(stored));
//# sourceMappingURL=token.service.js.map