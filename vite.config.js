import { defineConfig } from 'vite';

export default defineConfig({
  root: 'static/js',    // <-- point this to where your existing JS files live
  build: {
    outDir: '../../static/dist',  // <-- output the built files here
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'static/js/client.js'   // entry point, relative to root
        // add others if you have multiple entry points
      }
    }
  }
});