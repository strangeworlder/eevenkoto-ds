import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['@eevenkoto/core'],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.html': 'text',
    };
  },
});
