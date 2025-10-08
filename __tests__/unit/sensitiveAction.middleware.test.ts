// __tests__/unit/sensitiveAction.middleware.test.ts

// 1. Mock ESM
jest.mock('ip-cidr', () => ({
  __esModule: true,
  default: class {
    constructor(public cidr: string) {}
    contains() { return true; }
  },
}));

// 2. Mock services
jest.mock('../../src/services/security.service', () => ({
  isStaticIPAllowed: jest.fn(() => true),
  isBusinessHours: jest.fn(() => true),
}));

// 3. Mock rôles
jest.mock('../../src/config/adminRoles', () => ({
  PERMISSION_MATRIX: {
    super: { users: 3, finance: 2 },
    moderator: { users: 2, finance: 1 },
  },
}));

import request from 'supertest';
import express from 'express';
import { sensitiveAction } from '../../src/middlewares/admin/sensitiveAction.middleware';
import { authorizeAdmin } from '../../src/middlewares/admin/authorizeAdmin';
// ✅ Ajoute ces deux lignes juste après tes autres imports
import { isStaticIPAllowed, isBusinessHours } from '../../src/services/security.service';

const mockedIsBusinessHours = isBusinessHours as jest.MockedFunction<typeof isBusinessHours>;
const mockedIsStaticIPAllowed = isStaticIPAllowed as jest.MockedFunction<typeof isStaticIPAllowed>;


jest.mock('../../src/middlewares/admin/authorizeAdmin');
const mockedAuthorizeAdmin = authorizeAdmin as jest.MockedFunction<typeof authorizeAdmin>;

describe('sensitiveAction middleware', () => {
  beforeEach(() => {
  jest.clearAllMocks();
  mockedIsBusinessHours.mockReturnValue(true);
  mockedIsStaticIPAllowed.mockReturnValue(true);
  mockedAuthorizeAdmin.mockReturnValue((_req, _res, next) => next());
});

  test('autorise si tout est OK', async () => {
    const app = express();
    app.use(express.json());
    app.use((req: any, _res, next) => {
      req.session = { confirmationCode: '123456' };
      req.user = { id: 'u1', role: 'super', authentificationMultiFacteurs: true };
      next();
    });
    app.post('/test-sensitive', ...sensitiveAction('users', 2), (_req, res) => res.status(200).json({ ok: true }));

    const res = await request(app)
      .post('/test-sensitive')
      .send({ confirmationCode: '123456' })
      .set('x-forwarded-for', '192.168.1.100');

    expect(res.statusCode).toBe(200);
  });
});