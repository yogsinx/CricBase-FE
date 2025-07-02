import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }), // Opens a treemap in browser
    viteCompression({ algorithm: 'brotliCompress' }), // Outputs .br or .gz compressed assets ready for CDN/server
  ],
  server: {
    port: 3000,       // Custom dev port
    open: true,       // Opens browser on dev start
  },
  build: {
    target: 'es2015', // Compatibility target for browsers
    outDir: 'dist',   // Output folder
    assetsDir: 'assets',
    sourcemap: true,  // Useful for debugging production
  }
});