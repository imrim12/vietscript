import path from 'node:path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@parser': path.resolve('./packages/parser/src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    testTimeout: 10_000,
    include: ['packages/**/src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
      '**/.nx/**',
      '**/.vitepress/cache/**',
      '**/coverage/**',
      '**/__bench__/**',
      '**/*.bench.?(c|m)[jt]s?(x)',
    ],
    benchmark: {
      include: ['packages/**/src/**/*.bench.?(c|m)[jt]s?(x)'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
      ],
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json-summary'],
      include: ['packages/parser/src/**', 'packages/shared/**'],
      exclude: [
        '**/__test__/**',
        '**/__bench__/**',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.bench.ts',
        '**/dist/**',
        '**/node_modules/**',
      ],
      reportsDirectory: './coverage',
    },
  },
})
