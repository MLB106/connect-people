// Fichier : src/config/i18n.ts
import i18n from 'i18n';
import path from 'path';

// dossier locales : un niveau au-dessus de /src
const localesDir = path.resolve('src', 'locales');

i18n.configure({
  locales: ['fr', 'en', 'de', 'es', 'it', 'pt', 'ar'],
  defaultLocale: 'fr',
  directory: localesDir,
  objectNotation: true,
  updateFiles: false,
  syncFiles: false,
  cookie: 'lang',
  register: global,
});

export default i18n;