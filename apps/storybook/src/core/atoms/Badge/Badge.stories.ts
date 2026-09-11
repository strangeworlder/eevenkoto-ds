// apps/storybook/src/Badge/Badge.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/badge.css';
import { renderBadge, type BadgeProps } from '@eevenkoto/html';

const meta: Meta<BadgeProps> = {
  title: 'Core/Atoms/Badge',
  parameters: {
    docs: {
      description: {
        component:
          'A Badge is a compact status or metadata label. It consumes the feedback domain — not interactive chips (Chip comes later under control).',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Visible label. Sentence case.',
      table: { type: { summary: 'string' } },
    },
    variant: {
      control: 'select',
      options: ['subtle', 'solid', 'outline'],
      description: 'Surface recipe.',
      table: {
        type: { summary: "'subtle' | 'solid' | 'outline'" },
        defaultValue: { summary: 'subtle' },
      },
    },
    intent: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'caution', 'critical', 'admin'],
      description: 'Feedback intent (Tier 2).',
      table: {
        type: {
          summary: "'neutral' | 'info' | 'success' | 'caution' | 'critical' | 'admin'",
        },
        defaultValue: { summary: 'neutral' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Shared size ladder.',
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' },
      },
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded'],
      description: 'Corner treatment. Default pill uses --eevenkoto-radius-full.',
      table: {
        type: { summary: "'pill' | 'rounded'" },
        defaultValue: { summary: 'pill' },
      },
    },
    dot: {
      control: 'boolean',
      description: 'Shows a status dot before the label.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  render: (args) => renderBadge(args),
};

export default meta;
type Story = StoryObj<BadgeProps>;

export const Default: Story = {
  args: {
    label: 'Ready',
    variant: 'subtle',
    intent: 'success',
    size: 'md',
    shape: 'pill',
    dot: true,
  },
};

export const SubtleMatrix: Story = {
  render: () => {
    const intents = [
      'neutral',
      'info',
      'success',
      'caution',
      'critical',
      'admin',
    ] as const;
    return `<div class="eevenkoto-docs-example-row">${intents
      .map((intent) =>
        renderBadge({ label: intent, variant: 'subtle', intent, dot: true }),
      )
      .join('')}</div>`;
  },
};

export const SolidMatrix: Story = {
  render: () => {
    const intents = [
      'neutral',
      'info',
      'success',
      'caution',
      'critical',
      'admin',
    ] as const;
    return `<div class="eevenkoto-docs-example-row">${intents
      .map((intent) => renderBadge({ label: intent, variant: 'solid', intent }))
      .join('')}</div>`;
  },
};

export const OutlineMatrix: Story = {
  render: () => {
    const intents = [
      'neutral',
      'info',
      'success',
      'caution',
      'critical',
      'admin',
    ] as const;
    return `<div class="eevenkoto-docs-example-row">${intents
      .map((intent) => renderBadge({ label: intent, variant: 'outline', intent }))
      .join('')}</div>`;
  },
};

export const Sizes: Story = {
  render: () =>
    `<div class="eevenkoto-docs-example-row">${renderBadge({
      label: 'Small',
      size: 'sm',
      intent: 'info',
      dot: true,
    })}${renderBadge({
      label: 'Medium',
      size: 'md',
      intent: 'info',
      dot: true,
    })}${renderBadge({
      label: 'Large',
      size: 'lg',
      intent: 'info',
      dot: true,
    })}</div>`,
};

export const Shapes: Story = {
  render: () =>
    `<div class="eevenkoto-docs-example-row">${renderBadge({
      label: 'Pill',
      shape: 'pill',
      intent: 'caution',
    })}${renderBadge({
      label: 'Rounded',
      shape: 'rounded',
      intent: 'caution',
    })}</div>`,
};
