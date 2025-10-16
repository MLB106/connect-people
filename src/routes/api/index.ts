/**
 * @file src/routes/api/index.ts
 * @description Main API router configuration
 * @version 1.0.0
 * @author MLB <connect_project_dz@yahoo.com>
 */

import { Router, type Request, type Response } from 'express';
import { homeApiRouter } from './home.routes.js';
import { immobilierCompleteApiRouter } from './immobilier-complete.routes.js';
import { entreprendreCompleteApiRouter } from './entreprendre-complete.routes.js';
import { traductionCompleteApiRouter } from './traduction-complete.routes.js';
import { footerCompleteApiRouter } from './footer-complete.routes.js';
import pagesApiRouter from './pages.routes.js';
import { usersApiRouter } from './users.routes.js';
import reportApiRouter from './report.routes.js';
import { searchApiRouter } from './search.routes.js';
import i18nApiRouter from './i18n.routes.js';

/**
 * Main API router instance
 * @type {Router}
 */
const apiRouter = Router();

/**
 * API route configuration
 * @description Configure all API endpoints
 */
// Main content routes
apiRouter.use('/home', homeApiRouter);
apiRouter.use('/immobilier', immobilierCompleteApiRouter);
apiRouter.use('/entreprendre', entreprendreCompleteApiRouter);
apiRouter.use('/traduction', traductionCompleteApiRouter);
apiRouter.use('/footer', footerCompleteApiRouter);
apiRouter.use('/pages', pagesApiRouter);

// User and utility routes
apiRouter.use('/users', usersApiRouter);
apiRouter.use('/report', reportApiRouter);
apiRouter.use('/search', searchApiRouter);
apiRouter.use('/i18n', i18nApiRouter);

/**
 * API health check endpoint
 * @description Returns API status and system information
 */
apiRouter.get('/health', (_req: Request, res: Response): void => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    },
    error: null
  });
});

/**
 * 404 handler for API endpoints
 * @description Handle requests to non-existent API endpoints
 */
apiRouter.use('*', (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    data: null,
    error: 'Endpoint API non trouvé',
    meta: {
      requestedPath: req.originalUrl,
      timestamp: new Date().toISOString(),
      mode: 'api'
    }
  });
});

export default apiRouter;
