// Fichier : __tests__/client/authenticateUser.test.ts

import { authenticateUser } from '../../src/middlewares/user/authenticateUser';
import { log } from '../../src/services/logger.service';
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

jest.mock('jsonwebtoken');
jest.mock('../../src/services/logger.service');

describe('authenticateUser middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockReq = {
      headers: {},
      ip: '127.0.0.1',
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();

    process.env.JWT_USER_ACCESS_SECRET = 'test-secret';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if no Authorization header is present', () => {
    authenticateUser(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Token missing' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if Authorization header does not start with "Bearer "', () => {
    mockReq.headers = { authorization: 'InvalidHeader' };
    authenticateUser(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Token missing' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    mockReq.headers = { authorization: 'Bearer invalidtoken' };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authenticateUser(mockReq as Request, mockRes as Response, mockNext);
    expect(jwt.verify).toHaveBeenCalledWith('invalidtoken', 'test-secret');
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next and attach user to req if token is valid', () => {
    const payload = { id: '123', email: 'test@example.com', role: 'user' };
    mockReq.headers = { authorization: 'Bearer validtoken' };
    (jwt.verify as jest.Mock).mockReturnValue(payload);

    authenticateUser(mockReq as Request, mockRes as Response, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith('validtoken', 'test-secret');
    expect(mockReq.user).toEqual(payload);
    expect(log.user).toHaveBeenCalledWith('login', 'test@example.com', { ip: '127.0.0.1' });
    expect(mockNext).toHaveBeenCalled();
  });

  it('should handle missing JWT secret gracefully', () => {
    delete process.env.JWT_USER_ACCESS_SECRET;
    mockReq.headers = { authorization: 'Bearer token' };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authenticateUser(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Invalid token' });
  });
});