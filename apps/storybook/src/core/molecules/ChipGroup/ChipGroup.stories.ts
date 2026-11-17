import type { Meta, StoryObj } from '@storybook/html-vite';
import { expect } from 'storybook/test';
import '@eevenkoto/css/chip-group.css';
import '@eevenkoto/css/button.css';
import { renderButton, renderChipGroup, type ChipGroupProps } from '@eevenkoto/html';
import { syncChipGroup } from '@eevenkoto/html/dom';

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
    id: { control: 'text', description: 'Optional `<fieldset id>`.' },
    label: { control: 'text' },
    hideLegend: { control: 'boolean' },
    mode: {
      control: 'select',
      options: ['single', 'multiple', 'action'],
      table: { defaultValue: { summary: 'single' } },
    },
    size: { control: 'select', options: ['sm', 'md'], table: { defaultValue: { summary: 'sm' } } },
    hidden: { control: 'boolean' },
    headerAction: { control: 'text', description: 'Optional trailing header action HTML (e.g. a refresh Button).' },
    options: { control: 'object', description: 'Chip options (`ChipGroupOption[]`).' },
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

export const SingleSelect: Story = {
  play: async ({ canvasElement }) => {
    const group = canvasElement.querySelector<HTMLElement>('.eevenkoto-chip-group');
    expect(group).not.toBeNull();
    syncChipGroup(group, { value: '2', disabledValues: ['3'] });
    const chip2 = group?.querySelector<HTMLButtonElement>('[data-value="2"]');
    const chip3 = group?.querySelector<HTMLButtonElement>('[data-value="3"]');
    expect(chip2?.getAttribute('aria-pressed')).toBe('true');
    expect(chip3?.disabled).toBe(true);
  },
};

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

export const QuickPickActions: Story = {
  name: 'Action mode with header action',
  args: {
    id: 'quick-picks',
    label: 'Pikanimet',
    mode: 'action',
    headerAction: renderButton({
      label: 'Päivitä lista',
      variant: 'ghost',
      size: 'sm',
      icon: 'reroll',
    }),
    options: [
      { value: 'aurelia', label: 'Aurelia' },
      { value: 'kaarlo', label: 'Kaarlo' },
      { value: 'valpuri', label: 'Valpuri' },
      { value: 'serafina', label: 'Serafina' },
    ],
  },
};
