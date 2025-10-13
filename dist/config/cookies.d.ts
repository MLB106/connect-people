/**
 * @file src/config/cookies.ts
 * Helpers Express pour poser / effacer les cookies
 * (access, refresh, CSRF) – user et admin
 */
import type { Response } from 'express';
export declare const setTokenCookie: (res: Response, token: string, name: string, maxAgeMs?: number) => void;
export declare const clearTokenCookie: (res: Response, name: string) => void;
export declare const logout: (res: Response) => void;
export declare const setAuthCookies: (res: Response, access: string, refresh: string, csrf: string) => void;
export declare const setAdminAuthCookies: (res: Response, access: string, refresh: string, csrf: string) => void;
