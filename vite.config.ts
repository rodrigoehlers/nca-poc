import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
  root: 'app',
  base: 'http://localhost:3000',
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@/types': path.resolve(__dirname, './types'),
    },
  },
  build: {
    outDir: '../dist',
  },
  server: {
    hmr: {
      host: 'localhost',
    },
  },
});
