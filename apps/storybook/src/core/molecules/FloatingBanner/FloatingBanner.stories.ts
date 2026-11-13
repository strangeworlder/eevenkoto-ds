import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/floating-banner.css';
import { renderFloatingBanner, type FloatingBannerProps } from '@eevenkoto/html';

/** Docs canvases would otherwise overlap; keep the fixed banner in flow. */
const inFlow = (markup: string) =>
  `<div style="position: relative; min-block-size: 9rem;">${markup.replace(
    '<aside ',
    '<aside style="position: absolute; inset-inline-start: 50%; inset-block-end: 0; " ',
  )}</div>`;

const meta: Meta<FloatingBannerProps> = {
  title: 'Core/Molecules/FloatingBanner',
  parameters: {
    docs: {
      description: {
        component:
          'Fixed, elevated notice for consent and announcements. Closed by default; `open` shows it. Body copy with inline links plus a primary dismiss button.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    placement: {
      control: 'select',
      options: ['bottom-center', 'bottom-right'],
      table: { type: { summary: "'bottom-center' | 'bottom-right'" }, defaultValue: { summary: 'bottom-center' } },
    },
    ariaLabel: { control: 'text', description: 'Landmark name.' },
    body: { control: 'text' },
    bodyHtml: { control: 'text', description: 'Trusted inline HTML; wins over `body`.' },
    confirmLabel: { control: 'text' },
    confirmId: { control: 'text' },
  },
  args: {
    open: true,
    ariaLabel: 'Cookie notice',
    body: 'Käytämme vain välttämättömiä evästeitä.',
    secondaryLink: { label: 'Tietosuoja', href: '#privacy' },
    confirmLabel: 'Selvä',
  },
  render: (args) => inFlow(renderFloatingBanner(args)),
};

export default meta;
type Story = StoryObj<FloatingBannerProps>;

export const Default: Story = {};

export const BottomRight: Story = {
  args: { placement: 'bottom-right' },
  render: (args) =>
    inFlow(renderFloatingBanner(args)).replace(
      'position: absolute; inset-inline-start: 50%;',
      'position: absolute; inset-inline-end: 0; inset-inline-start: auto; transform: none;',
    ),
};
