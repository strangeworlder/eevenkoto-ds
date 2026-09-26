import {
  cardClassNames,
  type CardProps as CardCoreProps,
  type CardTitleLevel,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Card.html';

export type CardProps = CardCoreProps & {
  /** Header HTML. Replaces `title` when both are set. */
  header?: string;
  /** Body HTML, appended after `body`. */
  content?: string;
  /** Footer HTML. */
  footer?: string;
  /** When set, wraps the card contents in a link (pair with `interactive`). */
  href?: string;
};

export type { CardTitleLevel };

const titleTag = (level: CardTitleLevel | undefined): CardTitleLevel =>
  level === 3 ? 3 : 2;

export const renderCard = (args: CardProps): string => {
  const className = cardClassNames({
    elevated: args.elevated,
    interactive: args.interactive || Boolean(args.href),
  });

  let header = '';
  if (args.header) {
    header = `<header>${args.header}</header>`;
  } else if (args.title) {
    const level = titleTag(args.titleLevel);
    header = `<header><h${level}>${escapeHtml(args.title)}</h${level}></header>`;
  }

  const body = `${args.body ? `<p>${escapeHtml(args.body)}</p>` : ''}${args.content ?? ''}`;
  const footer = args.footer ? `<footer>${args.footer}</footer>` : '';
  const inner = `${header}${body}${footer}`;
  const hrefAttr = args.href ? escapeHtml(args.href) : '';
  const content = hrefAttr ? `<a href="${hrefAttr}">${inner}</a>` : inner;

  return template.replace('{{className}}', className).replace('{{content}}', content);
};
