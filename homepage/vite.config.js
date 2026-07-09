import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 使用相对路径，便于部署到任意子路径（GitHub Pages / Vercel / 直接打开）
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
