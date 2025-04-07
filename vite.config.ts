import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      ignoreConfigErrors: true
    })
  ],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@components': path.resolve('src/components'),
      '@app': path.resolve('src/app'),
      '@assets': path.resolve('src/assets'),
      '@hooks': path.resolve('src/hooks'),
      '@api': path.resolve('src/api'),
      '@helpers': path.resolve('src/helpers'),
    },
  },
});


