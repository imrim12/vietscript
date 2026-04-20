import path from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      name: '@vietscript/plugin-vite',
      entry: path.resolve('./src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['@vietscript/parser', 'fs', 'path'],
      output: {
        exports: 'named',
        globals: {},
      },
    },
  },
})
