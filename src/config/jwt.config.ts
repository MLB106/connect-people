// src/config/jwt.config.ts
// Configuration unifiée et *bullet-proof* pour JWT & CSRF
// -------------------------------------------------------
// Importe automatiquement .env et vérifie que toutes les
// variables sensibles sont présentes au démarrage.
//
// Utilisation :
// import { JWT_CONFIG } from '../config/jwt.config';
//
// const token = jwt.sign(
//   { id: 42, type: 'user' },
//   JWT_CONFIG.secrets.userAccess,
//   { expiresIn: JWT_CONFIG.expiry.ACCESS }
// );

import 'dotenv/config';
import { TOKEN_EXPIRY, COOKIE_OPTS } from './tokens';

/* ---------- Validation stricte de l’environnement ---------- */
const required = [
  'JWT_ADMIN_ACCESS_SECRET',
  'JWT_ADMIN_REFRESH_SECRET',
  'JWT_USER_ACCESS_SECRET',
  'JWT_USER_REFRESH_SECRET',
  'CSRF_SECRET',
] as const;

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`[jwt.config] Variable manquante : ${key}`);
  }
}

/* ---------- Configuration finale ---------- */
export const JWT_CONFIG = {
  secrets: {
    adminAccess:  process.env.JWT_ADMIN_ACCESS_SECRET!,
    adminRefresh: process.env.JWT_ADMIN_REFRESH_SECRET!,
    userAccess:   process.env.JWT_USER_ACCESS_SECRET!,
    userRefresh:  process.env.JWT_USER_REFRESH_SECRET!,
    csrf:         process.env.CSRF_SECRET!,
  },
  expiry: TOKEN_EXPIRY,
  cookie: COOKIE_OPTS,
  algorithm: 'HS256',
} as const;