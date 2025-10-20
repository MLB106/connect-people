// src/routes/user/auth.routes.ts
import { Router } from 'express';
import { validateRequest } from '../../utils/validation.js';
import { turnstileGuard } from '../../middlewares/turnstile.middleware.js';
import { userLoginSchema, userRegisterSchema } from '../../schemas/user.schema.js';
import { userLogin, userRegister } from '../../controllers/users/auth.controller.js'; 

const router: Router = Router();

// Routes d'affichage des pages
router.get('/login', (req, res) => {
  res.render('pages/login', {
    title: 'Connexion - Connect-People',
    description: 'Connectez-vous à votre compte Connect-People',
    locale: 'fr'
  });
});

router.get('/register', (req, res) => {
  res.render('pages/register', {
    title: 'Inscription - Connect-People',
    description: 'Créez votre compte Connect-People',
    locale: 'fr'
  });
});

// Routes d'authentification classique
router.post('/login', validateRequest(userLoginSchema), turnstileGuard, userLogin);
router.post('/register', validateRequest(userRegisterSchema), turnstileGuard, userRegister);

// Routes OAuth - Redirection vers les services externes
router.get('/google', (_req, res) => {
  // Configuration Google OAuth
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${process.env.FRONT_URL || 'http://localhost:4000'}/auth/google/callback`;
  const scope = 'openid email profile';
  
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${googleClientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `response_type=code&` +
    `access_type=offline&` +
    `prompt=consent`;
  
  res.redirect(googleAuthUrl);
});

router.get('/apple', (_req, res) => {
  // Configuration Apple OAuth
  const appleClientId = process.env.APPLE_CLIENT_ID;
  const redirectUri = `${process.env.FRONT_URL || 'http://localhost:4000'}/auth/apple/callback`;
  const scope = 'name email';
  
  const appleAuthUrl = `https://appleid.apple.com/auth/authorize?` +
    `client_id=${appleClientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `response_type=code&` +
    `response_mode=form_post`;
  
  res.redirect(appleAuthUrl);
});

router.get('/facebook', (_req, res) => {
  // Configuration Facebook OAuth
  const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
  const redirectUri = `${process.env.FRONT_URL || 'http://localhost:4000'}/auth/facebook/callback`;
  const scope = 'email,public_profile';
  
  const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
    `client_id=${facebookClientId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `response_type=code`;
  
  res.redirect(facebookAuthUrl);
});

// Routes de callback OAuth (à implémenter plus tard)
router.get('/google/callback', (req, res) => {
  res.json({ message: 'Google OAuth callback - À implémenter', code: req.query.code });
});

router.post('/apple/callback', (req, res) => {
  res.json({ message: 'Apple OAuth callback - À implémenter', code: req.body.code });
});

router.get('/facebook/callback', (req, res) => {
  res.json({ message: 'Facebook OAuth callback - À implémenter', code: req.query.code });
});

export default router;