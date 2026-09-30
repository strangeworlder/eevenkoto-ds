import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/checkbox.css';
import '@eevenkoto/css/checkbox-group.css';
import '@eevenkoto/css/badge.css';
import { renderCheckboxGroup, type CheckboxGroupProps } from '@eevenkoto/html';

const meta: Meta<CheckboxGroupProps> = {
  title: 'Core/Molecules/CheckboxGroup',
  parameters: {
    docs: {
      description: {
        component:
          'Accessible fieldset grouping multiple related checkboxes with a shared legend, optional header badge, grid/stack layouts, and helper messages.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Legend title of the group.' },
    badge: { control: 'text', description: 'Optional header badge (e.g. "2 / 3 käytetty").' },
    badgeIntent: {
      control: 'select',
      options: ['neutral', 'critical'],
      table: { defaultValue: { summary: 'neutral' } },
    },
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
    hint: { control: 'text', description: 'Secondary help text below list.' },
    error: { control: 'text', description: 'Validation error text below list.' },
  },
  render: (args) => renderCheckboxGroup(args),
};

export default meta;
type Story = StoryObj<CheckboxGroupProps>;

export const Default: Story = {
  args: {
    label: 'Ilmoitusasetukset',
    items: [
      { label: 'Sähköpostikooste', checked: true },
      { label: 'Pikaviestit', checked: false },
      { label: 'Uutiskirje', checked: false },
    ],
  },
};

export const WithBadge: Story = {
  args: {
    label: 'Pääpiirteet:',
    badge: '2 / 3 käytetty',
    badgeIntent: 'neutral',
    items: [
      {
        value: 'tarkkuus',
        label: 'Tarkkuus',
        description: 'Käytä KET tai VOI lähitaistelussa.',
        variant: 'card',
        checked: true,
      },
      {
        value: 'ulottuva',
        label: 'Ulottuva',
        description: 'Tuplaa aseen kantaman tai ulottuvuuden.',
        variant: 'card',
        checked: true,
      },
      {
        value: 'viiltava',
        label: 'Viiltävä',
        description: 'Vahinkonoppa +1 ketjulla.',
        variant: 'card',
        checked: false,
      },
    ],
  },
};

export const BadgeLimitExceeded: Story = {
  args: {
    label: 'Pääpiirteet:',
    badge: '4 / 3 käytetty',
    badgeIntent: 'critical',
    error: 'Olet valinnut liian monta pääpiirrettä aseeseen.',
    items: [
      { label: 'Tarkkuus', variant: 'card', checked: true },
      { label: 'Ulottuva', variant: 'card', checked: true },
      { label: 'Viiltävä', variant: 'card', checked: true },
      { label: 'Pistävä', variant: 'card', checked: true },
    ],
  },
};

export const GridLayout: Story = {
  args: {
    label: 'Hahmon erikoisvarusteet',
    layout: 'grid',
    columns: 2,
    items: [
      { label: 'Kiipeilykoukku', variant: 'card', checked: true },
      { label: 'Köysi (15 m)', variant: 'card', checked: false },
      { label: 'Soihtu (3 kpl)', variant: 'card', checked: false },
      { label: 'Muona-annokset', variant: 'card', checked: true },
    ],
  },
};
