import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'پانتوواژه',
        short_name: 'پانتوواژه',
        description: 'بازی حدس کلمه با دوستات',
        theme_color: '#7C3AED',
        background_color: '#F5F3FF',
        display: 'standalone',
        start_url: '/',
        lang: 'fa',
        dir: 'rtl',
        icons: [
          { src: '/logo.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
});
