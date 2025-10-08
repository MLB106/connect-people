// __tests__/client/authorizeUser.test.ts
import { Request, Response, NextFunction } from 'express';
import { authorizeUser } from '../../src/middlewares/user/authorizeUser';

type User = { id: string; email: string; role: 'user' | 'publicist' | 'professional' };

const mockUser = {
  user: { id: 'u1', email: 'user@test.com', role: 'user' as const },
};

let req: Partial<Request> & { user?: User };
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  next = jest.fn();
});

describe('authorizeUser – rôle user classique', () => {
  it('401 si le rôle est manquant', () => {
    authorizeUser('profile', 1)(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Role missing' });
  });

  it('403 si le niveau est insuffisant', () => {
    req.user = mockUser.user;
    authorizeUser('settings', 2)(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
  });

  it('next() si le niveau est exact', () => {
    req.user = mockUser.user;
    authorizeUser('profile', 1)(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });
});

// 4. Tests
describe('authorizeUser', () => {
  it('401 si le rôle est manquant', () => {
    const mid = authorizeUser('profile', 1);
    mid(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Role missing' });
  });

  it('403 si le niveau de permission est insuffisant', () => {
    req.user = mockUser.user;
    const mid = authorizeUser('settings', 2);
    mid(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden' });
  });

  it('next() si le niveau est exact', () => {
    req.user = mockUser.user;
    const mid = authorizeUser('profile', 1);
    mid(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

});