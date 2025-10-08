// __tests__/unit/env.test.ts
/**
 * Test unitaire : validation du module `env.ts`
 * Vérifie que toutes les variables requises sont présentes
 * et que les types sont corrects.
 */

// 1️⃣ Charger explicitement le fichier .env.test AVANT tout import
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

// 2️⃣ Ensuite, importer le module env
import { env } from '../../src/config/env';

describe('🧪 Environment configuration', () => {
  it('✅ doit charger toutes les variables requises', () => {
    expect(env.port).toBeGreaterThan(0);
    expect(env.db.host).toBeDefined();
    expect(env.db.port).toBeGreaterThan(0);
    expect(env.db.name).toBeDefined();
    expect(env.db.user).toBeDefined();
    expect(env.db.password).toBeDefined(); // peut être vide
    expect(env.redis.host).toBeDefined();
    expect(env.redis.port).toBeGreaterThan(0);
    expect(env.session.secret).toBeDefined();
    expect(env.jwt.secret).toBeDefined();
    expect(env.mail.host).toBeDefined();
    expect(env.mail.port).toBeGreaterThan(0);
    expect(env.mail.user).toBeDefined();
    expect(env.mail.pass).toBeDefined();
    expect(env.csrfSecret).toBeDefined();
  });

  it('✅ doit avoir des valeurs par défaut correctes', () => {
    console.log('RATE_LIMIT_MAX =', process.env.RATE_LIMIT_MAX);
    expect(env.port).toBe(3000);
    expect(env.nodeEnv).toBe('test');
    expect(env.corsOrigin).toContain('http://localhost:3000');
    expect(env.rateLimit.windowMs).toBe(900000);
    expect(env.rateLimit.max).toBe(100);
  });
});