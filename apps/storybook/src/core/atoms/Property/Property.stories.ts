import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/property.css';
import { renderProperty, type PropertyProps } from '@eevenkoto/html';

const meta: Meta<PropertyProps> = {
  title: 'Core/Atoms/Property',
  parameters: {
    docs: {
      description: {
        component:
          'A single definition-list row (`dt` + `dd`). Prefer PropertyList for more than one pair.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
  },
  render: (args) => `<dl class="eevenkoto-property-list">${renderProperty(args)}</dl>`,
};

export default meta;
type Story = StoryObj<PropertyProps>;

export const Default: Story = {
  args: {
    label: 'Defense',
    value: '15',
  },
};
