import dotenv from 'dotenv';
dotenv.config();               // 1. charger d’abord les variables d’env

import { fileURLToPath } from 'url';
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import reportRoutes from './routes/api/report.routes';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

/* ---------- Handlebars ---------- */
app.engine('hbs', engine({ extname: '.hbs', layoutsDir: path.join(__dirname, 'views/layouts') }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- Routes ---------- */
app.use('/api', reportRoutes);

/* ---------- Lancement ---------- */
const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur TypeScript + ES2022 sur http://localhost:${PORT}`);
});