/**
 * @file config/axiosConfig.ts
 * @description Configuration d’Axios pour les requêtes API (TypeScript ES2022)
 */

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { getAuthToken } from '../client/storage';   // plus getItem

// ----------------------------------------------------------
// Configuration de l’instance Axios
// ----------------------------------------------------------

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL || '/api',
  timeout: Number(process.env.API_TIMEOUT) || 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ----------------------------------------------------------
// Intercepteur de requête : ajout du token
// ----------------------------------------------------------

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      // Axios 1.x garantit que headers est défini
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ----------------------------------------------------------
// Intercepteur de réponse : gestion globale des erreurs
// ----------------------------------------------------------

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur API :', error.message);
    }
    // redirection, toaster, etc.
    return Promise.reject(error);
  }
);

// ----------------------------------------------------------
// Export par défaut
// ----------------------------------------------------------

export default axiosInstance;


// ( NOTE A EFFACER PAR LA SUITE )
// Pour utilisation dans l'app 

// import axiosInstance from './config/axiosConfig';

// const data = await axiosInstance.get<User[]>('/users');