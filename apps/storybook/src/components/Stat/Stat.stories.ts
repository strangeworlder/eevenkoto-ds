// apps/storybook/src/components/Stat/Stat.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/stat.css';
import { renderStat, type StatProps } from '@eevenkoto/html';

const meta: Meta<StatProps> = {
  title: 'Components/Stat',
  parameters: {
    docs: {
      description: {
        component:
          'Stat is a numeric display chip with geometric shapes. Content domain — not Badge (feedback).',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Displayed value.',
      table: { type: { summary: 'string' } },
    },
    shape: {
      control: 'select',
      options: ['disk', 'arch', 'shield'],
      description: 'Geometric treatment.',
      table: {
        type: { summary: "'disk' | 'arch' | 'shield'" },
        defaultValue: { summary: 'disk' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Shared size ladder.',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    emphasis: {
      control: 'boolean',
      description: 'Bright gold border (content-accent-strong).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: (args) => renderStat(args),
};

export default meta;
type Story = StoryObj<StatProps>;

export const Default: Story = {
  args: {
    value: '+3',
    shape: 'arch',
    size: 'lg',
  },
};

export const Shapes: Story = {
  render: () =>
    `<div class="eevenkoto-docs-example-row">${renderStat({
      value: '16',
      shape: 'disk',
      size: 'sm',
    })}${renderStat({
      value: '+3',
      shape: 'arch',
      size: 'lg',
    })}${renderStat({
      value: '+3',
      shape: 'shield',
      size: 'sm',
    })}</div>`,
};

export const SaveEmphasis: Story = {
  name: 'Save emphasis',
  render: () =>
    `<div class="eevenkoto-docs-example-row">${renderStat({
      value: '+3',
      shape: 'shield',
      size: 'sm',
    })}${renderStat({
      value: '+5',
      shape: 'shield',
      size: 'sm',
      emphasis: true,
    })}</div>`,
};
