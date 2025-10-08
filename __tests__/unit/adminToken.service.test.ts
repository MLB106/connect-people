// Fichier : __tests__/unit/adminToken.service.test.ts

/*
  Tests unitaires  –  adminToken.service.ts
  Sécurité critique : JWT access / refresh + CSRF côté admin
  100 % isolation, 0 dépendance externe
*/

import jwt from 'jsonwebtoken';
import {
  generateAdminAccessToken,
  generateAdminRefreshToken,
  verifyAdminAccessToken,
  verifyAdminRefreshToken,
  generateAdminCSRFToken,
  verifyAdminCSRFToken,
} from '../../src/services/adminToken.service';

/* ------------------------------------------------------------------ */
/* 0.  Sécurité – on s’assure que les secrets sont présents             */
/* ------------------------------------------------------------------ */
beforeAll(() => {
  expect(process.env.JWT_ADMIN_ACCESS_SECRET).toBeDefined();
  expect(process.env.JWT_ADMIN_REFRESH_SECRET).toBeDefined();
});

/* ------------------------------------------------------------------ */
/* 1.  Access token                                                     */
/* ------------------------------------------------------------------ */
describe('generateAdminAccessToken', () => {
  it('produit un JWT signé contenant id, role, type=admin et exp 15 min', () => {
    const token = generateAdminAccessToken('admin42', 'president');
    const payload = jwt.decode(token) as any;

    expect(payload.id).toBe('admin42');
    expect(payload.role).toBe('president');
    expect(payload.type).toBe('admin');
    expect(payload.exp - payload.iat).toBe(15 * 60); // 15 min en secondes
  });
});

describe('verifyAdminAccessToken', () => {
  it('renvoie le payload quand le token est valide', () => {
    const token = generateAdminAccessToken('admin42', 'president');
    const payload = verifyAdminAccessToken(token);

    expect(payload.id).toBe('admin42');
    expect(payload.role).toBe('president');
    expect(payload.type).toBe('admin');
  });

  it('jette une erreur claire si le token est expiré', () => {
    // on force une expiration immédiate
    const token = jwt.sign(
      { id: 'a', role: 'president', type: 'admin', exp: Math.floor(Date.now() / 1000) - 10 },
      process.env.JWT_ADMIN_ACCESS_SECRET!
    );

    expect(() => verifyAdminAccessToken(token)).toThrow('Access token invalid: jwt expired');
  });

  it('jette une erreur claire si la signature est incorrecte', () => {
    const token = generateAdminAccessToken('a', 'president');
    const tampered = token.slice(0, -10) + '0000000000';

    expect(() => verifyAdminAccessToken(tampered)).toThrow('Access token invalid: invalid signature');
  });

  it('jette une erreur claire si le token est tronqué', () => {
    expect(() => verifyAdminAccessToken('invalid.token.here'))
  .toThrow('Access token invalid: invalid token');
  });
});

/* ------------------------------------------------------------------ */
/* 2.  Refresh token                                                    */
/* ------------------------------------------------------------------ */
describe('generateAdminRefreshToken', () => {
  it('produit un JWT signé contenant jti unique et exp 7 jours', () => {
    const token = generateAdminRefreshToken('admin42', 'president');
    const payload = jwt.decode(token) as any;

    expect(payload.id).toBe('admin42');
    expect(payload.role).toBe('president');
    expect(payload.type).toBe('admin');
    expect(payload.jti).toMatch(/^[0-9a-f-]{36}$/); // UUID v4
    expect(payload.exp - payload.iat).toBe(7 * 24 * 60 * 60); // 7 j en s
  });
});

describe('verifyAdminRefreshToken', () => {
  it('renvoie le payload quand le token est valide', () => {
    const token = generateAdminRefreshToken('refreshMe', 'president');
    const payload = verifyAdminRefreshToken(token);

    expect(payload.id).toBe('refreshMe');
    expect(payload.role).toBe('president');
    expect(payload.jti).toBeDefined();
  });

  it('jette une erreur claire si le token est expiré', () => {
    const token = jwt.sign(
      { id: 'a', role: 'president', type: 'admin', exp: Math.floor(Date.now() / 1000) - 10 },
      process.env.JWT_ADMIN_REFRESH_SECRET!
    );

    expect(() => verifyAdminRefreshToken(token)).toThrow('Refresh token invalid: jwt expired');
  });

  it('jette une erreur claire si la signature est incorrecte', () => {
    const token = generateAdminRefreshToken('a', 'president');
    const tampered = token.slice(0, -10) + '0000000000';

    expect(() => verifyAdminRefreshToken(tampered)).toThrow('Refresh token invalid: invalid signature');
  });
});

/* ------------------------------------------------------------------ */
/* 3.  CSRF                                                             */
/* ------------------------------------------------------------------ */
describe('CSRF tokens', () => {
  it('génère un token hexadécimal de 64 caractères', () => {
    const tok = generateAdminCSRFToken();
    expect(tok).toMatch(/^[0-9a-f]{64}$/);
  });

  it('verifyAdminCSRFToken renvoie true si les deux chaînes sont identiques', () => {
    const t = generateAdminCSRFToken();
    expect(verifyAdminCSRFToken(t, t)).toBe(true);
  });

  it('verifyAdminCSRFToken renvoie false si les longueurs diffèrent', () => {
    const a = generateAdminCSRFToken();
    const b = a.slice(0, 60);
    expect(verifyAdminCSRFToken(a, b)).toBe(false);
  });

  it('verifyAdminCSRFToken renvoie false si un token est mal formé (non hex)', () => {
    const a = generateAdminCSRFToken();
    const b = 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
    expect(verifyAdminCSRFToken(a, b)).toBe(false);
  });
});