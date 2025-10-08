// src/services/adminToken.service.ts
// src/services/adminToken.service.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AdminRole } from '../config/adminRoles';

const ACCESS_SECRET  = process.env.JWT_ADMIN_ACCESS_SECRET  as string;
const REFRESH_SECRET = process.env.JWT_ADMIN_REFRESH_SECRET as string;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error('JWT_ADMIN_* secrets are not defined');
}

/* ---------- tokens ---------- */
export const generateAdminAccessToken = (id: string, role: AdminRole): string =>
  jwt.sign({ id, role, type: 'admin' }, ACCESS_SECRET, { expiresIn: '15m' });

export const generateAdminRefreshToken = (id: string, role: AdminRole): string =>
  jwt.sign({ id, role, type: 'admin' }, REFRESH_SECRET, {
    expiresIn: '7d',
    jwtid: crypto.randomUUID(),
  });

/* ---------- verify ---------- */
export const verifyAdminAccessToken = (token: string) => {
  try {
    return jwt.verify(token, ACCESS_SECRET) as jwt.JwtPayload & {
      id: string;
      role: AdminRole;
      type: 'admin';
    };
  } catch (err: any) {
    // harmonise le message pour le test
    const reason = err.message === 'jwt malformed' ? 'jwt malformed' : err.message;
    throw new Error(`Access token invalid: ${reason}`);
  }
};

export const verifyAdminRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, REFRESH_SECRET) as jwt.JwtPayload & {
      id: string;
      role: AdminRole;
      type: 'admin';
    };
  } catch (err: any) {
    throw new Error(`Refresh token invalid: ${err.message}`);
  }
};

/* ---------- CSRF ---------- */
export const generateAdminCSRFToken = (): string =>
  crypto.randomBytes(32).toString('hex');

export const verifyAdminCSRFToken = (token: string, stored: string): boolean => {
  try {
    return crypto.timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(stored, 'hex'));
  } catch {
    return false; // longueurs différentes ou token mal formé
  }
};