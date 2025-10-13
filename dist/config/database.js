/**
 * @file config/database.ts
 * @description Configuration des connexions MongoDB :
 * - Connexion MongoDB native avec mongoose
 * - Configuration pour l'application connect-people
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { env } from './env.js';
dotenv.config();
/* -------------------------------------------------------------------------- */
/*                            Configuration MongoDB                            */
/* -------------------------------------------------------------------------- */
// Configuration des options de connexion MongoDB
const mongoOptions = {
    maxPoolSize: 10, // Maximum de connexions dans le pool
    serverSelectionTimeoutMS: 5000, // Timeout pour la sélection du serveur
    socketTimeoutMS: 45000, // Timeout pour les opérations socket
    bufferCommands: false, // Désactive le buffering mongoose
};
/* -------------------------------------------------------------------------- */
/*                            Initialisation MongoDB                          */
/* -------------------------------------------------------------------------- */
export const initializeDatabase = async () => {
    try {
        // Connexion à MongoDB
        await mongoose.connect(env.databaseUrl, mongoOptions);
        // Événements de connexion
        mongoose.connection.on('connected', () => {
            if (process.env.NODE_ENV === 'development') {
                console.log('Connexion MongoDB etablie.');
            }
        });
        mongoose.connection.on('error', (err) => {
            if (process.env.NODE_ENV === 'development') {
                console.error('Erreur de connexion MongoDB :', err);
            }
        });
        mongoose.connection.on('disconnected', () => {
            if (process.env.NODE_ENV === 'development') {
                console.log('Connexion MongoDB fermee.');
            }
        });
        // Gestion de la fermeture propre
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            if (process.env.NODE_ENV === 'development') {
                console.log('Connexion MongoDB fermee proprement.');
            }
            process.exit(0);
        });
        if (process.env.NODE_ENV === 'development') {
            console.log('Connexion MongoDB initialisee avec succes.');
        }
    }
    catch (err) {
        console.error(`Erreur lors de l'initialisation MongoDB :`, err);
        process.exit(1);
    }
};
// Export de l'instance mongoose pour utilisation dans l'application
export { mongoose };
//# sourceMappingURL=database.js.map