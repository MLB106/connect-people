// __tests__/unit/middlewares/auth.test.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from '../../src/middlewares/auth';

describe('authenticate middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('401 si aucun header Authorization', () => {
    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token manquant ou invalide' });
    expect(next).not.toHaveBeenCalled();
  });

  it('401 si le token ne commence pas par "Bearer "', () => {
    req.headers!.authorization = 'Basic abc123';
    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token manquant ou invalide' });
    expect(next).not.toHaveBeenCalled();
  });

  it('401 si le token est expiré ou corrompu', () => {
    req.headers!.authorization = 'Bearer invalid.token.here';
    authenticate(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token expiré ou corrompu' });
    expect(next).not.toHaveBeenCalled();
  });

  it('place le payload décodé dans req.user et appelle next()', () => {
    const payload = { id: 'u42' };
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
    req.headers!.authorization = `Bearer ${token}`;
    authenticate(req as Request, res as Response, next);
    expect((req as any).user).toMatchObject(payload);
    expect(next).toHaveBeenCalled();
  });
});