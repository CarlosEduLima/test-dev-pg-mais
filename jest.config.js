module.exports = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js'],
  setupFilesAfterEnv: ['./setup.js']
}
