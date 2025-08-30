// src/services/security.service.ts
import { redis } from './redis.service';
import IPCIDR from 'ip-cidr';
import type { AppRequest } from '../types/request';

/* ------------------------------------------------------------------ */
/* 1. Types étendus                                                    */
/* ------------------------------------------------------------------ */
// export interface User {
//   id: string;
//   email: string;
//   role: string;
//   authentificationMultiFacteurs?: boolean;
// }

// declare module 'express-session' {
//   interface SessionData {
//     confirmationCode?: string;
//   }
// }

/* ------------------------------------------------------------------ */
/* 2. Configuration IP                                                */
/* ------------------------------------------------------------------ */
const whitelist = (process.env.IP_WHITELIST ?? '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

export const isIPAllowed = (ip: string): boolean =>
  !whitelist.length || whitelist.some(cidr => new IPCIDR(cidr).contains(ip));

export const isStaticIPAllowed = (ip: string): boolean =>
  ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(ip);

/* ------------------------------------------------------------------ */
/* 3. Tentatives de connexion (admin | user)                          */
/* ------------------------------------------------------------------ */
const attemptKey = (type: 'admin' | 'user', email: string) =>
  `${type}:attempts:${email}`;

export const isLocked = async (
  type: 'admin' | 'user',
  email: string,
  max = 5,
//   ttl = 15 * 60
): Promise<boolean> => {
  const count = await redis.get(attemptKey(type, email));
  return Number(count) >= max;
};

export const recordAttempt = async (
  type: 'admin' | 'user',
  email: string,
  ttl = 15 * 60
): Promise<void> => {
  const k = attemptKey(type, email);
  await redis.multi().incr(k).expire(k, ttl).exec();
};

export const resetAttempts = async (type: 'admin' | 'user', email: string): Promise<void> => {
  await redis.del(attemptKey(type, email));
};

/* ------------------------------------------------------------------ */
/* 4. Vérifications métier                                            */
/* ------------------------------------------------------------------ */
export const isMfaVerified = (req: AppRequest): boolean =>
  Boolean(req.user?.authentificationMultiFacteurs);

export const isValidConfirmationCode = (req: AppRequest): boolean =>
  req.body.confirmationCode === (req.session as any)?.confirmationCode;

export const isBusinessHours = (): boolean => {
  const h = new Date().getHours();
  return h >= 9 && h < 18;
};