// apps/storybook/src/Button/Button.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/button.css';
import { renderButton, type ButtonProps } from '@eevenkoto/html';

const meta: Meta<ButtonProps> = {
  title: 'Core/Atoms/Button',
  parameters: {
    docs: {
      description: {
        component:
          'A Button triggers an action or confirms a choice when the user activates it.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual hierarchy of the button.',
      table: {
        type: { summary: "'primary' | 'secondary' | 'ghost'" },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Shared size ladder (sm | md | lg). Default: md.',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    label: {
      control: 'text',
      description:
        'Visible label text. For icon-only buttons, also used as the accessible name (`aria-label`).',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, sets the native `disabled` attribute and inactive styling.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: 'select',
      options: [undefined, 'star', 'check', 'arrow', 'plus'],
      description: 'Placeholder icon name (stand-in until an icon library is added).',
      table: {
        type: { summary: "'star' | 'check' | 'arrow' | 'plus'" },
      },
    },
    iconPosition: {
      control: 'select',
      options: [undefined, 'left', 'right', 'only'],
      description:
        'Icon placement. Defaults to left when icon is set. Icon-only requires an accessible name (supplied from label).',
      table: {
        type: { summary: "'left' | 'right' | 'only'" },
        defaultValue: { summary: 'left (when icon is set)' },
      },
    },
  },
  render: (args) => renderButton(args),
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: {
    variant: 'primary',
    label: 'Standard Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Cancel',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    label: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'secondary',
    size: 'lg',
    label: 'Large Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    label: 'Disabled Button',
  },
};

export const IconLeft: Story = {
  args: {
    variant: 'primary',
    label: 'Icon Left',
    icon: 'star',
    iconPosition: 'left',
  },
};

export const IconRight: Story = {
  args: {
    variant: 'primary',
    label: 'Continue',
    icon: 'arrow',
    iconPosition: 'right',
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'primary',
    label: 'Favorite',
    icon: 'star',
    iconPosition: 'only',
  },
};

export const IconCheck: Story = {
  args: {
    variant: 'secondary',
    label: 'Confirm',
    icon: 'check',
    iconPosition: 'left',
  },
};

export const IconPlus: Story = {
  args: {
    variant: 'ghost',
    label: 'Add item',
    icon: 'plus',
    iconPosition: 'left',
  },
};

/** Primary + secondary pair for hierarchy guidance in docs. */
export const PrimaryWithSecondary: Story = {
  render: () =>
    `<div class="eevenkoto-docs-example-row">${renderButton({
      variant: 'primary',
      label: 'Save',
    })}${renderButton({
      variant: 'secondary',
      label: 'Cancel',
    })}</div>`,
};

/** All size options for the size modifier section. */
export const SizeComparison: Story = {
  render: () =>
    `<div class="eevenkoto-docs-example-row">${renderButton({
      variant: 'primary',
      size: 'sm',
      label: 'Small',
    })}${renderButton({
      variant: 'primary',
      size: 'md',
      label: 'Medium',
    })}${renderButton({
      variant: 'primary',
      size: 'lg',
      label: 'Large',
    })}</div>`,
};
