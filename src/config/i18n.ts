import i18n from 'i18n';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

i18n.configure({
  locales: ['fr', 'en', 'de', 'es', 'it', 'pt'],
  defaultLocale: 'fr',
  directory: path.join(__dirname, '..', 'locales'),
  objectNotation: true,
  updateFiles: false,
  syncFiles: false,
  cookie: 'lang',
  register: global,
});

export default i18n;