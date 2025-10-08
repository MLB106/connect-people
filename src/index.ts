// src/index.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { engine } from 'express-handlebars';

/* ---------- import des routes ---------- */
import apiRoutes from './routes/api/report.routes.js';
import webRoutes from './routes/web/index.js';
import { searchApiRouter } from './routes/api/search.routes.js';
import { headerApiRouter } from './routes/api/header.routes.js';
import { footerApiRouter } from './routes/api/footer.routes.js';
import { immobilierApiRouter } from './routes/api/immobilier.routes.js';
import { entreprendreApiRouter } from './routes/api/entreprendre.routes.js';
import { traductionApiRouter } from './routes/api/traduction.routes.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ---------- Handlebars ---------- */
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/* ---------- Middlewares ---------- */
app.use(cors({ origin: process.env.FRONT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- Assets statiques ---------- */
app.use(express.static(path.join(__dirname, '../public')));

/* ---------- Routes ---------- */
app.use('/', webRoutes); // pages HTML rendues côté serveur
app.use('/api', apiRoutes); // ton ancien « /api/v1 » si tu veux le garder
app.use('/api', searchApiRouter);
app.use('/api', headerApiRouter);
app.use('/api', footerApiRouter);
app.use('/api', immobilierApiRouter);
app.use('/api', entreprendreApiRouter);
app.use('/api', traductionApiRouter);

/* ---------- Lancement ---------- */
const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur prêt sur http://localhost:${PORT}`);
});