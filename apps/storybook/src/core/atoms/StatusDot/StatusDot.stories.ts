import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/status-dot.css';
import { renderStatusDot, type StatusDotProps } from '@eevenkoto/html';

const intents: NonNullable<StatusDotProps['intent']>[] = [
  'neutral',
  'info',
  'success',
  'caution',
  'critical',
  'admin',
];

const meta: Meta<StatusDotProps> = {
  title: 'Core/Atoms/StatusDot',
  parameters: {
    docs: {
      description: {
        component:
          'Unlabeled readiness pip. Same intents as Badge. Host alone is neutral. Use Badge when a visible label is needed.',
      },
    },
  },
  argTypes: {
    intent: {
      control: 'select',
      options: intents,
      table: { defaultValue: { summary: 'neutral' } },
    },
    label: { control: 'text', description: 'Accessible name (no visible text).' },
  },
  render: (args) => renderStatusDot(args),
};

export default meta;
type Story = StoryObj<StatusDotProps>;

export const Default: Story = {
  args: {
    label: 'Ready',
  },
};

export const Intents: Story = {
  name: 'Intents',
  render: () =>
    `<p>${intents
      .map((intent) => `${renderStatusDot({ intent, label: intent })} <code>${intent}</code> `)
      .join(' ')}</p>`,
};

export const NavPips: Story = {
  name: 'Nav pips (eevenko.to)',
  render: () =>
    `<p>${renderStatusDot({ intent: 'success', label: 'Valmis' })} Valmis
      ${renderStatusDot({ intent: 'caution', label: 'Vedos' })} Vedos
      ${renderStatusDot({ intent: 'critical', label: 'Työstössä' })} Työstössä
      ${renderStatusDot({ intent: 'admin', label: 'Luonnos' })} Luonnos
      ${renderStatusDot({ intent: 'neutral', label: 'Virheellinen' })} Virheellinen</p>`,
};
