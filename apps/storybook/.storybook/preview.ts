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
  },
};

export default preview;
