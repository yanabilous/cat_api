import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from '@rollup/plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'], // Adjust these patterns based on your project structure
    }),
  ],
  server: {
    host: 'localhost',
    open: true,
    port: 3000,
  },
});
