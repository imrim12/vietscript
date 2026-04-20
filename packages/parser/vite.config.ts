import path from 'node:path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: {
      '@parser': path.resolve('./src'),
    },
  },
  build: {
    emptyOutDir: false,
    lib: {
      name: '@vietscript/parser',
      entry: path.resolve('./src/index.ts'),
      formats: ['es', 'cjs', 'umd'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [],
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
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
})
