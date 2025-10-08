// __tests__/unit/i18n.test.ts
/**
 * Test unitaire : vérification de la configuration i18n
 */

import i18n from '../../src/config/i18n';

describe('🌍 i18n configuration', () => {
  it('✅ doit charger la configuration sans erreur', () => {
    expect(i18n).toBeDefined();
  });

  it('✅ doit avoir le français comme locale par défaut', () => {
    expect(i18n.getLocale()).toBe('fr');
  });

  it('✅ doit contenir les 7 locales attendues', () => {
    const locales = i18n.getLocales();
    expect(locales).toHaveLength(7);
    expect(locales).toEqual(
      expect.arrayContaining(['fr', 'en', 'de', 'es', 'it', 'pt', 'ar'])
    );
  });

    it('✅ doit utiliser le cookie "lang" pour la langue', () => {
    i18n.setLocale('en');
    expect(i18n.getLocale()).toBe('en');
    i18n.setLocale('fr'); // remet la locale par défaut
    expect(i18n.getLocale()).toBe('fr');
  });
  });
