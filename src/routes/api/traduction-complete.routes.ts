// src/routes/api/traduction-complete.routes.ts
import { Router } from 'express';
import viewParserService from '../../services/viewParser.service.js';

export const traductionCompleteApiRouter = Router();

// Configuration des pages traduction
const traductionPages = {
  'diplomes': {
    title: 'Traduction de Diplômes - Connect People',
    description: 'Traduction officielle de vos diplômes et certificats par des traducteurs agréés',
    viewPath: 'traduction/traduction-diplomes.hbs'
  },
  'acte-naissance': {
    title: 'Traduction Acte de Naissance - Connect People',
    description: 'Traduction officielle d\'extraits d\'acte de naissance',
    viewPath: 'traduction/traduction-acte-naissance.hbs'
  },
  'casier-judiciaire': {
    title: 'Traduction Casier Judiciaire - Connect People',
    description: 'Traduction officielle de casiers judiciaires',
    viewPath: 'traduction/traduction-casier-judiciaire.hbs'
  },
  'divers': {
    title: 'Traduction Divers - Connect People',
    description: 'Traduction de documents divers par des professionnels',
    viewPath: 'traduction/traduction-divers.hbs'
  }
};

// Configuration des pages acts notariés
const actsNotariesPages = {
  'cession-acquisition': {
    title: 'Traduction Cession-Acquisition - Connect People',
    description: 'Traduction professionnelle de documents de cession-acquisition',
    viewPath: 'traduction/traduction-acts-cession-acquisition.hbs'
  },
  'testament': {
    title: 'Traduction Testament - Connect People',
    description: 'Traduction professionnelle de testaments',
    viewPath: 'traduction/traduction-acts-testament.hbs'
  },
  'bail': {
    title: 'Traduction Bail - Connect People',
    description: 'Traduction professionnelle de baux',
    viewPath: 'traduction/traduction-acts-bail.hbs'
  },
  'jugement': {
    title: 'Traduction Jugement - Connect People',
    description: 'Traduction professionnelle de jugements',
    viewPath: 'traduction/traduction-acts-jugement.hbs'
  },
  'autre': {
    title: 'Traduction Autres Acts Notariés - Connect People',
    description: 'Traduction professionnelle d\'autres documents notariés',
    viewPath: 'traduction/traduction-acts-autre.hbs'
  }
};

// Helper pour créer une route API
const createApiRoute = (pageConfig: any, viewPath: string) => {
  return async (req: any, res: any) => {
    try {
      const pageData = {
        title: pageConfig.title,
        description: pageConfig.description,
        locale: req.query.locale as string || 'fr'
      };

      const jsonData = await viewParserService.parseView(viewPath, pageData);
      
      res.json({
        success: true,
        data: jsonData,
        error: null,
        meta: {
          viewPath,
          timestamp: new Date().toISOString(),
          mode: 'api'
        }
      });
    } catch (error) {
             if (process.env.NODE_ENV === 'development') {
               console.error(`Erreur API traduction ${viewPath}:`, error instanceof Error ? error.message : 'Erreur inconnue');
             }
      res.status(500).json({
        success: false,
        data: null,
        error: 'Erreur interne du serveur',
        meta: {
          viewPath,
          timestamp: new Date().toISOString(),
          mode: 'api'
        }
      });
    }
  };
};

// Routes principales traduction
Object.entries(traductionPages).forEach(([key, config]) => {
  traductionCompleteApiRouter.get(`/${key}`, createApiRoute(config, config.viewPath));
});

// Routes acts notariés
Object.entries(actsNotariesPages).forEach(([key, config]) => {
  traductionCompleteApiRouter.get(`/acts-notaries/${key}`, createApiRoute(config, config.viewPath));
});
