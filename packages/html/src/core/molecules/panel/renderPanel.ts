import {
  panelBodyClassNames,
  panelClassNames,
  panelHeaderActionsClassNames,
  panelHeaderClassNames,
  panelHeaderLeadClassNames,
  panelTitleClassNames,
  type PanelProps as CorePanelProps,
  type PanelTitleLevel,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Panel.html';

export type PanelProps = CorePanelProps & {
  /** Trusted HTML before the title inside `.eevenkoto-panel__header` (e.g. a `Swatch`). */
  headerLead?: string;
  /** Trusted HTML trailing actions inside `.eevenkoto-panel__header`. */
  headerActions?: string;
  /** Trusted HTML content appended inside `.eevenkoto-panel__body`. */
  content?: string;
};

const BLOCK_TAG_RE = /^\s*<(?:p|ul|ol|div|dl|blockquote|table|figure|section|fieldset|h[1-6])\b/i;

export const renderPanel = (args: PanelProps = {}): string => {
  const tag = args.label ? 'section' : 'div';
  const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';
  const roleAttr = args.label ? ` role="region" aria-label="${escapeHtml(args.label)}"` : '';
  const hiddenAttr = args.hidden ? ' hidden' : '';

  const level: PanelTitleLevel = args.titleLevel === 2 ? 2 : args.titleLevel === 4 ? 4 : 3;
  const leadHtml = args.headerLead
    ? `<span class="${panelHeaderLeadClassNames()}">${args.headerLead}</span>`
    : '';
  const titleHtml = args.title
    ? `<h${level} class="${panelTitleClassNames()}">${escapeHtml(args.title)}</h${level}>`
    : '';
  const actionsHtml = args.headerActions
    ? `<div class="${panelHeaderActionsClassNames()}">${args.headerActions}</div>`
    : '';
  const headerHtml =
    leadHtml || titleHtml || actionsHtml
      ? `<div class="${panelHeaderClassNames()}">${leadHtml}${titleHtml}${actionsHtml}</div>`
      : '';

  const richBody = args.bodyHtml
    ? BLOCK_TAG_RE.test(args.bodyHtml)
      ? args.bodyHtml
      : `<p>${args.bodyHtml}</p>`
    : args.body
      ? `<p>${escapeHtml(args.body)}</p>`
      : '';
  const innerBody = `${richBody}${args.content ?? ''}`;
  const bodyHtml = innerBody
    ? `<div class="${panelBodyClassNames()}">${innerBody}</div>`
    : '';

  return template
    .replaceAll('{{tag}}', tag)
    .replace('{{idAttr}}', idAttr)
    .replace('{{roleAttr}}', roleAttr)
    .replace('{{hiddenAttr}}', hiddenAttr)
    .replace('{{className}}', panelClassNames(args))
    .replace('{{header}}', () => headerHtml)
    .replace('{{body}}', () => bodyHtml);
};
