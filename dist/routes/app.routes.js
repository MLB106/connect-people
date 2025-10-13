// src/routes/app.routes.ts
import { Router } from 'express';
const router = Router();
// Pages disponibles pour l'application côté client
const availablePages = [
    'home',
    'nos-helpers',
    'nos-annonces',
    'documentation'
];
// Données de contenu pour chaque page (générées dynamiquement)
const getPageData = (page) => {
    const baseData = {
        title: 'Connect People',
        description: 'Plateforme d\'entraide mondiale',
        locale: 'fr',
        timestamp: new Date().toISOString()
    };
    switch (page) {
        case 'home':
            return {
                ...baseData,
                title: 'Connect People - Accueil',
                description: 'Plateforme d\'entraide mondiale pour connecter les personnes',
                content: {
                    hero: {
                        title: 'Connectez-vous avec le monde',
                        subtitle: 'Trouvez de l\'aide, partagez vos compétences et créez des liens durables',
                        cta: 'Commencer maintenant'
                    },
                    features: [
                        {
                            icon: 'fa-globe',
                            title: 'Mondial',
                            description: 'Connectez-vous avec des personnes du monde entier'
                        },
                        {
                            icon: 'fa-handshake',
                            title: 'Entraide',
                            description: 'Offrez et recevez de l\'aide dans tous les domaines'
                        },
                        {
                            icon: 'fa-shield-alt',
                            title: 'Sécurisé',
                            description: 'Plateforme sécurisée et vérifiée'
                        }
                    ],
                    stats: {
                        users: '10,000+',
                        countries: '50+',
                        languages: '15+'
                    }
                }
            };
        case 'nos-helpers':
            return {
                ...baseData,
                title: 'Nos Helpers - Connect People',
                description: 'Découvrez nos helpers qualifiés prêts à vous aider',
                content: {
                    hero: {
                        title: 'Nos Helpers',
                        subtitle: 'Des professionnels qualifiés prêts à vous accompagner',
                        cta: 'Voir les helpers'
                    },
                    categories: [
                        { name: 'Technologie', icon: 'fa-laptop-code', count: 150 },
                        { name: 'Langues', icon: 'fa-language', count: 200 },
                        { name: 'Business', icon: 'fa-briefcase', count: 100 },
                        { name: 'Créatif', icon: 'fa-palette', count: 80 }
                    ]
                }
            };
        case 'nos-annonces':
            return {
                ...baseData,
                title: 'Annonces - Connect People',
                description: 'Découvrez les dernières annonces d\'entraide',
                content: {
                    hero: {
                        title: 'Annonces',
                        subtitle: 'Trouvez ou publiez des annonces d\'entraide',
                        cta: 'Publier une annonce'
                    },
                    filters: ['Toutes', 'Technologie', 'Langues', 'Business', 'Créatif'],
                    announcements: [
                        {
                            title: 'Cours de français en ligne',
                            category: 'Langues',
                            price: 'Gratuit',
                            location: 'Paris, France',
                            rating: 4.8
                        },
                        {
                            title: 'Aide développement web',
                            category: 'Technologie',
                            price: '20€/h',
                            location: 'Lyon, France',
                            rating: 4.9
                        }
                    ]
                }
            };
        case 'documentation':
            return {
                ...baseData,
                title: 'Documentation - Connect People',
                description: 'Guide complet pour utiliser Connect People',
                content: {
                    hero: {
                        title: 'Documentation',
                        subtitle: 'Tout ce qu\'il faut savoir pour bien utiliser la plateforme',
                        cta: 'Commencer à lire'
                    },
                    sections: [
                        {
                            title: 'Premiers pas',
                            articles: ['Créer un compte', 'Compléter son profil', 'Première connexion']
                        },
                        {
                            title: 'Utilisation',
                            articles: ['Trouver de l\'aide', 'Offrir ses services', 'Gérer ses annonces']
                        },
                        {
                            title: 'Sécurité',
                            articles: ['Protection des données', 'Règles de la communauté', 'Signaler un problème']
                        }
                    ]
                }
            };
        default:
            return {
                ...baseData,
                title: 'Page non trouvée - Connect People',
                description: 'La page demandée n\'existe pas'
            };
    }
};
// Route principale pour servir le squelette HTML vide
router.get('/:page', (req, res) => {
    try {
        const { page } = req.params;
        // Vérifier si la page est disponible
        if (!availablePages.includes(page)) {
            return res.status(404).render('layouts/main', {
                pageName: 'error',
                title: 'Page non trouvée - Connect People',
                description: 'La page demandée n\'existe pas',
                locale: 'fr',
                layout: false // Désactiver le layout par défaut
            });
        }
        // Servir le squelette HTML vide - tout le contenu sera généré par JavaScript
        return res.render('layouts/main', {
            pageName: page,
            title: 'Connect People - Chargement...',
            description: 'Plateforme d\'entraide mondiale - Chargement en cours...',
            locale: 'fr',
            layout: false // Désactiver le layout par défaut
        });
    }
    catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erreur lors du chargement de la page app:', error instanceof Error ? error.message : 'Erreur inconnue');
        }
        return res.status(500).render('layouts/main', {
            pageName: 'error',
            title: 'Erreur - Connect People',
            description: 'Une erreur interne s\'est produite',
            locale: 'fr',
            layout: false // Désactiver le layout par défaut
        });
    }
});
// Route API pour récupérer les données d'une page spécifique
router.get('/api/pages/page/:pageName', (req, res) => {
    try {
        const { pageName } = req.params;
        // Vérifier si la page est disponible
        if (!availablePages.includes(pageName)) {
            return res.status(404).json({
                success: false,
                data: null,
                error: 'Page non trouvée',
                meta: {
                    pageName,
                    timestamp: new Date().toISOString()
                }
            });
        }
        // Récupérer les données de la page
        const pageData = getPageData(pageName);
        // Retourner les données en JSON
        return res.json({
            success: true,
            data: pageData,
            error: null,
            meta: {
                pageName,
                timestamp: new Date().toISOString(),
                generated: true
            }
        });
    }
    catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Erreur lors de la recuperation des donnees de la page:', error instanceof Error ? error.message : 'Erreur inconnue');
        }
        return res.status(500).json({
            success: false,
            data: null,
            error: 'Erreur interne du serveur',
            meta: {
                pageName: req.params.pageName,
                timestamp: new Date().toISOString()
            }
        });
    }
});
// Route pour lister les pages disponibles (API)
router.get('/api/pages', (_req, res) => {
    res.json({
        success: true,
        data: {
            pages: availablePages,
            total: availablePages.length
        },
        error: null
    });
});
export default router;
//# sourceMappingURL=app.routes.js.map