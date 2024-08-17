import { PluginOption, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';
import { createHtmlPlugin } from 'vite-plugin-html';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import checker from 'vite-plugin-checker';

const NEUTRALINOJS_BASE_URL = `${process.env.NODE_ENV === 'production'}`
  ? ''
  : 'http://localhost:3002';

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
                neutralinoScript: `<script src="${NEUTRALINOJS_BASE_URL}/neutralino.js"></script>`,
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
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }) as any,
      ],
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
