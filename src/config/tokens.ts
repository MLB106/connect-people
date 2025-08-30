// src/config/tokens.ts
// Durées de vie et options communes aux tokens (JWT, CSRF, reset, etc.)

export const TOKEN_EXPIRY = {
  ACCESS:  process.env.JWT_ACCESS_EXPIRY  || '15m',
  REFRESH: process.env.JWT_REFRESH_EXPIRY || '7d',
  RESET:   process.env.JWT_RESET_EXPIRY   || '1h',
  CSRF:    process.env.JWT_CSRF_EXPIRY    || '1h',
} as const;

export const COOKIE_OPTS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

// UTILISATION COTE SERVER 

// import { TOKEN_EXPIRY } from '../config/tokens';
// jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRY.ACCESS });

// UTILISATION COTE SQL 

// -- exemple PostgreSQL
// INSERT INTO token_blacklist(token, expires_at)
// VALUES ($1, NOW() + INTERVAL '${TOKEN_EXPIRY.ACCESS}');