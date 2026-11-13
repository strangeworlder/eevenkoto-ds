import type { Meta, StoryObj } from '@storybook/html-vite';
import { expect, userEvent, within } from 'storybook/test';
import type { FieldProps as FieldCoreProps } from '@eevenkoto/core';
import '@eevenkoto/css/field.css';
import '@eevenkoto/css/input.css';
import '@eevenkoto/css/select.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/icon.css';
import { renderButton, renderField, renderInput, renderSelect } from '@eevenkoto/html';

type FieldStoryArgs = FieldCoreProps & {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  search?: boolean;
  type?: 'text' | 'search' | 'email' | 'password' | 'tel' | 'url' | 'number';
};

const meta: Meta<FieldStoryArgs> = {
  title: 'Core/Molecules/Field',
  parameters: {
    docs: {
      description: {
        component:
          'Labeled control + optional hint or error. Wires label for= and message id; nest Input with matching id, describedBy, and invalid.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    htmlFor: { control: 'text' },
    orientation: {
      control: { type: 'inline-radio' },
      options: ['vertical', 'horizontal'],
      table: { defaultValue: { summary: 'vertical' } },
    },
    hint: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args) => {
    const htmlFor = args.htmlFor ?? 'field-demo';
    const messageId = `${htmlFor}-message`;
    const hasError = Boolean(args.error);
    return renderField({
      label: args.label,
      htmlFor,
      orientation: args.orientation,
      hint: args.hint,
      error: args.error,
      messageId,
      control: renderInput({
        id: htmlFor,
        type: args.type,
        placeholder: args.placeholder,
        value: args.value,
        disabled: args.disabled,
        search: args.search,
        invalid: hasError,
        describedBy: args.hint || args.error ? messageId : undefined,
      }),
    });
  },
};

export default meta;
type Story = StoryObj<FieldStoryArgs>;

export const Default: Story = {
  args: {
    label: 'Character name',
    htmlFor: 'field-character-name',
    hint: 'Use the name on your character sheet.',
    placeholder: 'e.g. Elowen Karth',
  },
};

export const WithHint: Story = {
  name: 'With hint',
  args: {
    label: 'Party name',
    htmlFor: 'field-party',
    hint: 'Shown on the roster header.',
    placeholder: 'e.g. The Ember Vow',
  },
};

export const WithError: Story = {
  name: 'With error',
  args: {
    label: 'Email',
    htmlFor: 'field-email',
    error: 'Enter an email address that includes @.',
    value: 'gjør-not-an-email',
    type: 'email',
  },
};

export const Horizontal: Story = {
  render: () =>
    renderField({
      label: 'Sort by',
      htmlFor: 'field-sort-by',
      orientation: 'horizontal',
      control: renderSelect({
        id: 'field-sort-by',
        options: [
          { value: 'name', label: 'Name (A–Z)' },
          { value: 'level', label: 'Spell level' },
          { value: 'school', label: 'School of magic' },
        ],
      }),
    }),
};

export const WithAction: Story = {
  name: 'With inline action',
  render: () =>
    renderField({
      label: 'Sign-in email',
      htmlFor: 'field-magic-link',
      hint: 'We send a one-time link to this address.',
      messageId: 'field-magic-link-message',
      control: renderInput({
        id: 'field-magic-link',
        type: 'email',
        placeholder: 'elowen@eevenko.to',
        describedBy: 'field-magic-link-message',
      }),
      action: renderButton({
        label: 'Send link',
        variant: 'primary',
      }),
    }),
};

export const Keyboard: Story = {
  args: {
    label: 'Email',
    htmlFor: 'field-email-keyboard',
    error: 'Enter an email address that includes @.',
    value: 'not-an-email',
    type: 'email',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Email' });
    await expect(input).toHaveAccessibleDescription('Enter an email address that includes @.');
    await userEvent.tab();
    await expect(input).toHaveFocus();
    await userEvent.clear(input);
    await userEvent.keyboard('ada@example.com');
    await expect(input).toHaveValue('ada@example.com');
  },
};

export const SearchChrome: Story = {
  name: 'Search in a field',
  args: {
    label: 'Spell library',
    htmlFor: 'field-spell-search',
    hint: 'Filter by name or school.',
    placeholder: 'Fireball, Cure Wounds…',
    search: true,
  },
};
