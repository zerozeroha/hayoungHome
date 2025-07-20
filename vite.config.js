import {
  defineConfig
} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        portfolio: 'portfolio로.html'
      }
    }
  }
});
