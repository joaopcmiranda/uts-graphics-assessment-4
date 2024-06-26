// vite.config.js

import {defineConfig} from 'vite'

export default defineConfig({
    plugins: [],
    assetsInclude: [
        '**/*.css',
        '**/*.bmp',
        '**/*.js',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/*.svg',
        '**/*.gif',
        '**/*.webp',
        '**/*.ico',
        '**/*.json',
        '**/*.woff',
        '**/*.woff2',
        '**/*.eot',
        '**/*.ttf',
        '**/*.otf',
        '**/*.mp4',
        '**/*.vert',
        '**/*.frag',
    ],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },

})
