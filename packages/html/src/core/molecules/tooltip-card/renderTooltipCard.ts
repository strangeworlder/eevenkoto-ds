import {
  tooltipCardBodyClassNames,
  tooltipCardClassNames,
  type TooltipCardProps as TooltipCardCoreProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './TooltipCard.html';

export type TooltipCardProps = TooltipCardCoreProps & {
  /** Header HTML. Replaces `title` when both are set. */
  header?: string;
  /** Body HTML, appended after `body`. */
  content?: string;
  /** Footer HTML. */
  footer?: string;
};

export const renderTooltipCard = (args: TooltipCardProps): string => {
  const headerInner = args.header ?? (args.title ? escapeHtml(args.title) : '');
  const header = headerInner
    ? `<div class="eevenkoto-tooltip-card__header">${headerInner}</div>`
    : '';

  const bodyInner = `${args.body ? `<p>${escapeHtml(args.body)}</p>` : ''}${args.content ?? ''}`;
  const body = bodyInner
    ? `<div class="${tooltipCardBodyClassNames(args.scrollBody)}">${bodyInner}</div>`
    : '';

  const footer = args.footer
    ? `<div class="eevenkoto-tooltip-card__footer">${args.footer}</div>`
    : '';

  return template
    .replace('{{className}}', tooltipCardClassNames())
    .replace('{{content}}', `${header}${body}${footer}`);
};
