import {
  cardClassNames,
  cardHeaderActionsClassNames,
  type CardAccent,
  type CardLayout,
  type CardProps as CardCoreProps,
  type CardSurface,
  type CardTitleLevel,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Card.html';

export type CardProps = CardCoreProps & {
  /** Header HTML. Replaces `title` / `titleHtml` when set. */
  header?: string;
  /** Trailing actions HTML inside `<header>`. */
  headerActions?: string;
  /** Body HTML, appended after `body` / `bodyHtml`. */
  content?: string;
  /** Primary/secondary card actions HTML (`<div class="eevenkoto-card__actions">`). */
  actions?: string;
  /** Footer HTML. */
  footer?: string;
  /** When set, wraps the card contents in a link (pair with `interactive`). */
  href?: string;
};

export type { CardTitleLevel, CardSurface, CardAccent, CardLayout };

const titleTag = (level: CardTitleLevel | undefined): CardTitleLevel =>
  level === 3 ? 3 : 2;

const BLOCK_TAG_RE = /^\s*<(?:p|ul|ol|div|dl|blockquote|table|figure|section|h[1-6])\b/i;

export const renderCard = (args: CardProps): string => {
  const className = cardClassNames({
    surface: args.surface,
    accent: args.accent,
    current: args.current,
    layout: args.layout,
    elevated: args.elevated,
    interactive: args.interactive || Boolean(args.href),
  });

  const level = titleTag(args.titleLevel);
  const titleNode = args.header
    ? args.header
    : args.titleHtml
      ? `<h${level}>${args.titleHtml}</h${level}>`
      : args.title
        ? `<h${level}>${escapeHtml(args.title)}</h${level}>`
        : '';

  const headerActionsNode = args.headerActions
    ? `<div class="${cardHeaderActionsClassNames()}">${args.headerActions}</div>`
    : '';

  const header =
    titleNode || headerActionsNode
      ? args.headerActions
        ? `<header class="eevenkoto-card__header">${titleNode}${headerActionsNode}</header>`
        : `<header>${titleNode}</header>`
      : '';

  const richBody = args.bodyHtml
    ? BLOCK_TAG_RE.test(args.bodyHtml)
      ? args.bodyHtml
      : `<p>${args.bodyHtml}</p>`
    : args.body
      ? `<p>${escapeHtml(args.body)}</p>`
      : '';
  const body = `${richBody}${args.content ?? ''}`;
  const actions = args.actions ? `<div class="eevenkoto-card__actions">${args.actions}</div>` : '';
  const footer = args.footer ? `<footer>${args.footer}</footer>` : '';

  const inner =
    args.layout === 'split'
      ? `${header || body ? `<div class="eevenkoto-card__body">${header}${body}</div>` : ''}${actions}${footer}`
      : `${header}${body}${actions}${footer}`;

  const hrefAttr = args.href ? escapeHtml(args.href) : '';
  const content = hrefAttr ? `<a href="${hrefAttr}">${inner}</a>` : inner;

  return template.replace('{{className}}', className).replace('{{content}}', content);
};
