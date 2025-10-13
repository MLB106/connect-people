/**
 * @file config/database.ts
 * @description Configuration des connexions MongoDB :
 * - Connexion MongoDB native avec mongoose
 * - Configuration pour l'application connect-people
 */
import mongoose from 'mongoose';
export declare const initializeDatabase: () => Promise<void>;
export { mongoose };
