/**
 * @file utils/db.ts
 * @description Utilitaires d'exécution de requêtes MongoDB :
 * - Mongoose pour les opérations de base de données
 * - Helpers pour les opérations courantes
 */
import { mongoose } from '../config/database';
/**
 * Exécute une opération MongoDB dans un contexte sécurisé.
 * @param operation Fonction d'opération MongoDB
 * @returns Résultat de l'opération
 */
export declare const executeMongo: <T>(operation: () => Promise<T>) => Promise<T>;
/**
 * Vérifie si la connexion MongoDB est active.
 * @returns True si connecté, false sinon
 */
export declare const isConnected: () => boolean;
/**
 * Obtient le statut de la connexion MongoDB.
 * @returns Statut de la connexion
 */
export declare const getConnectionStatus: () => string;
export { mongoose };
