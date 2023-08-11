import path from "node:path";

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@lang": path.resolve("./packages/parser/src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
