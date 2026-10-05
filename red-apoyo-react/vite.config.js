import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// React para el JSX y Tailwind como plugin de Vite (Tailwind v4).
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
