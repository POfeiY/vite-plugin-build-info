import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import BuildInfoToHtml from 'vite-plugin-build-info-to-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), BuildInfoToHtml()],
})
