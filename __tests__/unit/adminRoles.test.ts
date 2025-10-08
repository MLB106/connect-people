// __tests__/unit/adminRoles.test.ts
import {
  ADMIN_ROLES,
  PERMISSION_MATRIX,
  TOKEN_CONSTANTS,
  COOKIE_OPTIONS,
} from '../../src/config/adminRoles.js';

describe('adminRoles.ts', () => {
  test('ADMIN_ROLES contient 13 rôles', () => {
    expect(ADMIN_ROLES).toHaveLength(13);
    expect(ADMIN_ROLES).toContain('president');
  });

  test('PERMISSION_MATRIX – president a tous les droits niveau 5', () => {
    expect(PERMISSION_MATRIX.president).toEqual({
      users: 5, finance: 5, maintenance: 5, code: 5, analytics: 5, security: 5,
    });
  });

  test('PERMISSION_MATRIX – moderator n’a pas accès à finance', () => {
    expect(PERMISSION_MATRIX.moderator.finance).toBeUndefined();
    expect(PERMISSION_MATRIX.moderator.content).toBe(3);
  });

  test('TOKEN_CONSTANTS – durées correctes', () => {
    expect(TOKEN_CONSTANTS.ACCESS_TOKEN_EXPIRY).toBe('15m');
    expect(TOKEN_CONSTANTS.REFRESH_TOKEN_EXPIRY).toBe('7d');
    expect(TOKEN_CONSTANTS.RESET_TOKEN_EXPIRY).toBe('1h');
    expect(TOKEN_CONSTANTS.CSRF_TOKEN_EXPIRY).toBe('1h');
  });

  test('COOKIE_OPTIONS – même structure sans NODE_ENV', () => {
    expect(COOKIE_OPTIONS).toEqual({
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  });

  test('AdminRole type accepte uniquement les rôles déclarés', () => {
    
  });
});