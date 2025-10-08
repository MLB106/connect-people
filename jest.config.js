// jest.config.js
/** @type {import('jest').Config} */

export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  testMatch: ['**/__tests__/**/*.test.ts'],
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: {
        target: 'ES2022',
        module: 'ES2022',
        moduleResolution: 'node',
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        strict: true,
        skipLibCheck: true,
      },
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};