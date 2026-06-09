import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy /api to the backend in local dev so the frontend can use relative URLs
    // (same approach as the Vercel proxy in vercel.json).
    proxy: {
      '/api': {
        target: 'http://46.36.132.155:8080',
        changeOrigin: true,
      },
    },
  },
})
