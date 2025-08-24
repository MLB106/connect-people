/**
 * @file config/database.ts
 * @description Configuration des connexions MySQL :
 * - Pool natif mysql2 (SQL brut)
 * - Instance Sequelize (ORM)
 */

import { createPool, Pool } from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_HOST,
  DB_PORT = '3306',
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  NODE_ENV,
} = process.env;

if (!DB_HOST || !DB_NAME || !DB_USER || !DB_PASSWORD) {
  console.error('❌ Variables d’environnement DB manquantes.');
  process.exit(1);
}

/* -------------------------------------------------------------------------- */
/*                                Pool MySQL natif                            */
/* -------------------------------------------------------------------------- */

export const pool: Pool = createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/* -------------------------------------------------------------------------- */
/*                              Instance Sequelize                            */
/* -------------------------------------------------------------------------- */

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'mysql',
  logging: NODE_ENV === 'development' ? console.log : false,
  pool: { max: 10, min: 0, acquire: 30_000, idle: 10_000 },
  define: { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci', timestamps: true },
});

/* -------------------------------------------------------------------------- */
/*                            Initialisation unifiée                          */
/* -------------------------------------------------------------------------- */

export const initializeDatabase = async (): Promise<void> => {
  try {
    // Vérifie le pool natif
    const conn = await pool.getConnection();
    conn.release();

    // Vérifie Sequelize
    await sequelize.authenticate();

    console.log('✅ Connexions MySQL (pool natif + Sequelize) établies.');
  } catch (err) {
    console.error('❌ Erreur lors de l’initialisation DB :', err);
    process.exit(1);
  }
};