import {
  cardClassNames,
  cardEyebrowClassNames,
  cardHeaderActionsClassNames,
  cardHeaderGroupClassNames,
  type CardLayout,
  type CardProps as CardCoreProps,
  type CardSurface,
  type CardTitleLevel,
  type CardTitleSize,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Card.html';

export type CardAttributes = Record<string, string | boolean | undefined>;

export type CardProps = CardCoreProps & {
  /** Optional DOM element `id` on `<article>`. */
  id?: string;
  /** Additional CSS class names on `<article>`. */
  className?: string;
  /** Optional HTML attributes forwarded to `<article>`. */
  attributes?: CardAttributes;
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

export type { CardTitleLevel, CardTitleSize, CardSurface, CardLayout };

const titleTag = (level: CardTitleLevel | undefined): CardTitleLevel =>
  level === 3 ? 3 : 2;

const BLOCK_TAG_RE = /^\s*<(?:p|ul|ol|div|dl|blockquote|table|figure|section|h[1-6])\b/i;

export const renderCard = (args: CardProps): string => {
  const className = [
    cardClassNames({
      surface: args.surface,
      featured: args.featured,
      current: args.current,
      layout: args.layout,
      elevated: args.elevated,
      interactive: args.interactive || Boolean(args.href),
      titleSize: args.titleSize,
    }),
    args.className,
  ]
    .filter(Boolean)
    .join(' ');

  const attrs = [
    args.id ? ` id="${escapeHtml(args.id)}"` : '',
    ...Object.entries(args.attributes ?? {}).map(([key, value]) =>
      value === undefined || value === false
        ? ''
        : value === true
          ? ` ${escapeHtml(key)}`
          : ` ${escapeHtml(key)}="${escapeHtml(String(value))}"`,
    ),
  ].join('');

  const level = titleTag(args.titleLevel);
  const headingNode = args.titleHtml
    ? `<h${level}>${args.titleHtml}</h${level}>`
    : args.title
      ? `<h${level}>${escapeHtml(args.title)}</h${level}>`
      : '';
  const eyebrowNode = args.eyebrow
    ? `<p class="${cardEyebrowClassNames()}">${escapeHtml(args.eyebrow)}</p>`
    : '';
  const titleNode = args.header
    ? args.header
    : eyebrowNode && headingNode
      ? `<div class="${cardHeaderGroupClassNames()}">${eyebrowNode}${headingNode}</div>`
      : `${eyebrowNode}${headingNode}`;

  const headerActionsNode = args.headerActions
    ? `<div class="${cardHeaderActionsClassNames()}">${args.headerActions}</div>`
    : '';

  const header =
    titleNode || headerActionsNode
      ? args.headerActions || args.eyebrow
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

  return template
    .replace('{{attrs}}', attrs)
    .replace('{{className}}', className)
    .replace('{{content}}', () => content);
};
