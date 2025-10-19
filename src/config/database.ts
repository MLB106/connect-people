/**
 * @file src/config/database.ts
 * @description MongoDB database configuration with Mongoose
 * @version 1.0.0
 * @author MLB <connect_project_dz@yahoo.com>
 */

import mongoose, { type ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import { env } from './env.js';

// Load environment variables
dotenv.config();

/**
 * MongoDB connection options
 * @description Optimized connection settings for production and development
 */
const mongoOptions: ConnectOptions = {
  maxPoolSize: 10, // Maximum connections in the pool
  serverSelectionTimeoutMS: 5000, // Timeout for server selection
  socketTimeoutMS: 45000, // Timeout for socket operations
  bufferCommands: false, // Disable mongoose buffering
  retryWrites: true, // Enable retryable writes
  w: 'majority', // Write concern
} as const;

/**
 * Database connection state
 */
let isConnected = false;

/**
 * Initialize MongoDB database connection
 * @description Establish connection with proper error handling and event listeners
 * @returns {Promise<void>}
 * @throws {Error} If database connection fails
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    // Prevent multiple connections
    if (isConnected) {
      console.log('Database already connected');
      return;
    }

    // Connect to MongoDB
    await mongoose.connect(env.databaseUrl, mongoOptions);
    isConnected = true;

    // Connection event handlers
    mongoose.connection.on('connected', () => {
      if (env.nodeEnv === 'development') {
        console.log('✅ MongoDB connection established');
      }
    });

    mongoose.connection.on('error', (err: Error) => {
      console.error('❌ MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      if (env.nodeEnv === 'development') {
        console.log('⚠️  MongoDB connection lost');
      }
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      if (env.nodeEnv === 'development') {
        console.log('🔄 MongoDB reconnected');
      }
      isConnected = true;
    });

    // Graceful shutdown handling
    const gracefulShutdown = async (): Promise<void> => {
      try {
        await mongoose.connection.close();
        if (env.nodeEnv === 'development') {
          console.log('🔒 MongoDB connection closed gracefully');
        }
        process.exit(0);
      } catch (err) {
        console.error('❌ Error during MongoDB shutdown:', err);
        process.exit(1);
      }
    };

    // Handle process termination
    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);

    if (env.nodeEnv === 'development') {
      console.log('🚀 MongoDB initialized successfully');
    }
  } catch (err) {
    console.error('❌ MongoDB initialization error:', err);
    isConnected = false;
    process.exit(1);
  }
};

/**
 * Get database connection status
 * @returns {boolean} Connection status
 */
export const isDatabaseConnected = (): boolean => isConnected;

/**
 * Close database connection
 * @returns {Promise<void>}
 */
export const closeDatabase = async (): Promise<void> => {
  if (isConnected) {
    await mongoose.connection.close();
    isConnected = false;
  }
};

// Export mongoose instance for application use
export { mongoose };