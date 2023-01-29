import path from "node:path";

import DavaScriptPlugin from "@davascript/plugin-vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      name: "davascript",
      entry: path.resolve("./src/index.vjs"),
      formats: ["es"],
      fileName: "index.mjs",
    },
  },
  plugins: [DavaScriptPlugin()],
});
