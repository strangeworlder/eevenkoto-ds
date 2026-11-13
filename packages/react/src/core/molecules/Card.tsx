import {
  cardClassNames,
  cardHeaderActionsClassNames,
  type CardAccent,
  type CardLayout,
  type CardProps,
  type CardSurface,
  type CardTitleLevel,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { createElement } from 'react';

export type { CardProps, CardTitleLevel, CardSurface, CardAccent, CardLayout };

export type CardComponentProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> &
  CardProps & {
    /** Header content. Replaces `title` / `titleHtml` when set. */
    header?: ReactNode;
    /** Trailing actions rendered inside `<header>`. */
    headerActions?: ReactNode;
    /** Primary/secondary card actions (`<div class="eevenkoto-card__actions">`). */
    actions?: ReactNode;
    /** Footer content. */
    footer?: ReactNode;
    /** Body content, rendered after `body` / `bodyHtml`. */
    children?: ReactNode;
    /** When set, wraps the card contents in a link (pair with `interactive`). */
    href?: string;
  };

const BLOCK_TAG_RE = /^\s*<(?:p|ul|ol|div|dl|blockquote|table|figure|section|h[1-6])\b/i;

export const Card = ({
  surface,
  accent,
  current,
  layout,
  elevated,
  interactive,
  title,
  titleHtml,
  titleLevel,
  body,
  bodyHtml,
  header,
  headerActions,
  actions,
  footer,
  children,
  href,
  className,
  ...rest
}: CardComponentProps): ReactElement => {
  const classes = [
    cardClassNames({
      surface,
      accent,
      current,
      layout,
      elevated,
      interactive: interactive || Boolean(href),
    }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const level: CardTitleLevel = titleLevel === 3 ? 3 : 2;
  const hasHeader =
    header != null || Boolean(titleHtml) || Boolean(title) || headerActions != null;

  const headingEl = titleHtml
    ? createElement(`h${level}`, { dangerouslySetInnerHTML: { __html: titleHtml } })
    : title
      ? createElement(`h${level}`, null, title)
      : null;

  const headerEl = hasHeader ? (
    <header className={headerActions != null ? 'eevenkoto-card__header' : undefined}>
      {header ?? headingEl}
      {headerActions != null ? (
        <div className={cardHeaderActionsClassNames()}>{headerActions}</div>
      ) : null}
    </header>
  ) : null;

  const bodyCopyEl = bodyHtml ? (
    BLOCK_TAG_RE.test(bodyHtml) ? (
      <div className="eevenkoto-card__body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    ) : (
      <p dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    )
  ) : body ? (
    <p>{body}</p>
  ) : null;

  const actionsEl =
    actions != null ? <div className="eevenkoto-card__actions">{actions}</div> : null;
  const footerEl = footer != null ? <footer>{footer}</footer> : null;

  const sections =
    layout === 'split' ? (
      <>
        {headerEl || bodyCopyEl || children != null ? (
          <div className="eevenkoto-card__body">
            {headerEl}
            {bodyCopyEl}
            {children}
          </div>
        ) : null}
        {actionsEl}
        {footerEl}
      </>
    ) : (
      <>
        {headerEl}
        {bodyCopyEl}
        {children}
        {actionsEl}
        {footerEl}
      </>
    );

  return (
    <article className={classes} {...rest}>
      {href ? <a href={href}>{sections}</a> : sections}
    </article>
  );
};
