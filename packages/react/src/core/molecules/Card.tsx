import { cardClassNames, type CardProps, type CardTitleLevel } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { createElement } from 'react';

export type { CardProps, CardTitleLevel };

export type CardComponentProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> &
  CardProps & {
    /** Header content. Replaces `title` when both are set. */
    header?: ReactNode;
    /** Footer content. */
    footer?: ReactNode;
    /** Body content, rendered after `body`. */
    children?: ReactNode;
    /** When set, wraps the card contents in a link (pair with `interactive`). */
    href?: string;
  };

export const Card = ({
  elevated,
  interactive,
  title,
  titleLevel,
  body,
  header,
  footer,
  children,
  href,
  className,
  ...rest
}: CardComponentProps): ReactElement => {
  const classes = [
    cardClassNames({ elevated, interactive: interactive || Boolean(href) }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const level: CardTitleLevel = titleLevel === 3 ? 3 : 2;
  const hasHeader = header != null || Boolean(title);

  const sections = (
    <>
      {hasHeader ? (
        <header>{header ?? createElement(`h${level}`, null, title)}</header>
      ) : null}
      {body ? <p>{body}</p> : null}
      {children}
      {footer ? <footer>{footer}</footer> : null}
    </>
  );

  return (
    <article className={classes} {...rest}>
      {href ? <a href={href}>{sections}</a> : sections}
    </article>
  );
};
