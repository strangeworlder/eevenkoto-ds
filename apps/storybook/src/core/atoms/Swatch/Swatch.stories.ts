import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/swatch.css';
import { renderSwatch, type SwatchProps } from '@eevenkoto/html';

const meta: Meta<SwatchProps> = {
  title: 'Core/Atoms/Swatch',
  parameters: {
    docs: {
      description: {
        component:
          'Color sample chip with a boundary-strong hairline so arbitrary pigments stay legible on both light parchment and dark obsidian surfaces. Host alone is md + circle.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'color',
      description: 'CSS color value applied via `--eevenkoto-swatch-color`.',
      table: { type: { summary: 'string' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Shared size ladder (`1.2rem` | `1.6rem` | `2.4rem`).',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded'],
      description: 'Geometry of the color sample.',
      table: {
        type: { summary: "'circle' | 'rounded'" },
        defaultValue: { summary: 'circle' },
      },
    },
    label: {
      control: 'text',
      description: 'Accessible name (`role="img"` + `aria-label`). Omit when decorative (`aria-hidden="true"`).',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    color: '#2c7a7b',
    size: 'md',
    shape: 'circle',
    label: 'Myrskynvihreä',
  },
  render: (args) => renderSwatch(args),
};

export default meta;
type Story = StoryObj<SwatchProps>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () =>
    `<div style="display: flex; align-items: center; gap: var(--eevenkoto-space-4);">
      ${(['sm', 'md', 'lg'] as const)
        .map(
          (size) =>
            `<span style="display: inline-flex; align-items: center; gap: var(--eevenkoto-space-2);">
              ${renderSwatch({ color: '#8b2635', size, label: `Karmiini (${size})` })}
              <code>${size}</code>
            </span>`,
        )
        .join('')}
    </div>`,
};

export const Shapes: Story = {
  render: () =>
    `<div style="display: flex; align-items: center; gap: var(--eevenkoto-space-4);">
      <span style="display: inline-flex; align-items: center; gap: var(--eevenkoto-space-2);">
        ${renderSwatch({ color: '#b7791f', shape: 'circle', label: 'Kulta (ympyrä)' })}
        <code>circle</code>
      </span>
      <span style="display: inline-flex; align-items: center; gap: var(--eevenkoto-space-2);">
        ${renderSwatch({ color: '#b7791f', shape: 'rounded', label: 'Kulta (kulmikas)' })}
        <code>rounded</code>
      </span>
    </div>`,
};

export const LightAndDarkSwatches: Story = {
  name: 'Light and dark swatches',
  render: () =>
    `<div style="display: flex; flex-wrap: wrap; align-items: center; gap: var(--eevenkoto-space-4);">
      <span style="display: inline-flex; align-items: center; gap: var(--eevenkoto-space-2);">
        ${renderSwatch({ color: '#faf7f0', label: 'Luonnonvalkoinen pellava' })}
        <span>Luonnonvalkoinen pellava</span>
      </span>
      <span style="display: inline-flex; align-items: center; gap: var(--eevenkoto-space-2);">
        ${renderSwatch({ color: '#f3e5ab', label: 'Vaalea pergamentti' })}
        <span>Vaalea pergamentti</span>
      </span>
      <span style="display: inline-flex; align-items: center; gap: var(--eevenkoto-space-2);">
        ${renderSwatch({ color: '#1c1b1a', label: 'Nokimusta' })}
        <span>Nokimusta</span>
      </span>
      <span style="display: inline-flex; align-items: center; gap: var(--eevenkoto-space-2);">
        ${renderSwatch({ color: '#2b4c7e', label: 'Yönsininen' })}
        <span>Yönsininen</span>
      </span>
    </div>`,
};
