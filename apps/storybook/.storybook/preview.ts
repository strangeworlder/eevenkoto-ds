import type { Decorator, Preview } from '@storybook/html-vite';

import '@eevenkoto/css/styles.css';
import '../src/docs/docs.css';

const withTheme: Decorator = (story, context) => {
  const theme = (context.globals.theme as string) || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  return story();
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Tier 2 color theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Foundations',
          [
            'Packages',
            'Component taxonomy',
            'Typography',
            'Tokens',
            'Color Tokens',
            'Authoring composed components',
            'Decisions',
            '*',
          ],
          'Core',
          ['Atoms', 'Molecules', 'Organisms'],
          'Domain',
          ['Atoms', 'Molecules', 'Organisms'],
        ],
      },
    },
  },
};

export default preview;
