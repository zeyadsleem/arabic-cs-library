import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/tour',
  testMatch: '**/*.spec.js',
  fullyParallel: false,
  workers: 1,
  timeout: 120_000,
  use: { baseURL: process.env.TOUR_TEST_URL || 'http://127.0.0.1:4179', headless: true },
  webServer: process.env.TOUR_TEST_URL ? undefined : {
    command: 'BASE_PATH=/arabic-cs-library node node_modules/vite/bin/vite.js dev --host 127.0.0.1 --port 4179',
    url: 'http://127.0.0.1:4179/arabic-cs-library/',
    timeout: 120_000,
    reuseExistingServer: false
  }
});
