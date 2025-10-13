// src/routes/api/index.ts
import { Router } from 'express';
import { homeApiRouter } from './home.routes.js';
import { immobilierCompleteApiRouter } from './immobilier-complete.routes.js';
import { entreprendreCompleteApiRouter } from './entreprendre-complete.routes.js';
import { traductionCompleteApiRouter } from './traduction-complete.routes.js';
import { footerCompleteApiRouter } from './footer-complete.routes.js';
import pagesApiRouter from './pages.routes.js';
import { usersApiRouter } from './users.routes.js';
import reportApiRouter from './report.routes.js';
import { searchApiRouter } from './search.routes.js';
const apiRouter = Router();
// Routes API principales
apiRouter.use('/home', homeApiRouter);
apiRouter.use('/immobilier', immobilierCompleteApiRouter);
apiRouter.use('/entreprendre', entreprendreCompleteApiRouter);
apiRouter.use('/traduction', traductionCompleteApiRouter);
apiRouter.use('/footer', footerCompleteApiRouter);
apiRouter.use('/pages', pagesApiRouter);
// Routes API existantes
apiRouter.use('/users', usersApiRouter);
apiRouter.use('/report', reportApiRouter);
apiRouter.use('/search', searchApiRouter);
// Route de santé API
apiRouter.get('/health', (_req, res) => {
    res.json({
        success: true,
        data: {
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: '1.0.0'
        },
        error: null
    });
});
// Route 404 pour les endpoints API non trouvés
apiRouter.use('*', (req, res) => {
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
//# sourceMappingURL=index.js.map