import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Fonction utilitaire pour exiger une variable (exportée pour usage futur)
export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
}

// Export des variables typées
export const env = {
  // Serveur
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Ports de fallback pour éviter les conflits
  fallbackPorts: [4001, 4002, 4003, 5000, 5001, 5002, 8000, 8001, 8002],

  // Base de données
  databaseUrl: process.env.DATABASE_URL || `mongodb://${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '27017'}/${process.env.DB_NAME || 'connect-people'}`,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '27017', 10),
    name: process.env.DB_NAME || 'connect-people',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
  },

  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },

  // Sessions
  session: {
    secret: process.env.SESSION_SECRET || 'default-session-secret-change-in-production',
    name: process.env.SESSION_NAME || 'connect_people_sid',
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'default-jwt-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // Email
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT || '587', 10),
    secure: process.env.MAIL_SECURE === 'true',
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
  },

  // CORS
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:4000'],

  // Rate Limit
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },

  // CSRF
  csrfSecret: process.env.CSRF_SECRET || 'default-csrf-secret-change-in-production',
} as const;