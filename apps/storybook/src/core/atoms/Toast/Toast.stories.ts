import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/toast.css';
import '@eevenkoto/css/icon.css';
import { renderToast, type ToastProps } from '@eevenkoto/html';

const intents: NonNullable<ToastProps['intent']>[] = [
  'neutral',
  'info',
  'success',
  'caution',
  'critical',
  'admin',
];

const variants: NonNullable<ToastProps['variant']>[] = ['subtle', 'solid'];
const placements: NonNullable<ToastProps['placement']>[] = [
  'inline',
  'fixed-bottom-right',
  'fixed-bottom-center',
];

const meta: Meta<ToastProps> = {
  title: 'Core/Atoms/Toast',
  parameters: {
    docs: {
      description: {
        component:
          'Lightweight floating feedback notification atom. Host alone renders subtle neutral inline toast. Provides semantic feedback intents, accessible roles (status/alert), and slide/fade transitions.',
      },
    },
  },
  argTypes: {
    text: { control: 'text' },
    intent: {
      control: 'select',
      options: intents,
      table: { defaultValue: { summary: 'neutral' } },
    },
    variant: {
      control: 'select',
      options: variants,
      table: { defaultValue: { summary: 'subtle' } },
    },
    placement: {
      control: 'select',
      options: placements,
      table: { defaultValue: { summary: 'inline' } },
    },
    visible: {
      control: 'boolean',
      table: { defaultValue: { summary: 'true' } },
    },
    icon: {
      control: 'text',
      description: 'Named icon token override (or false to hide icon).',
    },
  },
  render: (args) => renderToast(args),
};

export default meta;
type Story = StoryObj<ToastProps>;

export const Default: Story = {
  args: {
    text: 'Asetukset tallennettu onnistuneesti.',
  },
};

export const Intents: Story = {
  name: 'Intents (Subtle)',
  render: () =>
    `<div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start;">
      ${intents
        .map((intent) =>
          renderToast({
            intent,
            text: `Palauteviesti intentiolla ${intent}.`,
          }),
        )
        .join('\n')}
    </div>`,
};

export const Solid: Story = {
  name: 'Intents (Solid)',
  render: () =>
    `<div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-start;">
      ${intents
        .map((intent) =>
          renderToast({
            intent,
            variant: 'solid',
            text: `Tärkeä ilmoitus (${intent}).`,
          }),
        )
        .join('\n')}
    </div>`,
};

export const CustomIcon: Story = {
  name: 'Custom Icon',
  args: {
    text: 'Varustetiedot kopioitu leikepöydälle!',
    intent: 'success',
    icon: 'dice',
  },
};

export const FixedPlacement: Story = {
  name: 'Fixed Placement',
  render: () => `
    <div style="position: relative; min-height: 180px; border: 1px dashed var(--eevenkoto-color-boundary-subtle); padding: 1rem; border-radius: 8px;">
      <p style="margin: 0; color: var(--eevenkoto-color-content-secondary);">Simuloitu näyttöalue kiinteälle Toast-sijoittelulle:</p>
      ${renderToast({
        text: 'Tiedot tallennettu!',
        intent: 'success',
        placement: 'fixed-bottom-right',
      })}
    </div>
  `,
};
