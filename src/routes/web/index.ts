import { Router } from 'express';
const router = Router();

router.get('/', (_req, res) => {
  res.send('Web routes placeholder – Handlebars viendra plus tard');
});


import { csrfProtection, addCsrfToken } from '../../middlewares/csrf';

router.use(csrfProtection);   // uniquement pour /web/*
router.use(addCsrfToken);     // fournit le token aux vues
router.use(i18n.init); // rend req.__ disponible

router.get('/', (req, res) => {
  res.send(req.__('welcome'));
});

export default router;

