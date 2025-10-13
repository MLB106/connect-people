// Script de test pour l'API REST
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:4000/api';

// Fonction utilitaire pour les tests
const test = async (name, fn) => {
  try {
    console.log(`\n🧪 Test: ${name}`);
    await fn();
    console.log(`✅ ${name} - SUCCÈS`);
  } catch (error) {
    console.log(`❌ ${name} - ÉCHEC:`, error.message);
  }
};

// Tests
const runTests = async () => {
  console.log('🚀 Démarrage des tests API...\n');

  // Test 1: Santé de l'API
  await test('Santé de l\'API', async () => {
    const response = await fetch('http://localhost:4000/health');
    const data = await response.json();
    
    if (!data.success || data.data.status !== 'OK') {
      throw new Error('API non disponible');
    }
  });

  // Test 2: Liste des utilisateurs (vide au début)
  await test('Liste des utilisateurs (vide)', async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    
    if (!data.success || !Array.isArray(data.data)) {
      throw new Error('Format de réponse invalide');
    }
  });

  // Test 3: Création d'un utilisateur
  let userId;
  await test('Création d\'un utilisateur', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    };

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    
    if (!data.success || !data.data._id) {
      throw new Error('Échec de la création d\'utilisateur');
    }
    
    userId = data.data._id;
  });

  // Test 4: Récupération de l'utilisateur créé
  await test('Récupération d\'un utilisateur', async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    const data = await response.json();
    
    if (!data.success || data.data._id !== userId) {
      throw new Error('Échec de la récupération d\'utilisateur');
    }
  });

  // Test 5: Mise à jour de l'utilisateur
  await test('Mise à jour d\'un utilisateur', async () => {
    const updateData = {
      name: 'Test User Updated',
      emailVerified: true
    };

    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });

    const data = await response.json();
    
    if (!data.success || data.data.name !== 'Test User Updated') {
      throw new Error('Échec de la mise à jour d\'utilisateur');
    }
  });

  // Test 6: Liste des utilisateurs (avec données)
  await test('Liste des utilisateurs (avec données)', async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    
    if (!data.success || data.data.length === 0) {
      throw new Error('Aucun utilisateur trouvé');
    }
  });

  // Test 7: Suppression de l'utilisateur
  await test('Suppression d\'un utilisateur', async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error('Échec de la suppression d\'utilisateur');
    }
  });

  // Test 8: Vérification de la suppression
  await test('Vérification de la suppression', async () => {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    const data = await response.json();
    
    if (data.success) {
      throw new Error('L\'utilisateur devrait être supprimé');
    }
  });

  // Test 9: Validation des erreurs
  await test('Validation des erreurs (email invalide)', async () => {
    const userData = {
      name: 'Test User',
      email: 'email-invalide',
      password: 'password123'
    };

    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    
    if (data.success) {
      throw new Error('Devrait retourner une erreur pour email invalide');
    }
  });

  console.log('\n🎉 Tests terminés !');
};

// Exécution des tests
runTests().catch(console.error);






