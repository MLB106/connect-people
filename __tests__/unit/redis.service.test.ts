// __tests__/unit/redis.service.test.ts

/* 1.  Factory interne = zéro référence externe */
jest.mock('redis', () => {
  const client = {
    isOpen: false,
    connect: jest.fn().mockResolvedValue(undefined),
    on: jest.fn(),
  };
  return { createClient: jest.fn(() => client) };
});

/* 2.  On récupère le client créé via require() */
const { connectRedis, redis } = require('../../src/services/redis.service');

describe('redis.service', () => {
  afterEach(() => jest.clearAllMocks());

  it('connecte uniquement si fermé', async () => {
    await connectRedis();
    expect(redis.connect).toHaveBeenCalledTimes(1);

    redis.isOpen = true;
    await connectRedis();
    expect(redis.connect).toHaveBeenCalledTimes(1); // pas rappelé
  });

  it('exporte le client redis', () => {
    expect(redis).toBeDefined();
  });
});
