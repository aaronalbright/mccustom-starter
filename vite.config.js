import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import postcssNesting from 'postcss-nesting';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { getMiCss } from './utils/get-css.mjs';
import { config as pkgConfig } from './package.json';

// import fs from 'fs';

// https://vitejs.dev/config/
export default async ({ command }) => {
  let miCss;
  if (command === 'serve') {
    miCss = await getMiCss();
  }
  return defineConfig({
    plugins: [
      svelte(),
      handlebars({
        partialDirectory: resolve(__dirname, 'partials'),
        context: {
          title: pkgConfig.projectName,
          miCss: miCss
        },
      }),
    ],
    css: {
      postcss: {
        plugins: [postcssNesting],
      },
    },
    resolve: {
      alias: {
        '/@ProdX': '/Users/aaron/Projects/ProdX/gcp-bucket'
      }
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
