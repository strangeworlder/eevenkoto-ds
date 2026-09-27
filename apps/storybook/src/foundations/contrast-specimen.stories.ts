import type { Meta, StoryObj } from '@storybook/html-vite';
import '@eevenkoto/css/badge.css';
import '@eevenkoto/css/button.css';
import '@eevenkoto/css/chip.css';
import '@eevenkoto/css/field.css';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/inline-ref.css';
import '@eevenkoto/css/input.css';
import '@eevenkoto/css/link-button.css';
import '@eevenkoto/css/notice.css';
import {
  renderBadge,
  renderButton,
  renderChip,
  renderField,
  renderInlineRef,
  renderInput,
  renderLinkButton,
  renderNotice,
} from '@eevenkoto/html';

const intents = ['neutral', 'info', 'success', 'caution', 'critical', 'admin'] as const;

const meta: Meta = {
  title: 'Foundations/Contrast specimen',
  parameters: {
    docs: {
      description: {
        component:
          'Dark-theme chrome used by the browser accessibility run. Light stories cover the same components separately.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/** Computed dark contrast for shipped chrome. Light coverage is the component stories. */
export const DarkChrome: Story = {
  globals: { theme: 'dark' },
  render: () => {
    const badges = intents
      .map((intent) => renderBadge({ label: intent, intent, variant: 'subtle' }))
      .join('');
    const notices = intents
      .map((intent) =>
        renderNotice({
          title: intent,
          body: `${intent} notice.`,
          intent,
          variant: 'subtle',
        }),
      )
      .join('');
    return `<div class="eevenkoto-flow">
      ${renderButton({ label: 'Save' })}
      ${renderButton({ label: 'Cancel', variant: 'secondary' })}
      ${renderButton({ label: 'More', variant: 'ghost' })}
      ${renderLinkButton({ href: '#play', label: 'Start playing' })}
      <p>${badges}</p>
      ${notices}
      <p>${renderChip({ label: 'Seuraaja' })}${renderChip({ label: 'Pelaaja', href: '#player' })}</p>
      ${renderField({
        label: 'Email',
        htmlFor: 'contrast-email',
        error: 'Enter an email address that includes @.',
        messageId: 'contrast-email-message',
        control: renderInput({
          id: 'contrast-email',
          type: 'email',
          value: 'not-an-email',
          invalid: true,
          describedBy: 'contrast-email-message',
        }),
      })}
      <p>${renderInlineRef({ name: 'Paralyzed', href: '#paralyzed' })}</p>
    </div>`;
  },
};
