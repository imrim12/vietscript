import path from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
  plugins: [
    dts({
      root: '.',
      entryRoot: './src',
      outDir: './dist/types',
    }),
  ],
})
