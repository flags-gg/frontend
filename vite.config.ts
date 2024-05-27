import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@C': path.resolve(__dirname, '/src/components'),
      '@HC': path.resolve(__dirname, '/src/pages/Homepage/components'),
      '@DC': path.resolve(__dirname, '/src/pages/Dashboard/components'),
      '@DL': path.resolve(__dirname, '/src/pages/Dashboard/lib'),
    },
  },
  plugins: [
    react(),
    eslint(),
  ],
})
