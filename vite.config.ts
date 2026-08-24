import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const siteUrl = (process.env.VITE_SITE_URL ?? '').replace(/\/$/, '');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-site-url',
      transformIndexHtml(html) {
        return html.replaceAll('__SITE_URL__', siteUrl);
      },
    },
  ],
});
