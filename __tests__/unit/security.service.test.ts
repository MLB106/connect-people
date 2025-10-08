// Fichier : __tests__/unit/security.service.test.ts

/* 1.  Imports en .ts (pas besoin de .js) */
import {
  isIPAllowed,
  isStaticIPAllowed,
  isLocked,
  recordAttempt,
  resetAttempts,
  isMfaVerified,
  isValidConfirmationCode,
  isBusinessHours,
} from '../../src/services/security.service.js';
import { redis } from '../../src/services/redis.service.js';
import { AppRequest } from '../../src/types/request.js';

/* 2.  Redis mocké */
jest.mock('../../src/services/redis.service', () => ({
  redis: new (require('ioredis-mock')).default(),
}));

/* 3.  Étendre SessionData pour confirmationCode */
declare module 'express-session' {
  interface SessionData {
    confirmationCode?: string;
  }
}

/* 4.  Helper */
const mockRequest = (overrides?: Partial<AppRequest>): AppRequest =>
  ({
    ip: '1.2.3.4',
    user: null,
    body: {},
    session: {},
    ...overrides,
  } as any);

/* ------------------------------------------------------------------ */
/*  IP filtering                                                      */
/* ------------------------------------------------------------------ */
describe('IP filtering', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('allows every IP when whitelist is empty', () => {
    delete process.env.IP_WHITELIST;
    expect(isIPAllowed('10.0.0.1')).toBe(true);
  });

  it('allows only matching CIDR', () => {
    process.env.IP_WHITELIST = '192.168.1.0/24, 10.0.0.0/8';
    expect(isIPAllowed('192.168.1.50')).toBe(true);
    expect(isIPAllowed('10.10.10.10')).toBe(true);
    expect(isIPAllowed('172.16.0.1')).toBe(false);
  });

  describe('isStaticIPAllowed', () => {
    it.each([
      ['127.0.0.1', true],
      ['::1', true],
      ['::ffff:127.0.0.1', true],
      ['192.168.1.1', false],
    ])('static IP %s -> %s', (ip, expected) => {
      expect(isStaticIPAllowed(ip)).toBe(expected);
    });
  });
});

/* ------------------------------------------------------------------ */
/*  Login attempts                                                      */
/* ------------------------------------------------------------------ */
describe('Login attempts', () => {
  beforeEach(async () => {
    await (redis as any).flushAll(); // ← cast temporaire si nécessaire
  });

  it('is not locked when key does not exist', async () => {
    expect(await isLocked('user', 'toto@mail.com')).toBe(false);
  });

  it('becomes locked after max attempts', async () => {
    const email = 'toto@mail.com';
    for (let i = 0; i < 5; i++) await recordAttempt('user', email);
    expect(await isLocked('user', email)).toBe(true);
  });

  it('resets attempts', async () => {
    const email = 'toto@mail.com';
    await recordAttempt('user', email);
    await resetAttempts('user', email);
    expect(await redis.get('user:attempts:toto@mail.com')).toBeNull();
    expect(await isLocked('user', email)).toBe(false);
  });

  it('uses different namespaces for user vs admin', async () => {
    await recordAttempt('user', 'bob@mail.com');
    await recordAttempt('admin', 'bob@mail.com');
    const userCount = await redis.get('user:attempts:bob@mail.com');
    const adminCount = await redis.get('admin:attempts:bob@mail.com');
    expect(userCount).toBe('1');
    expect(adminCount).toBe('1');
  });
});

/* ------------------------------------------------------------------ */
/*  Business checks                                                   */
/* ------------------------------------------------------------------ */
describe('Business checks', () => {
  describe('isMfaVerified', () => {
    it('returns true only when user has MFA flag', () => {
      expect(isMfaVerified(mockRequest())).toBe(false);
      expect(
        isMfaVerified(
          mockRequest({ user: { authentificationMultiFacteurs: true } as any })
        )
      ).toBe(true);
    });
  });

  describe('isValidConfirmationCode', () => {
    it('compares body.code with session.code', () => {
      const req = mockRequest({
        body: { confirmationCode: '123456' },
        session: { confirmationCode: '123456' },
      });
      expect(isValidConfirmationCode(req)).toBe(true);

      req.body.confirmationCode = '000000';
      expect(isValidConfirmationCode(req)).toBe(false);
    });
  });

  describe('isBusinessHours', () => {
    it.each([
      [8, false],
      [9, true],
      [12, true],
      [17, true],
      [18, false],
      [23, false],
    ])('hour %i -> %s', (hours, expected) => {
      jest.spyOn(Date.prototype, 'getHours').mockReturnValue(hours);
      expect(isBusinessHours()).toBe(expected);
    });
  });
});