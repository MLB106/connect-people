export var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "error";
    LogLevel["WARN"] = "warn";
    LogLevel["INFO"] = "info";
    LogLevel["DEBUG"] = "debug";
})(LogLevel || (LogLevel = {}));
export class Logger {
    static formatMessage(level, message, context) {
        const timestamp = new Date().toISOString();
        const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
    }
    static error(message, context) {
        console.error(this.formatMessage(LogLevel.ERROR, message, context));
    }
    static warn(message, context) {
        console.warn(this.formatMessage(LogLevel.WARN, message, context));
    }
    static info(message, context) {
        console.info(this.formatMessage(LogLevel.INFO, message, context));
    }
    static debug(message, context) {
        if (process.env.NODE_ENV === 'development') {
            console.debug(this.formatMessage(LogLevel.DEBUG, message, context));
        }
    }
    static apiRequest(req, res, responseTime) {
        const context = {
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            responseTime: responseTime,
            userAgent: req.get('User-Agent') || '',
            ip: req.ip || req.connection.remoteAddress || ''
        };
        const level = res.statusCode >= 400 ? LogLevel.ERROR : LogLevel.INFO;
        const message = `${req.method} ${req.originalUrl} - ${res.statusCode}`;
        this[level](message, context);
    }
    static apiError(error, req, context) {
        const errorContext = {
            ...context,
            method: req.method,
            url: req.originalUrl,
            error: error.message,
            stack: error.stack
        };
        this.error(`API Error: ${error.message}`, errorContext);
    }
}
//# sourceMappingURL=logger.js.map