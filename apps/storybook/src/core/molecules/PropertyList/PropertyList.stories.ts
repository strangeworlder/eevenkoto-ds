// apps/storybook/src/core/molecules/PropertyList/PropertyList.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/property.css';
import { renderPropertyList, type PropertyListProps } from '@eevenkoto/html';

const meta: Meta<PropertyListProps> = {
  title: 'Core/Molecules/PropertyList',
  parameters: {
    docs: {
      description: {
        component:
          'PropertyList is a definition list of label → value rows (`dl` / `dt` / `dd`) with `inline`, `divided`, `grid`, and `cards` layouts. Property is the row atom inside the list.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of `{ label, value, valueHtml, meta }` pairs.',
      table: { type: { summary: 'PropertyItem[]' } },
    },
    layout: {
      control: 'select',
      options: ['inline', 'divided', 'grid', 'cards'],
      description: 'Visual arrangement of definition pairs.',
      table: {
        type: { summary: "'inline' | 'divided' | 'grid' | 'cards'" },
        defaultValue: { summary: 'inline' },
      },
    },
    columns: {
      control: 'select',
      options: [undefined, 2, 3, 4],
      description: 'Explicit column count when `layout` is `grid` (default 4) or `cards` (default 2).',
      table: {
        type: { summary: '2 | 3 | 4' },
      },
    },
  },
  render: (args) => renderPropertyList(args),
};

export default meta;
type Story = StoryObj<PropertyListProps>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Defense', value: '15' },
      { label: 'Initiative', value: '+1 (11)' },
      { label: 'Hit points', value: '9 (2d8)' },
      { label: 'Speed', value: '12 m' },
    ],
  },
};

export const FinnishVitals: Story = {
  name: 'Finnish vitals',
  args: {
    items: [
      { label: 'Puolustus', value: '15' },
      { label: 'Aloite', value: '+1 (11)' },
      { label: 'Osumapisteet', value: '9 (2n8)' },
      { label: 'Nopeus', value: '12 m' },
    ],
  },
};

export const Divided: Story = {
  args: {
    layout: 'divided',
    items: [
      { label: 'Puolustus', value: '15 (rengaspanssari)' },
      { label: 'Aloite', value: '+2 (12)' },
      { label: 'Osumapisteet', value: '27 (5n8 + 5)' },
      { label: 'Nopeus', value: '9 m' },
    ],
  },
};

export const Grid: Story = {
  args: {
    layout: 'grid',
    columns: 4,
    items: [
      { label: 'Loitsimisaika', value: '1 toiminto' },
      { label: 'Kantama', value: '18 m' },
      { label: 'Komponentit', value: 'Ä, E' },
      { label: 'Kesto', value: 'Keskittyminen, enintään 1 min' },
    ],
  },
};

export const CardsWithMeta: Story = {
  name: 'Cards with meta',
  args: {
    layout: 'cards',
    columns: 2,
    items: [
      {
        label: 'Pitkämiekka',
        value: '1n8 viilto',
        meta: ['Monipuolinen (1n10)', 'Paino 1,5 kg · 15 kr'],
      },
      {
        label: 'Kilpi',
        value: '+2 Puolustus',
        meta: 'Paino 3 kg · 10 kr',
      },
      {
        label: 'Lyhytjousi',
        value: '1n6 lävistys',
        meta: ['Kantama 24/96 m', 'Kahden käden · 25 kr'],
      },
      {
        label: 'Rengaspanssari',
        value: 'Puolustus 16',
        meta: ['Voimakkuus 13 · Häive: haitta', 'Paino 27,5 kg · 75 kr'],
      },
    ],
  },
};
