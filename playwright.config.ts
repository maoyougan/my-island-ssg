import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 50000,
  webServer: {
    url: 'http://localhost:5173',
    command: 'pnpm prepare:e2e',
    reuseExistingServer: !process.env.CI,
    timeout: 600 * 1000
  },
  use: {
    headless: true,
    browserName: 'chromium'
  }
};

export default config;
