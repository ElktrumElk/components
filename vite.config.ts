/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test-setup.ts',
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/components.ts'),
        hooks: resolve(__dirname, 'src/hooks/index.ts'),
        icons: resolve(__dirname, 'src/icons/index.ts'),
        plugin: resolve(__dirname, 'src/plugin.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', /^react\//],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
