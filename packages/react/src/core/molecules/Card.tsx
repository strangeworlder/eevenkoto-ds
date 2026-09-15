import { cardClassNames, type CardProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { CardProps };

export type CardComponentProps = Omit<HTMLAttributes<HTMLElement>, 'title' | 'children'> &
  CardProps & {
    /** Header content. Replaces `title` when both are set. */
    header?: ReactNode;
    /** Footer content. */
    footer?: ReactNode;
    /** Body content, rendered after `body`. */
    children?: ReactNode;
    /** When set, the card renders as a link (pair with `interactive`). */
    href?: string;
  };

export const Card = ({
  elevated,
  interactive,
  title,
  body,
  header,
  footer,
  children,
  href,
  className,
  ...rest
}: CardComponentProps): ReactElement => {
  const classes = [cardClassNames({ elevated, interactive }), className]
    .filter(Boolean)
    .join(' ');

  const headerContent = header ?? title;
  const hasBody = Boolean(body) || Boolean(children);

  const content = (
    <>
      {headerContent ? <div className="eevenkoto-card__header">{headerContent}</div> : null}
      {hasBody ? (
        <div className="eevenkoto-card__body">
          {body ? <p>{body}</p> : null}
          {children}
        </div>
      ) : null}
      {footer ? <div className="eevenkoto-card__footer">{footer}</div> : null}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <div className={classes} {...rest}>
      {content}
    </div>
  );
};
