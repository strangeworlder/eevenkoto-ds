import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/divider.css';
import '@eevenkoto/css/prose.css';
import { renderDivider, type DividerProps } from '@eevenkoto/html';

const meta: Meta<DividerProps> = {
  title: 'Core/Atoms/Divider',
  parameters: {
    docs: {
      description: {
        component:
          'Horizontal rule using the subtle boundary token. Host alone renders solid + lg spacing; bare `<hr>` inside `.eevenkoto-prose` matches.',
      },
    },
  },
  argTypes: {
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Block margin around the rule (`space-3` / `space-4` / `space-6`).',
      table: { type: { summary: "'sm' | 'md' | 'lg'" }, defaultValue: { summary: 'lg' } },
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed'],
      description: 'Stroke style.',
      table: { type: { summary: "'solid' | 'dashed'" }, defaultValue: { summary: 'solid' } },
    },
  },
  args: { spacing: 'lg', variant: 'solid' },
  render: (args) => renderDivider(args),
};

export default meta;
type Story = StoryObj<DividerProps>;

export const Default: Story = {};

export const Spacings: Story = {
  render: () =>
    (['sm', 'md', 'lg'] as const)
      .map((spacing) => `<p>${spacing}</p>${renderDivider({ spacing })}`)
      .join(''),
};

export const Dashed: Story = {
  render: () => `<p>Above</p>${renderDivider({ variant: 'dashed' })}<p>Below</p>`,
};

export const InProse: Story = {
  render: () =>
    '<div class="eevenkoto-prose"><p>Section one.</p><hr /><p>Section two.</p></div>',
};
