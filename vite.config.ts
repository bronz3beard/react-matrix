import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Demo site (GitHub Pages). The npm library is built by vite.lib.config.ts.
export default defineConfig({
  base: '/react-matrix/',
  build: {
    outDir: 'dist-site',
  },
  plugins: [react()],
});
