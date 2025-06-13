import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Update if your test files are elsewhere
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
});
