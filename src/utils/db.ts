/**
 * @file utils/db.ts
 * @description Utilitaires d'exécution de requêtes :
 * - SQL brut via le pool mysql2
 * - Sequelize via une closure
 */

import { QueryResult } from 'mysql2';
import { pool, sequelize } from '../config/database';

/* -------------------------------------------------------------------------- */
/*                               SQL brut typé                                */
/* -------------------------------------------------------------------------- */

/**
 * Exécute une requête SQL brute avec le pool natif.
 * @param sql Requête SQL
 * @param params Paramètres de substitution (optionnels)
 * @returns Les lignes récupérées ou le résultat de la commande
 */
export const execute = async (
  sql: string,
  params?: any[]
): Promise<QueryResult> => {
  const [rows] = await pool.execute(sql, params);
  return rows;
};

/* -------------------------------------------------------------------------- */
/*                              Sequelize typé                                */
/* -------------------------------------------------------------------------- */

/**
 * Exécute une fonction de requête Sequelize dans un contexte typé.
 * @param queryFn Fonction recevant l’instance Sequelize
 * @returns Résultat de la fonction
 */
export const executeSequelize = async <T>(
  queryFn: (seq: typeof sequelize) => Promise<T>
): Promise<T> => {
  return await queryFn(sequelize);
};

/* -------------------------------------------------------------------------- */
/*                           Ré-exports explicites                            */
/* -------------------------------------------------------------------------- */
export { pool, sequelize };