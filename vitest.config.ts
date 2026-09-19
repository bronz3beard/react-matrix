import { defineConfig } from "vitest/config";

// Unit and component tests. Kept apart from the site (vite.config.ts) and
// library (vite.lib.config.ts) builds so each config has a single job.
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['test/**/*.test.{ts,tsx}'],
  },
});
