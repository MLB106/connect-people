/**
 * @file utils/db.ts
 * @description Utilitaires d'exécution de requêtes MongoDB :
 * - Mongoose pour les opérations de base de données
 * - Helpers pour les opérations courantes
 */

import { mongoose } from '../config/database';

/* -------------------------------------------------------------------------- */
/*                              MongoDB Helpers                               */
/* -------------------------------------------------------------------------- */

/**
 * Exécute une opération MongoDB dans un contexte sécurisé.
 * @param operation Fonction d'opération MongoDB
 * @returns Résultat de l'opération
 */
export const executeMongo = async <T>(
  operation: () => Promise<T>
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur lors de l\'execution MongoDB :', error instanceof Error ? error.message : 'Erreur inconnue');
    }
    throw error;
  }
};

/**
 * Vérifie si la connexion MongoDB est active.
 * @returns True si connecté, false sinon
 */
export const isConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

/**
 * Obtient le statut de la connexion MongoDB.
 * @returns Statut de la connexion
 */
export const getConnectionStatus = (): string => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[mongoose.connection.readyState as keyof typeof states] || 'unknown';
};

/* -------------------------------------------------------------------------- */
/*                           Ré-exports explicites                            */
/* -------------------------------------------------------------------------- */
export { mongoose };