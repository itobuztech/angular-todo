module.exports = {
  globalSetup: './jest/setup-head.js',
  globalTeardown: './jest/teardown.js',
  testEnvironment: './jest/puppeteer-environment.js',
  setupTestFrameworkScriptFile: './jest/setup-browser.js',
  globals: {
    "page": null,
    "baseUrl": "http://localhost:4200/"
  }
}