// src/services/redis.service.ts
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
// 1. Client Redis
const client = createClient({ url: process.env.REDIS_URL });
client.on('error', console.error);
// 2. Connexion unique
export async function connectRedis() {
    if (!client.isOpen)
        await client.connect();
}
// 3. Store Express-Session
export const sessionStore = new RedisStore({
    client,
    prefix: 'sess:',
    ttl: 60 * 60 * 24, // 1 jour
});
// 4. Export du client au besoin
export { client as redis };
//# sourceMappingURL=redis.service.js.map