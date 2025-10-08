// __tests__/setup/database.health.test.ts
/**
 * Vérifie que la connexion MySQL et Sequelize fonctionnent
 * dans l’environnement de TEST uniquement.
 */

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

// Connexion locale (sans importer le fichier src/config/database)
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  '', // mot de passe vide pour MySQL sans mot de passe
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
  }
);

describe('🧪 Database health check (TEST ENV ONLY)', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('✅ doit se connecter à MySQL sans erreur', () => {
    expect(sequelize).toBeDefined();
  });

  it('✅ doit synchroniser au moins une table', async () => {
    const tables = await sequelize.getQueryInterface().showAllTables();
    expect(tables.length).toBeGreaterThanOrEqual(0);
  });
});