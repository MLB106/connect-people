// __tests__/unit/rateLimitService.test.ts
import { redis } from '../../src/services/redis.service';
import { hit, reset } from '../../src/services/rateLimitService';

/* 1.  Chain complet */
const mockChain = {
  incr  : jest.fn().mockReturnThis(),
  expire: jest.fn().mockReturnThis(),
  exec  : jest.fn(),
};

jest.mock('../../src/services/redis.service', () => ({
  redis: {
    multi: jest.fn(() => mockChain),
    del  : jest.fn(),
  },
}));

describe('rateLimitService', () => {
  afterEach(() => jest.clearAllMocks());

  describe('hit', () => {
    it('return OK when limit not reached', async () => {
      mockChain.exec.mockResolvedValue([['incr', 1]]);
      const res = await hit('user123');
      expect(res).toBe('OK');
      expect(mockChain.incr).toHaveBeenCalledWith('rl:user123');
      expect(mockChain.expire).toHaveBeenCalledWith('rl:user123', 60);
    });

    it('return BLOCKED when limit exceeded', async () => {
      mockChain.exec.mockResolvedValue([['incr', 101]]);
      const res = await hit('user123');
      expect(res).toBe('BLOCKED');
    });

    it('uses custom window & max', async () => {
      mockChain.exec.mockResolvedValue([['incr', 5]]);
      await hit('user456', 120, 10);
      expect(mockChain.expire).toHaveBeenCalledWith('rl:user456', 120);
    });
  });

  describe('reset', () => {
    it('deletes the rate-limit key', async () => {
      await reset('user789');
      expect(redis.del).toHaveBeenCalledWith('rl:user789');
    });
  });
});