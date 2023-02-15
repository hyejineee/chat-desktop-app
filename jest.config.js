/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './renderer',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>/renderer'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['node_modules'],
  moduleNameMapper: {
    '^@repositories/(.*)$': '<rootDir>/renderer/src/commons/repositories/$1',
    '^@dataSources/(.*)': '<rootDir>/renderer/src/commons/dataSources/$1',
    '^@constants/(.*)': '<rootDir>/renderer/src/commons/constants/$1',
    '^@type/(.*)': '<rootDir>/renderer/src/commons/type/$1',
    '^@contexts/(.*)': '<rootDir>/renderer/src/commons/contexts/$1',
    '^@utils/(.*)': '<rootDir>/renderer/src/commons/utils/$1',
  },
  collectCoverageFrom: [
    'renderer/src/**/*.[jt]s?(x)',
    '!renderer/pages/',
    '!renderer/src/commons/settings/*.[jt]s?(x)',
    '!renderer/src/commons/dataSources/**/*.[jt]s?(x)',
    '!renderer/src/commons/repositories/**/*.[jt]s?(x)',
    '!renderer/src/commons/constants/*.[jt]s?(x)',
    '!renderer/src/commons/utils/*.[jt]s?(x)',
    '!renderer/src/commons/type/container.ts',
    '!**/*.styles.[jt]s?(x)',
    '!**/*.types.[jt]s?(x)',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-plugin-context/setup',
  ],
  setupFiles: ['jest-plugin-context/setup'],
  verbose: true,
};

module.exports = createJestConfig(customJestConfig);
