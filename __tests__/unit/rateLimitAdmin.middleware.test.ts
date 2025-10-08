// Fichier __tests__/unit/rateLimitAdmin.middleware.ts

import { rateLimitAdmin } from '../../src/middlewares/admin/rateLimitAdmin.middleware';

// implémentation en mémoire – déclarée AVANT le mock
const store = new Map<string, { hits: number; reset: number }>();
const hit = async (id: string, windowSeconds: number, maxHits: number): Promise<'ALLOW' | 'BLOCKED'> => {
  const now = Date.now();
  const entry = store.get(id);
  if (!entry || now > entry.reset) {
    store.set(id, { hits: 1, reset: now + windowSeconds * 1000 });
    return 'ALLOW';
  }
  entry.hits += 1;
  return entry.hits > maxHits ? 'BLOCKED' : 'ALLOW';
};

// mock – factory avec fonction fléchée
jest.mock('../../src/services/rateLimitService', () => ({
  hit: jest.fn((...args: Parameters<typeof hit>) => hit(...args)),
}));

describe('rateLimitAdmin middleware', () => {
  let req: any;
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    req = { ip: '203.0.113.42' };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
    store.clear();
  });

  test('autorise tant que la limite n’est pas atteinte', async () => {
    const middleware = rateLimitAdmin(60, 3);
    await middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('bloque après dépassement du quota', async () => {
    const middleware = rateLimitAdmin(60, 3);
    for (let i = 0; i < 3; i++) await middleware(req, res, next);
    expect(next).toHaveBeenCalledTimes(3);

    await middleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({ message: 'Trop de requêtes, ré-essayez plus tard' });
    expect(next).toHaveBeenCalledTimes(3);
  });
});