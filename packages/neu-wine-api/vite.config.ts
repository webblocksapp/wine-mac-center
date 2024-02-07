import fs from 'fs';
import { defineConfig, PluginOption } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';
import { createHtmlPlugin } from 'vite-plugin-html';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { devDependencies } = packageJson;
const external = [...Object.keys(devDependencies), '/public/.*'];

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  return {
    ...(isProd ? { publicDir: 'none' } : {}),
    plugins: [
      react(),
      checker({
        typescript: true,
        overlay: false,
      }),
      dts({ include: 'src' }),
      tsconfigPaths(),
      EnvironmentPlugin('all'),
      ...(isDev
        ? [
            createHtmlPlugin({
              entry: 'tests/main.tsx',
              template: 'index.html',
              inject: {
                data: {
                  neutralinoScript: `<script src="http://localhost:3000/neutralino.js"></script>`,
                },
              },
            }),
          ]
        : []),
    ],
    ...(isDev
      ? {
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
            },
          },
        }
      : {}),
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
      ...(isDev
        ? {
            rollupOptions: {
              plugins: [rollupNodePolyFill() as PluginOption],
            },
            outDir: 'dev-dist',
          }
        : {}),
      ...(isProd
        ? {
            lib: {
              entry: 'src/index.ts',
              fileName: (format: string) => {
                return `${format}/index.js`;
              },
              formats: ['es', 'cjs'],
            },
            rollupOptions: {
              external,
            },
          }
        : {}),
    },
    server: {
      port: 3001,
    },
  };
});
