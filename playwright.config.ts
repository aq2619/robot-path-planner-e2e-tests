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
