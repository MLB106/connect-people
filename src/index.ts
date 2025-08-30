import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import apiRoutes from './routes/api/report.routes';
import webRoutes from './routes/web/index';

const app = express();

/* ---------- Middlewares ---------- */
app.use(cors({ origin: process.env.FRONT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- Routes ---------- */
app.use('/api/v1', apiRoutes);
app.use('/', webRoutes);

/* ---------- Lancement ---------- */
const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur API v1 sur http://localhost:${PORT}`);
});