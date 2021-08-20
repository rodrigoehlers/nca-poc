import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
  root: 'app',
  base: '',
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@/types': path.resolve(__dirname, './types'),
    },
  },
  build: {
    outDir: '../out/dist',
  },
  server: {
    hmr: {
      host: 'localhost',
    },
  },
});
