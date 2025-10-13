// src/routes/dev.routes.ts
import { Router, Request, Response } from 'express';
import { getEntreprendreOptions } from '../controllers/nav-entreprendre.controller.js';
import { getFooterLinks } from '../controllers/footer.controller.js';
import { getSearchCategories } from '../controllers/header.controller.js';

export const devRouter = Router();

// Fonction utilitaire pour créer une route miroir avec données dynamiques
const createDevRoute = (path: string, viewName: string, dataFunction: (req: Request, res: Response, next?: any) => Promise<any>) => {
  devRouter.get(`/dev${path}`, async (req: Request, res: Response) => {
    try {
      // Appeler la fonction qui retourne les données JSON
      const jsonData = await dataFunction(req, res);
      
      // Rendre la vue Handlebars avec les données
      res.render(`pages/${viewName}`, jsonData);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Erreur lors du rendu de la page dev ${path}:`, error instanceof Error ? error.message : 'Erreur inconnue');
        }
      res.status(500).render('pages/404', {
        title: 'Erreur - Connect-People',
        description: 'Erreur lors du chargement de la page.',
        locale: 'fr'
      });
    }
  });
};

// Fonction pour créer des routes avec des données statiques
const createStaticDevRoute = (path: string, viewName: string, staticData: any) => {
  devRouter.get(`/dev${path}`, (_req: Request, res: Response) => {
    try {
      res.render(`pages/${viewName}`, staticData);
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(`Erreur lors du rendu de la page dev ${path}:`, error instanceof Error ? error.message : 'Erreur inconnue');
        }
      res.status(500).render('pages/404', {
        title: 'Erreur - Connect-People',
        description: 'Erreur lors du chargement de la page.',
        locale: 'fr'
      });
    }
  });
};

// Routes miroir pour les pages principales
createStaticDevRoute('/', 'home', {
  title: 'Connect-People - Plateforme de mise en relation',
  description: 'Connectez-vous avec des professionnels pour vos projets',
  locale: 'fr'
});

createStaticDevRoute('/a-propos', 'a-propos', {
  title: 'À propos - Connect-People',
  description: 'Découvrez notre mission et notre équipe',
  locale: 'fr'
});

createStaticDevRoute('/comment-ca-marche', 'comment-ca-marche', {
  title: 'Comment ça marche - Connect-People',
  description: 'Apprenez comment utiliser notre plateforme',
  locale: 'fr'
});

createStaticDevRoute('/centre-aide', 'centre-aide', {
  title: 'Centre d\'aide - Connect-People',
  description: 'Trouvez de l\'aide et des réponses à vos questions',
  locale: 'fr'
});

createStaticDevRoute('/centre-protection-vie-privee', 'centre-protection-vie-privee', {
  title: 'Centre de protection de la vie privée - Connect-People',
  description: 'Protégez votre vie privée et vos données',
  locale: 'fr'
});

createStaticDevRoute('/conditions-pro', 'conditions-pro', {
  title: 'Conditions Pro - Connect-People',
  description: 'Conditions d\'utilisation pour les professionnels',
  locale: 'fr'
});

createStaticDevRoute('/confiance-securite', 'confiance-securite', {
  title: 'Confiance et sécurité - Connect-People',
  description: 'Nos engagements en matière de sécurité',
  locale: 'fr'
});

createStaticDevRoute('/connect-people-pro', 'connect-people-pro', {
  title: 'Connect-People Pro - Connect-People',
  description: 'Solutions professionnelles pour votre entreprise',
  locale: 'fr'
});

createStaticDevRoute('/demander-aide', 'demander-aide', {
  title: 'Demander de l\'aide - Connect-People',
  description: 'Publiez votre demande d\'aide',
  locale: 'fr'
});

createStaticDevRoute('/documentation', 'documentation', {
  title: 'Documentation - Connect-People',
  description: 'Documentation technique et guides',
  locale: 'fr'
});

createStaticDevRoute('/guide-pro', 'guide-pro', {
  title: 'Guide Pro - Connect-People',
  description: 'Guide pour les professionnels',
  locale: 'fr'
});

createStaticDevRoute('/nos-annonces', 'nos-annonces', {
  title: 'Nos annonces - Connect-People',
  description: 'Découvrez toutes nos annonces',
  locale: 'fr'
});

createStaticDevRoute('/nos-helpers', 'nos-helpers', {
  title: 'Nos helpers - Connect-People',
  description: 'Rencontrez nos helpers',
  locale: 'fr'
});

createStaticDevRoute('/politique-cookies', 'politique-cookies', {
  title: 'Politique des cookies - Connect-People',
  description: 'Notre politique concernant les cookies',
  locale: 'fr'
});

createStaticDevRoute('/press', 'press', {
  title: 'Presse - Connect-People',
  description: 'Informations pour la presse',
  locale: 'fr'
});

createStaticDevRoute('/proposer-aide', 'proposer-aide', {
  title: 'Proposer de l\'aide - Connect-People',
  description: 'Proposez vos services d\'aide',
  locale: 'fr'
});

createStaticDevRoute('/publicites', 'publicites', {
  title: 'Publicités - Connect-People',
  description: 'Solutions publicitaires',
  locale: 'fr'
});

createStaticDevRoute('/report', 'report', {
  title: 'Signaler - Connect-People',
  description: 'Signalez un problème',
  locale: 'fr'
});

createStaticDevRoute('/termes-conditions', 'termes-conditions', {
  title: 'Termes et conditions - Connect-People',
  description: 'Nos termes et conditions d\'utilisation',
  locale: 'fr'
});

createStaticDevRoute('/test-icons', 'test-icons', {
  title: 'Test des icônes - Connect-People',
  description: 'Page de test pour les icônes',
  locale: 'fr'
});

createStaticDevRoute('/verification-helper', 'verification-helper', {
  title: 'Vérification helper - Connect-People',
  description: 'Vérifiez votre statut de helper',
  locale: 'fr'
});

// Routes miroir pour les pages entreprendre
createStaticDevRoute('/entreprendre', 'entreprendre/entreprendre-sourcing', {
  title: 'Entreprendre - Connect-People',
  description: 'Solutions pour entreprendre',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/analyse-marche', 'entreprendre/entreprendre-analyse-marche', {
  title: 'Analyse de marché - Connect-People',
  description: 'Analysez votre marché',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/bureaux', 'entreprendre/entreprendre-bureaux', {
  title: 'Bureaux - Connect-People',
  description: 'Trouvez des bureaux pour votre entreprise',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/business-plan', 'entreprendre/entreprendre-business-plan', {
  title: 'Business plan - Connect-People',
  description: 'Créez votre business plan',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/local-commercial', 'entreprendre/entreprendre-local-commercial', {
  title: 'Local commercial - Connect-People',
  description: 'Trouvez un local commercial',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/professionnel', 'entreprendre/entreprendre-professionnel', {
  title: 'Professionnel - Connect-People',
  description: 'Services pour professionnels',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/recruteur', 'entreprendre/entreprendre-recruteur', {
  title: 'Recruteur - Connect-People',
  description: 'Solutions de recrutement',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/sourcing', 'entreprendre/entreprendre-sourcing', {
  title: 'Sourcing - Connect-People',
  description: 'Solutions de sourcing',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/sourcing-equipements', 'entreprendre/entreprendre-sourcing-equipements', {
  title: 'Sourcing équipements - Connect-People',
  description: 'Trouvez vos équipements',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/sourcing-fournisseurs', 'entreprendre/entreprendre-sourcing-fournisseurs', {
  title: 'Sourcing fournisseurs - Connect-People',
  description: 'Trouvez vos fournisseurs',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/sourcing-matieres-premieres', 'entreprendre/entreprendre-sourcing-matieres-premieres', {
  title: 'Sourcing matières premières - Connect-People',
  description: 'Trouvez vos matières premières',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/sourcing-produits', 'entreprendre/entreprendre-sourcing-produits', {
  title: 'Sourcing produits - Connect-People',
  description: 'Trouvez vos produits',
  locale: 'fr'
});

createStaticDevRoute('/entreprendre/sourcing-services', 'entreprendre/entreprendre-sourcing-services', {
  title: 'Sourcing services - Connect-People',
  description: 'Trouvez vos services',
  locale: 'fr'
});

// Routes miroir pour les pages immobilier
createStaticDevRoute('/immobilier/achat-vente', 'immobilier/immobilier-achat-vente', {
  title: 'Achat/Vente immobilier - Connect-People',
  description: 'Achetez ou vendez votre bien immobilier',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/achat-vente-appartement', 'immobilier/immobilier-achat-vente-appartement', {
  title: 'Achat/Vente appartement - Connect-People',
  description: 'Achetez ou vendez un appartement',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/achat-vente-bureaux', 'immobilier/immobilier-achat-vente-bureaux', {
  title: 'Achat/Vente bureaux - Connect-People',
  description: 'Achetez ou vendez des bureaux',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/achat-vente-fond-commerce', 'immobilier/immobilier-achat-vente-fond-commerce', {
  title: 'Achat/Vente fond de commerce - Connect-People',
  description: 'Achetez ou vendez un fond de commerce',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/achat-vente-local-commercial', 'immobilier/immobilier-achat-vente-local-commercial', {
  title: 'Achat/Vente local commercial - Connect-People',
  description: 'Achetez ou vendez un local commercial',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/achat-vente-maison', 'immobilier/immobilier-achat-vente-maison', {
  title: 'Achat/Vente maison - Connect-People',
  description: 'Achetez ou vendez une maison',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/achat-vente-penthouse', 'immobilier/immobilier-achat-vente-penthouse', {
  title: 'Achat/Vente penthouse - Connect-People',
  description: 'Achetez ou vendez un penthouse',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/achat-vente-villa', 'immobilier/immobilier-achat-vente-villa', {
  title: 'Achat/Vente villa - Connect-People',
  description: 'Achetez ou vendez une villa',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/entrepot', 'immobilier/immobilier-entrepot', {
  title: 'Entrepôt - Connect-People',
  description: 'Trouvez un entrepôt',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/hangard', 'immobilier/immobilier-hangard', {
  title: 'Hangar - Connect-People',
  description: 'Trouvez un hangar',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/location', 'immobilier/immobilier-location', {
  title: 'Location immobilier - Connect-People',
  description: 'Louez ou mettez en location',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/location-appartement', 'immobilier/immobilier-location-appartement', {
  title: 'Location appartement - Connect-People',
  description: 'Louez ou mettez en location un appartement',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/location-bureaux', 'immobilier/immobilier-location-bureaux', {
  title: 'Location bureaux - Connect-People',
  description: 'Louez ou mettez en location des bureaux',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/location-fond-commerce', 'immobilier/immobilier-location-fond-commerce', {
  title: 'Location fond de commerce - Connect-People',
  description: 'Louez ou mettez en location un fond de commerce',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/location-local-commercial', 'immobilier/immobilier-location-local-commercial', {
  title: 'Location local commercial - Connect-People',
  description: 'Louez ou mettez en location un local commercial',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/location-maison', 'immobilier/immobilier-location-maison', {
  title: 'Location maison - Connect-People',
  description: 'Louez ou mettez en location une maison',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/location-penthouse', 'immobilier/immobilier-location-penthouse', {
  title: 'Location penthouse - Connect-People',
  description: 'Louez ou mettez en location un penthouse',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/location-villa', 'immobilier/immobilier-location-villa', {
  title: 'Location villa - Connect-People',
  description: 'Louez ou mettez en location une villa',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/terrain', 'immobilier/immobilier-terrain', {
  title: 'Terrain - Connect-People',
  description: 'Trouvez un terrain',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/terrain-agricole', 'immobilier/immobilier-terrain-agricole', {
  title: 'Terrain agricole - Connect-People',
  description: 'Trouvez un terrain agricole',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/terrain-bord-mer', 'immobilier/immobilier-terrain-bord-mer', {
  title: 'Terrain bord de mer - Connect-People',
  description: 'Trouvez un terrain en bord de mer',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/terrain-constructible', 'immobilier/immobilier-terrain-constructible', {
  title: 'Terrain constructible - Connect-People',
  description: 'Trouvez un terrain constructible',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/terrain-forestier', 'immobilier/immobilier-terrain-forestier', {
  title: 'Terrain forestier - Connect-People',
  description: 'Trouvez un terrain forestier',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/terrain-sans-importance', 'immobilier/immobilier-terrain-sans-importance', {
  title: 'Terrain sans importance - Connect-People',
  description: 'Trouvez un terrain sans importance',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/terrain-verger', 'immobilier/immobilier-terrain-verger', {
  title: 'Terrain verger - Connect-People',
  description: 'Trouvez un terrain verger',
  locale: 'fr'
});

createStaticDevRoute('/immobilier/terrain-viticole', 'immobilier/immobilier-terrain-viticole', {
  title: 'Terrain viticole - Connect-People',
  description: 'Trouvez un terrain viticole',
  locale: 'fr'
});

// Routes miroir pour les pages traduction
createStaticDevRoute('/traduction/acte-naissance', 'traduction/traduction-acte-naissance', {
  title: 'Traduction acte de naissance - Connect-People',
  description: 'Traduisez votre acte de naissance',
  locale: 'fr'
});

createStaticDevRoute('/traduction/acts-autre', 'traduction/traduction-acts-autre', {
  title: 'Traduction autres actes - Connect-People',
  description: 'Traduisez d\'autres actes',
  locale: 'fr'
});

createStaticDevRoute('/traduction/acts-bail', 'traduction/traduction-acts-bail', {
  title: 'Traduction acte de bail - Connect-People',
  description: 'Traduisez votre acte de bail',
  locale: 'fr'
});

createStaticDevRoute('/traduction/acts-cession-acquisition', 'traduction/traduction-acts-cession-acquisition', {
  title: 'Traduction acte de cession/acquisition - Connect-People',
  description: 'Traduisez votre acte de cession/acquisition',
  locale: 'fr'
});

createStaticDevRoute('/traduction/acts-jugement', 'traduction/traduction-acts-jugement', {
  title: 'Traduction acte de jugement - Connect-People',
  description: 'Traduisez votre acte de jugement',
  locale: 'fr'
});

createStaticDevRoute('/traduction/acts-notaries', 'traduction/traduction-acts-notaries', {
  title: 'Traduction acte notarié - Connect-People',
  description: 'Traduisez votre acte notarié',
  locale: 'fr'
});

createStaticDevRoute('/traduction/acts-testament', 'traduction/traduction-acts-testament', {
  title: 'Traduction testament - Connect-People',
  description: 'Traduisez votre testament',
  locale: 'fr'
});

createStaticDevRoute('/traduction/casier-judiciaire', 'traduction/traduction-casier-judiciaire', {
  title: 'Traduction casier judiciaire - Connect-People',
  description: 'Traduisez votre casier judiciaire',
  locale: 'fr'
});

createStaticDevRoute('/traduction/diplomes', 'traduction/traduction-diplomes', {
  title: 'Traduction diplômes - Connect-People',
  description: 'Traduisez vos diplômes',
  locale: 'fr'
});

createStaticDevRoute('/traduction/divers', 'traduction/traduction-divers', {
  title: 'Traduction divers - Connect-People',
  description: 'Traduisez vos documents divers',
  locale: 'fr'
});

// Routes miroir pour les APIs avec données dynamiques
createDevRoute('/api/nav/entreprendre', 'entreprendre/entreprendre-sourcing', async (_req: Request, _res: Response, _next?: any) => {
  const data = await getEntreprendreOptions(_req, _res, _next);
  return {
    title: 'Options entreprendre - Connect-People',
    description: 'Options pour entreprendre',
    locale: 'fr',
    entreprendreOptions: data
  };
});

createDevRoute('/api/footer/links', 'footer', async (_req: Request, _res: Response, _next?: any) => {
  const data = await getFooterLinks(_req, _res, _next);
  return {
    title: 'Liens footer - Connect-People',
    description: 'Liens du footer',
    locale: 'fr',
    footerLinks: data
  };
});

createDevRoute('/api/search/categories', 'search', async (_req: Request, _res: Response, _next?: any) => {
  const data = await getSearchCategories(_req, _res, _next);
  return {
    title: 'Catégories de recherche - Connect-People',
    description: 'Catégories de recherche disponibles',
    locale: 'fr',
    searchCategories: data
  };
});

// Route de test pour vérifier que le mode dev fonctionne
devRouter.get('/dev/test', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Mode DEV-VIEW activé',
    availableRoutes: [
      '/dev/',
      '/dev/a-propos',
      '/dev/comment-ca-marche',
      '/dev/centre-aide',
      '/dev/entreprendre',
      '/dev/immobilier/achat-vente',
      '/dev/traduction/acte-naissance',
      '/dev/api/nav/entreprendre',
      '/dev/api/footer/links',
      '/dev/api/search/categories'
    ],
    timestamp: new Date().toISOString()
  });
});
