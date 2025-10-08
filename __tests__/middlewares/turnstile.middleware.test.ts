// __tests__/middlewares/turnstile.middleware.test.ts
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { turnstileGuard } from '../../src/middlewares/turnstile.middleware';
import { hit } from '../../src/services/rateLimitService';
import { verifyTurnstile } from '../../src/services/turnstile.service';
import { logger } from '../../src/services/logger.service';
import type { Request, Response, NextFunction } from 'express';

jest.mock('../../src/services/rateLimitService');
jest.mock('../../src/services/turnstile.service');
jest.mock('../../src/services/logger.service');

describe('turnstileGuard', () => {
  const mockReq = (token?: string, ip = '1.2.3.4') =>
    ({ ip, socket: { remoteAddress: ip }, body: { turnstileToken: token } } as Request);

  const mockRes = () => {
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    return res as Response;
  };

  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renvoie 429 si rate-limit dépassé', async () => {
    jest.mocked(hit).mockResolvedValue('BLOCKED');
    const req = mockReq('valid-token');
    const res = mockRes();

    await turnstileGuard(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({ message: 'Too many attempts' });
    expect(mockNext).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith('Rate-limit exceeded', { ip: '1.2.3.4' });
  });

  it('renvoie 400 si token Turnstile absent', async () => {
    jest.mocked(hit).mockResolvedValue('OK');
    const req = mockReq(undefined);
    const res = mockRes();

    await turnstileGuard(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or missing token' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('renvoie 400 si token Turnstile invalide', async () => {
    jest.mocked(hit).mockResolvedValue('OK');
    jest.mocked(verifyTurnstile).mockResolvedValue(false);
    const req = mockReq('bad-token');
    const res = mockRes();

    await turnstileGuard(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or missing token' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('passe à next() si tout est OK', async () => {
    jest.mocked(hit).mockResolvedValue('OK');
    jest.mocked(verifyTurnstile).mockResolvedValue(true);
    const req = mockReq('good-token');
    const res = mockRes();

    await turnstileGuard(req, res, mockNext);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});