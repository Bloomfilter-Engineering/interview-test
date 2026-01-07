import linaria from '@wyw-in-js/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    react(),
    linaria({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: [
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@linaria/babel-preset',
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    exclude: ['node_modules', 'dist', 'e2e', 'cypress'],
  },
})
