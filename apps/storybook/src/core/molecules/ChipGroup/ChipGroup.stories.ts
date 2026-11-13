import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/chip-group.css';
import { renderChipGroup, type ChipGroupProps } from '@eevenkoto/html';

const meta: Meta<ChipGroupProps> = {
  title: 'Core/Molecules/ChipGroup',
  parameters: {
    docs: {
      description: {
        component:
          'Fieldset of Chips for filters and pickers. Selection state is data-driven (`selected`); disabled options stay legible via opaque disabled tokens.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    hideLegend: { control: 'boolean' },
    mode: { control: 'select', options: ['single', 'multiple'], table: { defaultValue: { summary: 'single' } } },
    size: { control: 'select', options: ['sm', 'md'], table: { defaultValue: { summary: 'sm' } } },
    hidden: { control: 'boolean' },
  },
  args: {
    label: 'Taso',
    mode: 'single',
    options: [
      { value: '1', label: 'Taso 1', selected: true },
      { value: '2', label: 'Taso 2' },
      { value: '3', label: 'Taso 3' },
    ],
  },
  render: (args) => renderChipGroup(args),
};

export default meta;
type Story = StoryObj<ChipGroupProps>;

export const SingleSelect: Story = {};

export const MultiSelectWithSwatches: Story = {
  args: {
    label: 'Värit',
    mode: 'multiple',
    options: [
      { value: 'purple', label: 'Purppura', swatchColor: '#6b2d5c', selected: true },
      { value: 'teal', label: 'Turkoosi', swatchColor: '#2c7a7b', selected: true },
      { value: 'gold', label: 'Kulta', swatchColor: '#b7791f' },
    ],
  },
};

export const DisabledOpaqueOptions: Story = {
  args: {
    label: 'Saatavuus',
    options: [
      { value: 'a', label: 'Saatavilla', selected: true },
      { value: 'b', label: 'Loppu', disabled: true },
    ],
  },
};

export const HiddenLegend: Story = { args: { hideLegend: true } };
