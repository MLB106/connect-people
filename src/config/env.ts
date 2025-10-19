/**
 * @file src/config/env.ts
 * @description Environment configuration with strict typing and validation
 * @version 1.0.0
 * @author MLB <connect_project_dz@yahoo.com>
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Environment variable types
 */
type NodeEnv = 'development' | 'production' | 'test';
export type DatabaseType = 'mongodb' | 'postgresql' | 'mysql';

/**
 * Utility function to require an environment variable
 * @param {string} key - Environment variable key
 * @returns {string} Environment variable value
 * @throws {Error} If environment variable is not set
 */
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Parse comma-separated string to array
 * @param {string | undefined} value - Comma-separated string
 * @param {string[]} defaultValue - Default array value
 * @returns {string[]} Parsed array
 */
const parseArray = (value: string | undefined, defaultValue: string[]): string[] => {
  return value ? value.split(',').map(item => item.trim()) : defaultValue;
};

/**
 * Parse integer from environment variable
 * @param {string | undefined} value - String value
 * @param {number} defaultValue - Default number value
 * @returns {number} Parsed integer
 */
const parseIntEnv = (value: string | undefined, defaultValue: number): number => {
  const parsed = value ? parseInt(value, 10) : defaultValue;
  return Number.isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Parse boolean from environment variable
 * @param {string | undefined} value - String value
 * @param {boolean} defaultValue - Default boolean value
 * @returns {boolean} Parsed boolean
 */
const parseBooleanEnv = (value: string | undefined, defaultValue: boolean): boolean => {
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true';
};

/**
 * Application environment configuration
 * @description Centralized environment variables with type safety
 */
export const env = {
  // Server configuration
  port: parseIntEnv(process.env.PORT, 4000),
  nodeEnv: (process.env.NODE_ENV as NodeEnv) || 'development',
  
  // Port fallback configuration
  fallbackPorts: [4001, 4002, 4003, 5000, 5001, 5002, 8000, 8001, 8002] as const,

  // Database configuration
  databaseUrl: process.env.DATABASE_URL || 
    `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '27017'}/${process.env.DB_NAME || 'connect-people'}`,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseIntEnv(process.env.DB_PORT, 27017),
    name: process.env.DB_NAME || 'connect-people',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
  } as const,

  // Redis configuration
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseIntEnv(process.env.REDIS_PORT, 6379),
    password: process.env.REDIS_PASSWORD || undefined,
  } as const,

  // Session configuration
  session: {
    secret: process.env.SESSION_SECRET || 'default-session-secret-change-in-production',
    name: process.env.SESSION_NAME || 'connect_people_sid',
  } as const,

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'default-jwt-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  } as const,

  // Email configuration
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseIntEnv(process.env.MAIL_PORT, 587),
    secure: parseBooleanEnv(process.env.MAIL_SECURE, false),
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
  } as const,

  // CORS configuration
  corsOrigin: parseArray(process.env.CORS_ORIGIN, ['http://localhost:4000']),

  // Rate limiting configuration
  rateLimit: {
    windowMs: parseIntEnv(process.env.RATE_LIMIT_WINDOW_MS, 900000), // 15 minutes
    max: parseIntEnv(process.env.RATE_LIMIT_MAX, 100),
  } as const,

  // CSRF configuration
  csrfSecret: process.env.CSRF_SECRET || 'default-csrf-secret-change-in-production',
} as const;