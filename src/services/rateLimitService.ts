// src/services/rateLimitService.ts
import { redis } from './redis.service';

const PREFIX = 'rl:';
const DEFAULT_WINDOW = 60;
const DEFAULT_MAX = 100;

export const hit = async (
  id: string,
  windowSeconds = DEFAULT_WINDOW,
  maxHits = DEFAULT_MAX
): Promise<'OK' | 'BLOCKED'> => {
  const key = `${PREFIX}${id}`;
  const res = await redis
    .multi()
    .incr(key)
    .expire(key, windowSeconds)
    .exec();
    const current = Number((res as [string, number][])[0]?.[1] ?? 0);
  return current > maxHits ? 'BLOCKED' : 'OK';
};

export const reset = (id: string) => redis.del(`${PREFIX}${id}`);