import {
  defineConfig
} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        portfolio: 'portfolio.html'
      }
    }
  },
  define: {
    __WEATHER_API_KEY__: JSON.stringify(process.env.VITE_WEATHER_API_KEY)
  }
});
