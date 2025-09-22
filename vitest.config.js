import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // Esto permite usar vi sin importarlo en cada archivo
    setupFiles: './test/setup.js',
    include: ['test/**/*.{test,spec}.{js,jsx,ts,tsx}']
  }
})