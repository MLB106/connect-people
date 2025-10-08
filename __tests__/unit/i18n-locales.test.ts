// __tests__/unit/i18n-locales.test.ts
/**
 * Vérifie que les fichiers de traduction existent
 */

import fs from 'fs';
import path from 'path';

describe('🌍 i18n locales files', () => {
  const localesPath = path.join(__dirname, '../../src/locales');

  const expectedLocales = ['fr', 'en', 'de', 'es', 'it', 'pt', 'ar'];

  it.each(expectedLocales)('✅ %s.json existe', (locale) => {
    const filePath = path.join(localesPath, `${locale}.json`);
    expect(fs.existsSync(filePath)).toBe(true);
  });
});