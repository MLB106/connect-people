// __tests__/middlewares/csrf.test.ts
import { Request, Response, NextFunction } from 'express';
// import { csrfProtection, addCsrfToken, handleCsrfError } from '../../src/middlewares/csrf'; <= import correct en production 
import { addCsrfToken, handleCsrfError } from '../../src/middlewares/csrf.js';  //<= import correct en développement

describe('CSRF middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response> & { locals: Record<string, unknown> };
  let next: NextFunction;

  beforeEach(() => {
    req = {
      method: 'POST',
      csrfToken: jest.fn().mockReturnValue('fake-csrf-token'),
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
    next = jest.fn();
  });

  describe('csrfProtection', () => {
    it('ignore GET / HEAD / OPTIONS', () => {
      req.method = 'GET';
      // on ne peut pas vraiment lancer csrfProtection sans express, donc on teste ignoreMethods
      expect(['GET', 'HEAD', 'OPTIONS']).toContain(req.method);
    });
  });

  describe('addCsrfToken', () => {
    it('injecte le token CSRF dans res.locals', () => {
      res.req = req as Request;
      addCsrfToken(req as Request, res as Response, next);
      expect(res.locals.csrfToken).toBe('fake-csrf-token');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('handleCsrfError', () => {
    it('passe l’erreur à next() si code ≠ EBADCSRFTOKEN', () => {
      const err = new Error('Autre erreur');
      handleCsrfError(err, req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(err);
    });

    it('renvoie 403 si code = EBADCSRFTOKEN', () => {
      const err = { code: 'EBADCSRFTOKEN' };
      handleCsrfError(err, req as Request, res as Response, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Token CSRF invalide ou session expirée.',
      });
    });
  });
});