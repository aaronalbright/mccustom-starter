import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import postcssNesting from 'postcss-nesting';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import fs from 'fs';

// https://vitejs.dev/config/
export default ({ command }) => {
  if (command === 'build') {
    fs.copyFileSync(resolve(__dirname, 'templates/embed.html'), 'embed.html');
    console.log('embed.html copied to root...');
  }
  return defineConfig({
    plugins: [
      svelte(),
      handlebars({
        partialDirectory: resolve(__dirname, 'templates'),
        context: {
          title: 'CUE Custom Project',
        },
      }),
    ],
    css: {
      postcss: {
        plugins: [postcssNesting],
      },
    },
    build: {
      rollupOptions: {
        input: {
          embed: resolve(__dirname, 'embed.html'),
        },
      },
    },
  });
};
