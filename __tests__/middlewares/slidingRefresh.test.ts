// Fichier : __tests__/middlewares/slidingRefresh.test.ts

import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { slidingRefresh } from '../../src/middlewares/slidingRefresh';
import type { Request, Response, NextFunction } from 'express';

jest.mock('jsonwebtoken');

describe('slidingRefresh middleware', () => {
  const mockReq = (cookies: Record<string, string> = {}) =>
    ({ cookies }) as Request;

  const mockRes = () => {
  const res: Partial<Response> = {
    cookie: jest.fn().mockReturnThis() as unknown as Response['cookie'],
  };
  return res as Response;
};

  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_USER_REFRESH_SECRET = 'test-secret';
    process.env.NODE_ENV = 'test';
  });

  it('ne fait rien si aucun refreshToken dans les cookies', async () => {
    const req = mockReq();
    const res = mockRes();
    const middleware = slidingRefresh('JWT_USER_REFRESH_SECRET');

    await middleware(req, res, mockNext);

    expect(res.cookie).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('regénère le token si expiration dans moins de 6 jours', async () => {
    const req = mockReq({ refreshToken: 'old-token' });
    const res = mockRes();

    const now = Math.floor(Date.now() / 1000);
    const payload = { userId: 42, role: 'user', exp: now + 5 * 24 * 60 * 60 };
    (jwt.verify as jest.Mock).mockReturnValue(payload);
    (jwt.sign as jest.Mock).mockReturnValue('new-token');

    const middleware = slidingRefresh('JWT_USER_REFRESH_SECRET');
    await middleware(req, res, mockNext);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 42, role: 'user' },
      'test-secret',
      { expiresIn: '7d' }
    );
    expect(res.cookie).toHaveBeenCalledWith('refreshToken', 'new-token', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('ne regénère pas le token si expiration > 6 jours', async () => {
    const req = mockReq({ refreshToken: 'old-token' });
    const res = mockRes();

    const now = Math.floor(Date.now() / 1000);
    const payload = { userId: 42, role: 'user', exp: now + 8 * 24 * 60 * 60 };
    (jwt.verify as jest.Mock).mockReturnValue(payload);

    const middleware = slidingRefresh('JWT_USER_REFRESH_SECRET');
    await middleware(req, res, mockNext);

    expect(jwt.sign).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  it('ignore les erreurs JWT et appelle next()', async () => {
    const req = mockReq({ refreshToken: 'invalid-token' });
    const res = mockRes();

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('invalid signature');
    });

    const middleware = slidingRefresh('JWT_USER_REFRESH_SECRET');
    await middleware(req, res, mockNext);

    expect(jwt.sign).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});