import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/radio.css';
import '@eevenkoto/css/radio-group.css';
import '@eevenkoto/css/badge.css';
import { renderRadioGroup, type RadioGroupProps } from '@eevenkoto/html';

const meta: Meta<RadioGroupProps> = {
  title: 'Core/Molecules/RadioGroup',
  parameters: {
    docs: {
      description: {
        component:
          'Accessible fieldset managing a set of mutually exclusive radio buttons with shared name, keyboard navigation, and card/tile options.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Shared input name attribute.' },
    label: { control: 'text', description: 'Group legend label.' },
    value: { control: 'text', description: 'Currently selected option value.' },
    layout: {
      control: 'select',
      options: ['stack', 'grid'],
      table: { defaultValue: { summary: 'stack' } },
    },
    columns: {
      control: 'select',
      options: [2, 3],
      table: { defaultValue: { summary: '2' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'tile'],
      table: { defaultValue: { summary: 'default' } },
    },
    hint: { control: 'text', description: 'Secondary explanatory text.' },
    error: { control: 'text', description: 'Validation error text.' },
  },
  render: (args) => renderRadioGroup(args),
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

export const Default: Story = {
  args: {
    name: 'difficulty',
    label: 'Vaikeustaso',
    value: 'normal',
    options: [
      { value: 'easy', label: 'Helppo' },
      { value: 'normal', label: 'Normaali' },
      { value: 'hard', label: 'Vaikea' },
    ],
  },
};

export const CardOptions: Story = {
  args: {
    name: 'weapon-type',
    label: 'Asetyyppi:',
    value: 'lahitaistelu',
    variant: 'card',
    options: [
      {
        value: 'lahitaistelu',
        label: 'Lähitaisteluase',
        description: 'VOI · Ulottuvuus 2 m · Heitto 4/10 m',
      },
      {
        value: 'kantama',
        label: 'Kantama-ase',
        description: 'KET · Kantama 20/60 m (+150 % hinta)',
      },
    ],
  },
};

export const TileGrid: Story = {
  args: {
    name: 'armor-type',
    label: 'Haarniskan perusluokka:',
    layout: 'grid',
    columns: 3,
    variant: 'tile',
    value: 'keskiraskas',
    options: [
      { value: 'kevyt', label: 'Kevyt' },
      { value: 'keskiraskas', label: 'Keskiraskas' },
      { value: 'raskas', label: 'Raskas' },
    ],
  },
};

export const WithError: Story = {
  args: {
    name: 'character-origin',
    label: 'Hahmon syntyperä',
    error: 'Valitse yksi syntyperä ennen etenemistä.',
    options: [
      { value: 'kaupunkilainen', label: 'Kaupunkilainen' },
      { value: 'erakko', label: 'Erämaan asukki' },
    ],
  },
};
