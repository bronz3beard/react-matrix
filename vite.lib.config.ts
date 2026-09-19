import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// Library build published to npm. Type declarations are emitted separately by
// `tsc -p tsconfig.lib.json`; the demo site is built by vite.config.ts.
export default defineConfig({
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, 'lib/index.tsx'),
      name: 'React Data Matrix',
      fileName: (format) => `react-data-matrix.${format}.js`,
    },
    rolldownOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [react()],
});
