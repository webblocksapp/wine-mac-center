import { PluginOption, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';
import { createHtmlPlugin } from 'vite-plugin-html';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      overlay: false,
    }),
    tsconfigPaths(),
    EnvironmentPlugin('all'),
    ...(process.env.STORYBOOK_RUNNING
      ? []
      : [
          createHtmlPlugin({
            entry: '/src/main.tsx',
            template: 'index.html',
            inject: {
              data: {
                neutralinoScript: `<script src="http://localhost:3002/neutralino.js"></script>`,
              },
            },
          }),
        ]),
  ],
  resolve: {
    alias: {
      path: 'rollup-plugin-node-polyfills/polyfills/path',
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      plugins: [rollupNodePolyFill() as PluginOption],
    },
  },
  server: {
    port: 3003,
  },
});
