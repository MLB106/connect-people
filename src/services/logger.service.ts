// src/services/logger.service.ts
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

/* ---------- Instance Winston ---------- */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

/* ---------- Helpers spécifiques ---------- */
export const log = {
  admin: (action: string, username: string, details?: Record<string, unknown>) =>
    logger.info({ scope: 'admin', action, username, ...details }),

  user: (action: string, username: string, details?: Record<string, unknown>) =>
    logger.info({ scope: 'user', action, username, ...details }),
};

// UTILISATION

// import { logger } from './services/logger.service';

// logger.info('Serveur démarré', { port: 4000 });
// logger.error('Erreur critique', { stack: err.stack });