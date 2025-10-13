import { Logger } from '../utils/logger.js';
export const apiLoggerMiddleware = (req, res, next) => {
    const startTime = Date.now();
    // Override de la méthode end pour capturer le temps de réponse
    const originalEnd = res.end;
    res.end = function (chunk, encoding, cb) {
        const responseTime = Date.now() - startTime;
        Logger.apiRequest(req, res, responseTime);
        return originalEnd.call(this, chunk, encoding, cb);
    };
    next();
};
//# sourceMappingURL=apiLogger.middleware.js.map