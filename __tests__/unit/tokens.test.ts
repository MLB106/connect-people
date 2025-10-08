// __tests__/unit/tokens.test.ts
describe('🕓 TOKEN_EXPIRY & COOKIE_OPTS', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('TOKEN_EXPIRY', () => {
    it('✅ retourne les durées par défaut quand aucune env n’est définie', () => {
      delete process.env.JWT_ACCESS_EXPIRY;
      delete process.env.JWT_REFRESH_EXPIRY;
      delete process.env.JWT_RESET_EXPIRY;
      delete process.env.JWT_CSRF_EXPIRY;

      jest.resetModules();
      const { TOKEN_EXPIRY } = require('../../src/config/tokens');

      expect(TOKEN_EXPIRY).toEqual({
        ACCESS:  '15m',
        REFRESH: '7d',
        RESET:   '1h',
        CSRF:    '1h',
      });
    });

    it('✅ surcharge les durées via les variables d’env', () => {
      process.env.JWT_ACCESS_EXPIRY  = '5m';
      process.env.JWT_REFRESH_EXPIRY = '30d';
      process.env.JWT_RESET_EXPIRY   = '2h';
      process.env.JWT_CSRF_EXPIRY    = '30m';

      jest.resetModules();
      const { TOKEN_EXPIRY } = require('../../src/config/tokens');

      expect(TOKEN_EXPIRY).toEqual({
        ACCESS:  '5m',
        REFRESH: '30d',
        RESET:   '2h',
        CSRF:    '30m',
      });
    });
  });

  describe('COOKIE_OPTS', () => {
    it('✅ a httpOnly et sameSite strict en toute circonstance', () => {
      const { COOKIE_OPTS } = require('../../src/config/tokens');
      expect(COOKIE_OPTS.httpOnly).toBe(true);
      expect(COOKIE_OPTS.sameSite).toBe('strict');
    });

    it('✅ met secure=true seulement en production', () => {
      delete process.env.NODE_ENV;
      jest.resetModules();
      let { COOKIE_OPTS } = require('../../src/config/tokens');
      expect(COOKIE_OPTS.secure).toBe(false);

      process.env.NODE_ENV = 'production';
      jest.resetModules();
      ({ COOKIE_OPTS } = require('../../src/config/tokens'));
      expect(COOKIE_OPTS.secure).toBe(true);
    });
  });
});