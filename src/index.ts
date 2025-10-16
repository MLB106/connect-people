/**
 * @file src/index.ts
 * @description Main application entry point - ES2024 Node.js server
 * @version 1.0.0
 * @author MLB <connect_project_dz@yahoo.com>
 */

import dotenv from 'dotenv';
import express, { type Request, type Response, type NextFunction, type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer, type Server } from 'node:http';
import './utils/hbs-helpers.js';

// Load environment variables
dotenv.config();

/* ---------- Route Imports ---------- */
import apiRouter from './routes/api/index.js';
import adminAuthRouter from './routes/admin/auth.routes.js';
import userAuthRouter from './routes/user/auth.routes.js';
import dualWebRouter from './routes/web/dual.routes.js';
import appRouter from './routes/app.routes.js';
import { devRouter } from './routes/dev.routes.js';
import htmlViewRouter from './routes/dev/html-view.routes.js';

/* ---------- Configuration Imports ---------- */
import { initializeDatabase } from './config/database.js';
import { env } from './config/env.js';

/* ---------- Middleware Imports ---------- */
import { apiLoggerMiddleware } from './middlewares/apiLogger.middleware.js';

/* ---------- ES Module Configuration ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Express application instance
 * @type {Application}
 */
const app: Application = express();

/**
 * Handlebars view engine configuration
 * @description Configure Handlebars for server-side rendering
 */
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: [
    path.join(__dirname, 'views', 'partials')
  ]
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/**
 * Global middleware configuration
 * @description Configure CORS, parsing, and logging middleware
 */
app.use(cors({ 
  origin: env.corsOrigin, 
  credentials: true 
}));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API request logging middleware
app.use('/api', apiLoggerMiddleware);

/**
 * Static file serving configuration
 * @description Serve static assets before route handling
 */
app.use('/css', express.static(path.join(__dirname, '..', 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'public', 'js')));
app.use('/img', express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/locales', express.static(path.join(__dirname, '..', 'src', 'locales')));
app.use(express.static(path.join(__dirname, '..', 'public')));

/**
 * Route configuration
 * @description Configure all application routes in order of precedence
 */
// Client-side rendering routes
app.use('/app', appRouter);

// Dual web routes (HTML + JSON)
app.use('/', dualWebRouter);
console.log('🔧 Mode DUAL activé - Routes web avec HTML et JSON selon le contexte');

// API routes
app.use('/api', apiRouter);

// Admin authentication routes
app.use('/admin', adminAuthRouter);

// User authentication routes
app.use('/user', userAuthRouter);

/**
 * Development-only routes
 * @description Routes available only in development environment
 */
if (env.nodeEnv !== 'production') {
  /**
   * Development page viewer route
   * @description Render any page for development testing
   */
  app.get('/view/:page', async (req: Request, res: Response): Promise<void> => {
    try {
      const pageData = {
        title: `${req.params.page} - Connect People`,
        description: `Page ${req.params.page} - Connect People`,
        locale: 'fr'
      };
      
      res.render(`pages/${req.params.page}`, pageData);
    } catch (error) {
      console.error(`Erreur lors du rendu de la page /view/${req.params.page}:`, error);
      res.status(404).render('pages/404', {
        title: 'Page non trouvée - Connect People',
        description: 'La page que vous recherchez n\'existe pas.',
        locale: 'fr'
      });
    }
  });

  // Development routes
  app.use('/', devRouter);
  app.use('/dev/html', htmlViewRouter);
  console.log('🔧 Mode DEV-VIEW activé - Routes /dev/* et /dev/html/* disponibles');
}

/**
 * Health check endpoint
 * @description Application health status endpoint
 */
app.get('/health', (_req: Request, res: Response): void => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.nodeEnv
    },
    error: null
  });
});

/**
 * 404 handler for unmatched routes
 * @description Handle requests to non-existent endpoints
 */
app.use('*', (req: Request, res: Response): void => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(404).json({
      success: false,
      data: null,
      error: 'Endpoint API non trouvé'
    });
  } else {
    res.status(404).render('pages/404', {
      title: 'Page non trouvée - Connect-People',
      description: 'La page que vous recherchez n\'existe pas.',
      locale: 'fr'
    });
  }
});

/**
 * Global error handler middleware
 * @description Handle unhandled errors across the application
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('Erreur non gérée:', err);
  
  const response = {
    success: false,
    data: null,
    error: 'Erreur interne du serveur'
  };
  
  res.status(500).json(response);
});

/**
 * Server startup configuration
 * @description Port management and server initialization
 */
const PORT = env.port;

/**
 * Check if a port is available
 * @param {number} port - Port number to check
 * @returns {Promise<boolean>} True if port is available
 */
const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server: Server = createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(false);
    });
  });
};

/**
 * Find an available port starting from the preferred port
 * @param {number} startPort - Preferred port to start with
 * @returns {Promise<number>} Available port number
 * @throws {Error} If no port is available
 */
const findAvailablePort = async (startPort: number): Promise<number> => {
  if (await isPortAvailable(startPort)) {
    return startPort;
  }
  
  // Try fallback ports
  for (const port of env.fallbackPorts) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  
  // Try sequential ports
  let port = startPort + 1;
  const maxAttempts = 20;
  
  for (let i = 0; i < maxAttempts; i++) {
    if (await isPortAvailable(port)) {
      return port;
    }
    port++;
  }
  
  throw new Error(`Aucun port disponible trouvé. Ports testés: ${startPort}, ${env.fallbackPorts.join(', ')}, et ${startPort + 1} à ${startPort + maxAttempts}`);
};

/**
 * Start the server with database initialization and port management
 * @returns {Promise<void>}
 */
const startServer = async (): Promise<void> => {
  try {
    await initializeDatabase();
    
    const availablePort = await findAvailablePort(PORT);
    
    if (availablePort !== PORT) {
      console.log(`⚠️  Port ${PORT} occupé, utilisation du port ${availablePort}`);
    }
    
    app.listen(availablePort, () => {
      console.log(`🚀 Serveur prêt sur http://localhost:${availablePort}`);
      console.log(`📊 Environnement: ${env.nodeEnv}`);
      console.log(`🔗 Base de données: ${env.databaseUrl}`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Start the server
startServer();