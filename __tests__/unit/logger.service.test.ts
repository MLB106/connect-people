// __tests__/unit/logger.service.test.ts
import winston from 'winston';
// import DailyRotateFile from 'winston-daily-rotate-file';
import { logger, log } from '../../src/services/logger.service';

/* 1.  Mocks */
jest.mock('winston-daily-rotate-file', () => {
  return jest.fn().mockImplementation((opts) => ({
    name: opts.filename,
    log: jest.fn(),
  }));
});

jest.mock('winston', () => {
  const mockTransports = {
    Console: jest.fn(() => ({ name: 'console', log: jest.fn() })),
    DailyRotateFile: jest.requireActual('winston-daily-rotate-file'), // déjà mocké au-dessus
  };
  return {
    createLogger: jest.fn(() => ({
      info : jest.fn(),
      error: jest.fn(),
    })),
    format: {
      combine : jest.fn((...args) => args),
      timestamp: jest.fn(() => 'time'),
      json     : jest.fn(() => 'json'),
      colorize : jest.fn(() => 'color'),
      simple   : jest.fn(() => 'simple'),
    },
    transports: mockTransports,
  };
});

/* 2.  Tests */
describe('logger.service', () => {
  afterEach(() => jest.clearAllMocks());

  it('crée le logger avec 3 transports', () => {
    expect(winston.createLogger).toHaveBeenCalledTimes(1);
    const opts = (winston.createLogger as jest.Mock).mock.calls[0][0];
    expect(opts.transports).toHaveLength(3);
    expect(opts.level).toBe('info');
  });

  it('log.admin appelle logger.info avec les bons champs', () => {
    log.admin('createUser', 'bob', { age: 42 });
    expect(logger.info).toHaveBeenCalledWith({
      scope: 'admin',
      action: 'createUser',
      username: 'bob',
      age: 42,
    });
  });

  it('log.user appelle logger.info avec les bons champs', () => {
    log.user('updateProfile', 'alice');
    expect(logger.info).toHaveBeenCalledWith({
      scope: 'user',
      action: 'updateProfile',
      username: 'alice',
    });
  });
});