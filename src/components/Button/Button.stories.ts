// src/components/Button/Button.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import template from './Button.html?raw';
import './button.css';

/** Placeholder icon names until a shared icon library exists. */
export type ButtonIconName = 'star' | 'check' | 'arrow' | 'plus';

export interface ButtonArgs {
  variant: 'primary' | 'secondary' | 'ghost';
  label: string;
  size?: 'small' | 'large';
  disabled?: boolean;
  /** Which placeholder icon to render. */
  icon?: ButtonIconName;
  /** Where the icon sits relative to the label. Defaults to left when icon is set. */
  iconPosition?: 'left' | 'right' | 'only';
}

const iconPaths: Record<ButtonIconName, string> = {
  star: 'M8 1.5a.75.75 0 0 1 .67.41l1.52 3.08 3.4.5a.75.75 0 0 1 .42 1.28l-2.46 2.4.58 3.39a.75.75 0 0 1-1.09.79L8 12.27l-3.04 1.6a.75.75 0 0 1-1.09-.79l.58-3.39-2.46-2.4a.75.75 0 0 1 .42-1.28l3.4-.5L7.33 1.91A.75.75 0 0 1 8 1.5Z',
  check:
    'M12.207 4.793a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L7 8.586l3.793-3.793a1 1 0 0 1 1.414 0Z',
  arrow:
    'M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L11.44 8.75H2.75a.75.75 0 0 1 0-1.5h8.69L8.22 4.03a.75.75 0 0 1 0-1.06Z',
  plus: 'M8 3a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 8 3Z',
};

const renderIcon = (name: ButtonIconName): string =>
  `
  <svg class="eevenkoto-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="${iconPaths[name]}"/>
  </svg>
`.trim();

const renderButton = (args: ButtonArgs): string => {
  // If size exists, produce " eevenkoto-button--small", else empty string
  const sizeClass = args.size ? ` eevenkoto-button--${args.size}` : '';
  const iconPosition = args.icon ? (args.iconPosition ?? 'left') : args.iconPosition;
  const iconClass = iconPosition ? ` eevenkoto-button--icon-${iconPosition}` : '';

  let content = args.label;
  let ariaLabel = '';

  if (args.icon && iconPosition) {
    const iconMarkup = renderIcon(args.icon);

    if (iconPosition === 'left') {
      content = `${iconMarkup}${args.label}`;
    } else if (iconPosition === 'right') {
      content = `${args.label}${iconMarkup}`;
    } else if (iconPosition === 'only') {
      content = iconMarkup;
      ariaLabel = ` aria-label="${args.label}"`;
    }
  }

  return template
    .replace('{{variant}}', args.variant)
    .replace('{{sizeClass}}', sizeClass)
    .replace('{{iconClass}}', iconClass)
    .replace('{{content}}', content)
    .replace('{{ariaLabel}}', ariaLabel)
    .replace('{{disabled}}', args.disabled ? ' disabled' : '');
};

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: [undefined, 'small', 'large'],
      description: 'Optional sizing modifier',
    },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: {
      control: 'select',
      options: [undefined, 'star', 'check', 'arrow', 'plus'],
      description: 'Placeholder icon name (stand-in until an icon library is added).',
    },
    iconPosition: {
      control: 'select',
      options: [undefined, 'left', 'right', 'only'],
      description:
        'Icon placement. Defaults to left when icon is set. Icon-only requires aria-label (supplied from label).',
    },
  },
  render: (args) => renderButton(args),
};

export default meta;
type Story = StoryObj<ButtonArgs>;

export const Default: Story = {
  args: {
    variant: 'primary',
    label: 'Standard Button',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    label: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
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
