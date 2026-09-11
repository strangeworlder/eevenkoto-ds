import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/scroll.css';
import { renderScroll, type ScrollProps } from '@eevenkoto/html';

const wide =
  '<div style="width:48rem;padding:1.2rem;white-space:nowrap">Wide content that overflows — scroll horizontally.</div>';

const meta: Meta<ScrollProps> = {
  title: 'Core/Atoms/Scroll',
  parameters: {
    docs: {
      description: {
        component: 'Portable overflow host for wide or tall content.',
      },
    },
  },
  argTypes: {
    axis: {
      control: 'select',
      options: ['x', 'y', 'both'],
      description: 'Overflow axis. Defaults to x.',
      table: {
        type: { summary: "'x' | 'y' | 'both'" },
        defaultValue: { summary: 'x' },
      },
    },
    content: {
      control: 'text',
      description: 'Inner HTML.',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    axis: 'x',
    content: wide,
  },
  render: (args) => `<div style="max-width:20rem">${renderScroll(args)}</div>`,
};

export default meta;
type Story = StoryObj<ScrollProps>;

export const Default: Story = {};
