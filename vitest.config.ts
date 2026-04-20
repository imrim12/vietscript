import path from "node:path";

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@parser": path.resolve("./packages/parser/src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    testTimeout: 10_000,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      include: ["packages/*/src/**"],
      exclude: [
        "**/__test__/**",
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/dist/**",
        "**/node_modules/**",
      ],
      reportsDirectory: "./coverage",
    },
  },
});
