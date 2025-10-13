// start-dual-mode.js
// Script de démarrage rapide pour tester le système de double routage

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage du serveur en mode DUAL-ROUTING...\n');

// Configuration
const env = {
  ...process.env,
  NODE_ENV: 'development',
  FORCE_VIEW_MODE: 'auto' // Détection automatique
};

// Démarrer le serveur
const server = spawn('npm', ['start'], {
  env,
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

server.on('error', (err) => {
  console.error('❌ Erreur lors du démarrage:', err);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`\n📊 Serveur arrêté avec le code: ${code}`);
});

// Gestion des signaux pour arrêter proprement
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt du serveur...');
  server.kill('SIGTERM');
});

// Afficher les instructions après le démarrage
setTimeout(() => {
  console.log('\n🎯 SYSTÈME DE DOUBLE ROUTAGE ACTIVÉ !');
  console.log('=====================================');
  console.log('');
  console.log('📱 Pour voir les VUES HTML :');
  console.log('   http://localhost:3000/');
  console.log('   http://localhost:3000/nos-helpers');
  console.log('   http://localhost:3000/immobilier/achat-vente');
  console.log('   http://localhost:3000/entreprendre/sourcing');
  console.log('');
  console.log('🔧 Pour l\'API JSON :');
  console.log('   curl http://localhost:3000/');
  console.log('   curl -H "Accept: application/json" http://localhost:3000/nos-helpers');
  console.log('   curl "http://localhost:3000/?view=false"');
  console.log('');
  console.log('🧪 Pour tester automatiquement :');
  console.log('   node test-dual-routing.js');
  console.log('');
  console.log('📖 Guide complet : DUAL_ROUTING_GUIDE.md');
  console.log('');
  console.log('✨ C\'est un jeu d\'enfant ! Profitez bien ! 🎮');
}, 3000);




