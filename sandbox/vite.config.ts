import path from "node:path";

import VietScriptPlugin from "@vietscript/plugin-vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      name: "vietscript",
      entry: path.resolve("./src/index.vjs"),
      formats: ["es"],
      fileName: "index.mjs",
    },
  },
  plugins: [VietScriptPlugin()],
});
