// __tests__/unit/jwt.config.test.ts
describe('🔐 JWT_CONFIG – structure et valeurs', () => {
  // Charge une seule fois
  const { JWT_CONFIG } = require('../../src/config/jwt.config');

  it('✅ expose la structure attendue', () => {
    expect(JWT_CONFIG).toMatchObject({
      secrets: {
        adminAccess:  expect.any(String),
        adminRefresh: expect.any(String),
        userAccess:   expect.any(String),
        userRefresh:  expect.any(String),
        csrf:         expect.any(String),
      },
      expiry: {
        ACCESS:  expect.any(String),
        REFRESH: expect.any(String),
        RESET:   expect.any(String),
        CSRF:    expect.any(String),
      },
      cookie: {
        httpOnly: expect.any(Boolean),
        secure:   expect.any(Boolean),
        sameSite: expect.any(String),
      },
      algorithm: 'HS256',
    });
  });

  it('✅ récupère les secrets depuis l’env', () => {
    // On vérifie simplement qu’aucun n’est vide
    Object.values(JWT_CONFIG.secrets).forEach((s) => {
      expect(s).toEqual(expect.stringMatching(/\S+/));
    });
  });
});