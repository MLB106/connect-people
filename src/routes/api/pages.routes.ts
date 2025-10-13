// src/routes/api/pages.routes.ts
import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

// Données JSON pour les pages
const pagesData = {
  'home': {
    title: 'Connect People - Plateforme d\'entraide mondiale',
    description: 'Trouvez de l\'aide ou aidez d\'autres personnes partout dans le monde. Fixez vos tarifs, communiquez en toute sécurité, et construisez des relations authentiques.',
    locale: 'fr',
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
  },
  'nos-helpers': {
    title: 'Nos Helpers - Connect People',
    description: 'Découvrez notre communauté de professionnels qualifiés prêts à vous aider',
    locale: 'fr',
    content: {
      hero: {
        title: 'Nos Helpers',
        subtitle: 'Des professionnels qualifiés prêts à vous aider',
        cta: 'Voir les helpers'
      },
      categories: [
        {
          name: 'Immobilier',
          count: 150,
          icon: 'fa-home'
        },
        {
          name: 'Entrepreneuriat',
          count: 200,
          icon: 'fa-briefcase'
        },
        {
          name: 'Traduction',
          count: 80,
          icon: 'fa-language'
        }
      ]
    }
  },
  'nos-annonces': {
    title: 'Nos Annonces - Connect People',
    description: 'Parcourez toutes les annonces d\'aide disponibles sur notre plateforme',
    locale: 'fr',
    content: {
      hero: {
        title: 'Nos Annonces',
        subtitle: 'Trouvez l\'aide dont vous avez besoin',
        cta: 'Parcourir les annonces'
      },
      filters: [
        'Toutes les catégories',
        'Immobilier',
        'Entrepreneuriat',
        'Traduction'
      ],
      announcements: [
        {
          id: 1,
          title: 'Aide pour achat immobilier',
          category: 'Immobilier',
          price: '50€/heure',
          location: 'Paris, France',
          rating: 4.8
        },
        {
          id: 2,
          title: 'Création de business plan',
          category: 'Entrepreneuriat',
          price: '100€/projet',
          location: 'Lyon, France',
          rating: 4.9
        }
      ]
    }
  },
  'documentation': {
    title: 'Documentation - Connect People',
    description: 'Tout ce que vous devez savoir pour utiliser Connect People efficacement',
    locale: 'fr',
    content: {
      hero: {
        title: 'Documentation',
        subtitle: 'Guide complet pour utiliser notre plateforme',
        cta: 'Commencer à lire'
      },
      sections: [
        {
          title: 'Guide de démarrage',
          articles: [
            'Comment créer un compte',
            'Comment publier une annonce',
            'Comment contacter un helper'
          ]
        },
        {
          title: 'Fonctionnalités avancées',
          articles: [
            'Gestion des paiements',
            'Système de notation',
            'Communication sécurisée'
          ]
        }
      ]
    }
  },
  't': {
    title: 'Test Page - Connect People',
    description: 'Page de test pour vérifier que la console affiche uniquement du JSON brut',
    locale: 'fr',
    content: {
      hero: {
        title: 'Page de Test',
        subtitle: 'Cette page est utilisée pour tester l\'affichage JSON dans la console',
        cta: 'Tester'
      },
      testData: {
        string: 'Ceci est une chaîne de test',
        number: 42,
        boolean: true,
        array: ['item1', 'item2', 'item3'],
        object: {
          key1: 'value1',
          key2: 'value2'
        }
      }
    }
  }
};

// Route API pour récupérer les données d'une page - JSON PUR UNIQUEMENT
router.get('/page/:name', (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    
    // FORCER le Content-Type JSON
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    // Vérifier si la page existe
    if (!pagesData[name as keyof typeof pagesData]) {
      return res.status(404).json({
        success: false,
        data: null,
        error: 'Page non trouvée'
      });
    }

    // Retourner UNIQUEMENT les données JSON de la page - AUCUN HTML
    const response = {
      success: true,
      data: pagesData[name as keyof typeof pagesData],
      error: null
    };
    
    // Log pour debug - JSON uniquement
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response (JSON only):', JSON.stringify(response, null, 2));
    }
    
    return res.json(response);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur lors de la recuperation de la page:', error instanceof Error ? error.message : 'Erreur inconnue');
    }
    return res.status(500).json({
      success: false,
      data: null,
      error: 'Erreur interne du serveur'
    });
  }
});

// Route de test simple - JSON PUR UNIQUEMENT
router.get('/test', (_req: Request, res: Response) => {
  // FORCER le Content-Type JSON
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  const testData = {
    success: true,
    data: {
      message: 'Test API - JSON pur uniquement',
      timestamp: new Date().toISOString(),
      test: {
        string: 'Ceci est une chaîne de test',
        number: 42,
        boolean: true,
        array: ['item1', 'item2', 'item3'],
        object: {
          key1: 'value1',
          key2: 'value2'
        }
      }
    },
    error: null
  };
  
  // Log pour debug - JSON uniquement
  if (process.env.NODE_ENV === 'development') {
    console.log('TEST API Response (JSON only):', JSON.stringify(testData, null, 2));
  }
  
  res.json(testData);
});

// Route API pour lister toutes les pages disponibles
router.get('/pages', (_req: Request, res: Response) => {
  try {
    // FORCER le Content-Type JSON
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    
    const availablePages = Object.keys(pagesData).map(name => ({
      name,
      title: pagesData[name as keyof typeof pagesData].title,
      description: pagesData[name as keyof typeof pagesData].description
    }));

    const response = {
      success: true,
      data: {
        pages: availablePages,
        total: availablePages.length
      },
      error: null
    };
    
    // Log pour debug - JSON uniquement
    if (process.env.NODE_ENV === 'development') {
      console.log('PAGES API Response (JSON only):', JSON.stringify(response, null, 2));
    }
    
    res.json(response);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur lors de la recuperation de la liste des pages:', error instanceof Error ? error.message : 'Erreur inconnue');
    }
    res.status(500).json({
      success: false,
      data: null,
      error: 'Erreur interne du serveur'
    });
  }
});

export default router;