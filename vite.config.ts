import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-matrix/",
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, "lib/index.tsx"),
      name: "React Data Matrix",
      fileName: (format) => `react-data-matrix.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [dts(), react()],
});
