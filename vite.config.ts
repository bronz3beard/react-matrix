import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const page = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// Demo site (GitHub Pages). The npm library is built by vite.lib.config.ts.
// E2E_FIXTURES=1 (set by `npm run test:e2e`) also builds test-only pages; the
// Pages workflow builds without it, so fixtures are never deployed.
export default defineConfig({
  base: '/react-matrix/',
  build: {
    outDir: 'dist-site',
    rolldownOptions: {
      input: {
        main: page('./index.html'),
        ...(process.env.E2E_FIXTURES ? { csp: page('./e2e/fixtures/csp.html') } : {}),
      },
    },
  },
  plugins: [react()],
});
