import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Test directory where your test files are located
  testDir: './tests',

  // Timeout for each test
  timeout: 30 * 1000,

  // Maximum number of workers to run tests in parallel
  fullyParallel: true,

  // Retry on failure
  retries: 1,

  // Reporters to display test results in different formats
  reporter: [['line'], ['html', { outputFolder: 'test-results', open: 'never' }]],

  // Global settings for all tests
  use: {
    // Base URL for the tests
    baseURL: 'http://localhost:1000',
    // Browser options
    headless: false,
    // Screenshot options
    screenshot: 'only-on-failure',
    // Video recording options
    video: 'retain-on-failure',
  },
});
'use strict';

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: 'list',
  use: {
    headless: false,
    browserName: 'chromium',
    baseURL: 'http://localhost:1000',
  },
  outputDir: 'test-results/',
});
