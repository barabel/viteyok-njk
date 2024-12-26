import { defineConfig, loadEnv } from 'vite';
import vituum from 'vituum';
import njk from '@vituum/vite-plugin-nunjucks';
import path from 'node:path';
import IconSpritePlugin from './plugins/vite-plugin-icon-sprite';
import { getFileName, getGlobalData, njkFilters } from './app';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vituum({
        pages: {
          dir: './src/views',
        },
        imports: {
          paths: [],
        },
      }),
      njk({
        root: '.',
        reload: true,
        useSeparateData: true,
        globals: getGlobalData(),
        options: {
          autoescape: false,
        },
        filters: njkFilters,
      }),
      IconSpritePlugin(),
    ],
    publicDir: 'static',
    server: {
      port: 3000,
      proxy: {
        '/api': `http://localhost:${env.VITE_PORT ?? 3065}`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          quietDeps: true,
        },
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(process.cwd()),
        '@': path.resolve(process.cwd(), 'src', 'views'),
      },
    },
    build: {
      manifest: false,
      assetsInlineLimit: 0,
      modulePreload: false,
      rollupOptions: {
        input: [
          './src/views/*.njk',
          '!./src/views/__index.njk',
        ],
        output: {
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].chunk.js',
          assetFileNames: getFileName,
        },
        jsx: 'react-jsx',
      },
    },
  }
});
