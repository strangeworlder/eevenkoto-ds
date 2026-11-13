import { contentGateClassNames, headingClassNames, type ContentGateProps } from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import { renderBadge } from '../../../core/atoms/badge/renderBadge';
import { renderIcon } from '../../../core/atoms/icon/renderIcon';
import template from './ContentGate.html';

export type ContentGateRenderProps = ContentGateProps & {
  /** Trusted action markup (buttons / link buttons). */
  actions?: string;
  /** Trusted developer-only footer markup (e.g. tier switcher). */
  footer?: string;
};

export type { ContentGateProps };

export const renderContentGate = (args: ContentGateRenderProps): string => {
  const level = args.titleLevel ?? 2;
  const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';
  const statusRow = `<div class="eevenkoto-content-gate__status-row">${renderBadge({
    label: args.readinessLabel,
    intent: args.readinessIntent,
    dot: true,
    shape: 'pill',
  })}<span class="eevenkoto-content-gate__lock">${renderIcon({
    name: 'lock',
    size: 'md',
    label: args.lockLabel,
  })}</span></div>`;
  const title = `<h${level} class="${headingClassNames({ level })} eevenkoto-content-gate__title">${escapeHtml(args.title)}</h${level}>`;
  const descInner =
    args.descriptionHtml !== undefined
      ? sanitizeInlineHtml(args.descriptionHtml)
      : args.description
        ? `<p>${escapeHtml(args.description)}</p>`
        : '';
  const description = descInner
    ? `<div class="eevenkoto-content-gate__description eevenkoto-prose">${descInner}</div>`
    : '';
  const prefix = (value?: string): string => (value ? `${escapeHtml(value)} ` : '');
  const comparison = `<p class="eevenkoto-content-gate__comparison"><span>${prefix(args.currentTierPrefix)}<strong>${escapeHtml(args.currentTierLabel)}</strong></span><span>${prefix(args.requiredTierPrefix)}<strong>${escapeHtml(args.requiredTierLabel)}</strong></span></p>`;
  const actions = args.actions ? `<div class="eevenkoto-content-gate__actions">${args.actions}</div>` : '';
  const feedback = `<p class="eevenkoto-content-gate__feedback" role="status" aria-live="polite"${
    args.statusMessage ? '' : ' hidden'
  }>${escapeHtml(args.statusMessage ?? '')}</p>`;
  const footer = args.footer ? `<footer class="eevenkoto-content-gate__footer">${args.footer}</footer>` : '';
  return template
    .replace('{{idAttr}}', idAttr)
    .replace('{{className}}', contentGateClassNames())
    .replace('{{content}}', () => `${statusRow}${title}${description}${comparison}${actions}${feedback}${footer}`);
};
