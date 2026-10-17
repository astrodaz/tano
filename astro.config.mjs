import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';

// https://astro.build/config
// Tailwind runs through PostCSS (postcss.config.mjs + src/styles/global.css)
export default defineConfig({
  server: {
    port: 4321,
    host: true
  },
  devToolbar: {
    enabled: false
  },
  vite: {
    server: {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    }
  },
  markdown: {
    // unified (remark/rehype) rather than Astro 7's default Sätteri, so rehype plugins still run
    processor: unified({
      rehypePlugins: [
        ['rehype-external-links', { target: '_blank', rel: ['noopener', 'noreferrer'] }]
      ]
    })
  },
});