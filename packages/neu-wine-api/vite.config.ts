import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    createHtmlPlugin({
      entry: 'src/tests/main.tsx',
      template: 'index.html',
      inject: {
        data: {
          neutralinoScript: `<script src="./neutralino.js"></script>`,
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
