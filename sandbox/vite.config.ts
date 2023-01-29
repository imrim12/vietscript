import path from "node:path";

import DavaScriptPlugin from "@davascript/plugin-vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      name: "davascript",
      entry: path.resolve("./src/index.ts"),
      formats: ["es", "cjs"],

      fileName: (format: string) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
  },
  plugins: [DavaScriptPlugin()],
});
