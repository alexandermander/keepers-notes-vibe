import { defineConfig } from 'electron-vite';
import { resolve } from 'path';

export default defineConfig({
  main: {
    entry: 'src/main/index.ts',
  },
  preload: {
    input: 'src/preload/index.ts',
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer'),
      },
    },
  },
});
