// src/routes/web/api-only.routes.ts
import { Router } from 'express';
import { csrfProtection, addCsrfToken } from '../../middlewares/csrf.js';
import { viewModeMiddleware, debugInfoMiddleware } from '../../middlewares/viewMode.middleware.js';
import i18n from '../../config/i18n.js';

const router: Router = Router();

/* ------------------------------------------------------------------ */
/* 1) Middlewares globaux appliqués à TOUTES les routes de ce router  */
/* ------------------------------------------------------------------ */
router.use(i18n.init);           // rend req.__ disponible
router.use(csrfProtection as any);      // sécurise les requêtes
router.use(addCsrfToken);        // injecte le token dans les vues
router.use(viewModeMiddleware);  // détecte le mode (HTML/JSON)
router.use(debugInfoMiddleware); // ajoute des infos de debug

/* ------------------------------------------------------------------ */
/* 2) Routes API REST pures (JSON uniquement)                        */
/* ------------------------------------------------------------------ */

// Helper pour créer une route API pure
const createApiRoute = (viewPath: string, pageData: any) => {
  return async (req: any, res: any) => {
    try {
      const finalPageData = {
        ...pageData,
        locale: req.query.locale as string || 'fr'
      };
      
      res.json({
        success: true,
        data: finalPageData,
        error: null,
        meta: {
          viewPath,
          timestamp: new Date().toISOString(),
          mode: 'api',
          csrfToken: req.csrfToken ? req.csrfToken() : undefined
        }
      });
    } catch (error) {
      console.error(`Erreur API ${viewPath}:`, error);
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

// Page d'accueil
router.get('/', createApiRoute('home.hbs', {
  title: 'Connect People - Plateforme d\'entraide mondiale',
  description: 'Trouvez de l\'aide ou aidez d\'autres personnes partout dans le monde. Fixez vos tarifs, communiquez en toute sécurité, et construisez des relations authentiques.'
}));

// Pages principales
router.get('/nos-helpers', createApiRoute('nos-helpers.hbs', {
  title: 'Nos Helpers - Connect People',
  description: 'Découvrez notre communauté de professionnels qualifiés prêts à vous aider'
}));

router.get('/nos-annonces', createApiRoute('nos-annonces.hbs', {
  title: 'Nos Annonces - Connect People',
  description: 'Parcourez toutes les annonces d\'aide disponibles sur notre plateforme'
}));

router.get('/documentation', createApiRoute('documentation.hbs', {
  title: 'Documentation - Connect People',
  description: 'Tout ce que vous devez savoir pour utiliser Connect People efficacement'
}));

// Pages Immobilier
router.get('/immobilier/achat-vente', createApiRoute('immobilier/immobilier-achat-vente.hbs', {
  title: 'Immobilier Achat & Vente - Connect People',
  description: 'Trouvez l\'aide dont vous avez besoin pour vos projets d\'achat ou de vente immobilière'
}));

router.get('/immobilier/location', createApiRoute('immobilier/immobilier-location.hbs', {
  title: 'Immobilier Location - Connect People',
  description: 'Trouvez ou proposez des biens en location avec l\'aide de nos experts'
}));

// Routes Achat-Vente par type
router.get('/immobilier/achat-vente/maison', createApiRoute('immobilier/immobilier-achat-vente-maison.hbs', {
  title: 'Achat-Vente Maison - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre une maison'
}));

router.get('/immobilier/achat-vente/appartement', createApiRoute('immobilier/immobilier-achat-vente-appartement.hbs', {
  title: 'Achat-Vente Appartement - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre un appartement'
}));

router.get('/immobilier/achat-vente/villa', createApiRoute('immobilier/immobilier-achat-vente-villa.hbs', {
  title: 'Achat-Vente Villa - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre une villa'
}));

router.get('/immobilier/achat-vente/penthouse', createApiRoute('immobilier/immobilier-achat-vente-penthouse.hbs', {
  title: 'Achat-Vente Penthouse - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre un penthouse'
}));

router.get('/immobilier/achat-vente/bureaux', createApiRoute('immobilier/immobilier-achat-vente-bureaux.hbs', {
  title: 'Achat-Vente Bureaux - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre des bureaux'
}));

router.get('/immobilier/achat-vente/local-commercial', createApiRoute('immobilier/immobilier-achat-vente-local-commercial.hbs', {
  title: 'Achat-Vente Local Commercial - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre un local commercial'
}));

router.get('/immobilier/achat-vente/fond-commerce', createApiRoute('immobilier/immobilier-achat-vente-fond-commerce.hbs', {
  title: 'Achat-Vente Fond de Commerce - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre un fond de commerce'
}));

// Routes Location par type
router.get('/immobilier/location/maison', createApiRoute('immobilier/immobilier-location-maison.hbs', {
  title: 'Location Maison - Connect People',
  description: 'Trouvez l\'aide pour louer une maison'
}));

router.get('/immobilier/location/appartement', createApiRoute('immobilier/immobilier-location-appartement.hbs', {
  title: 'Location Appartement - Connect People',
  description: 'Trouvez l\'aide pour louer un appartement'
}));

router.get('/immobilier/location/villa', createApiRoute('immobilier/immobilier-location-villa.hbs', {
  title: 'Location Villa - Connect People',
  description: 'Trouvez l\'aide pour louer une villa'
}));

router.get('/immobilier/location/penthouse', createApiRoute('immobilier/immobilier-location-penthouse.hbs', {
  title: 'Location Penthouse - Connect People',
  description: 'Trouvez l\'aide pour louer un penthouse'
}));

router.get('/immobilier/location/bureaux', createApiRoute('immobilier/immobilier-location-bureaux.hbs', {
  title: 'Location Bureaux - Connect People',
  description: 'Trouvez l\'aide pour louer des bureaux'
}));

router.get('/immobilier/location/local-commercial', createApiRoute('immobilier/immobilier-location-local-commercial.hbs', {
  title: 'Location Local Commercial - Connect People',
  description: 'Trouvez l\'aide pour louer un local commercial'
}));

router.get('/immobilier/location/fond-commerce', createApiRoute('immobilier/immobilier-location-fond-commerce.hbs', {
  title: 'Location Fond de Commerce - Connect People',
  description: 'Trouvez l\'aide pour louer un fond de commerce'
}));

// Routes Terrain
router.get('/immobilier/terrain', createApiRoute('immobilier/immobilier-terrain.hbs', {
  title: 'Immobilier Terrain - Connect People',
  description: 'Trouvez l\'aide pour vos projets de terrain'
}));

router.get('/immobilier/terrain/bord-mer', createApiRoute('immobilier/immobilier-terrain-bord-mer.hbs', {
  title: 'Terrain Bord de Mer - Connect People',
  description: 'Trouvez l\'aide pour un terrain en bord de mer'
}));

router.get('/immobilier/terrain/verger', createApiRoute('immobilier/immobilier-terrain-verger.hbs', {
  title: 'Terrain avec Verger - Connect People',
  description: 'Trouvez l\'aide pour un terrain avec verger'
}));

router.get('/immobilier/terrain/sans-importance', createApiRoute('immobilier/immobilier-terrain-sans-importance.hbs', {
  title: 'Terrain Sans Importance - Connect People',
  description: 'Trouvez l\'aide pour un terrain sans importance'
}));

router.get('/immobilier/terrain/constructible', createApiRoute('immobilier/immobilier-terrain-constructible.hbs', {
  title: 'Terrain Constructible - Connect People',
  description: 'Trouvez l\'aide pour un terrain constructible'
}));

router.get('/immobilier/terrain/agricole', createApiRoute('immobilier/immobilier-terrain-agricole.hbs', {
  title: 'Terrain Agricole - Connect People',
  description: 'Trouvez l\'aide pour un terrain agricole'
}));

router.get('/immobilier/terrain/forestier', createApiRoute('immobilier/immobilier-terrain-forestier.hbs', {
  title: 'Terrain Forestier - Connect People',
  description: 'Trouvez l\'aide pour un terrain forestier'
}));

router.get('/immobilier/terrain/viticole', createApiRoute('immobilier/immobilier-terrain-viticole.hbs', {
  title: 'Terrain Viticole - Connect People',
  description: 'Trouvez l\'aide pour un terrain viticole'
}));

// Autres routes Immobilier
router.get('/immobilier/entrepot', createApiRoute('immobilier/immobilier-entrepot.hbs', {
  title: 'Immobilier Entrepôt - Connect People',
  description: 'Trouvez l\'aide pour vos projets d\'entrepôt'
}));

router.get('/immobilier/hangard', createApiRoute('immobilier/immobilier-hangard.hbs', {
  title: 'Immobilier Hangard - Connect People',
  description: 'Trouvez l\'aide pour vos projets de hangard'
}));

// Pages Entreprendre
router.get('/entreprendre/analyse-marche', createApiRoute('entreprendre/entreprendre-analyse-marche.hbs', {
  title: 'Analyse de marché - Connect People',
  description: 'Obtenez une analyse complète de votre marché avec l\'aide de nos experts'
}));

router.get('/entreprendre/business-plan', createApiRoute('entreprendre/entreprendre-business-plan.hbs', {
  title: 'Réaliser un Business Plan - Connect People',
  description: 'Créez un business plan professionnel avec l\'aide de nos experts'
}));

// Routes Sourcing
router.get('/entreprendre/sourcing', createApiRoute('entreprendre/entreprendre-sourcing.hbs', {
  title: 'Sourcing - Connect People',
  description: 'Trouvez les meilleurs fournisseurs et produits pour votre entreprise'
}));

router.get('/entreprendre/sourcing/produits', createApiRoute('entreprendre/entreprendre-sourcing-produits.hbs', {
  title: 'Sourcing Produits - Connect People',
  description: 'Trouvez les meilleurs produits pour votre entreprise'
}));

router.get('/entreprendre/sourcing/fournisseurs', createApiRoute('entreprendre/entreprendre-sourcing-fournisseurs.hbs', {
  title: 'Sourcing Fournisseurs - Connect People',
  description: 'Trouvez des fournisseurs fiables pour votre entreprise'
}));

router.get('/entreprendre/sourcing/matieres-premieres', createApiRoute('entreprendre/entreprendre-sourcing-matieres-premieres.hbs', {
  title: 'Sourcing Matières Premières - Connect People',
  description: 'Trouvez les meilleures matières premières pour votre production'
}));

router.get('/entreprendre/sourcing/equipements', createApiRoute('entreprendre/entreprendre-sourcing-equipements.hbs', {
  title: 'Sourcing Équipements - Connect People',
  description: 'Trouvez l\'équipement nécessaire pour votre entreprise'
}));

router.get('/entreprendre/sourcing/services', createApiRoute('entreprendre/entreprendre-sourcing-services.hbs', {
  title: 'Sourcing Services - Connect People',
  description: 'Trouvez les services professionnels dont vous avez besoin'
}));

// Autres routes Entreprendre
router.get('/entreprendre/local-commercial', createApiRoute('entreprendre/entreprendre-local-commercial.hbs', {
  title: 'Trouver un Local Commercial - Connect People',
  description: 'Trouvez le local commercial idéal pour votre entreprise'
}));

router.get('/entreprendre/bureaux', createApiRoute('entreprendre/entreprendre-bureaux.hbs', {
  title: 'Trouver des Bureaux - Connect People',
  description: 'Trouvez des bureaux adaptés à vos besoins professionnels'
}));

router.get('/entreprendre/recruteur', createApiRoute('entreprendre/entreprendre-recruteur.hbs', {
  title: 'Trouver un Recruteur - Connect People',
  description: 'Trouvez un recruteur professionnel pour vos besoins RH'
}));

router.get('/entreprendre/professionnel', createApiRoute('entreprendre/entreprendre-professionnel.hbs', {
  title: 'Trouver un Professionnel - Connect People',
  description: 'Trouvez des professionnels qualifiés pour votre entreprise'
}));

// Pages Traduction
router.get('/traduction/acts-notaries', createApiRoute('traduction/traduction-acts-notaries.hbs', {
  title: 'Traduction d\'Acts Notariés - Connect People',
  description: 'Traduction professionnelle de vos documents notariés par des experts certifiés'
}));

router.get('/traduction/diplomes', createApiRoute('traduction/traduction-diplomes.hbs', {
  title: 'Traduction de Diplômes - Connect People',
  description: 'Traduction officielle de vos diplômes et certificats par des traducteurs agréés'
}));

// Routes Acts Notariés par type
router.get('/traduction/acts-notaries/cession-acquisition', createApiRoute('traduction/traduction-acts-cession-acquisition.hbs', {
  title: 'Traduction Cession-Acquisition - Connect People',
  description: 'Traduction professionnelle de documents de cession-acquisition'
}));

router.get('/traduction/acts-notaries/testament', createApiRoute('traduction/traduction-acts-testament.hbs', {
  title: 'Traduction Testament - Connect People',
  description: 'Traduction professionnelle de testaments'
}));

router.get('/traduction/acts-notaries/bail', createApiRoute('traduction/traduction-acts-bail.hbs', {
  title: 'Traduction Bail - Connect People',
  description: 'Traduction professionnelle de baux'
}));

router.get('/traduction/acts-notaries/jugement', createApiRoute('traduction/traduction-acts-jugement.hbs', {
  title: 'Traduction Jugement - Connect People',
  description: 'Traduction professionnelle de jugements'
}));

router.get('/traduction/acts-notaries/autre', createApiRoute('traduction/traduction-acts-autre.hbs', {
  title: 'Traduction Autres Acts Notariés - Connect People',
  description: 'Traduction professionnelle d\'autres documents notariés'
}));

// Autres routes Traduction
router.get('/traduction/acte-naissance', createApiRoute('traduction/traduction-acte-naissance.hbs', {
  title: 'Traduction Acte de Naissance - Connect People',
  description: 'Traduction officielle d\'extraits d\'acte de naissance'
}));

router.get('/traduction/casier-judiciaire', createApiRoute('traduction/traduction-casier-judiciaire.hbs', {
  title: 'Traduction Casier Judiciaire - Connect People',
  description: 'Traduction officielle de casiers judiciaires'
}));

router.get('/traduction/divers', createApiRoute('traduction/traduction-divers.hbs', {
  title: 'Traduction Divers - Connect People',
  description: 'Traduction de documents divers par des professionnels'
}));

// Pages Footer
router.get('/a-propos', createApiRoute('a-propos.hbs', {
  title: 'À propos - Connect People',
  description: 'Découvrez notre mission, notre équipe et notre vision pour un monde plus connecté'
}));

router.get('/press', createApiRoute('press.hbs', {
  title: 'Press - Connect People',
  description: 'Communiqués de presse et informations pour les médias'
}));

router.get('/publicites', createApiRoute('publicites.hbs', {
  title: 'Publicités - Connect People',
  description: 'Solutions publicitaires pour promouvoir votre entreprise'
}));

router.get('/comment-ca-marche', createApiRoute('comment-ca-marche.hbs', {
  title: 'Comment ça marche - Connect People',
  description: 'Découvrez comment utiliser notre plateforme d\'entraide'
}));

router.get('/verification-helper', createApiRoute('verification-helper.hbs', {
  title: 'Vérification du Helper - Connect People',
  description: 'Processus de vérification de nos helpers professionnels'
}));

router.get('/connect-people-pro', createApiRoute('connect-people-pro.hbs', {
  title: 'Connect People Pro - Connect People',
  description: 'Version professionnelle de notre plateforme d\'entraide'
}));

router.get('/guide-pro', createApiRoute('guide-pro.hbs', {
  title: 'Guide Pro - Connect People',
  description: 'Guide complet pour les professionnels sur notre plateforme'
}));

router.get('/centre-aide', createApiRoute('centre-aide.hbs', {
  title: 'Centre d\'aide - Connect People',
  description: 'Trouvez rapidement les réponses à vos questions'
}));

router.get('/proposer-aide', createApiRoute('proposer-aide.hbs', {
  title: 'Proposer de l\'aide - Connect People',
  description: 'Comment proposer vos services d\'aide sur notre plateforme'
}));

router.get('/demander-aide', createApiRoute('demander-aide.hbs', {
  title: 'Demander de l\'aide - Connect People',
  description: 'Comment demander de l\'aide sur notre plateforme'
}));

router.get('/confiance-securite', createApiRoute('confiance-securite.hbs', {
  title: 'Confiance et Sécurité - Connect People',
  description: 'Nos mesures de sécurité et de confiance pour protéger nos utilisateurs'
}));

// Pages légales
router.get('/centre-protection-vie-privee', createApiRoute('centre-protection-vie-privee.hbs', {
  title: 'Centre de protection de la vie privée - Connect People',
  description: 'Protection de vos données personnelles et respect de votre vie privée'
}));

router.get('/politique-cookies', createApiRoute('politique-cookies.hbs', {
  title: 'Politique de cookies - Connect People',
  description: 'Notre politique concernant l\'utilisation des cookies'
}));

router.get('/parametres-cookies', createApiRoute('parametres-cookies.hbs', {
  title: 'Paramètres des cookies - Connect People',
  description: 'Gérez vos préférences de cookies'
}));

router.get('/termes-conditions', createApiRoute('termes-conditions.hbs', {
  title: 'Termes et conditions - Connect People',
  description: 'Conditions d\'utilisation de notre plateforme'
}));

router.get('/notre-plateforme', createApiRoute('notre-plateforme.hbs', {
  title: 'Notre plateforme - Connect People',
  description: 'Découvrez les fonctionnalités de notre plateforme d\'entraide'
}));

router.get('/conditions-pro', createApiRoute('conditions-pro.hbs', {
  title: 'Conditions Pro - Connect People',
  description: 'Conditions spécifiques pour les utilisateurs professionnels'
}));

// Page de test des icônes
router.get('/test-icons', createApiRoute('test-icons.hbs', {
  title: 'Test des icônes - Connect People',
  description: 'Page de test pour vérifier l\'affichage des icônes Font Awesome'
}));

// Page 404
router.get('/404', createApiRoute('404.hbs', {
  title: 'Page non trouvée - Connect People',
  description: 'La page que vous recherchez n\'existe pas'
}));

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
