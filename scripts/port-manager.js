#!/usr/bin/env node

/**
 * Script de gestion des ports pour Connect-People
 * Permet de vérifier, libérer et gérer les ports utilisés par l'application
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Configuration des ports
const PORTS = {
  DEFAULT: 4000,
  FALLBACK: [4001, 4002, 4003, 5000, 5001, 5002, 8000, 8001, 8002]
};

/**
 * Vérifier quels ports sont utilisés
 */
async function checkPorts() {
  console.log('🔍 Vérification des ports utilisés...\n');
  
  try {
    const { stdout } = await execAsync('netstat -ano | findstr :400');
    const lines = stdout.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      console.log('✅ Aucun port 400x utilisé');
      return [];
    }
    
    console.log('📊 Ports 400x utilisés:');
    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 5) {
        const port = parts[1].split(':')[1];
        const pid = parts[4];
        console.log(`   Port ${port} - PID ${pid}`);
      }
    });
    
    return lines;
  } catch (error) {
    console.log('✅ Aucun port 400x utilisé');
    return [];
  }
}

/**
 * Libérer un port spécifique
 */
async function freePort(port) {
  try {
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    const lines = stdout.split('\n').filter(line => line.trim());
    
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 5) {
        const pid = parts[4];
        console.log(`🔄 Libération du port ${port} (PID ${pid})...`);
        await execAsync(`taskkill /PID ${pid} /F`);
        console.log(`✅ Port ${port} libéré`);
      }
    }
  } catch (error) {
    console.log(`ℹ️  Port ${port} déjà libre`);
  }
}

/**
 * Libérer tous les ports de l'application
 */
async function freeAllPorts() {
  console.log('🧹 Libération de tous les ports Connect-People...\n');
  
  const usedPorts = await checkPorts();
  
  for (const line of usedPorts) {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 5) {
      const port = parts[1].split(':')[1];
      const pid = parts[4];
      
      try {
        console.log(`🔄 Libération du port ${port} (PID ${pid})...`);
        await execAsync(`taskkill /PID ${pid} /F`);
        console.log(`✅ Port ${port} libéré`);
      } catch (error) {
        console.log(`⚠️  Impossible de libérer le port ${port}: ${error.message}`);
      }
    }
  }
  
  console.log('\n✅ Libération terminée');
}

/**
 * Tester la disponibilité d'un port
 */
async function testPort(port) {
  try {
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    if (stdout.trim()) {
      console.log(`❌ Port ${port} occupé`);
      return false;
    } else {
      console.log(`✅ Port ${port} disponible`);
      return true;
    }
  } catch (error) {
    console.log(`✅ Port ${port} disponible`);
    return true;
  }
}

/**
 * Trouver un port disponible
 */
async function findAvailablePort() {
  console.log('🔍 Recherche d\'un port disponible...\n');
  
  // Tester le port par défaut
  if (await testPort(PORTS.DEFAULT)) {
    console.log(`\n✅ Port ${PORTS.DEFAULT} disponible`);
    return PORTS.DEFAULT;
  }
  
  // Tester les ports de fallback
  for (const port of PORTS.FALLBACK) {
    if (await testPort(port)) {
      console.log(`\n✅ Port ${port} disponible`);
      return port;
    }
  }
  
  console.log('\n❌ Aucun port disponible trouvé');
  return null;
}

/**
 * Afficher l'aide
 */
function showHelp() {
  console.log(`
🔧 Gestionnaire de ports Connect-People

Usage: node scripts/port-manager.js [commande]

Commandes:
  check     - Vérifier les ports utilisés
  free      - Libérer tous les ports de l'application
  free [port] - Libérer un port spécifique
  test [port] - Tester la disponibilité d'un port
  find      - Trouver un port disponible
  help      - Afficher cette aide

Exemples:
  node scripts/port-manager.js check
  node scripts/port-manager.js free
  node scripts/port-manager.js free 4000
  node scripts/port-manager.js test 4001
  node scripts/port-manager.js find
`);
}

// Gestion des arguments de ligne de commande
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'check':
    checkPorts();
    break;
    
  case 'free':
    if (args[1]) {
      freePort(args[1]);
    } else {
      freeAllPorts();
    }
    break;
    
  case 'test':
    if (args[1]) {
      testPort(args[1]);
    } else {
      console.log('❌ Veuillez spécifier un port à tester');
    }
    break;
    
  case 'find':
    findAvailablePort();
    break;
    
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
    
  default:
    console.log('❌ Commande inconnue. Utilisez "help" pour voir les commandes disponibles.');
    showHelp();
}






