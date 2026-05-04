import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        index: path.resolve('./src/index.ts'),
        parser: path.resolve('./src/parser.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        '@babel/generator',
        '@jridgewell/trace-mapping',
        '@vietscript/parser',
        'espree',
        'eslint',
      ],
      output: {
        exports: 'named',
      },
    },
  },
})
