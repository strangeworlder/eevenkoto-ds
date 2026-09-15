import type { Meta, StoryObj } from '@storybook/html-vite';
import { ICON_NAMES } from '@eevenkoto/core';
import '@eevenkoto/css/icon.css';
import { renderIcon, type IconProps } from '@eevenkoto/html';
import './icon.stories.css';

const meta: Meta<IconProps> = {
  title: 'Core/Atoms/Icon',
  parameters: {
    docs: {
      description: {
        component:
          'Inline SVG chrome (size + currentColor). Glyph names and paths are tokens — see Foundations/Tokens → Icons.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: [...ICON_NAMES],
      description: 'Glyph from token inventory (ICON_NAMES).',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    label: { control: 'text', description: 'Omit for decorative icons (aria-hidden).' },
  },
  render: (args) => renderIcon(args),
};

export default meta;
type Story = StoryObj<IconProps>;

export const Default: Story = {
  args: {
    name: 'star',
    size: 'md',
    label: 'Star',
  },
};

export const Sizes: Story = {
  render: () =>
    `<div class="eevenkoto-icon-sizes">
      ${(['sm', 'md', 'lg'] as const)
        .map(
          (size) =>
            `<div class="eevenkoto-icon-sizes__item">
              ${renderIcon({ name: 'check', size, label: `check ${size}` })}
              <p class="eevenkoto-icon-sizes__label">${size}</p>
            </div>`,
        )
        .join('')}
    </div>`,
};
