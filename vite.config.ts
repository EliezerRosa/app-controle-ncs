import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const DEPLOY_BASE_PATH = '/app-controle-ncs/';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? DEPLOY_BASE_PATH : '/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
}));
