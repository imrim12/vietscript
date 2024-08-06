// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer(), nodePolyfills()] as any,
  define: {},
  test: {
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, './vitest.setup.js')
  },
  server: {
    port: 3001
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
