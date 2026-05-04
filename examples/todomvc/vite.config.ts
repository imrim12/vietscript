import vietScript from '@vietscript/plugin-vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vietScript(), vue()],
})
