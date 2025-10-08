// __tests__/middlewares/error.middleware.test.ts
// __tests__/middlewares/error.middleware.test.ts
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

/* 1.  mock inline (code exécutable) */
jest.mock('../../src/services/logger.service', () => ({
  logger: {
    error: jest.fn(),
    info:  jest.fn(),
    warn:  jest.fn(),
  },
}));

/* 2.  imports normaux */
import { AppError, errorMiddleware, asyncHandler } from '../../src/middlewares/error.middleware';
import { logger } from '../../src/services/logger.service';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('errorMiddleware', () => {
  it('doit renvoyer 500 + stack en development', () => {
    const req: any = { ip: '127.0.0.1', method: 'POST', originalUrl: '/test' };
    const res: any = { headersSent: false, status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    errorMiddleware(new Error('Boom'), req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ key: 'INTERNAL_SERVER_ERROR', stack: expect.any(String) })
    );
    expect(logger.error).toHaveBeenCalledTimes(1);

    process.env.NODE_ENV = original;
  });

  it('doit renvoyer 400 sans stack en production', () => {
    const req: any = { ip: '127.0.0.1', method: 'GET', originalUrl: '/users' };
    const res: any = { headersSent: false, status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    errorMiddleware(new AppError('VALIDATION_ERROR'), req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ key: 'VALIDATION_ERROR' });
    expect(logger.error).toHaveBeenCalledTimes(1);

    process.env.NODE_ENV = original;
  });

  it('doit court-circuiter si headersSent', () => {
    const req: any = {};
    const res: any = { headersSent: true, status: jest.fn(), json: jest.fn() };
    const next = jest.fn();

    errorMiddleware(new Error('ignored'), req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('asyncHandler doit catcher les rejets', async () => {
    const next = jest.fn();
    const handler = asyncHandler(async () => {
      throw new Error('async');
    });

    await handler({} as any, {} as any, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({ message: 'async' }));
  });
});