import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/npc-card.css';
import { renderNpcCard } from '@eevenkoto/html';

const base = { name: 'Aino Karhu', role: 'Kauppias', details: [{ label: 'Asenne', value: 'Ystävällinen' }, { label: 'Sijainti', value: 'Torikatu' }], body: 'Myy erikoisia yrttejä.' } as Parameters<typeof renderNpcCard>[0];

const meta: Meta<Parameters<typeof renderNpcCard>[0]> = {
  title: 'Domain/Molecules/NpcCard',
  parameters: { docs: { description: { component: "Compact NPC entry: name, role, divided `details` (PropertyList) and body copy." } } },
  args: base,
  render: (args) => renderNpcCard(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderNpcCard>[0]>;

export const Default: Story = {};

export const HeadingLevel4: Story = { args: { nameLevel: 4 } };

export const NameHtml: Story = { args: { nameHtml: 'Aino <em>Karhu</em>' } };
