// Fichier : __tests__/unit/connect-redis.service.test.ts
/* 1.  Mocks */
jest.mock('redis', () => ({
  createClient: jest.fn(() => ({
    isOpen: false,
    connect: jest.fn().mockResolvedValue(undefined),
    on: jest.fn(),
  })),
}));

const mockRedisStore = jest.fn().mockReturnValue('fake-store-instance');
jest.mock('connect-redis', () => mockRedisStore);

/* 2.  Imports après les mocks */
import { connectRedis, redis } from '../../src/services/redis.service';

describe('redis.service', () => {
  it('connecte uniquement si fermé', async () => {
    const spy = redis.connect as jest.Mock;
    await connectRedis();
    expect(spy).toHaveBeenCalledTimes(1);

    (redis as any).isOpen = true;
    await connectRedis();
    expect(spy).toHaveBeenCalledTimes(1); // pas rappelé
  });

  it('crée le store avec les bonnes options', () => {
    // Le constructeur a été appelé une seule fois, à l’import
    expect(mockRedisStore).toHaveBeenCalledTimes(1);
    expect(mockRedisStore).toHaveBeenCalledWith({
      client: redis,
      prefix: 'sess:',
      ttl: 60 * 60 * 24,
    });
  });

  it('exporte le client redis', () => {
    expect(redis).toBeDefined();
  });
});