import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://becerrablog.netlify.app',
  integrations: [preact()],
});
