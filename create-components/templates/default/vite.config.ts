import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { componentAutoImport } from 'components/plugin'

export default defineConfig({
  plugins: [react(), componentAutoImport()],
})
