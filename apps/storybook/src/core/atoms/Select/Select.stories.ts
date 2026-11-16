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
    id: { control: 'text', description: 'Wire to Field `htmlFor` / `<label for>`.' },
    name: { control: 'text', description: 'Form field name.' },
    value: { control: 'text', description: 'Selected value.' },
    defaultValue: { control: 'text', description: 'Initial selected value when `value` is omitted.' },
    placeholder: { control: 'text', description: 'Optional unselected placeholder option.' },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    fullWidth: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'md' } },
    },
    ariaLabel: { control: 'text', description: 'Accessible name when no visible Field label.' },
    describedBy: { control: 'text', description: 'aria-describedby id(s) — Field supplies the message element.' },
    options: { control: 'object', description: 'Flat `<option>` items (`SelectOption[]`).' },
    groups: { control: 'object', description: 'Categorized `<optgroup>` sets (`SelectOptionGroup[]`).' },
    children: { control: 'text', description: 'Optional pre-rendered `<option>` / `<optgroup>` HTML.' },
    dataRole: { control: 'text', description: 'Optional `data-role` attribute on `<select>`.' },
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
    groups: [
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
