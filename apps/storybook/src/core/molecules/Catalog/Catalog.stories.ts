import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/catalog.css';
import { renderCatalog, renderCatalogTile, type CatalogProps } from '@eevenkoto/html';

const tiles: CatalogProps['tiles'] = [
  { name: 'Aavevalo', href: '#aavevalo', status: 'success', statusLabel: 'Valmis' },
  { name: 'Henkisauva', href: '#henkisauva', status: 'success', statusLabel: 'Valmis' },
  {
    name: 'Mystikko',
    href: '#mystikko',
    status: 'caution',
    statusLabel: 'Vedos',
    locked: true,
    lockedLabel: 'Lukittu',
  },
  { name: 'Haukka', href: '#haukka', status: 'success', statusLabel: 'Valmis' },
  { name: 'Kissalainen', href: '#kissalainen', status: 'admin', statusLabel: 'Luonnos' },
];

const meta: Meta<CatalogProps> = {
  title: 'Core/Molecules/Catalog',
  parameters: {
    docs: {
      description: {
        component:
          'Dense linked index grid. Tiles are raised hairline rows — not sectioned Cards.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
  },
  render: (args) => renderCatalog(args),
};

export default meta;
type Story = StoryObj<CatalogProps>;

export const Default: Story = {
  args: {
    label: 'Loitsut',
    tiles,
  },
};

export const SingleTile: Story = {
  name: 'Single tile',
  render: () => renderCatalogTile(tiles[0]),
};
