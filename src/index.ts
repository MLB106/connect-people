// src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import './utils/hbs-helpers.js';

/* ---------- import des routes API ---------- */
import apiRouter from './routes/api/index.js';

/* ---------- import des routes Admin ---------- */
import adminAuthRouter from './routes/admin/auth.routes.js';

/* ---------- import des routes User ---------- */
import userAuthRouter from './routes/user/auth.routes.js';

/* ---------- import des routes Web (API REST pures) ---------- */
// import apiOnlyWebRouter from './routes/web/api-only.routes.js';

/* ---------- import des routes Web Dual (HTML + JSON) ---------- */
import dualWebRouter from './routes/web/dual.routes.js';

/* ---------- import des routes App (Client-side rendering) ---------- */
import appRouter from './routes/app.routes.js';

/* ---------- import des routes Dev (uniquement en développement) ---------- */
import { devRouter } from './routes/dev.routes.js';
import htmlViewRouter from './routes/dev/html-view.routes.js';

/* ---------- import de la configuration ---------- */
import { initializeDatabase } from './config/database.js';
import { env } from './config/env.js';

/* ---------- import des middlewares ---------- */
import { apiLoggerMiddleware } from './middlewares/apiLogger.middleware.js';

/* ---------- Configuration pour ES modules ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ---------- Configuration Handlebars ---------- */
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

/* ---------- Sécurité ---------- */
// Helmet - Protection des headers HTTP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate Limiting Global - Protection contre les attaques par force brute
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max par IP
  message: 'Trop de requêtes, réessayez dans 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// CORS
app.use(cors({ 
  origin: env.corsOrigin,
  credentials: true 
}));

// Sessions
app.use(session({
  secret: env.sessionSecret,
  name: env.sessionName,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: env.nodeEnv === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24h
    sameSite: 'strict'
  }
}));

// Cookies et Body Parsers
app.use(cookieParser());
app.use(express.json({ limit: '1mb' })); // Réduit de 10mb à 1mb
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Middleware de logging pour les routes API
app.use('/api', apiLoggerMiddleware);

/* ---------- Fichiers statiques (AVANT les routes duales) ---------- */
app.use('/css', express.static(path.join(__dirname, '..', 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', 'public', 'js')));
app.use('/img', express.static(path.join(__dirname, '..', 'public', 'images')));
// Servir les fichiers HTML statiques directement
app.use(express.static(path.join(__dirname, '..', 'public')));

/* ---------- Route de santé (AVANT les routes génériques) ---------- */
app.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    },
    error: null
  });
});

/* ---------- Routes API (spécifiques AVANT génériques) ---------- */
app.use('/api', apiRouter);

/* ---------- Routes Admin ---------- */
app.use('/admin', adminAuthRouter);

/* ---------- Routes User ---------- */
app.use('/user', userAuthRouter);

/* ---------- Routes App (Client-side rendering) ---------- */
app.use('/app', appRouter);

/* ---------- Route /view/:page (uniquement en développement) ---------- */
if (process.env.NODE_ENV !== 'production') {
  app.get('/view/:page', async (req, res) => {
    try {
      // Récupère les données JSON pures
      const pageData = {
        title: `${req.params.page} - Connect People`,
        description: `Page ${req.params.page} - Connect People`,
        locale: 'fr'
      };
      
      // Rend la vue Handlebars avec les données
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
}

/* ---------- Routes Dev (uniquement en développement) ---------- */
if (process.env.NODE_ENV !== 'production') {
  app.use('/dev', devRouter);
  app.use('/dev/html', htmlViewRouter);
  console.log('🔧 Mode DEV-VIEW activé - Routes /dev/* et /dev/html/* disponibles');
}

/* ---------- Routes Web Dual (HTML + JSON) - EN DERNIER car elles capturent / ---------- */
app.use('/', dualWebRouter);
console.log('🔧 Mode DUAL activé - Routes web avec HTML et JSON selon le contexte');

/* ---------- Route 404 pour les endpoints non trouvés ---------- */
app.use('*', (req, res) => {
  // Si c'est une route API, renvoyer du JSON
  if (req.originalUrl.startsWith('/api')) {
    res.status(404).json({
      success: false,
      data: null,
      error: 'Endpoint API non trouvé'
    });
  } else {
    // Sinon, renvoyer une page HTML 404
    res.status(404).render('pages/404', {
      title: 'Page non trouvée - Connect-People',
      description: 'La page que vous recherchez n\'existe pas.',
      locale: 'fr',
      csrfToken: req.csrfToken()
    });
  }
});

/* ---------- Middleware de gestion d'erreur global ---------- */
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Erreur non gérée:', err);
  
  const response = {
    success: false,
    data: null,
    error: 'Erreur interne du serveur'
  };
  
  res.status(500).json(response);
});

/* ---------- Lancement ---------- */
const PORT = env.port;

// Fonction pour vérifier si un port est disponible
const isPortAvailable = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = createServer();
    
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

// Fonction pour trouver un port disponible
const findAvailablePort = async (startPort: number): Promise<number> => {
  // Essayer d'abord le port configuré
  if (await isPortAvailable(startPort)) {
    return startPort;
  }
  
  // Essayer les ports de fallback
  for (const port of env.fallbackPorts) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  
  // Essayer les ports suivants si aucun port de fallback n'est disponible
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

// Initialisation de la base de données et démarrage du serveur
const startServer = async () => {
  try {
    // Initialisation de MongoDB
    await initializeDatabase();
    
    // Vérifier et trouver un port disponible
    const availablePort = await findAvailablePort(PORT);
    
    if (availablePort !== PORT) {
      console.log(`⚠️  Port ${PORT} occupé, utilisation du port ${availablePort}`);
    }
    
    // Démarrage du serveur Express
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

startServer();