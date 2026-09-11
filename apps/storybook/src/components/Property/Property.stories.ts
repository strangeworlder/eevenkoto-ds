// apps/storybook/src/components/Property/Property.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/property.css';
import { renderPropertyList, type PropertyListProps } from '@eevenkoto/html';

const meta: Meta<PropertyListProps> = {
  title: 'Components/Property',
  parameters: {
    docs: {
      description: {
        component:
          'PropertyList is a definition list of Label → value rows (`dl` / `dt` / `dd`). Product copy stays in the app.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of `{ label, value }` pairs.',
      table: { type: { summary: 'PropertyItem[]' } },
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
