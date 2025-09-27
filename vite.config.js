import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AppReact-Natalia-Jimena-Juliana/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})