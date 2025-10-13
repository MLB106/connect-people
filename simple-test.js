// Test simple du système dual sans dépendances
import express from 'express';

const app = express();

// Middleware pour détecter le mode
app.use((req, res, next) => {
  // Détecter le mode basé sur l'Accept header ou le paramètre ?view=true
  if (req.query.view === 'true' || req.headers.accept?.includes('text/html')) {
    req.viewMode = 'html';
  } else {
    req.viewMode = 'json';
  }
  next();
});

// Route de test
app.get('/', (req, res) => {
  const pageData = {
    title: 'Connect People - Plateforme d\'entraide mondiale',
    description: 'Trouvez de l\'aide ou aidez d\'autres personnes partout dans le monde.',
    locale: 'fr'
  };

  if (req.viewMode === 'html') {
    // Mode HTML - retourner une page HTML simple
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${pageData.title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>${pageData.title}</h1>
        <p>${pageData.description}</p>
        <p>Mode: HTML (vue)</p>
        <p>Pour voir le JSON, utilisez: <code>curl -H "Accept: application/json" http://localhost:3002/</code></p>
      </body>
      </html>
    `);
  } else {
    // Mode JSON - retourner du JSON
    res.json({
      success: true,
      data: pageData,
      error: null,
      meta: {
        viewPath: 'home.hbs',
        timestamp: new Date().toISOString(),
        mode: 'api'
      }
    });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`🚀 Serveur de test DUAL prêt sur http://localhost:${PORT}`);
  console.log('📊 Testez le système dual:');
  console.log(`  - JSON: curl -H "Accept: application/json" http://localhost:${PORT}/`);
  console.log(`  - HTML: http://localhost:${PORT}/?view=true`);
  console.log(`  - HTML: curl -H "Accept: text/html" http://localhost:${PORT}/`);
});




