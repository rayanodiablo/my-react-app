import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'  // Ensure this matches Render's "Publish Directory"
  },
  server: {
    host: true,      // Allows access from outside localhost during dev
    port: 5173       // Optional, can be set as needed
  },
  base: '/'          // Ensure base is set correctly for root deployment
})