import { Request, Response } from 'express';
export declare enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug"
}
export interface LogContext {
    method?: string;
    url?: string;
    statusCode?: number;
    responseTime?: number;
    userAgent?: string;
    ip?: string;
    userId?: string;
    [key: string]: any;
}
export declare class Logger {
    private static formatMessage;
    static error(message: string, context?: LogContext): void;
    static warn(message: string, context?: LogContext): void;
    static info(message: string, context?: LogContext): void;
    static debug(message: string, context?: LogContext): void;
    static apiRequest(req: Request, res: Response, responseTime: number): void;
    static apiError(error: Error, req: Request, context?: LogContext): void;
}
