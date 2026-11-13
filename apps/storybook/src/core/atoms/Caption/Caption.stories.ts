// apps/storybook/src/core/atoms/Caption/Caption.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/caption.css';
import { renderCaption, type CaptionProps } from '@eevenkoto/html';

const meta: Meta<CaptionProps> = {
  title: 'Core/Atoms/Caption',
  parameters: {
    docs: {
      description: {
        component: 'Caption styles short metadata with caption size and tertiary (quiet) ink.',
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
      options: ['primary', 'secondary', 'accent'],
      description:
        'Content color tone. Defaults to secondary → content-tertiary; accent uses content-accent-strong (≥4.5:1 AA).',
      table: {
        type: { summary: "'primary' | 'secondary' | 'accent'" },
        defaultValue: { summary: 'secondary' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'eyebrow'],
      description: 'Typographic treatment. `eyebrow` renders tracked uppercase kicker text.',
      table: {
        type: { summary: "'default' | 'eyebrow'" },
        defaultValue: { summary: 'default' },
      },
    },
  },
  args: {
    text: 'Updated 2 hours ago',
    tone: 'secondary',
    variant: 'default',
  },
  render: (args) => renderCaption(args),
};

export default meta;
type Story = StoryObj<CaptionProps>;

export const Default: Story = {};

export const Primary: Story = {
  args: { tone: 'primary', text: 'Required field' },
};

export const Accent: Story = {
  args: { tone: 'accent', text: '3. piirin loitsu' },
};

export const Eyebrow: Story = {
  args: { tone: 'accent', variant: 'eyebrow', text: 'Taisteluloki' },
};

export const Helper: Story = {
  args: { text: 'Accept the terms to continue.' },
};
