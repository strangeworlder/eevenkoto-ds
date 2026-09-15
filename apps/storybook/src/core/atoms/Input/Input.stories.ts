import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/input.css';
import '@eevenkoto/css/icon.css';
import { renderInput, type InputProps } from '@eevenkoto/html';

const meta: Meta<InputProps> = {
  title: 'Core/Atoms/Input',
  parameters: {
    docs: {
      description: {
        component:
          'Single-line control chrome only. Form rows (visible label, hint, error) live on Field — do not treat Input as a complete form field.',
      },
    },
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Example value hint only — never the accessible name.',
    },
    value: { control: 'text' },
    id: { control: 'text' },
    ariaLabel: {
      control: 'text',
      description:
        'aria-label when there is no Field / visible label (chrome search). Not Field.label.',
    },
    describedBy: {
      control: 'text',
      description: 'aria-describedby id(s) — Field supplies the message element.',
    },
    type: {
      control: 'select',
      options: ['text', 'search', 'email', 'password', 'tel', 'url', 'number'],
      table: { defaultValue: { summary: 'text' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'md' } },
    },
    search: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    invalid: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
  },
  render: (args) => renderInput(args),
};

export default meta;
type Story = StoryObj<InputProps>;

/** Chrome playground — name via ariaLabel. For forms, use Field docs. */
export const Default: Story = {
  args: {
    id: 'chrome-demo',
    ariaLabel: 'Character name',
    placeholder: 'e.g. Elowen Karth',
    size: 'md',
  },
};

/** Chrome-only search: no Field; ariaLabel names the control. */
export const Search: Story = {
  args: {
    id: 'spell-search',
    ariaLabel: 'Search spells',
    placeholder: 'Fireball, Cure Wounds…',
    search: true,
  },
};

export const Disabled: Story = {
  args: {
    id: 'locked',
    ariaLabel: 'Campaign',
    value: 'Locked',
    disabled: true,
  },
};

/** Invalid paint only — pair with Field error text in real forms. */
export const Invalid: Story = {
  args: {
    id: 'invalid-chrome',
    ariaLabel: 'Email',
    value: 'gjør-not-an-email',
    type: 'email',
    invalid: true,
  },
};

export const Sizes: Story = {
  render: () =>
    `<div style="display: flex; flex-direction: column; gap: var(--eevenkoto-space-6); max-inline-size: 28rem;">
      ${renderInput({ id: 'size-sm', ariaLabel: 'Small', size: 'sm', placeholder: 'sm' })}
      ${renderInput({ id: 'size-md', ariaLabel: 'Medium', size: 'md', placeholder: 'md' })}
    </div>`,
};
