// Fichier : __tests__/unit/rbacAction.middleware.test.ts

import { rbacAction } from '../../src/middlewares/admin/rbacAction.middleware';

// On ne doit pas importer PERMISSION_MATRIX ou AdminRole ici si on les mock

jest.mock('../../src/config/adminRoles', () => ({
  PERMISSION_MATRIX: {
    super: { users: 3, finance: 2 },
    moderator: { users: 2, finance: 1 },
  },
}));

jest.mock('../../src/services/logger.service', () => ({
  logger: { warn: jest.fn(), debug: jest.fn() },
}));

describe('rbacAction middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { user: { id: 'u1', role: undefined } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => jest.clearAllMocks());

  test('autorise quand le niveau est suffisant', () => {
    req.user.role = 'super';
    const middleware = rbacAction('users', 2);
    middleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('bloque quand le niveau est insuffisant', () => {
    req.user.role = 'moderator';
    const middleware = rbacAction('users', 3);
    middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Action non autorisée', error: 'RBAC_DENIED' });
    expect(require('../../src/services/logger.service').logger.warn).toHaveBeenCalled();
  });

  test('renvoie 403 si rôle manquant', () => {
    req.user = undefined;
    const middleware = rbacAction('finance');
    middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Rôle inconnu', error: 'ROLE_UNKNOWN' });
  });

  test('renvoie 403 si la ressource est absente du profil', () => {
    req.user.role = 'moderator';
    const middleware = rbacAction('unknown', 1);
    middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Action non autorisée', error: 'RBAC_DENIED' });
  });
});