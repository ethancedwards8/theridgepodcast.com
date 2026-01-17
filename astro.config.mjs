// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://theridgepodcast.com',
    integrations: [mdx(), sitemap(), react()],
    output: "static",
    prefetch: true,
    srcDir: './',
    preview: {
        allowedHosts: ["theridgepodcast.com"],
    },
    redirects: {
        "/about-us": "about",
        "/episode/the-ridge-podcast": "/podcast"
    },
});
