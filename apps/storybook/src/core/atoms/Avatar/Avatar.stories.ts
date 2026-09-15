import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/avatar.css';
import '@eevenkoto/css/icon.css';
import { renderAvatar, type AvatarProps } from '@eevenkoto/html';

/** Inline parchment portrait so the docs canvas needs no network. */
const portrait =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Crect width='96' height='96' fill='%23e6d9c4'/%3E%3Ccircle cx='48' cy='36' r='16' fill='%235c4f3d'/%3E%3Cpath d='M16 96c0-17.7 14.3-32 32-32s32 14.3 32 32Z' fill='%235c4f3d'/%3E%3C/svg%3E";

const meta: Meta<AvatarProps> = {
  title: 'Core/Atoms/Avatar',
  parameters: {
    docs: {
      description: {
        component:
          'Circular portrait: image or parchment user placeholder. No initials, no status ring.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Accessible name (alt / aria-label).' },
    src: { control: 'text', description: 'Portrait URL. Omit for the placeholder.' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
  },
  render: (args) => renderAvatar(args),
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Default: Story = {
  args: {
    name: 'Elowen Karth',
    size: 'md',
  },
};

export const WithImage: Story = {
  name: 'With image',
  args: {
    name: 'Elowen Karth',
    src: portrait,
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () =>
    `<p>${(['sm', 'md', 'lg'] as const)
      .map((size) => renderAvatar({ name: 'Elowen Karth', size }))
      .join(' ')}</p>`,
};
