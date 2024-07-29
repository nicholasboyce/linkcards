import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'client'),
  base: '/',
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'client/index.html')
    },
    outDir: resolve(__dirname, '../server/dist'),
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      },
    }
  },
  plugins: [react()],
})
