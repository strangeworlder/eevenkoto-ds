import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/inline-ref.css';
import { renderInlineRef, type InlineRefProps } from '@eevenkoto/html';

const meta: Meta<InlineRefProps> = {
  title: 'Core/Atoms/InlineRef',
  parameters: {
    docs: {
      description: {
        component:
          'Product-agnostic inline reference chrome. Transparent rest; chip on hover. Domain EntityRef adds closed kinds on top.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Visible reference name.' },
    href: { control: 'text', description: 'When set, renders as a link.' },
  },
  render: (args) => renderInlineRef(args),
};

export default meta;
type Story = StoryObj<InlineRefProps>;

export const Default: Story = {
  args: {
    name: 'Cure Wounds',
    href: '#cure-wounds',
  },
};

export const PlainTag: Story = {
  name: 'Plain tag',
  args: {
    name: 'Advantage',
  },
};

export const InBodyCopy: Story = {
  name: 'In body copy',
  render: () =>
    `<p>Cast ${renderInlineRef({
      name: 'Cure Wounds',
      href: '#cure-wounds',
    })} or mark ${renderInlineRef({ name: 'Advantage' })} in the prose.</p>`,
};
