// __tests__/setup/database.health.test.ts
/**
 * Vérifie que la connexion MongoDB et Mongoose fonctionnent
 * dans l'environnement de TEST uniquement.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

// Connexion locale (sans importer le fichier src/config/database)
const mongoUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/connect-people-test';

describe('🧪 Database health check (TEST ENV ONLY)', () => {
  beforeAll(async () => {
    await mongoose.connect(mongoUrl);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('✅ doit se connecter à MongoDB sans erreur', () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 = connected
  });

  it('✅ doit avoir accès aux collections', async () => {
    const collections = await mongoose.connection.db.listCollections().toArray();
    expect(Array.isArray(collections)).toBe(true);
  });
});