// src/routes/api/footer-complete.routes.ts
import { Router } from 'express';
import viewParserService from '../../services/viewParser.service.js';
import { getFooterLinks } from '../../controllers/footer.controller.js';
export const footerCompleteApiRouter = Router();
// Configuration des pages footer
const footerPages = {
    'a-propos': {
        title: 'À propos - Connect People',
        description: 'Découvrez notre mission, notre équipe et notre vision pour un monde plus connecté',
        viewPath: 'a-propos.hbs'
    },
    'press': {
        title: 'Press - Connect People',
        description: 'Communiqués de presse et informations pour les médias',
        viewPath: 'press.hbs'
    },
    'publicites': {
        title: 'Publicités - Connect People',
        description: 'Solutions publicitaires pour promouvoir votre entreprise',
        viewPath: 'publicites.hbs'
    },
    'comment-ca-marche': {
        title: 'Comment ça marche - Connect People',
        description: 'Découvrez comment utiliser notre plateforme d\'entraide',
        viewPath: 'comment-ca-marche.hbs'
    },
    'verification-helper': {
        title: 'Vérification du Helper - Connect People',
        description: 'Processus de vérification de nos helpers professionnels',
        viewPath: 'verification-helper.hbs'
    },
    'connect-people-pro': {
        title: 'Connect People Pro - Connect People',
        description: 'Version professionnelle de notre plateforme d\'entraide',
        viewPath: 'connect-people-pro.hbs'
    },
    'guide-pro': {
        title: 'Guide Pro - Connect People',
        description: 'Guide complet pour les professionnels sur notre plateforme',
        viewPath: 'guide-pro.hbs'
    },
    'centre-aide': {
        title: 'Centre d\'aide - Connect People',
        description: 'Trouvez rapidement les réponses à vos questions',
        viewPath: 'centre-aide.hbs'
    },
    'proposer-aide': {
        title: 'Proposer de l\'aide - Connect People',
        description: 'Comment proposer vos services d\'aide sur notre plateforme',
        viewPath: 'proposer-aide.hbs'
    },
    'demander-aide': {
        title: 'Demander de l\'aide - Connect People',
        description: 'Comment demander de l\'aide sur notre plateforme',
        viewPath: 'demander-aide.hbs'
    },
    'confiance-securite': {
        title: 'Confiance et Sécurité - Connect People',
        description: 'Nos mesures de sécurité et de confiance pour protéger nos utilisateurs',
        viewPath: 'confiance-securite.hbs'
    },
    'centre-protection-vie-privee': {
        title: 'Centre de protection de la vie privée - Connect People',
        description: 'Protection de vos données personnelles et respect de votre vie privée',
        viewPath: 'centre-protection-vie-privee.hbs'
    },
    'politique-cookies': {
        title: 'Politique de cookies - Connect People',
        description: 'Notre politique concernant l\'utilisation des cookies',
        viewPath: 'politique-cookies.hbs'
    },
    'parametres-cookies': {
        title: 'Paramètres des cookies - Connect People',
        description: 'Gérez vos préférences de cookies',
        viewPath: 'parametres-cookies.hbs'
    },
    'termes-conditions': {
        title: 'Termes et conditions - Connect People',
        description: 'Conditions d\'utilisation de notre plateforme',
        viewPath: 'termes-conditions.hbs'
    },
    'notre-plateforme': {
        title: 'Notre plateforme - Connect People',
        description: 'Découvrez les fonctionnalités de notre plateforme d\'entraide',
        viewPath: 'notre-plateforme.hbs'
    },
    'conditions-pro': {
        title: 'Conditions Pro - Connect People',
        description: 'Conditions spécifiques pour les utilisateurs professionnels',
        viewPath: 'conditions-pro.hbs'
    }
};
// Helper pour créer une route API
const createApiRoute = (pageConfig, viewPath) => {
    return async (req, res) => {
        try {
            const pageData = {
                title: pageConfig.title,
                description: pageConfig.description,
                locale: req.query.locale || 'fr'
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
        }
        catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error(`Erreur API footer ${viewPath}:`, error instanceof Error ? error.message : 'Erreur inconnue');
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
// Route pour les liens du footer (API JSON)
footerCompleteApiRouter.get('/links', getFooterLinks);
// Routes footer
Object.entries(footerPages).forEach(([key, config]) => {
    footerCompleteApiRouter.get(`/${key}`, createApiRoute(config, config.viewPath));
});
//# sourceMappingURL=footer-complete.routes.js.map