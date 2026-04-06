import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/rrhh/', // ¡Asegúrese de que la barra final esté incluida!
})
