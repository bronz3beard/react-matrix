import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

// React is always provided by the host app: never bundle `react`, `react-dom`
// or any of their subpaths (e.g. `react/jsx-runtime`).
export const EXTERNAL_PACKAGES = /^react(-dom)?($|\/)/;

// Library build published to npm (ESM only). Type declarations are emitted
// separately by `tsc -p tsconfig.lib.json`; the demo site is built by vite.config.ts.
export default defineConfig({
  build: {
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: fileURLToPath(new URL('./lib/index.tsx', import.meta.url)),
      formats: ['es'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: EXTERNAL_PACKAGES,
    },
  },
  plugins: [react()],
});
