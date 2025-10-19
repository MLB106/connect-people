// src/routes/api/home.routes.ts
import { Router } from 'express';

export const homeApiRouter: Router = Router();

/**
 * GET /api/home
 * API REST pour la page d'accueil
 */
homeApiRouter.get('/', async (req, res) => {
  try {
    const pageData = {
      title: 'Connect People - Plateforme d\'entraide mondiale',
      description: 'Trouvez de l\'aide ou aidez d\'autres personnes partout dans le monde. Fixez vos tarifs, communiquez en toute sécurité, et construisez des relations authentiques.',
      locale: req.query.locale as string || 'fr',
      content: {
        hero: {
          title: 'Connectez-vous avec le monde',
          subtitle: 'Trouvez de l\'aide ou aidez d\'autres personnes partout dans le monde',
          cta: 'Commencer maintenant'
        },
        features: [
          {
            title: 'Aide personnalisée',
            description: 'Trouvez l\'aide dont vous avez besoin, quand vous en avez besoin',
            icon: 'fa-handshake'
          },
          {
            title: 'Tarifs flexibles',
            description: 'Fixez vos propres tarifs et gérez vos revenus',
            icon: 'fa-dollar-sign'
          },
          {
            title: 'Communication sécurisée',
            description: 'Communiquez en toute sécurité avec nos outils intégrés',
            icon: 'fa-shield-alt'
          }
        ],
        stats: {
          users: '10,000+',
          countries: '50+',
          languages: '20+'
        }
      }
    };
    
    res.json({
      success: true,
      data: pageData,
      error: null,
      meta: {
        viewPath: 'home.hbs',
        timestamp: new Date().toISOString(),
        mode: 'api'
      }
    });
  } catch (error) {
           if (process.env.NODE_ENV === 'development') {
             console.error('Erreur API home:', error instanceof Error ? error.message : 'Erreur inconnue');
           }
    res.status(500).json({
      success: false,
      data: null,
      error: 'Erreur interne du serveur',
      meta: {
        viewPath: 'home.hbs',
        timestamp: new Date().toISOString(),
        mode: 'api'
      }
    });
  }
});
