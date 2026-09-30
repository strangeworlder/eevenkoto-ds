import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/checkbox.css';
import '@eevenkoto/css/badge.css';
import { renderCheckbox, type CheckboxProps } from '@eevenkoto/html';

const meta: Meta<CheckboxProps> = {
  title: 'Core/Atoms/Checkbox',
  parameters: {
    docs: {
      description: {
        component:
          'Accessible checkbox atom with support for inline and card/tile presentation, description copy, badges, and validation state.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Primary visible label text.' },
    description: { control: 'text', description: 'Optional secondary description copy.' },
    badge: { control: 'text', description: 'Optional badge or price tag text.' },
    checked: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    card: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    variant: {
      control: 'select',
      options: ['default', 'card'],
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'md' } },
    },
  },
  render: (args) => renderCheckbox(args),
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  args: {
    id: 'chk-default',
    label: 'Muista valinta tällä laitteella',
  },
};

export const WithDescription: Story = {
  args: {
    id: 'chk-desc',
    label: 'Automaattinen tallennus',
    description: 'Tallentaa hahmon ja varustemuutokset automaattisesti taustalla.',
  },
};

export const CardVariant: Story = {
  args: {
    id: 'chk-card',
    label: 'Tarkkuus',
    description: 'Käytä KET tai VOI (lähitaistelu) tai KET/VII (kantama). (+100 % hinta)',
    variant: 'card',
    checked: true,
  },
};

export const WithBadge: Story = {
  args: {
    id: 'chk-badge',
    label: 'Raskas (vain sota-aseet)',
    description: 'Vahinkonoppa +2 ketjulla (1n6 → 1n10). Kahdella kädellä. Ei heittoa.',
    badge: '+150 %',
    variant: 'card',
  },
};

export const Disabled: Story = {
  args: {
    id: 'chk-disabled',
    label: 'Lukittu ominaisuus',
    description: 'Vaatii mestaritason seppätaidon.',
    disabled: true,
    variant: 'card',
  },
};

export const Invalid: Story = {
  args: {
    id: 'chk-invalid',
    label: 'Hyväksyn säännöt ja ehdot',
    invalid: true,
  },
};
