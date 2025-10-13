// __tests__/unit/axiosConfig.test.ts
/**
 * @jest-environment jsdom
 */
process.env.API_BASE_URL = 'http://localhost:4000/api';
process.env.API_TIMEOUT = '10000';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
jest.mock('../../src/client/storage', () => ({
  getAuthToken: jest.fn(),
}));
import axiosInstance from '../../src/config/axiosConfig';
import { getAuthToken } from '../../src/client/storage';


const server = setupServer(
  http.get('http://localhost:4000/api/dummy', () => {
    return HttpResponse.json({});
  }),
  http.get('http://localhost:4000/api/not-found', () => {
    return HttpResponse.json({ message: 'Not Found' }, { status: 404 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('axiosConfig', () => {
  test('l’instance possède la bonne baseURL', () => {
    expect(axiosInstance.defaults.baseURL).toBe('http://localhost:4000/api');
  });

  test('l’instance possède le bon timeout', () => {
    expect(axiosInstance.defaults.timeout).toBe(10000);
  });

  test('getAuthToken est appelé avant chaque requête', async () => {
    (getAuthToken as jest.Mock).mockReturnValue('fake');
    await axiosInstance.get('/dummy');
    expect(getAuthToken).toHaveBeenCalled();
  });

  test('intercepteur réponse log et rejette', async () => {
    // Forcer le mode développement pour que le console.error soit appelé
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(axiosInstance.get('/not-found')).rejects.toThrow();
    expect(consoleSpy).toHaveBeenCalledWith('Erreur API :', expect.stringContaining('404'));
    
    // Restaurer l'environnement original
    process.env.NODE_ENV = originalNodeEnv;
    consoleSpy.mockRestore();
  });
});