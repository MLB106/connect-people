// __tests__/unit/authorizeAdmin.test.ts

import { authorizeAdmin } from '../../src/middlewares/admin/authorizeAdmin';


// on mock le tableau
jest.mock('../../src/config/adminRoles', () => ({
  AdminRole: { SUPER: 'super', MODERATOR: 'moderator' },
  PERMISSION_MATRIX: {
    super: { users: 3, reports: 3 },
    moderator: { users: 2, reports: 1 },
  },
}));

describe('authorizeAdmin middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { admin: { role: undefined } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => jest.clearAllMocks());

  test('autorise si le rôle possède le niveau requis', () => {
    req.admin.role = 'super';
    const middleware = authorizeAdmin('users', 2);
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('bloque si le niveau est insuffisant', () => {
    req.admin.role = 'moderator';
    const middleware = authorizeAdmin('users', 3);
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });

  test('renvoie 401 si aucun rôle trouvé', () => {
    req.admin = undefined;
    const middleware = authorizeAdmin('reports');
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Role missing' });
    expect(next).not.toHaveBeenCalled();
  });

  test('renvoie 403 si la ressource est absente du profil', () => {
    req.admin.role = 'moderator';
    const middleware = authorizeAdmin('unknown', 1);
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
  });
});