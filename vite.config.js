import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://freelance-capstoneproject-backend.onrender.com',
        changeOrigin: true,
        secure: true, // Set this to true if your backend uses HTTPS
      },
    },
  },
})
