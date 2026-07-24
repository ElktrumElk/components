import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { componentAutoImport } from '@elktrumelk/components/plugin'

export default defineConfig({
  plugins: [react(), componentAutoImport()],
})
