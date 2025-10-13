// src/utils/logger.ts
import { Request, Response } from 'express';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
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

export class Logger {
  private static formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  static error(message: string, context?: LogContext): void {
    console.error(this.formatMessage(LogLevel.ERROR, message, context));
  }

  static warn(message: string, context?: LogContext): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, context));
  }

  static info(message: string, context?: LogContext): void {
    console.info(this.formatMessage(LogLevel.INFO, message, context));
  }

  static debug(message: string, context?: LogContext): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, context));
    }
  }

  static apiRequest(req: Request, res: Response, responseTime: number): void {
    const context: LogContext = {
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

  static apiError(error: Error, req: Request, context?: LogContext): void {
    const errorContext: LogContext = {
      ...context,
      method: req.method,
      url: req.originalUrl,
      error: error.message,
      stack: error.stack
    };

    this.error(`API Error: ${error.message}`, errorContext);
  }
}
