// web/index.ts
import { Router } from 'express';
import { csrfProtection, addCsrfToken } from '../../middlewares/csrf.js';
import { viewModeMiddleware, debugInfoMiddleware } from '../../middlewares/viewMode.middleware.js';
import { createDualRoute } from '../../middlewares/dualResponse.middleware.js';
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
/* 2) Routes avec double réponse (API JSON + Vue HTML)                */
/* ------------------------------------------------------------------ */

// Page d'accueil
router.get('/', createDualRoute('home.hbs', {
  title: 'Connect People - Plateforme d\'entraide mondiale',
  description: 'Trouvez de l\'aide ou aidez d\'autres personnes partout dans le monde. Fixez vos tarifs, communiquez en toute sécurité, et construisez des relations authentiques.',
  locale: 'fr'
}));

// Pages principales
router.get('/nos-helpers', createDualRoute('nos-helpers.hbs', {
  title: 'Nos Helpers - Connect People',
  description: 'Découvrez notre communauté de professionnels qualifiés prêts à vous aider',
  locale: 'fr'
}));

router.get('/nos-annonces', createDualRoute('nos-annonces.hbs', {
  title: 'Nos Annonces - Connect People',
  description: 'Parcourez toutes les annonces d\'aide disponibles sur notre plateforme',
  locale: 'fr'
}));

router.get('/documentation', createDualRoute('documentation.hbs', {
  title: 'Documentation - Connect People',
  description: 'Tout ce que vous devez savoir pour utiliser Connect People efficacement',
  locale: 'fr'
}));

// Pages Immobilier
router.get('/immobilier/achat-vente', createDualRoute('immobilier/immobilier-achat-vente.hbs', {
  title: 'Immobilier Achat & Vente - Connect People',
  description: 'Trouvez l\'aide dont vous avez besoin pour vos projets d\'achat ou de vente immobilière',
  locale: 'fr'
}));

router.get('/immobilier/location', createDualRoute('immobilier/immobilier-location.hbs', {
  title: 'Immobilier Location - Connect People',
  description: 'Trouvez ou proposez des biens en location avec l\'aide de nos experts',
  locale: 'fr'
}));

// Routes Achat-Vente par type
router.get('/immobilier/achat-vente/maison', createDualRoute('immobilier/immobilier-achat-vente-maison.hbs', {
  title: 'Achat-Vente Maison - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre une maison',
  locale: 'fr'
}));

router.get('/immobilier/achat-vente/appartement', createDualRoute('immobilier/immobilier-achat-vente-appartement.hbs', {
  title: 'Achat-Vente Appartement - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre un appartement',
  locale: 'fr'
}));

router.get('/immobilier/achat-vente/villa', createDualRoute('immobilier/immobilier-achat-vente-villa.hbs', {
  title: 'Achat-Vente Villa - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre une villa',
  locale: 'fr'
}));

router.get('/immobilier/achat-vente/penthouse', createDualRoute('immobilier/immobilier-achat-vente-penthouse.hbs', {
  title: 'Achat-Vente Penthouse - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre un penthouse',
  locale: 'fr'
}));

router.get('/immobilier/achat-vente/bureaux', createDualRoute('immobilier/immobilier-achat-vente-bureaux.hbs', {
  title: 'Achat-Vente Bureaux - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre des bureaux',
  locale: 'fr'
}));

router.get('/immobilier/achat-vente/local-commercial', createDualRoute('immobilier/immobilier-achat-vente-local-commercial.hbs', {
  title: 'Achat-Vente Local Commercial - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre un local commercial',
  locale: 'fr'
}));

router.get('/immobilier/achat-vente/fond-commerce', createDualRoute('immobilier/immobilier-achat-vente-fond-commerce.hbs', {
  title: 'Achat-Vente Fond de Commerce - Connect People',
  description: 'Trouvez l\'aide pour acheter ou vendre un fond de commerce',
  locale: 'fr'
}));

// Routes Location par type
router.get('/immobilier/location/maison', createDualRoute('immobilier/immobilier-location-maison.hbs', {
  title: 'Location Maison - Connect People',
  description: 'Trouvez l\'aide pour louer une maison',
  locale: 'fr'
}));

router.get('/immobilier/location/appartement', createDualRoute('immobilier/immobilier-location-appartement.hbs', {
  title: 'Location Appartement - Connect People',
  description: 'Trouvez l\'aide pour louer un appartement',
  locale: 'fr'
}));

router.get('/immobilier/location/villa', createDualRoute('immobilier/immobilier-location-villa.hbs', {
  title: 'Location Villa - Connect People',
  description: 'Trouvez l\'aide pour louer une villa',
  locale: 'fr'
}));

router.get('/immobilier/location/penthouse', createDualRoute('immobilier/immobilier-location-penthouse.hbs', {
  title: 'Location Penthouse - Connect People',
  description: 'Trouvez l\'aide pour louer un penthouse',
  locale: 'fr'
}));

router.get('/immobilier/location/bureaux', createDualRoute('immobilier/immobilier-location-bureaux.hbs', {
  title: 'Location Bureaux - Connect People',
  description: 'Trouvez l\'aide pour louer des bureaux',
  locale: 'fr'
}));

router.get('/immobilier/location/local-commercial', createDualRoute('immobilier/immobilier-location-local-commercial.hbs', {
  title: 'Location Local Commercial - Connect People',
  description: 'Trouvez l\'aide pour louer un local commercial',
  locale: 'fr'
}));

router.get('/immobilier/location/fond-commerce', createDualRoute('immobilier/immobilier-location-fond-commerce.hbs', {
  title: 'Location Fond de Commerce - Connect People',
  description: 'Trouvez l\'aide pour louer un fond de commerce',
  locale: 'fr'
}));

// Routes Terrain
router.get('/immobilier/terrain', createDualRoute('immobilier/immobilier-terrain.hbs', {
  title: 'Immobilier Terrain - Connect People',
  description: 'Trouvez l\'aide pour vos projets de terrain',
  locale: 'fr'
}));

router.get('/immobilier/terrain/bord-mer', createDualRoute('immobilier/immobilier-terrain-bord-mer.hbs', {
  title: 'Terrain Bord de Mer - Connect People',
  description: 'Trouvez l\'aide pour un terrain en bord de mer',
  locale: 'fr'
}));

router.get('/immobilier/terrain/verger', createDualRoute('immobilier/immobilier-terrain-verger.hbs', {
  title: 'Terrain avec Verger - Connect People',
  description: 'Trouvez l\'aide pour un terrain avec verger',
  locale: 'fr'
}));

router.get('/immobilier/terrain/sans-importance', createDualRoute('immobilier/immobilier-terrain-sans-importance.hbs', {
  title: 'Terrain Sans Importance - Connect People',
  description: 'Trouvez l\'aide pour un terrain sans importance',
  locale: 'fr'
}));

router.get('/immobilier/terrain/constructible', createDualRoute('immobilier/immobilier-terrain-constructible.hbs', {
  title: 'Terrain Constructible - Connect People',
  description: 'Trouvez l\'aide pour un terrain constructible',
  locale: 'fr'
}));

router.get('/immobilier/terrain/agricole', createDualRoute('immobilier/immobilier-terrain-agricole.hbs', {
  title: 'Terrain Agricole - Connect People',
  description: 'Trouvez l\'aide pour un terrain agricole',
  locale: 'fr'
}));

router.get('/immobilier/terrain/forestier', createDualRoute('immobilier/immobilier-terrain-forestier.hbs', {
  title: 'Terrain Forestier - Connect People',
  description: 'Trouvez l\'aide pour un terrain forestier',
  locale: 'fr'
}));

router.get('/immobilier/terrain/viticole', createDualRoute('immobilier/immobilier-terrain-viticole.hbs', {
  title: 'Terrain Viticole - Connect People',
  description: 'Trouvez l\'aide pour un terrain viticole',
  locale: 'fr'
}));

// Autres routes Immobilier
router.get('/immobilier/entrepot', createDualRoute('immobilier/immobilier-entrepot.hbs', {
  title: 'Immobilier Entrepôt - Connect People',
  description: 'Trouvez l\'aide pour vos projets d\'entrepôt',
  locale: 'fr'
}));

router.get('/immobilier/hangard', createDualRoute('immobilier/immobilier-hangard.hbs', {
  title: 'Immobilier Hangard - Connect People',
  description: 'Trouvez l\'aide pour vos projets de hangard',
  locale: 'fr'
}));

// Pages Entreprendre
router.get('/entreprendre/analyse-marche', createDualRoute('entreprendre/entreprendre-analyse-marche.hbs', {
  title: 'Analyse de marché - Connect People',
  description: 'Obtenez une analyse complète de votre marché avec l\'aide de nos experts',
  locale: 'fr'
}));

router.get('/entreprendre/business-plan', createDualRoute('entreprendre/entreprendre-business-plan.hbs', {
  title: 'Réaliser un Business Plan - Connect People',
  description: 'Créez un business plan professionnel avec l\'aide de nos experts',
  locale: 'fr'
}));

// Routes Sourcing
router.get('/entreprendre/sourcing', createDualRoute('entreprendre/entreprendre-sourcing.hbs', {
  title: 'Sourcing - Connect People',
  description: 'Trouvez les meilleurs fournisseurs et produits pour votre entreprise',
  locale: 'fr'
}));

router.get('/entreprendre/sourcing/produits', createDualRoute('entreprendre/entreprendre-sourcing-produits.hbs', {
  title: 'Sourcing Produits - Connect People',
  description: 'Trouvez les meilleurs produits pour votre entreprise',
  locale: 'fr'
}));

router.get('/entreprendre/sourcing/fournisseurs', createDualRoute('entreprendre/entreprendre-sourcing-fournisseurs.hbs', {
  title: 'Sourcing Fournisseurs - Connect People',
  description: 'Trouvez des fournisseurs fiables pour votre entreprise',
  locale: 'fr'
}));

router.get('/entreprendre/sourcing/matieres-premieres', createDualRoute('entreprendre/entreprendre-sourcing-matieres-premieres.hbs', {
  title: 'Sourcing Matières Premières - Connect People',
  description: 'Trouvez les meilleures matières premières pour votre production',
  locale: 'fr'
}));

router.get('/entreprendre/sourcing/equipements', createDualRoute('entreprendre/entreprendre-sourcing-equipements.hbs', {
  title: 'Sourcing Équipements - Connect People',
  description: 'Trouvez l\'équipement nécessaire pour votre entreprise',
  locale: 'fr'
}));

router.get('/entreprendre/sourcing/services', createDualRoute('entreprendre/entreprendre-sourcing-services.hbs', {
  title: 'Sourcing Services - Connect People',
  description: 'Trouvez les services professionnels dont vous avez besoin',
  locale: 'fr'
}));

// Autres routes Entreprendre
router.get('/entreprendre/local-commercial', createDualRoute('entreprendre/entreprendre-local-commercial.hbs', {
  title: 'Trouver un Local Commercial - Connect People',
  description: 'Trouvez le local commercial idéal pour votre entreprise',
  locale: 'fr'
}));

router.get('/entreprendre/bureaux', createDualRoute('entreprendre/entreprendre-bureaux.hbs', {
  title: 'Trouver des Bureaux - Connect People',
  description: 'Trouvez des bureaux adaptés à vos besoins professionnels',
  locale: 'fr'
}));

router.get('/entreprendre/recruteur', createDualRoute('entreprendre/entreprendre-recruteur.hbs', {
  title: 'Trouver un Recruteur - Connect People',
  description: 'Trouvez un recruteur professionnel pour vos besoins RH',
  locale: 'fr'
}));

router.get('/entreprendre/professionnel', createDualRoute('entreprendre/entreprendre-professionnel.hbs', {
  title: 'Trouver un Professionnel - Connect People',
  description: 'Trouvez des professionnels qualifiés pour votre entreprise',
  locale: 'fr'
}));

// Pages Traduction
router.get('/traduction/acts-notaries', createDualRoute('traduction/traduction-acts-notaries.hbs', {
  title: 'Traduction d\'Acts Notariés - Connect People',
  description: 'Traduction professionnelle de vos documents notariés par des experts certifiés',
  locale: 'fr'
}));

router.get('/traduction/diplomes', createDualRoute('traduction/traduction-diplomes.hbs', {
  title: 'Traduction de Diplômes - Connect People',
  description: 'Traduction officielle de vos diplômes et certificats par des traducteurs agréés',
  locale: 'fr'
}));

// Routes Acts Notariés par type
router.get('/traduction/acts-notaries/cession-acquisition', createDualRoute('traduction/traduction-acts-cession-acquisition.hbs', {
  title: 'Traduction Cession-Acquisition - Connect People',
  description: 'Traduction professionnelle de documents de cession-acquisition',
  locale: 'fr'
}));

router.get('/traduction/acts-notaries/testament', createDualRoute('traduction/traduction-acts-testament.hbs', {
  title: 'Traduction Testament - Connect People',
  description: 'Traduction professionnelle de testaments',
  locale: 'fr'
}));

router.get('/traduction/acts-notaries/bail', createDualRoute('traduction/traduction-acts-bail.hbs', {
  title: 'Traduction Bail - Connect People',
  description: 'Traduction professionnelle de baux',
  locale: 'fr'
}));

router.get('/traduction/acts-notaries/jugement', createDualRoute('traduction/traduction-acts-jugement.hbs', {
  title: 'Traduction Jugement - Connect People',
  description: 'Traduction professionnelle de jugements',
  locale: 'fr'
}));

router.get('/traduction/acts-notaries/autre', createDualRoute('traduction/traduction-acts-autre.hbs', {
  title: 'Traduction Autres Acts Notariés - Connect People',
  description: 'Traduction professionnelle d\'autres documents notariés',
  locale: 'fr'
}));

// Autres routes Traduction
router.get('/traduction/acte-naissance', createDualRoute('traduction/traduction-acte-naissance.hbs', {
  title: 'Traduction Acte de Naissance - Connect People',
  description: 'Traduction officielle d\'extraits d\'acte de naissance',
  locale: 'fr'
}));

router.get('/traduction/casier-judiciaire', createDualRoute('traduction/traduction-casier-judiciaire.hbs', {
  title: 'Traduction Casier Judiciaire - Connect People',
  description: 'Traduction officielle de casiers judiciaires',
  locale: 'fr'
}));

router.get('/traduction/divers', createDualRoute('traduction/traduction-divers.hbs', {
  title: 'Traduction Divers - Connect People',
  description: 'Traduction de documents divers par des professionnels',
  locale: 'fr'
}));

// Pages Footer
router.get('/a-propos', createDualRoute('a-propos.hbs', {
  title: 'À propos - Connect People',
  description: 'Découvrez notre mission, notre équipe et notre vision pour un monde plus connecté',
  locale: 'fr'
}));

router.get('/press', createDualRoute('press.hbs', {
  title: 'Press - Connect People',
  description: 'Communiqués de presse et informations pour les médias',
  locale: 'fr'
}));

router.get('/publicites', createDualRoute('publicites.hbs', {
  title: 'Publicités - Connect People',
  description: 'Solutions publicitaires pour promouvoir votre entreprise',
  locale: 'fr'
}));

router.get('/comment-ca-marche', createDualRoute('comment-ca-marche.hbs', {
  title: 'Comment ça marche - Connect People',
  description: 'Découvrez comment utiliser notre plateforme d\'entraide',
  locale: 'fr'
}));

router.get('/verification-helper', createDualRoute('verification-helper.hbs', {
  title: 'Vérification du Helper - Connect People',
  description: 'Processus de vérification de nos helpers professionnels',
  locale: 'fr'
}));

router.get('/connect-people-pro', createDualRoute('connect-people-pro.hbs', {
  title: 'Connect People Pro - Connect People',
  description: 'Version professionnelle de notre plateforme d\'entraide',
  locale: 'fr'
}));

router.get('/guide-pro', createDualRoute('guide-pro.hbs', {
  title: 'Guide Pro - Connect People',
  description: 'Guide complet pour les professionnels sur notre plateforme',
  locale: 'fr'
}));

router.get('/centre-aide', createDualRoute('centre-aide.hbs', {
  title: 'Centre d\'aide - Connect People',
  description: 'Trouvez rapidement les réponses à vos questions',
  locale: 'fr'
}));

router.get('/proposer-aide', createDualRoute('proposer-aide.hbs', {
  title: 'Proposer de l\'aide - Connect People',
  description: 'Comment proposer vos services d\'aide sur notre plateforme',
  locale: 'fr'
}));

router.get('/demander-aide', createDualRoute('demander-aide.hbs', {
  title: 'Demander de l\'aide - Connect People',
  description: 'Comment demander de l\'aide sur notre plateforme',
  locale: 'fr'
}));

router.get('/confiance-securite', createDualRoute('confiance-securite.hbs', {
  title: 'Confiance et Sécurité - Connect People',
  description: 'Nos mesures de sécurité et de confiance pour protéger nos utilisateurs',
  locale: 'fr'
}));

// Pages légales
router.get('/centre-protection-vie-privee', createDualRoute('centre-protection-vie-privee.hbs', {
  title: 'Centre de protection de la vie privée - Connect People',
  description: 'Protection de vos données personnelles et respect de votre vie privée',
  locale: 'fr'
}));

router.get('/politique-cookies', createDualRoute('politique-cookies.hbs', {
  title: 'Politique de cookies - Connect People',
  description: 'Notre politique concernant l\'utilisation des cookies',
  locale: 'fr'
}));

router.get('/parametres-cookies', createDualRoute('parametres-cookies.hbs', {
  title: 'Paramètres des cookies - Connect People',
  description: 'Gérez vos préférences de cookies',
  locale: 'fr'
}));

router.get('/termes-conditions', createDualRoute('termes-conditions.hbs', {
  title: 'Termes et conditions - Connect People',
  description: 'Conditions d\'utilisation de notre plateforme',
  locale: 'fr'
}));

router.get('/notre-plateforme', createDualRoute('notre-plateforme.hbs', {
  title: 'Notre plateforme - Connect People',
  description: 'Découvrez les fonctionnalités de notre plateforme d\'entraide',
  locale: 'fr'
}));

router.get('/conditions-pro', createDualRoute('conditions-pro.hbs', {
  title: 'Conditions Pro - Connect People',
  description: 'Conditions spécifiques pour les utilisateurs professionnels',
  locale: 'fr'
}));

// Page de test des icônes
router.get('/test-icons', createDualRoute('test-icons.hbs', {
  title: 'Test des icônes - Connect People',
  description: 'Page de test pour vérifier l\'affichage des icônes Font Awesome',
  locale: 'fr'
}));

// Page 404
router.get('/404', createDualRoute('404.hbs', {
  title: 'Page non trouvée - Connect People',
  description: 'La page que vous recherchez n\'existe pas',
  locale: 'fr'
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