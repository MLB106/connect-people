import { authenticateAdmin } from '../../src/middlewares/admin/authenticateAdmin';
import jwt from 'jsonwebtoken';
import { log } from '../../src/services/logger.service';

// on mock jwt et le logger
jest.mock('jsonwebtoken');
jest.mock('../../src/services/logger.service', () => ({
  log: { admin: jest.fn() },
}));

describe('authenticateAdmin middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = {
      headers: {},
      ip: '203.0.113.42',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    process.env.JWT_ADMIN_ACCESS_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.JWT_ADMIN_ACCESS_SECRET;
  });

  test('autorise un token valide', () => {
    const payload = { id: 'a1', email: 'admin@test.com', role: 'admin' };
    (jwt.verify as jest.Mock).mockReturnValue(payload);

    req.headers.authorization = 'Bearer valid.jwt.token';

    authenticateAdmin(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('valid.jwt.token', 'test-secret');
    expect(req.admin).toEqual(payload);
    expect(log.admin).toHaveBeenCalledWith('login', 'admin@test.com', { ip: '203.0.113.42' });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('rejette un token manquant', () => {
    authenticateAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token missing' });
    expect(next).not.toHaveBeenCalled();
  });

  test('rejette un token invalide', () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    req.headers.authorization = 'Bearer invalid.jwt.token';

    authenticateAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });
});