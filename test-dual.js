// Test simple du système dual
import express from 'express';
import { createDualRoute } from './dist/middlewares/dualResponse.middleware.js';
import { viewModeMiddleware, debugInfoMiddleware } from './dist/middlewares/viewMode.middleware.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(viewModeMiddleware);
app.use(debugInfoMiddleware);

// Route de test
app.get('/', createDualRoute('home.hbs', {
  title: 'Test Dual - Connect People',
  description: 'Test du système dual JSON + HTML',
  locale: 'fr'
}));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur de test prêt sur http://localhost:${PORT}`);
  console.log('📊 Testez avec:');
  console.log(`  - JSON: curl -H "Accept: application/json" http://localhost:${PORT}/`);
  console.log(`  - HTML: curl -H "Accept: text/html" http://localhost:${PORT}/`);
  console.log(`  - HTML: http://localhost:${PORT}/?view=true`);
});




