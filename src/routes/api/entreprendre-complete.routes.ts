// src/routes/api/entreprendre-complete.routes.ts
import { Router } from 'express';
import viewParserService from '../../services/viewParser.service.js';

export const entreprendreCompleteApiRouter = Router();

// Configuration des pages entreprendre
const entreprendrePages = {
  'analyse-marche': {
    title: 'Analyse de marché - Connect People',
    description: 'Obtenez une analyse complète de votre marché avec l\'aide de nos experts',
    viewPath: 'entreprendre/entreprendre-analyse-marche.hbs'
  },
  'business-plan': {
    title: 'Réaliser un Business Plan - Connect People',
    description: 'Créez un business plan professionnel avec l\'aide de nos experts',
    viewPath: 'entreprendre/entreprendre-business-plan.hbs'
  },
  'local-commercial': {
    title: 'Trouver un Local Commercial - Connect People',
    description: 'Trouvez le local commercial idéal pour votre entreprise',
    viewPath: 'entreprendre/entreprendre-local-commercial.hbs'
  },
  'bureaux': {
    title: 'Trouver des Bureaux - Connect People',
    description: 'Trouvez des bureaux adaptés à vos besoins professionnels',
    viewPath: 'entreprendre/entreprendre-bureaux.hbs'
  },
  'recruteur': {
    title: 'Trouver un Recruteur - Connect People',
    description: 'Trouvez un recruteur professionnel pour vos besoins RH',
    viewPath: 'entreprendre/entreprendre-recruteur.hbs'
  },
  'professionnel': {
    title: 'Trouver un Professionnel - Connect People',
    description: 'Trouvez des professionnels qualifiés pour votre entreprise',
    viewPath: 'entreprendre/entreprendre-professionnel.hbs'
  }
};

// Configuration des pages sourcing
const sourcingPages = {
  'sourcing': {
    title: 'Sourcing - Connect People',
    description: 'Trouvez les meilleurs fournisseurs et produits pour votre entreprise',
    viewPath: 'entreprendre/entreprendre-sourcing.hbs'
  },
  'produits': {
    title: 'Sourcing Produits - Connect People',
    description: 'Trouvez les meilleurs produits pour votre entreprise',
    viewPath: 'entreprendre/entreprendre-sourcing-produits.hbs'
  },
  'fournisseurs': {
    title: 'Sourcing Fournisseurs - Connect People',
    description: 'Trouvez des fournisseurs fiables pour votre entreprise',
    viewPath: 'entreprendre/entreprendre-sourcing-fournisseurs.hbs'
  },
  'matieres-premieres': {
    title: 'Sourcing Matières Premières - Connect People',
    description: 'Trouvez les meilleures matières premières pour votre production',
    viewPath: 'entreprendre/entreprendre-sourcing-matieres-premieres.hbs'
  },
  'equipements': {
    title: 'Sourcing Équipements - Connect People',
    description: 'Trouvez l\'équipement nécessaire pour votre entreprise',
    viewPath: 'entreprendre/entreprendre-sourcing-equipements.hbs'
  },
  'services': {
    title: 'Sourcing Services - Connect People',
    description: 'Trouvez les services professionnels dont vous avez besoin',
    viewPath: 'entreprendre/entreprendre-sourcing-services.hbs'
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
               console.error(`Erreur API entreprendre ${viewPath}:`, error instanceof Error ? error.message : 'Erreur inconnue');
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

// Routes principales entreprendre
Object.entries(entreprendrePages).forEach(([key, config]) => {
  entreprendreCompleteApiRouter.get(`/${key}`, createApiRoute(config, config.viewPath));
});

// Routes sourcing
Object.entries(sourcingPages).forEach(([key, config]) => {
  entreprendreCompleteApiRouter.get(`/sourcing/${key}`, createApiRoute(config, config.viewPath));
});
