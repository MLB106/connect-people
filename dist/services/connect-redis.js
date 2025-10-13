// src/services/redis.service.ts
import { createClient } from 'redis';
// import session from 'express-session';
import RedisStore from 'connect-redis'; // <- 7.x expose directement la classe
// 1. Client Redis
const client = createClient({ url: process.env.REDIS_URL });
client.on('error', console.error);
// 2. Connexion unique
export async function connectRedis() {
    if (!client.isOpen)
        await client.connect();
}
// 3. Store Express-Session (7.x : on passe directement la classe)
export const sessionStore = new RedisStore({
    client,
    prefix: 'sess:',
    ttl: 60 * 60 * 24,
});
// 4. Export du client au besoin
export { client as redis };
//# sourceMappingURL=connect-redis.js.map