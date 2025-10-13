// src/tests/api-structure.test.ts
import { describe, it, expect } from '@jest/globals';
import { ApiResponseUtil } from '../utils/apiResponse.js';
import { commonSchemas } from '../utils/validation.js';
import { Logger } from '../utils/logger.js';

// Mock de Response pour les tests
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('API Structure Tests', () => {
  describe('ApiResponseUtil', () => {
    it('should send success response with data', () => {
      const res = mockResponse();
      const testData = { id: 1, name: 'Test' };
      
      ApiResponseUtil.success(res, 200, testData);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: testData,
        error: null,
        timestamp: expect.any(String)
      });
    });

    it('should send error response', () => {
      const res = mockResponse();
      
      ApiResponseUtil.error(res, 500, 'Test error');
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        data: null,
        error: 'Test error',
        timestamp: expect.any(String)
      });
    });

    it('should send validation error response', () => {
      const res = mockResponse();
      const errors = ['name is required', 'email is invalid'];
      
      ApiResponseUtil.validationError(res, errors);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        data: null,
        error: 'Erreur de validation: name is required, email is invalid',
        timestamp: expect.any(String)
      });
    });

    it('should send not found response', () => {
      const res = mockResponse();
      
      ApiResponseUtil.notFound(res, 'Resource not found');
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        data: null,
        error: 'Resource not found',
        timestamp: expect.any(String)
      });
    });
  });

  describe('Validation', () => {
    it('should validate mongoId correctly', () => {
      const validId = '507f1f77bcf86cd799439011';
      const invalidId = 'invalid-id';
      
      expect(commonSchemas.mongoId.safeParse(validId).success).toBe(true);
      expect(commonSchemas.mongoId.safeParse(invalidId).success).toBe(false);
    });

    it('should validate pagination correctly', () => {
      const validPagination = { page: '1', limit: '10', order: 'desc' };
      const invalidPagination = { page: 'invalid', limit: '10' };
      
      expect(commonSchemas.pagination.safeParse(validPagination).success).toBe(true);
      expect(commonSchemas.pagination.safeParse(invalidPagination).success).toBe(false);
    });
  });

  describe('Logger', () => {
    it('should log info message', () => {
      const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
      
      Logger.info('Test message', { key: 'value' });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[INFO] Test message')
      );
      
      consoleSpy.mockRestore();
    });

    it('should log error message', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      Logger.error('Test error', { key: 'value' });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR] Test error')
      );
      
      consoleSpy.mockRestore();
    });
  });
});
