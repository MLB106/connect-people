// Fichier: config/csrfConfig.ts

import csrf from 'csurf';

/**
 * Configuration du middleware CSRF
 * @returns {Function} Middleware CSRF configuré
 */
export const configureCsrf = () => {
  return csrf({
    cookie: {
      key: '_csrf',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    },
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
    value: (req) => {
      return req.body._csrf || req.query._csrf || req.headers['x-csrf-token'];
    }
  });
};

/**
 * Middleware pour ajouter le token CSRF à la réponse
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @param {Function} next - Fonction next d'Express
 */
export const addCsrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

/**
 * Gestionnaire d'erreur CSRF
 * @param {Object} err - Objet erreur
 * @param {Object} req - Objet requête Express
 * @param {Object} res - Objet réponse Express
 * @param {Function} next - Fonction next d'Express
 */
export const handleCsrfError = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  
  // Envoyer une réponse d'erreur CSRF
  res.status(403).json({
    error: 'Session expirée ou token CSRF invalide. Veuillez rafraîchir la page et réessayer.'
  });
};
