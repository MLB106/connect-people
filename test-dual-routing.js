// test-dual-routing.js
// Script de test pour vérifier le système de double routage

import http from 'http';

const BASE_URL = 'http://localhost:4000';
const TEST_ROUTES = [
  '/',
  '/nos-helpers',
  '/immobilier/achat-vente',
  '/entreprendre/sourcing',
  '/traduction/diplomes'
];

console.log('🧪 Test du système de double routage\n');

async function testRoute(route, mode) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: mode === 'html' ? `${route}?view=true` : route,
      method: 'GET',
      headers: {
        'Accept': mode === 'html' ? 'text/html' : 'application/json',
        'User-Agent': 'Test-Dual-Routing/1.0'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const isHtml = data.includes('<html') || data.includes('<!DOCTYPE');
        const isJson = data.includes('"success"') || data.includes('"data"');
        
        const status = res.statusCode === 200 ? '✅' : '❌';
        const modeDetected = isHtml ? 'HTML' : isJson ? 'JSON' : 'UNKNOWN';
        const viewMode = res.headers['x-view-mode'] || 'N/A';
        
        console.log(`${status} ${route} (${mode}) - Status: ${res.statusCode} - Mode: ${modeDetected} - Header: ${viewMode}`);
        
        if (mode === 'html' && !isHtml) {
          console.log(`   ⚠️  Attendu HTML mais reçu autre chose`);
        }
        if (mode === 'json' && !isJson) {
          console.log(`   ⚠️  Attendu JSON mais reçu autre chose`);
        }
        
        resolve({
          route,
          mode,
          status: res.statusCode,
          detectedMode: modeDetected,
          viewMode,
          success: res.statusCode === 200
        });
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${route} (${mode}) - Erreur: ${err.message}`);
      resolve({
        route,
        mode,
        status: 0,
        detectedMode: 'ERROR',
        viewMode: 'N/A',
        success: false
      });
    });
    
    req.setTimeout(5000, () => {
      console.log(`⏰ ${route} (${mode}) - Timeout`);
      req.destroy();
      resolve({
        route,
        mode,
        status: 0,
        detectedMode: 'TIMEOUT',
        viewMode: 'N/A',
        success: false
      });
    });
    
    req.end();
  });
}

async function runTests() {
  console.log('🚀 Démarrage des tests...\n');
  
  const results = [];
  
  for (const route of TEST_ROUTES) {
    // Test mode HTML
    const htmlResult = await testRoute(route, 'html');
    results.push(htmlResult);
    
    // Test mode JSON
    const jsonResult = await testRoute(route, 'json');
    results.push(jsonResult);
    
    console.log(''); // Ligne vide pour la lisibilité
  }
  
  // Résumé
  console.log('📊 RÉSUMÉ DES TESTS');
  console.log('==================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Succès: ${successful.length}/${results.length}`);
  console.log(`❌ Échecs: ${failed.length}/${results.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ ÉCHECS DÉTAILLÉS:');
    failed.forEach(f => {
      console.log(`   ${f.route} (${f.mode}) - ${f.detectedMode}`);
    });
  }
  
  console.log('\n🎯 MODES DÉTECTÉS:');
  const htmlResults = results.filter(r => r.mode === 'html');
  const jsonResults = results.filter(r => r.mode === 'json');
  
  console.log(`HTML: ${htmlResults.filter(r => r.detectedMode === 'HTML').length}/${htmlResults.length} corrects`);
  console.log(`JSON: ${jsonResults.filter(r => r.detectedMode === 'JSON').length}/${jsonResults.length} corrects`);
  
  console.log('\n🎉 Test terminé !');
  
  if (successful.length === results.length) {
    console.log('🎊 Tous les tests sont passés ! Le système fonctionne parfaitement !');
  } else {
    console.log('⚠️  Certains tests ont échoué. Vérifiez la configuration.');
  }
}

// Vérifier si le serveur est en cours d'exécution
const checkServer = () => {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 4000,
      path: '/health',
      method: 'GET'
    }, (res) => {
      resolve(res.statusCode === 200);
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
};

async function main() {
  console.log('🔍 Vérification du serveur...');
  
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Serveur non accessible sur localhost:4000');
    console.log('💡 Assurez-vous que le serveur est démarré avec: npm start');
    process.exit(1);
  }
  
  console.log('✅ Serveur accessible, démarrage des tests...\n');
  
  await runTests();
}

main().catch(console.error);

