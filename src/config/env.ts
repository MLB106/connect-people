import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Fonction utilitaire pour exiger une variable
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
}

// Export des variables typées
export const env = {
  // Serveur
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  // Base de données
  db: {
    host: requireEnv('DB_HOST'),
    port: parseInt(requireEnv('DB_PORT'), 10),
    name: requireEnv('DB_NAME'),
    user: requireEnv('DB_USER'),
    password: requireEnv('DB_PASSWORD'),
  },

  // Redis
  redis: {
    host: requireEnv('REDIS_HOST'),
    port: parseInt(requireEnv('REDIS_PORT'), 10),
    password: process.env.REDIS_PASSWORD || undefined,
  },

  // Sessions
  session: {
    secret: requireEnv('SESSION_SECRET'),
    name: process.env.SESSION_NAME || 'connect_people_sid',
  },

  // JWT
  jwt: {
    secret: requireEnv('JWT_SECRET'),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // Email
  mail: {
    host: requireEnv('MAIL_HOST'),
    port: parseInt(requireEnv('MAIL_PORT'), 10),
    secure: process.env.MAIL_SECURE === 'true',
    user: requireEnv('MAIL_USER'),
    pass: requireEnv('MAIL_PASS'),
  },

  // CORS
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],

  // Rate Limit
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },

  // CSRF
  csrfSecret: requireEnv('CSRF_SECRET'),
} as const;