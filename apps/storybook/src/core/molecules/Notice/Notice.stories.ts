import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/notice.css';
import { renderNotice, type NoticeProps } from '@eevenkoto/html';

const meta: Meta<NoticeProps> = {
  title: 'Core/Molecules/Notice',
  parameters: {
    docs: {
      description: {
        component:
          'A Notice is a feedback callout or banner. It consumes the feedback domain (same intents as Badge) in a block layout with optional icon, title, body, and actions.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Optional title.' },
    body: { control: 'text', description: 'Body copy.' },
    variant: {
      control: 'select',
      options: ['subtle', 'solid', 'outline'],
      table: { defaultValue: { summary: 'subtle' } },
    },
    intent: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'caution', 'critical', 'admin'],
      table: { defaultValue: { summary: 'neutral' } },
    },
    role: {
      control: 'select',
      options: ['status', 'alert', 'note', 'region'],
      table: { defaultValue: { summary: 'status' } },
    },
  },
  render: (args) => renderNotice(args),
};

export default meta;
type Story = StoryObj<NoticeProps>;

export const Default: Story = {
  args: {
    title: 'Section locked',
    body: 'This section is available to patrons. Sign in or upgrade to continue.',
    intent: 'caution',
    variant: 'subtle',
  },
};

export const IntentMatrix: Story = {
  render: () => {
    const intents = [
      'neutral',
      'info',
      'success',
      'caution',
      'critical',
      'admin',
    ] as const;
    return `<div class="eevenkoto-flow">${intents
      .map((intent) =>
        renderNotice({
          title: intent,
          body: `Subtle ${intent} notice.`,
          intent,
          variant: 'subtle',
        }),
      )
      .join('')}</div>`;
  },
};

export const Variants: Story = {
  render: () =>
    `<div class="eevenkoto-flow">${(['subtle', 'outline', 'solid'] as const)
      .map((variant) =>
        renderNotice({
          title: variant,
          body: `Info notice with ${variant} surface.`,
          intent: 'info',
          variant,
        }),
      )
      .join('')}</div>`,
};
