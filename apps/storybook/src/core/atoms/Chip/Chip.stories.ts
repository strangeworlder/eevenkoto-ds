import type { Meta, StoryObj } from '@storybook/html-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ICON_NAMES } from '@eevenkoto/core';
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
    icon: {
      control: 'select',
      options: [undefined, ...ICON_NAMES],
      description: 'Optional leading decorative glyph from ICON_NAMES.',
    },
    swatchColor: {
      control: 'color',
      description: 'Optional leading Swatch color value.',
    },
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

export const WithSwatches: Story = {
  name: 'Leading swatches',
  render: () =>
    `<div style="display: flex; flex-wrap: wrap; gap: var(--eevenkoto-space-2);">
      ${renderChip({ label: 'Myrskynvihreä', swatchColor: '#2c7a7b', selected: true })}
      ${renderChip({ label: 'Karmiini', swatchColor: '#8b2635' })}
      ${renderChip({ label: 'Luonnonpellava', swatchColor: '#faf7f0' })}
      ${renderChip({ label: 'Lukittu väri', swatchColor: '#b7791f', disabled: true })}
    </div>`,
};

export const WithIcons: Story = {
  name: 'Leading icons',
  render: () =>
    `<div style="display: flex; flex-wrap: wrap; gap: var(--eevenkoto-space-2);">
      ${renderChip({ label: 'Aseet', icon: 'sword', selected: true })}
      ${renderChip({ label: 'Panssarit', icon: 'shield' })}
      ${renderChip({ label: 'Nopat', icon: 'dice', size: 'sm' })}
      ${renderChip({ label: 'Lukittu', icon: 'lock', disabled: true })}
    </div>`,
};

export const Keyboard: Story = {
  render: () =>
    `<p>${renderChip({ label: 'Seuraaja' })}${renderChip({
      label: 'Pelaaja',
      href: '#player',
    })}${renderChip({ label: 'Lukittu', disabled: true })}</p>`,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Seuraaja' });
    const link = canvas.getByRole('link', { name: 'Pelaaja' });
    const disabled = canvas.getByRole('button', { name: 'Lukittu' });
    link.addEventListener('click', (event) => event.preventDefault());
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(link).toHaveFocus();
    await expect(disabled).toBeDisabled();
    await userEvent.tab();
    await expect(disabled).not.toHaveFocus();
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
