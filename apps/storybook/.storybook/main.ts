import type { StorybookConfig } from '@storybook/html-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            // GFM enables pipe tables, strikethrough, etc. in MDX docs
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  // Workspace packages are symlinked into node_modules, so Vite pre-bundles them
  // and serves a stale copy after `npm run build` adds exports.
  viteFinal: async (config) => ({
    ...config,
    optimizeDeps: {
      ...config.optimizeDeps,
      exclude: [
        ...(config.optimizeDeps?.exclude ?? []),
        '@eevenkoto/core',
        '@eevenkoto/html',
        '@eevenkoto/css',
      ],
    },
  }),
};

export default config;
