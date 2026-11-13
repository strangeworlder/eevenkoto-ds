import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/entity-preview.css';
import { renderEntityPreview } from '@eevenkoto/html';

const base = { title: 'Tulipallo', kind: 'spell', badge: { label: 'Loitsu', intent: 'info' }, body: 'Räjähtävä pallo tulta.', footerLink: { href: '#spell', label: 'Avaa sivu' } } as Parameters<typeof renderEntityPreview>[0];

const meta: Meta<Parameters<typeof renderEntityPreview>[0]> = {
  title: 'Domain/Molecules/EntityPreview',
  parameters: { docs: { description: { component: "TooltipCard specialised for referenced entities: optional kind badge, body, truncated note and footer link. A Statblock/Spellblock in the body renders flush." } } },
  args: base,
  render: (args) => renderEntityPreview(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderEntityPreview>[0]>;

export const Default: Story = {};

export const Truncated: Story = { args: { truncatedLabel: 'Sisältö lyhennetty', flush: true } };
