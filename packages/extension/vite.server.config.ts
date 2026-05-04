import path from 'node:path'
import { defineConfig } from 'vite'

// LSP server runs in its own Node process spawned by VSCode. The .vsix
// ships no node_modules, so bundle every dependency.
export default defineConfig({
  ssr: {
    noExternal: true,
  },
  build: {
    emptyOutDir: false,
    target: 'node18',
    ssr: true,
    minify: false,
    lib: {
      entry: path.resolve('./src/server.ts'),
      formats: ['cjs'],
      fileName: () => 'server.js',
    },
    rollupOptions: {
      external: [
        /^node:/,
      ],
      output: {
        exports: 'named',
      },
    },
  },
})
