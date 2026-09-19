import { defineConfig, devices } from "@playwright/test";

// The demo site is served by `vite preview` on an uncommon port with
// --strictPort, so a clash fails loudly instead of silently reusing someone
// else's server (override with E2E_PORT). In CI and in scripts/e2e-docker.sh the
// server runs inside the pinned Playwright container and publishes no host ports.
const PORT = Number(process.env.E2E_PORT ?? 47631);
const BASE_URL = `http://127.0.0.1:${PORT}/react-matrix/`;

export default defineConfig({
  testDir: 'e2e',
  // Screenshots are only compared inside the pinned container image, so one
  // baseline per name is enough (no per-platform suffix).
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  use: { baseURL: BASE_URL, trace: 'retain-on-failure' },
  webServer: {
    command: `npm run preview -- --host 127.0.0.1 --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: false,
  },
  projects: [
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 5'], viewport: { width: 360, height: 740 } },
    },
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } },
    },
    {
      name: 'webkit-mobile',
      use: { ...devices['iPhone 13'], viewport: { width: 360, height: 740 } },
    },
    {
      name: 'webkit-desktop',
      use: { ...devices['Desktop Safari'], viewport: { width: 1280, height: 800 } },
    },
  ],
});
