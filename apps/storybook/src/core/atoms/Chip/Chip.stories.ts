import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/chip.css';
import { renderChip, type ChipProps } from '@eevenkoto/html';

const meta: Meta<ChipProps> = {
  title: 'Core/Atoms/Chip',
  parameters: {
    docs: {
      description: {
        component:
          'Interactive filter or role chip. Control tokens, not feedback. Host alone is unselected + md.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    selected: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    href: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args) => renderChip(args),
};

export default meta;
type Story = StoryObj<ChipProps>;

export const Default: Story = {
  args: {
    label: 'Seuraaja',
  },
};

export const Selected: Story = {
  args: {
    label: 'Pelaaja',
    selected: true,
  },
};

export const RoleRow: Story = {
  name: 'Role switcher (eevenko.to)',
  render: () =>
    `<p>${renderChip({ label: 'Vieras', size: 'sm' })}
      ${renderChip({ label: 'Seuraaja', size: 'sm', selected: true })}
      ${renderChip({ label: 'Pelaaja', size: 'sm', href: '#player' })}
      ${renderChip({ label: 'Pelinjohtaja', size: 'sm' })}</p>`,
};
