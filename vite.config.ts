/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

import { componentAutoImport } from './src/plugin.ts'

export default defineConfig(({ command }) => ({
  resolve: command === 'serve' ? {
    alias: {
      'elk-components': resolve(__dirname, 'src/components.ts'),
      'elk-components/hooks': resolve(__dirname, 'src/hooks/index.ts'),
    },
  } : undefined,
  plugins: [
    // 2. Register your custom plugin BEFORE react() so it can inject 
    // the missing imports while the file is still raw JSX text.
    componentAutoImport({
      componentsFrom: 'elk-components',       // Fallbacks to match your module resolution
      hooksFrom: 'elk-components/hooks'
    }),
    react()
  ],
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
        plugin: resolve(__dirname, 'src/plugin.ts'), // Bundles your plugin for users
      },
      formats: ['es'],
    },
    rollupOptions: {
      // 3. Mark third-party dependencies as external so they aren't bundled inside your library
      external: [
        'react', 
        'react-dom', 
        /^react\//,
        'elk-components', // Prevents the library from bundling itself recursively
        'vite'            // Essential since your 'plugin.ts' file imports 'Plugin' from Vite
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
}))
