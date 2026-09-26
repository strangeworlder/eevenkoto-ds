import {
  tooltipCardBodyClassNames,
  tooltipCardClassNames,
  type TooltipCardProps,
  type TooltipCardTitleLevel,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { createElement } from 'react';

export type { TooltipCardProps, TooltipCardTitleLevel };

export type TooltipCardComponentProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'title' | 'children'
> &
  TooltipCardProps & {
    /** Header content. Replaces `title` when both are set. */
    header?: ReactNode;
    /** Footer content. */
    footer?: ReactNode;
    /** Body content, rendered after `body`. */
    children?: ReactNode;
  };

export const TooltipCard = ({
  title,
  titleLevel,
  body,
  header,
  footer,
  children,
  className,
  ...rest
}: TooltipCardComponentProps): ReactElement => {
  const classes = [tooltipCardClassNames(), className].filter(Boolean).join(' ');
  const level: TooltipCardTitleLevel = titleLevel === 3 ? 3 : 2;
  const hasHeader = header != null || Boolean(title);
  const hasBody = Boolean(body) || Boolean(children);

  return (
    <div className={classes} {...rest}>
      {hasHeader ? (
        <header>{header ?? createElement(`h${level}`, null, title)}</header>
      ) : null}
      {hasBody ? (
        <div className={tooltipCardBodyClassNames()}>
          {body ? <p>{body}</p> : null}
          {children}
        </div>
      ) : null}
      {footer ? <footer>{footer}</footer> : null}
    </div>
  );
};
