import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from "@rollup/plugin-eslint";
// import eslint from "vite-plugin-eslint";
// import eslintPlugin from "vite-plugin-eslint";
import eslintPlugin from '@rollup/plugin-eslint';

// export default defineConfig({
//   // main config object
//   root: "src/", // change root path from 'project root' to 'project root/src'
//   build: {
//     // configure build options
//     outDir: "../build", // change build folder to 'docs
//     minify: "esbuild" // minify build with 'esbuild
//   },
//   server: {
//     // configure dev server
//     host: "localhost",
//     open: true, // open on start
//     port: 3000 // port
//   },
//   plugins: [
//     react(),
//     { ...eslint({ failOnWarning: false, failOnError: false }) }
//   ] // vite plugins
//   // base: "/" // configure path to auto-deploy process
// });

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
