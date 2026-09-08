// apps/storybook/src/primitives/Caption/Caption.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/caption.css';
import { renderCaption, type CaptionArgs } from '@eevenkoto/html';

const meta: Meta<CaptionArgs> = {
  title: 'Primitives/Caption',
  parameters: {
    docs: {
      description: {
        component: 'Caption styles short supporting or metadata text.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Caption copy.',
      table: { type: { summary: 'string' } },
    },
    tone: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Content color tone. Defaults to secondary.',
      table: {
        type: { summary: "'primary' | 'secondary'" },
        defaultValue: { summary: 'secondary' },
      },
    },
  },
  args: {
    text: 'Updated 2 hours ago',
    tone: 'secondary',
  },
  render: (args) => renderCaption(args),
};

export default meta;
type Story = StoryObj<CaptionArgs>;

export const Default: Story = {};

export const Primary: Story = {
  args: { tone: 'primary', text: 'Required field' },
};

export const Helper: Story = {
  args: { text: 'Accept the terms to continue.' },
};
