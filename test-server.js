// Serveur de test simple pour vérifier que l'API retourne du JSON pur
const express = require('express');
const path = require('path');

const app = express();
const PORT = 4001; // Port différent pour éviter les conflits

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Données de test
const testData = {
  'home': {
    title: 'Connect People - Plateforme d\'entraide mondiale',
    description: 'Trouvez de l\'aide ou aidez d\'autres personnes partout dans le monde',
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
        }
      ],
      stats: {
        users: '10,000+',
        countries: '50+',
        languages: '20+'
      }
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

// Route de test simple
app.get('/api/pages/test', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  const response = {
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
  
  console.log('TEST API Response (JSON only):', JSON.stringify(response, null, 2));
  res.json(response);
});

// Route pour les pages
app.get('/api/pages/page/:name', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  const { name } = req.params;
  
  if (!testData[name]) {
    return res.status(404).json({
      success: false,
      data: null,
      error: 'Page non trouvée'
    });
  }
  
  const response = {
    success: true,
    data: testData[name],
    error: null
  };
  
  console.log(`PAGE API Response (JSON only) for ${name}:`, JSON.stringify(response, null, 2));
  res.json(response);
});

// Route de santé
app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    },
    error: null
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur de test prêt sur http://localhost:${PORT}`);
  console.log(`📊 Test API: http://localhost:${PORT}/api/pages/test`);
  console.log(`📊 Test Page: http://localhost:${PORT}/api/pages/page/home`);
  console.log(`📊 Test Page T: http://localhost:${PORT}/api/pages/page/t`);
  console.log(`📊 Test HTML: http://localhost:${PORT}/test-direct-api.html`);
});



