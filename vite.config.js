import {
  defineConfig
} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'about.html',
        portfolio: 'index.html' // index.html은 portfolio로 변경
      }
    }
  }
});
