// apps/storybook/src/Badge/Badge.stories.ts
import type { Meta, StoryObj } from '@storybook/html-vite';
import { expect } from 'storybook/test';
import '@eevenkoto/css/badge.css';
import { renderBadge, type BadgeProps } from '@eevenkoto/html';

const meta: Meta<BadgeProps> = {
  title: 'Core/Atoms/Badge',
  parameters: {
    docs: {
      description: {
        component:
          'A Badge is a compact status or metadata label. Feedback domain — not Chip (control) or StatusDot (unlabeled pip).',
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
    dot: true,
  },
  play: async ({ canvasElement }) => {
    const badge = canvasElement.querySelector<HTMLElement>('.eevenkoto-badge');
    expect(badge).not.toBeNull();
    const style = getComputedStyle(badge!);
    expect(style.borderRadius).toBe('0px');
    expect(parseFloat(style.borderTopWidth)).toBeGreaterThan(parseFloat(style.borderLeftWidth));
    expect(parseFloat(style.borderLeftWidth)).toBeGreaterThan(0);
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

export const StampIndicator: Story = {
  name: 'Stamp indicator (dot vs plain)',
  render: () =>
    `<div class="eevenkoto-docs-example-row">${renderBadge({
      label: 'Luonnos',
      intent: 'neutral',
    })}${renderBadge({
      label: 'Valmis',
      intent: 'success',
      dot: true,
    })}${renderBadge({
      label: 'Ennakko',
      intent: 'caution',
      dot: true,
    })}</div>`,
};
