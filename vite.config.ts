import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  root: 'app',
  base: 'http://localhost:3000',
  plugins: [reactRefresh()],
  build: {
    outDir: '../dist',
  },
  server: {
    hmr: {
      host: 'localhost',
    },
  },
});
