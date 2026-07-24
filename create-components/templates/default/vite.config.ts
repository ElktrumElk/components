import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { componentAutoImport } from '@elk/components/plugin'

export default defineConfig({
  plugins: [react(), componentAutoImport()],
})
