// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    build: {
        // Output flat files for Apache
        format: 'directory',
    },
    // Content collections are in src/content/
});
