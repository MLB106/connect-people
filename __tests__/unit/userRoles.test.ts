// __tests__/unit/userRoles.test.ts
describe('👤 userRoles', () => {
  it('✅ USER_ROLES contient les trois rôles attendus', () => {
    const { USER_ROLES } = require('../../src/config/userRoles');
    expect(USER_ROLES).toEqual(['publicist', 'professional', 'user']);
  });

  it('✅ USER_PERMISSIONS contient exactement les rôles définis', () => {
    const { USER_PERMISSIONS } = require('../../src/config/userRoles');
    expect(Object.keys(USER_PERMISSIONS).sort()).toEqual(['professional', 'publicist', 'user']);
  });

  it('✅ USER_PERMISSIONS contient uniquement des niveaux numériques', () => {
    const { USER_PERMISSIONS } = require('../../src/config/userRoles');

    Object.entries(USER_PERMISSIONS).forEach(([, perms]) => {
      Object.values(perms as Record<string, number>).forEach((level) => {
        expect(typeof level).toBe('number');
        expect(level).toBeGreaterThanOrEqual(0);
      });
    });
  });
});