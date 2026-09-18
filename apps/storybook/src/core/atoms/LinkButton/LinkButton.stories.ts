// apps/storybook/src/core/atoms/LinkButton/LinkButton.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import { BUTTON_ICON_NAMES } from '@eevenkoto/core';
import '@eevenkoto/css/link-button.css';
import '@eevenkoto/css/icon.css';
import { renderLinkButton, type LinkButtonProps } from '@eevenkoto/html';

const meta: Meta<LinkButtonProps> = {
  title: 'Core/Atoms/LinkButton',
  parameters: {
    docs: {
      description: {
        component:
          'A LinkButton is a real link styled as a forward-biased CTA. Use it for prominent navigation — never put href on Button.',
      },
    },
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'Destination URL. Always renders as an `<a>`.',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual hierarchy of the CTA. No ghost — use InlineRef for in-prose links.',
      table: {
        type: { summary: "'primary' | 'secondary'" },
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
      description: 'Visible chrome copy. Icon-only is not supported.',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description:
        'Removes `href`, then sets `aria-disabled` and `tabindex="-1"`. Prefer omitting the CTA.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: 'select',
      options: [undefined, ...BUTTON_ICON_NAMES],
      description:
        'Glyph from BUTTON_ICON_NAMES. Defaults to icon-right when set (forward cue).',
      table: {
        type: { summary: 'ButtonIconName' },
      },
    },
    iconPosition: {
      control: 'select',
      options: [undefined, 'left', 'right'],
      description: 'Icon placement. Defaults to right when icon is set. No icon-only.',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'right (when icon is set)' },
      },
    },
    target: {
      control: 'text',
      description: 'Native `target`. `_blank` automatically adds noopener noreferrer to `rel`.',
      table: {
        type: { summary: 'string' },
      },
    },
    rel: {
      control: 'text',
      description: 'Native `rel`.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  render: (args) => renderLinkButton(args),
};

export default meta;
type Story = StoryObj<LinkButtonProps>;

export const Default: Story = {
  args: {
    href: '#link-button',
    variant: 'primary',
    label: 'Start playing',
  },
};

export const Secondary: Story = {
  args: {
    href: '#link-button',
    variant: 'secondary',
    label: 'Read the rules',
  },
};

export const Small: Story = {
  args: {
    href: '#link-button',
    size: 'sm',
    label: 'Learn more',
  },
};

export const Large: Story = {
  args: {
    href: '#link-button',
    size: 'lg',
    label: 'Get the book',
  },
};

export const Disabled: Story = {
  args: {
    href: '#link-button',
    disabled: true,
    label: 'Coming soon',
  },
};

export const IconRight: Story = {
  args: {
    href: '#link-button',
    label: 'Continue',
    icon: 'arrow',
  },
};

export const IconLeft: Story = {
  args: {
    href: '#link-button',
    variant: 'secondary',
    label: 'Back to index',
    icon: 'arrow',
    iconPosition: 'left',
  },
};

export const External: Story = {
  args: {
    href: 'https://eevenko.to',
    label: 'Visit eevenko.to',
    icon: 'arrow',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
};

/** Primary + secondary pair for hierarchy guidance in docs. */
export const PrimaryWithSecondary: Story = {
  render: () =>
    `<div class="eevenkoto-docs-example-row">${renderLinkButton({
      href: '#link-button',
      variant: 'primary',
      label: 'Start playing',
    })}${renderLinkButton({
      href: '#link-button',
      variant: 'secondary',
      label: 'Read the rules',
    })}</div>`,
};

/** All size options for the size modifier section. */
export const SizeComparison: Story = {
  render: () =>
    `<div class="eevenkoto-docs-example-row">${renderLinkButton({
      href: '#link-button',
      size: 'sm',
      label: 'Small',
    })}${renderLinkButton({
      href: '#link-button',
      size: 'md',
      label: 'Medium',
    })}${renderLinkButton({
      href: '#link-button',
      size: 'lg',
      label: 'Large',
    })}</div>`,
};

/** Scoop stays on inline-end in RTL. */
export const Rtl: Story = {
  render: () =>
    `<div dir="rtl" class="eevenkoto-docs-example-row">${renderLinkButton({
      href: '#link-button',
      label: 'Start playing',
      icon: 'arrow',
    })}${renderLinkButton({
      href: '#link-button',
      variant: 'secondary',
      label: 'Read the rules',
    })}</div>`,
};
