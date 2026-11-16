import type { Meta, StoryObj } from '@storybook/html-vite';
import { expect } from 'storybook/test';
import '@eevenkoto/css/icon.css';
import '@eevenkoto/css/flow.css';
import '@eevenkoto/css/prose.css';
import '@eevenkoto/css/notice.css';
import { ICON_NAMES, flowClassNames, proseClassNames } from '@eevenkoto/core';
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
    bodyHtml: {
      control: 'text',
      description: 'Trusted pre-rendered HTML for __body (takes precedence over body).',
    },
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
    icon: {
      control: 'select',
      options: [undefined, false, ...ICON_NAMES],
      description: 'Leading Icon override, or false to omit (defaults from intent).',
    },
    role: {
      control: 'select',
      options: [undefined, 'status', 'alert', 'note', 'region'],
      table: { defaultValue: { summary: "'alert' (caution/critical) | 'status'" } },
    },
    statusText: {
      control: 'text',
      description: 'Optional polite live-region feedback line inside the notice.',
    },
    actions: {
      control: 'text',
      description: 'Optional actions HTML rendered in `.eevenkoto-notice__actions`.',
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

export const StatusFeedback: Story = {
  name: 'With status feedback',
  args: {
    title: 'Verify your sign-in link',
    body: 'We sent a one-time magic link to your inbox.',
    statusText: 'Verification link resent just now.',
    intent: 'info',
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

export const InProseWithList: Story = {
  name: 'In Prose + Flow after list',
  render: () => {
    const readingClasses = [proseClassNames(), flowClassNames()].join(' ');
    const noticeHtml = renderNotice({
      intent: 'admin',
      variant: 'subtle',
      icon: 'star',
      title: 'Kehittäjän lataukset (kaikki valmiustasot)',
      bodyHtml: [
        '<p>Nämä tiedostot sisältävät tekstin oikeellisuuden varmistamista varten kaikki valmiusasteet (vedos, työstössä, luonnos ja virheellinen):</p>',
        '<ul>',
        '<li><a href="#srd-full">SRD – Kehittäjän täysi versio (kaikki valmiustasot)</a></li>',
        '<li><a href="#srd-lite">SRD – Kehittäjän kevyt versio</a></li>',
        '<li><a href="#text-full">Teksti – Kehittäjän täysi versio</a></li>',
        '<li><a href="#text-lite">Teksti – Kehittäjän kevyt versio</a></li>',
        '</ul>',
      ].join(''),
    });

    return `
      <div class="${readingClasses}" style="max-width: 52rem;">
        <h1>Liite X: Koko teksti</h1>
        <p>Eevenkoto-pelisäännöt on saatavilla koottuina yksittäisiksi markdown-tiedostoiksi ilman sisäisiä viittaustageja. Koontiversiot sopivat ulkoiseen käyttöön — hakuun, tulostukseen tai tekoälykontekstiksi.</p>
        <ul>
          <li><a href="#text-narrative">Teksti — narratiivinen versio</a> (2–3 lausetta per konsepti, maailman taustaa ja tunnelmaa)</li>
          <li><a href="#text-light">Teksti — kevyt versio (ei loitsuja/vastustajia)</a></li>
          <li><a href="#srd-concise">SRD — tiivis versio</a> (pelkät mekaniikat, 1 lause per konsepti)</li>
          <li><a href="#srd-light">SRD — kevyt versio (ei loitsuja/vastustajia)</a></li>
        </ul>
        ${noticeHtml}
      </div>
    `;
  },
  play: async ({ canvasElement }) => {
    const prevList = canvasElement.querySelector<HTMLElement>('.eevenkoto-prose > ul');
    const notice = canvasElement.querySelector<HTMLElement>('.eevenkoto-notice');
    const title = notice?.querySelector<HTMLElement>('.eevenkoto-notice__title');
    const bodyP = notice?.querySelector<HTMLElement>('.eevenkoto-notice__body > p');
    const bodyUl = notice?.querySelector<HTMLElement>('.eevenkoto-notice__body > ul');
    const items = notice?.querySelectorAll<HTMLElement>('.eevenkoto-notice__body li');

    expect(prevList).not.toBeNull();
    expect(notice).not.toBeNull();
    expect(title).not.toBeNull();
    expect(bodyP).not.toBeNull();
    expect(bodyUl).not.toBeNull();
    expect(items?.length).toBeGreaterThanOrEqual(2);

    const outerGap = notice!.getBoundingClientRect().top - prevList!.getBoundingClientRect().bottom;
    const titleToBodyGap = bodyP!.getBoundingClientRect().top - title!.getBoundingClientRect().bottom;
    const bodyToListGap = bodyUl!.getBoundingClientRect().top - bodyP!.getBoundingClientRect().bottom;
    const listItemGap =
      items![1].getBoundingClientRect().top - items![0].getBoundingClientRect().bottom;

    expect(outerGap).toBeGreaterThanOrEqual(20);
    expect(titleToBodyGap).toBeGreaterThanOrEqual(6);
    expect(bodyToListGap).toBeGreaterThanOrEqual(10);
    expect(listItemGap).toBeGreaterThanOrEqual(6);
  },
};
