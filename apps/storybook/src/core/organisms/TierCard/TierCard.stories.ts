import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/tier-card.css';
import { renderTierCard, type TierCardProps } from '@eevenkoto/html';

const reader: TierCardProps = {
  name: 'Seuraaja',
  badge: { label: 'Ilmainen', intent: 'neutral', variant: 'subtle' },
  price: '0 €',
  period: 'Avoin kaikille',
  description: 'Lue avoimet säännöt ja SRD.',
  features: [
    { text: 'SRD-säännöt', status: 'included' },
    { text: 'Ennakkoversiot', status: 'excluded' },
  ],
  cta: { href: '#start', label: 'Aloita', variant: 'secondary' },
};

const patron: TierCardProps = {
  name: 'Kannattaja',
  badge: { label: 'Suosittu', intent: 'info', variant: 'solid' },
  price: '5 €',
  period: '/ kk',
  description: 'Tue kehitystä ja lue ennakkoversiot.',
  features: [
    { text: 'Kaikki Seuraajan edut', status: 'included' },
    { text: 'Ennakkoversiot', status: 'accent' },
  ],
  cta: { href: '#join', label: 'Liity' },
};

const meta: Meta<TierCardProps> = {
  title: 'Core/Organisms/TierCard',
  parameters: {
    docs: {
      description: {
        component:
          'Membership/pricing comparison card: name + badge, price, summary, checklist and full-width CTA. `featured` adds an accent outline; `current` marks the active tier.',
      },
    },
  },
  argTypes: {
    nameLevel: { control: 'select', options: [2, 3], table: { defaultValue: { summary: '2' } } },
    featured: { control: 'boolean' },
    current: { control: 'boolean' },
  },
  args: reader,
  render: (args) => renderTierCard(args),
};

export default meta;
type Story = StoryObj<TierCardProps>;

export const SingleTier: Story = {};

export const FeaturedTier: Story = { args: { ...patron, featured: true } };

export const CurrentTier: Story = { args: { ...reader, current: true } };

export const ComparisonGrid: Story = {
  render: () =>
    `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: var(--eevenkoto-space-4);">${renderTierCard({ ...reader, current: true })}${renderTierCard({ ...patron, featured: true })}</div>`,
};
