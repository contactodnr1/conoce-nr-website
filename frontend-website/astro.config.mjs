// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: "server",
  // adapter: cloudflare(),
  site: 'https://nicolasromero.mx',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover"
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});