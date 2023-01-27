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
  collectCoverageFrom: ['src/**/*.[jt]s?(x)', '!pages/', '!src/commons/settings/*.[jt]s?(x)', '!src/commons/dataSources/**/*.[jt]s?(x)', '!**/*.styles.[jt]s?(x)', '!**/*.types.[jt]s?(x)'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', 'jest-plugin-context/setup'],
  setupFiles: ['jest-plugin-context/setup'],
  verbose: true,
};

module.exports = createJestConfig(customJestConfig);
