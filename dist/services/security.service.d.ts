import type { AppRequest } from '../types/request';
export declare const isIPAllowed: (ip: string) => boolean;
export declare const isStaticIPAllowed: (ip: string) => boolean;
export declare const isLocked: (type: "admin" | "user", email: string, max?: number) => Promise<boolean>;
export declare const recordAttempt: (type: "admin" | "user", email: string, ttl?: number) => Promise<void>;
export declare const resetAttempts: (type: "admin" | "user", email: string) => Promise<void>;
export declare const isMfaVerified: (req: AppRequest) => boolean;
export declare const isValidConfirmationCode: (req: AppRequest) => boolean;
export declare const isBusinessHours: () => boolean;
