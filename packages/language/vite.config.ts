import path from "node:path";

import dts from "vite-plugin-dts";
import { defineConfig } from "vite";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      name: "viscript",
      entry: path.resolve(__dirname, "./src/index.ts"),
      formats: ["es", "cjs"],

      fileName: (format: string) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
    rollupOptions: {
      external: ["@viscript/shared"],

      output: {
        exports: "named",
        globals: {},
      },
    },
  },
  plugins: [
    dts({
      root: ".",
      entryRoot: "./src",
      outputDir: "./dist/types",
    }),
  ],
});
