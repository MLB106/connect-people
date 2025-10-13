// src/services/security.service.ts
import { redis } from './redis.service';
import IPCIDR from 'ip-cidr';
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
export const isIPAllowed = (ip) => !whitelist.length || whitelist.some(cidr => new IPCIDR(cidr).contains(ip));
export const isStaticIPAllowed = (ip) => ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(ip);
/* ------------------------------------------------------------------ */
/* 3. Tentatives de connexion (admin | user)                          */
/* ------------------------------------------------------------------ */
const attemptKey = (type, email) => `${type}:attempts:${email}`;
export const isLocked = async (type, email, max = 5) => {
    const count = await redis.get(attemptKey(type, email));
    return Number(count) >= max;
};
export const recordAttempt = async (type, email, ttl = 15 * 60) => {
    const k = attemptKey(type, email);
    await redis.multi().incr(k).expire(k, ttl).exec();
};
export const resetAttempts = async (type, email) => {
    await redis.del(attemptKey(type, email));
};
/* ------------------------------------------------------------------ */
/* 4. Vérifications métier                                            */
/* ------------------------------------------------------------------ */
export const isMfaVerified = (req) => Boolean(req.user?.authentificationMultiFacteurs);
export const isValidConfirmationCode = (req) => req.body.confirmationCode === req.session?.confirmationCode;
export const isBusinessHours = () => {
    const h = new Date().getHours();
    return h >= 9 && h < 18;
};
//# sourceMappingURL=security.service.js.map