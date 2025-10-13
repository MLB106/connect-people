// src/services/rateLimitService.ts
import { redis } from './redis.service';
const PREFIX = 'rl:';
const DEFAULT_WINDOW = 60;
const DEFAULT_MAX = 100;
export const hit = async (id, windowSeconds = DEFAULT_WINDOW, maxHits = DEFAULT_MAX) => {
    const key = `${PREFIX}${id}`;
    const res = await redis
        .multi()
        .incr(key)
        .expire(key, windowSeconds)
        .exec();
    const current = Number(res[0][1]);
    return current > maxHits ? 'BLOCKED' : 'OK';
};
export const reset = (id) => redis.del(`${PREFIX}${id}`);
//# sourceMappingURL=rateLimitService.js.map