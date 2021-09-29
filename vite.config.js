import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import postcssNesting from 'postcss-nesting';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
// import fs from 'fs';

// https://vitejs.dev/config/
export default ({ command }) => {
  if (command === 'build') {
    // weird workaround to get the embed file to be the main output with proper paths
    // fs.copyFileSync(resolve(__dirname, 'templates/embed.html'), 'embed.html');
    // fs.copyFileSync(resolve(__dirname, 'templates/simple-table.html'), 'simple-table.html');
  }
  return defineConfig({
    plugins: [
      svelte(),
      handlebars({
        partialDirectory: resolve(__dirname, 'partials'),
        context: {
          title: 'cobb-timeline',
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
        output: {
          assetFileNames: "assets/[name][extname]",
          chunkFileNames: "assets/[name].js",
          entryFileNames: "assets/[name].js"
        },
        input: {
          embed: resolve(__dirname, 'partials/embed.html')
        },
      },
    },
  });
};
