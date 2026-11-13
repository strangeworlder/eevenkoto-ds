import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/disclosure.css';
import '@eevenkoto/css/swatch.css';
import '@eevenkoto/css/badge.css';
import { renderBadge, renderDisclosure, renderSwatch, type DisclosureProps } from '@eevenkoto/html';

const meta: Meta<DisclosureProps> = {
  title: 'Core/Molecules/Disclosure',
  parameters: {
    docs: {
      description: {
        component:
          'Native `<details>` disclosure with a rotating chevron, optional leading and trailing summary content, and a prose body. Host alone renders the card variant.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    summaryText: { control: 'text' },
    variant: {
      control: 'select',
      options: ['card', 'subtle', 'flush'],
      table: { type: { summary: "'card' | 'subtle' | 'flush'" }, defaultValue: { summary: 'card' } },
    },
    open: { control: 'boolean' },
    emphasized: { control: 'boolean' },
    body: { control: 'text' },
    bodyHtml: { control: 'text' },
  },
  args: { label: 'Lisätiedot', body: 'Tässä on avattava sisältö.', open: true },
  render: (args) => renderDisclosure(args),
};

export default meta;
type Story = StoryObj<DisclosureProps>;

export const Default: Story = {};

export const Variants: Story = {
  render: () =>
    (['card', 'subtle', 'flush'] as const)
      .map((variant) =>
        renderDisclosure({ label: `Variant: ${variant}`, variant, body: 'Sisältö.', open: true }),
      )
      .join('<div style="height: var(--eevenkoto-space-3)"></div>'),
};

export const WithSwatchAndMeta: Story = {
  name: 'With swatch and meta',
  render: () =>
    renderDisclosure({
      label: 'Purppura',
      summaryText: '3 sävyä',
      summaryLead: renderSwatch({ color: '#6b2d5c', size: 'sm' }),
      summaryMeta: renderBadge({ label: 'Uusi' }),
      body: 'Värin kuvaus.',
      open: true,
    }),
};

export const Emphasized: Story = {
  args: { emphasized: true, label: 'Tärkeä huomio' },
};
