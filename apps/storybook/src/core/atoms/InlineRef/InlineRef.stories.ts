import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/inline-ref.css';
import { renderInlineRef, type InlineRefProps } from '@eevenkoto/html';

const meta: Meta<InlineRefProps> = {
  title: 'Core/Atoms/InlineRef',
  parameters: {
    docs: {
      description: {
        component:
          'Product-agnostic inline reference chrome. Transparent rest; chip on hover. Domain EntityRef adds closed kinds on top. Unlinked and locked states replace eevenko.to term CSS.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Visible reference name.' },
    href: { control: 'text', description: 'When set, renders as a link (ignored if unlinked).' },
    unlinked: { control: 'boolean', description: 'Known term without a destination.' },
    locked: { control: 'boolean', description: 'Trailing lock glyph (gated destination).' },
    lockedLabel: { control: 'text', description: 'Accessible lock label. Default Locked.' },
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

export const Unlinked: Story = {
  name: 'Unlinked term',
  args: {
    name: 'hurman',
    unlinked: true,
  },
};

export const Locked: Story = {
  name: 'Locked link',
  args: {
    name: 'mystikko',
    href: '#mystikko',
    locked: true,
    lockedLabel: 'Lukittu',
  },
};

export const InBodyCopy: Story = {
  name: 'In body copy',
  render: () =>
    `<p>Cast ${renderInlineRef({
      name: 'Cure Wounds',
      href: '#cure-wounds',
    })} or mark ${renderInlineRef({ name: 'Advantage' })}. A known term without a page is ${renderInlineRef(
      { name: 'hurman', unlinked: true },
    )}; a gated class is ${renderInlineRef({
      name: 'mystikko',
      href: '#mystikko',
      locked: true,
      lockedLabel: 'Lukittu',
    })}.</p>`,
};
