import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    {
      name: 'html-as-text',
      transform(code, id) {
        if (id.endsWith('.html')) {
          return { code: `export default ${JSON.stringify(code)}`, map: null };
        }
        return undefined;
      },
    },
  ],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
  },
  resolve: {
    alias: {
      '@eevenkoto/core': new URL('./packages/core/src/index.ts', import.meta.url).pathname,
      '@eevenkoto/html': new URL('./packages/html/src/index.ts', import.meta.url).pathname,
      '@eevenkoto/react': new URL('./packages/react/src/index.ts', import.meta.url).pathname,
      '@eevenkoto/vue': new URL('./packages/vue/src/index.ts', import.meta.url).pathname,
    },
  },
});
