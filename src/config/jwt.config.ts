// src/config/jwt.config.ts
import { TOKEN_CONSTANTS, COOKIE_OPTIONS } from './adminRoles';

export const JWT_CONFIG = {
  secrets: {
    adminAccess:  process.env.JWT_ADMIN_ACCESS_SECRET!,
    adminRefresh: process.env.JWT_ADMIN_REFRESH_SECRET!,
    userAccess:   process.env.JWT_USER_ACCESS_SECRET!,
    userRefresh:  process.env.JWT_USER_REFRESH_SECRET!,
  },
  expiry: TOKEN_CONSTANTS,            // déjà importé
  cookie: COOKIE_OPTIONS,             // déjà importé
  algorithm: 'HS256' as const,
} as const;