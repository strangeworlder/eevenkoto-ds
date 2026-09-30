import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/radio.css';
import '@eevenkoto/css/badge.css';
import { renderRadio, type RadioProps } from '@eevenkoto/html';

const meta: Meta<RadioProps> = {
  title: 'Core/Atoms/Radio',
  parameters: {
    docs: {
      description: {
        component:
          'Accessible radio button atom with support for default inline, card, and compact tile presentation, descriptions, and badges.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Radio group name attribute.' },
    value: { control: 'text', description: 'Form submission value.' },
    label: { control: 'text', description: 'Primary visible label text.' },
    description: { control: 'text', description: 'Optional secondary description copy.' },
    badge: { control: 'text', description: 'Optional badge or price tag text.' },
    checked: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    variant: {
      control: 'select',
      options: ['default', 'card', 'tile'],
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'md' } },
    },
  },
  render: (args) => renderRadio(args),
};

export default meta;
type Story = StoryObj<RadioProps>;

export const Default: Story = {
  args: {
    name: 'demo-radio',
    value: 'opt1',
    label: 'Tavallinen vaihtoehto',
    checked: true,
  },
};

export const WithDescription: Story = {
  args: {
    name: 'demo-radio',
    value: 'opt2',
    label: 'Lähitaisteluase',
    description: 'VOI · Ulottuvuus 2 m · Heitto 4/10 m',
  },
};

export const CardVariant: Story = {
  args: {
    name: 'demo-radio-card',
    value: 'kantama',
    label: 'Kantama-ase',
    description: 'KET · Kantama 20/60 m (+150 % hinta)',
    variant: 'card',
    checked: true,
  },
};

export const TileVariant: Story = {
  args: {
    name: 'demo-radio-tile',
    value: 'medium',
    label: 'Keskiraskas',
    variant: 'tile',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'demo-radio-disabled',
    value: 'locked',
    label: 'Mestarityö',
    description: 'Vaatii tason 5 sepänpajan.',
    variant: 'card',
    disabled: true,
  },
};
