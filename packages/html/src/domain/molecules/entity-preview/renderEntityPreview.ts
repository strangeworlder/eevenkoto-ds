import { entityPreviewClassNames, tooltipCardBodyClassNames, type EntityPreviewProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderBadge } from '../../../core/atoms/badge/renderBadge';
import { renderLinkButton } from '../../../core/atoms/link-button/renderLinkButton';
import template from './EntityPreview.html';

export type EntityPreviewRenderProps = EntityPreviewProps & {
  /** Trusted body HTML appended after `body` / `bodyHtml` (e.g. a rendered Statblock). */
  content?: string;
};

export type { EntityPreviewProps };

export const renderEntityPreview = (args: EntityPreviewRenderProps): string => {
  const level = args.titleLevel === 3 ? 3 : 2;
  const header = args.title
    ? `<header><h${level}>${escapeHtml(args.title)}</h${level}></header>`
    : '';
  const meta = args.badge
    ? `<div class="eevenkoto-entity-preview__meta">${renderBadge(args.badge)}</div>`
    : '';
  const primary =
    args.bodyHtml !== undefined
      ? `<div class="eevenkoto-entity-preview__html">${args.bodyHtml}</div>`
      : args.body
        ? `<p>${escapeHtml(args.body)}</p>`
        : '';
  const truncated = args.truncatedLabel
    ? `<p class="eevenkoto-entity-preview__truncated">${escapeHtml(args.truncatedLabel)}</p>`
    : '';
  const inner = `${meta}${primary}${args.content ?? ''}${truncated}`;
  const body = inner
    ? `<div class="${tooltipCardBodyClassNames()}" tabindex="0">${inner}</div>`
    : '';
  const footer = args.footerLink ? `<footer>${renderLinkButton(args.footerLink)}</footer>` : '';
  const kindAttr = args.kind ? ` data-entity-kind="${escapeHtml(args.kind)}"` : '';
  return template
    .replace('{{className}}', entityPreviewClassNames({ flush: args.flush }))
    .replace('{{kindAttr}}', kindAttr)
    .replace('{{content}}', () => `${header}${body}${footer}`);
};
