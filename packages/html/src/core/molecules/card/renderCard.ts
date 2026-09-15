import { cardClassNames, type CardProps as CardCoreProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Card.html';

export type CardProps = CardCoreProps & {
  /** Header HTML. Replaces `title` when both are set. */
  header?: string;
  /** Body HTML, appended after `body`. */
  content?: string;
  /** Footer HTML. */
  footer?: string;
  /** When set, the card renders as a link (pair with `interactive`). */
  href?: string;
};

export const renderCard = (args: CardProps): string => {
  const tag = args.href ? 'a' : 'div';
  const hrefAttr = args.href ? ` href="${escapeHtml(args.href)}"` : '';

  const headerInner = args.header ?? (args.title ? escapeHtml(args.title) : '');
  const header = headerInner ? `<div class="eevenkoto-card__header">${headerInner}</div>` : '';

  const bodyInner = `${args.body ? `<p>${escapeHtml(args.body)}</p>` : ''}${args.content ?? ''}`;
  const body = bodyInner ? `<div class="eevenkoto-card__body">${bodyInner}</div>` : '';

  const footer = args.footer ? `<div class="eevenkoto-card__footer">${args.footer}</div>` : '';

  return template
    .replaceAll('{{tag}}', tag)
    .replace('{{className}}', cardClassNames(args))
    .replace('{{hrefAttr}}', hrefAttr)
    .replace('{{content}}', `${header}${body}${footer}`);
};
