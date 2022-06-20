// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,

  collectCoverage: true,

  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],

  // coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  coverageReporters: ['json', 'text', 'lcov', 'clover'],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'ts-jest',

  testEnvironment: 'node',

  testMatch: ['**/unit/**/*.spec.ts'],
};
