// src/routes/api/immobilier-complete.routes.ts
import { Router } from 'express';
import viewParserService from '../../services/viewParser.service.js';

export const immobilierCompleteApiRouter: Router = Router();

// Configuration des pages immobilier
const immobilierPages = {
  'achat-vente': {
    title: 'Immobilier Achat & Vente - Connect People',
    description: 'Trouvez l\'aide dont vous avez besoin pour vos projets d\'achat ou de vente immobilière',
    viewPath: 'immobilier/immobilier-achat-vente.hbs'
  },
  'location': {
    title: 'Immobilier Location - Connect People',
    description: 'Trouvez ou proposez des biens en location avec l\'aide de nos experts',
    viewPath: 'immobilier/immobilier-location.hbs'
  },
  'terrain': {
    title: 'Immobilier Terrain - Connect People',
    description: 'Trouvez l\'aide pour vos projets de terrain',
    viewPath: 'immobilier/immobilier-terrain.hbs'
  },
  'entrepot': {
    title: 'Immobilier Entrepôt - Connect People',
    description: 'Trouvez l\'aide pour vos projets d\'entrepôt',
    viewPath: 'immobilier/immobilier-entrepot.hbs'
  },
  'hangard': {
    title: 'Immobilier Hangard - Connect People',
    description: 'Trouvez l\'aide pour vos projets de hangard',
    viewPath: 'immobilier/immobilier-hangard.hbs'
  }
};

// Types d'achat-vente
const achatVenteTypes = {
  'maison': {
    title: 'Achat-Vente Maison - Connect People',
    description: 'Trouvez l\'aide pour acheter ou vendre une maison',
    viewPath: 'immobilier/immobilier-achat-vente-maison.hbs'
  },
  'appartement': {
    title: 'Achat-Vente Appartement - Connect People',
    description: 'Trouvez l\'aide pour acheter ou vendre un appartement',
    viewPath: 'immobilier/immobilier-achat-vente-appartement.hbs'
  },
  'villa': {
    title: 'Achat-Vente Villa - Connect People',
    description: 'Trouvez l\'aide pour acheter ou vendre une villa',
    viewPath: 'immobilier/immobilier-achat-vente-villa.hbs'
  },
  'penthouse': {
    title: 'Achat-Vente Penthouse - Connect People',
    description: 'Trouvez l\'aide pour acheter ou vendre un penthouse',
    viewPath: 'immobilier/immobilier-achat-vente-penthouse.hbs'
  },
  'bureaux': {
    title: 'Achat-Vente Bureaux - Connect People',
    description: 'Trouvez l\'aide pour acheter ou vendre des bureaux',
    viewPath: 'immobilier/immobilier-achat-vente-bureaux.hbs'
  },
  'local-commercial': {
    title: 'Achat-Vente Local Commercial - Connect People',
    description: 'Trouvez l\'aide pour acheter ou vendre un local commercial',
    viewPath: 'immobilier/immobilier-achat-vente-local-commercial.hbs'
  },
  'fond-commerce': {
    title: 'Achat-Vente Fond de Commerce - Connect People',
    description: 'Trouvez l\'aide pour acheter ou vendre un fond de commerce',
    viewPath: 'immobilier/immobilier-achat-vente-fond-commerce.hbs'
  }
};

// Types de location
const locationTypes = {
  'maison': {
    title: 'Location Maison - Connect People',
    description: 'Trouvez l\'aide pour louer une maison',
    viewPath: 'immobilier/immobilier-location-maison.hbs'
  },
  'appartement': {
    title: 'Location Appartement - Connect People',
    description: 'Trouvez l\'aide pour louer un appartement',
    viewPath: 'immobilier/immobilier-location-appartement.hbs'
  },
  'villa': {
    title: 'Location Villa - Connect People',
    description: 'Trouvez l\'aide pour louer une villa',
    viewPath: 'immobilier/immobilier-location-villa.hbs'
  },
  'penthouse': {
    title: 'Location Penthouse - Connect People',
    description: 'Trouvez l\'aide pour louer un penthouse',
    viewPath: 'immobilier/immobilier-location-penthouse.hbs'
  },
  'bureaux': {
    title: 'Location Bureaux - Connect People',
    description: 'Trouvez l\'aide pour louer des bureaux',
    viewPath: 'immobilier/immobilier-location-bureaux.hbs'
  },
  'local-commercial': {
    title: 'Location Local Commercial - Connect People',
    description: 'Trouvez l\'aide pour louer un local commercial',
    viewPath: 'immobilier/immobilier-location-local-commercial.hbs'
  },
  'fond-commerce': {
    title: 'Location Fond de Commerce - Connect People',
    description: 'Trouvez l\'aide pour louer un fond de commerce',
    viewPath: 'immobilier/immobilier-location-fond-commerce.hbs'
  }
};

// Types de terrain
const terrainTypes = {
  'bord-mer': {
    title: 'Terrain Bord de Mer - Connect People',
    description: 'Trouvez l\'aide pour un terrain en bord de mer',
    viewPath: 'immobilier/immobilier-terrain-bord-mer.hbs'
  },
  'verger': {
    title: 'Terrain avec Verger - Connect People',
    description: 'Trouvez l\'aide pour un terrain avec verger',
    viewPath: 'immobilier/immobilier-terrain-verger.hbs'
  },
  'sans-importance': {
    title: 'Terrain Sans Importance - Connect People',
    description: 'Trouvez l\'aide pour un terrain sans importance',
    viewPath: 'immobilier/immobilier-terrain-sans-importance.hbs'
  },
  'constructible': {
    title: 'Terrain Constructible - Connect People',
    description: 'Trouvez l\'aide pour un terrain constructible',
    viewPath: 'immobilier/immobilier-terrain-constructible.hbs'
  },
  'agricole': {
    title: 'Terrain Agricole - Connect People',
    description: 'Trouvez l\'aide pour un terrain agricole',
    viewPath: 'immobilier/immobilier-terrain-agricole.hbs'
  },
  'forestier': {
    title: 'Terrain Forestier - Connect People',
    description: 'Trouvez l\'aide pour un terrain forestier',
    viewPath: 'immobilier/immobilier-terrain-forestier.hbs'
  },
  'viticole': {
    title: 'Terrain Viticole - Connect People',
    description: 'Trouvez l\'aide pour un terrain viticole',
    viewPath: 'immobilier/immobilier-terrain-viticole.hbs'
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
               console.error(`Erreur API immobilier ${viewPath}:`, error instanceof Error ? error.message : 'Erreur inconnue');
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

// Routes principales immobilier
Object.entries(immobilierPages).forEach(([key, config]) => {
  immobilierCompleteApiRouter.get(`/${key}`, createApiRoute(config, config.viewPath));
});

// Routes achat-vente par type
Object.entries(achatVenteTypes).forEach(([key, config]) => {
  immobilierCompleteApiRouter.get(`/achat-vente/${key}`, createApiRoute(config, config.viewPath));
});

// Routes location par type
Object.entries(locationTypes).forEach(([key, config]) => {
  immobilierCompleteApiRouter.get(`/location/${key}`, createApiRoute(config, config.viewPath));
});

// Routes terrain par type
Object.entries(terrainTypes).forEach(([key, config]) => {
  immobilierCompleteApiRouter.get(`/terrain/${key}`, createApiRoute(config, config.viewPath));
});
