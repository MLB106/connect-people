/**
 * src/middleware/error.middleware.ts
 * ES2022 / ESM – centralise seulement status + key
 */
import { logger } from '../services/logger.service';
export const ERROR_CODES = {
    VALIDATION_ERROR: 400,
    MISSING_PARAMETER: 400,
    UNAUTHORIZED: 401,
    TOKEN_EXPIRED: 401,
    MFA_REQUIRED: 401,
    FORBIDDEN: 403,
    IP_NOT_ALLOWED: 403,
    NOT_FOUND: 404,
    USER_NOT_FOUND: 404,
    DUPLICATE_EMAIL: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    DATABASE_ERROR: 500,
};
export class AppError extends Error {
    statusCode;
    key;
    constructor(key, message) {
        super(message ?? key);
        this.key = key;
        this.statusCode = ERROR_CODES[key];
        Error.captureStackTrace(this, this.constructor);
    }
}
export const errorMiddleware = (err, req, res, _next) => {
    if (res.headersSent)
        return;
    const key = err instanceof AppError ? err.key : 'INTERNAL_SERVER_ERROR';
    const status = ERROR_CODES[key] || 500;
    logger.error({
        type: 'request_error',
        ip: req.ip ?? 'unknown',
        method: req.method,
        url: req.originalUrl,
        status,
        key,
        message: err.message,
    });
    const payload = { key };
    if (process.env.NODE_ENV === 'development')
        payload.stack = err.stack;
    res.status(status).json(payload);
};
export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
//   EXEMPLE 
//   // src/controllers/user.controller.ts
// import { AppError, asyncHandler } from '../middleware/error.middleware';
//# sourceMappingURL=error.middleware.js.map