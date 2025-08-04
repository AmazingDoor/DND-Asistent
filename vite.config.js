import { defineConfig } from 'vite';

export default defineConfig({
  root: 'static/js',
  build: {
    outDir: '../../static/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        client: 'static/js/client.js'
      },
      output: {
        entryFileNames: 'client-bundle.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  }
});