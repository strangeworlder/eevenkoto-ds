import type { Preview } from '@storybook/html-vite';

// Load global styles and tokens across all stories
import '@eevenkoto/css/styles.css';
import '../src/docs/docs.css';

const preview: Preview = {
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
