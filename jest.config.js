module.exports = {
  testMatch: [
    '<rootDir>/__tests__/**/*.test.{js,jsx,mjs}',
  ],
  transform: {
    '\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text-summary',
    'html',
    'json',
    'cobertura',
  ],
  collectCoverageFrom: [
    'src/**/*.(js)',
  ],
  reporters: [
    'default',
    [ 'jest-junit', { output: './report/junit.xml' }],
  ],
  moduleNameMapper: {
    '^api(.*)$': '<rootDir>/src/api$1',
    '^configs(.*)$': '<rootDir>/src/configs$1',
    '^constant(.*)$': '<rootDir>/src/database/constant$1',
    '^database(.*)$': '<rootDir>/src/database$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
    '^repositories(.*)$': '<rootDir>/src/repositories$1',
  },
};
