import path from 'node:path'
import { defineConfig } from 'vite'

// VSCode hosts ship the .vsix without node_modules, so every dependency
// (other than `vscode` itself, which the editor provides) needs to be
// bundled into the extension entry. Vite SSR externalises all package.json
// deps by default — `ssr.noExternal: true` flips that.
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
      entry: path.resolve('./src/extension.ts'),
      formats: ['cjs'],
      fileName: () => 'extension.js',
    },
    rollupOptions: {
      external: [
        'vscode',
        /^node:/,
      ],
      output: {
        exports: 'named',
      },
    },
  },
})
