import { defineConfig } from '@playwright/test';
import base from './playwright.config.js';

// Exercise the real routes after minification (the runner serializes functions).
export default defineConfig({
  ...base,
  grep: /challenge page opens|existing HTML fetch challenge/,
  use: { ...base.use, baseURL: 'http://127.0.0.1:5174' },
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 5174 --strictPort', url: 'http://127.0.0.1:5174', reuseExistingServer: false },
});
