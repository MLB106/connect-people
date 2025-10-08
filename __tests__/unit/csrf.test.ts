// __tests__/unit/csrf.test.ts
import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MemoryStoreFactory from 'memorystore';

import {
  configureCsrf,
  addCsrfToken,
  handleCsrfError,
} from '../../src/config/csrfConfig';

const MemoryStore = MemoryStoreFactory(session);

describe('CSRF', () => {
  /* ---------- tests unitaires ---------- */
  describe('configureCsrf', () => {
    it('retourne un middleware fonction', () => {
      expect(typeof configureCsrf()).toBe('function');
    });
  });

  describe('addCsrfToken', () => {
    it('expose le token dans res.locals', () => {
      const req = {} as any;
      const res = { locals: {}, req: { _csrf: 'test-csrf' } } as any;
      const next = jest.fn();
      addCsrfToken(req, res, next);
      expect(res.locals.csrfToken).toBe('test-csrf');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('handleCsrfError', () => {
    it('transmet l’erreur suivante si code différent', () => {
      const err = new Error('Autre');
      const next = jest.fn();
      handleCsrfError(err, {} as any, {} as any, next);
      expect(next).toHaveBeenCalledWith(err);
    });

    it('renvoie 403 pour EBADCSRFTOKEN', () => {
      const err = { code: 'EBADCSRFTOKEN' };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
      const next = jest.fn();
      handleCsrfError(err, {} as any, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Session expirée ou token CSRF invalide. Veuillez rafraîchir la page et réessayer.',
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  /* ---------- tests d’intégration ---------- */
  describe('intégration supertest', () => {
    let app: express.Application;
    let agent: ReturnType<typeof request.agent>;

    beforeEach(() => {
      app = express()
        .use(express.json())
        .use(express.urlencoded({ extended: false }))
        .use(cookieParser())
        .use(
          session({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            store: new MemoryStore({ checkPeriod: 86400000 }),
            cookie: { secure: false },
          })
        )
        .use(configureCsrf())
        .get('/csrf', (req, res) => res.json({ token: req.csrfToken() }))
        .post('/protected', (_req, res) => res.sendStatus(204))
        .use(handleCsrfError);

      agent = request.agent(app);
    });

    it('refuse un POST sans token CSRF', async () => {
      await agent.post('/protected').expect(403);
    });

    it('accepte un POST avec token CSRF valide', async () => {
      const { body } = await agent.get('/csrf').expect(200);
      await agent
        .post('/protected')
        .set('x-csrf-token', body.token)
        .expect(204);
    });
  });
});