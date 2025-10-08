// __tests__/unit/cookies.test.ts
import type { Response } from 'express';
import {
  setAuthCookies,
  setAdminAuthCookies,
  clearTokenCookie,
  logout,
  setTokenCookie,
} from '../../src/config/cookies';

describe('cookies', () => {
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockRes = {
      cookie: jest.fn(),
      clearCookie: jest.fn(),
    };
  });

  describe('setAuthCookies', () => {
    it('pose les trois cookies utilisateur avec les bonnes options', () => {
      const res = mockRes as Response;
      setAuthCookies(res, 'acc', 'ref', 'csrf');
      expect(res.cookie).toHaveBeenCalledWith('accessToken', 'acc', expect.objectContaining({ httpOnly: true, maxAge: 900000 }));
      expect(res.cookie).toHaveBeenCalledWith('refreshToken', 'ref', expect.objectContaining({ httpOnly: true, maxAge: 604800000 }));
      expect(res.cookie).toHaveBeenCalledWith('csrfToken', 'csrf', expect.objectContaining({ httpOnly: true, maxAge: 3600000 }));
    });
  });

  describe('setAdminAuthCookies', () => {
    it('pose les trois cookies admin avec les bonnes options', () => {
      const res = mockRes as Response;
      setAdminAuthCookies(res, 'accA', 'refA', 'csrfA');
      expect(res.cookie).toHaveBeenCalledWith('adminAccessToken', 'accA', expect.objectContaining({ httpOnly: true, maxAge: 900000 }));
      expect(res.cookie).toHaveBeenCalledWith('adminRefreshToken', 'refA', expect.objectContaining({ httpOnly: true, maxAge: 604800000 }));
      expect(res.cookie).toHaveBeenCalledWith('adminCsrfToken', 'csrfA', expect.objectContaining({ httpOnly: true, maxAge: 3600000 }));
    });
  });

  describe('clearTokenCookie', () => {
    it('efface un cookie spécifique', () => {
      const res = mockRes as Response;
      clearTokenCookie(res, 'accessToken');
      expect(res.clearCookie).toHaveBeenCalledWith('accessToken');
    });
  });

  describe('logout', () => {
    it('efface tous les cookies de session', () => {
      const res = mockRes as Response;
      logout(res);

      const cookiesToClear = [
        'accessToken',
        'refreshToken',
        'csrfToken',
        'adminAccessToken',
        'adminRefreshToken',
        'adminCsrfToken',
      ];

      cookiesToClear.forEach(name => {
        expect(res.clearCookie).toHaveBeenCalledWith(name);
      });
    });
  });

  describe('setTokenCookie', () => {
    it('pose un cookie personnalisé', () => {
      const res = mockRes as Response;
      setTokenCookie(res, 'myToken', 'customCookie', 123456);
      expect(res.cookie).toHaveBeenCalledWith('customCookie', 'myToken', expect.objectContaining({ maxAge: 123456 }));
    });
  });
});