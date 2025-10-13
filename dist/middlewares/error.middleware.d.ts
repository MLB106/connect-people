/**
 * src/middleware/error.middleware.ts
 * ES2022 / ESM – centralise seulement status + key
 */
import { Request, Response, NextFunction } from 'express';
export declare const ERROR_CODES: {
    readonly VALIDATION_ERROR: 400;
    readonly MISSING_PARAMETER: 400;
    readonly UNAUTHORIZED: 401;
    readonly TOKEN_EXPIRED: 401;
    readonly MFA_REQUIRED: 401;
    readonly FORBIDDEN: 403;
    readonly IP_NOT_ALLOWED: 403;
    readonly NOT_FOUND: 404;
    readonly USER_NOT_FOUND: 404;
    readonly DUPLICATE_EMAIL: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly TOO_MANY_REQUESTS: 429;
    readonly INTERNAL_SERVER_ERROR: 500;
    readonly DATABASE_ERROR: 500;
};
export type ErrorKey = keyof typeof ERROR_CODES;
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly key: ErrorKey;
    constructor(key: ErrorKey, message?: string);
}
export declare const errorMiddleware: (err: AppError | Error, req: Request, res: Response, _next: NextFunction) => void;
export declare const asyncHandler: <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(fn: (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => Promise<void | Response>) => (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
