import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/icon.css';
import '@eevenkoto/css/select.css';
import { renderSelect, type SelectProps } from '@eevenkoto/html';

const meta: Meta<SelectProps> = {
  title: 'Core/Atoms/Select',
  parameters: {
    docs: {
      description: {
        component:
          'Accessible native dropdown selector styled with Eevenkoto form-input tokens and custom chevron indicator.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Form field name.' },
    value: { control: 'text', description: 'Selected value.' },
    placeholder: { control: 'text', description: 'Optional unselected placeholder option.' },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'md' } },
    },
    ariaLabel: { control: 'text', description: 'Accessible name when no visible Field label.' },
  },
  render: (args) => renderSelect(args),
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Default: Story = {
  args: {
    id: 'select-demo',
    ariaLabel: 'Aseen laatu',
    value: 'standard',
    options: [
      { value: 'crude', label: 'Karkea (−20 % hinta)' },
      { value: 'standard', label: 'Tavallinen' },
      { value: 'fine', label: 'Hienolaatuinen (+100 % hinta)' },
      { value: 'masterwork', label: 'Mestariteos (+300 % hinta)' },
    ],
  },
};

export const WithPlaceholder: Story = {
  args: {
    id: 'select-placeholder',
    ariaLabel: 'Valitse esiasetus',
    placeholder: 'Valitse valmis ase...',
    options: [
      { value: 'miekat', label: 'Miekka' },
      { value: 'kirveet', label: 'Kirves' },
      { value: 'jouset', label: 'Varsijousi' },
    ],
  },
};

export const GroupedOptions: Story = {
  args: {
    id: 'select-grouped',
    ariaLabel: 'Valitse kilpi',
    value: 'kevyt_kilpi',
    options: [
      {
        label: 'Kevyet suojat',
        options: [
          { value: 'pikkukilpi', label: 'Pikkukilpi (+1 PL)' },
          { value: 'kevyt_kilpi', label: 'Kevyt kilpi (+2 PL)' },
        ],
      },
      {
        label: 'Raskaat suojat',
        options: [
          { value: 'tornikilpi', label: 'Tornikilpi (+3 PL, −2 m nopeus)' },
        ],
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    id: 'select-disabled',
    ariaLabel: 'Lukittu valinta',
    value: 'standard',
    disabled: true,
    options: [
      { value: 'standard', label: 'Tavallinen laatu' },
    ],
  },
};

export const Invalid: Story = {
  args: {
    id: 'select-invalid',
    ariaLabel: 'Pakollinen valinta',
    invalid: true,
    placeholder: 'Valitse luokka...',
    options: [
      { value: 'warrior', label: 'Soturi' },
      { value: 'mage', label: 'Maagi' },
    ],
  },
};
