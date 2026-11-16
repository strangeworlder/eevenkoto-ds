import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/npc-card.css';
import { renderNpcCard } from '@eevenkoto/html';

const base = { name: 'Aino Karhu', role: 'Kauppias', details: [{ label: 'Asenne', value: 'Ystävällinen' }, { label: 'Sijainti', value: 'Torikatu' }], body: 'Myy erikoisia yrttejä.' } as Parameters<typeof renderNpcCard>[0];

const meta: Meta<Parameters<typeof renderNpcCard>[0]> = {
  title: 'Domain/Molecules/NpcCard',
  parameters: { docs: { description: { component: "Compact NPC entry: name, role, divided `details` (PropertyList) and body copy." } } },
  argTypes: {
    id: { control: 'text', description: 'Optional `<article id>`.' },
    name: { control: 'text', description: 'NPC name.' },
    nameHtml: { control: 'text', description: 'Trusted inline HTML for NPC name.' },
    nameLevel: {
      control: 'inline-radio',
      options: [2, 3, 4],
      table: { defaultValue: { summary: '3' } },
    },
    role: { control: 'text', description: 'Subtitle / role line.' },
    roleHtml: { control: 'text', description: 'Trusted inline HTML for role line.' },
    details: { control: 'object', description: 'Divided `PropertyItem[]` list.' },
    body: { control: 'text', description: 'Plain-text narrative copy.' },
    bodyHtml: { control: 'text', description: 'Trusted HTML narrative copy.' },
  },
  args: base,
  render: (args) => renderNpcCard(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderNpcCard>[0]>;

export const Default: Story = {};

export const HeadingLevel4: Story = { args: { nameLevel: 4 } };

export const NameHtml: Story = { args: { nameHtml: 'Aino <em>Karhu</em>' } };
