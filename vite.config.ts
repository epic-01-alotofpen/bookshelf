/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // Playwright の e2e は Vitest から除外する（重要）
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
  },
})