import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/npc-card-grid.css';
import { renderNpcCardGrid } from '@eevenkoto/html';

const cards = [
  { name: 'Aino Karhu', role: 'Kauppias', details: [{ label: 'Asenne', value: 'Ystävällinen' }] },
  { name: 'Eero Salo', role: 'Vartija', details: [{ label: 'Asenne', value: 'Epäluuloinen' }] },
  { name: 'Liisa Virta', role: 'Pappi', details: [{ label: 'Asenne', value: 'Rauhallinen' }] },
];

const base = { cards } as Parameters<typeof renderNpcCardGrid>[0];

const meta: Meta<Parameters<typeof renderNpcCardGrid>[0]> = {
  title: 'Domain/Organisms/NpcCardGrid',
  parameters: { docs: { description: { component: "Responsive grid of NpcCards: two columns on wide containers, one on narrow." } } },
  args: base,
  render: (args) => renderNpcCardGrid(args),
};

export default meta;
type Story = StoryObj<Parameters<typeof renderNpcCardGrid>[0]>;

export const Default: Story = {};

export const SingleColumn: Story = { args: { columns: 1 } };
