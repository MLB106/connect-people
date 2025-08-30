// web/index.ts
import { Router } from 'express';
import { csrfProtection, addCsrfToken } from '../../middlewares/csrf';
import i18n from '../../config/i18n';      // <-- importe bien ton instance i18n

const router = Router();

/* ------------------------------------------------------------------ */
/* 1) Middlewares globaux appliqués à TOUTES les routes de ce router  */
/* ------------------------------------------------------------------ */
router.use(i18n.init);           // rend req.__ disponible
router.use(csrfProtection);      // sécurise les requêtes
router.use(addCsrfToken);        // injecte le token dans les vues

/* ------------------------------------------------------------------ */
/* 2) Routes                                                          */
/* ------------------------------------------------------------------ */
router.get('/', (_req, res) => {
  res.send('Web routes placeholder – Handlebars viendra plus tard');
});

/* ------------------------------------------------------------------ */
/* 3) Augmentation du type Express.Request (TS uniquement)            */
/* ------------------------------------------------------------------ */
declare global {
  namespace Express {
    interface Request {
      __: (key: string) => string;
    }
  }
}

export default router;