/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },

  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/env/*.ts',
    '!src/http/routes/_errors/*.ts',
    '!src/main.ts',
  ],
  coverageProvider: 'v8',

  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },

  rootDir: '.',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testPathIgnorePatterns: ['/node_modules/'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  extensionsToTreatAsEsm: ['.ts'],
}

module.exports = config
