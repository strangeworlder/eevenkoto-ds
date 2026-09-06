// .storybook/preview.ts
import type { Preview } from '@storybook/html-vite';

// Load global styles and tokens across all stories
import '../src/styles.css';

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