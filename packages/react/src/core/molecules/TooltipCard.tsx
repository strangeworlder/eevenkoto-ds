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
  bodyHtml,
  flush,
  header,
  footer,
  children,
  className,
  ...rest
}: TooltipCardComponentProps): ReactElement => {
  const classes = [tooltipCardClassNames({ flush }), className].filter(Boolean).join(' ');
  const level: TooltipCardTitleLevel = titleLevel === 3 ? 3 : 2;
  const hasHeader = header != null || Boolean(title);
  const hasChildren = children !== undefined && children !== null && children !== false;

  return (
    <div className={classes} {...rest}>
      {hasHeader ? (
        <header>{header ?? createElement(`h${level}`, null, title)}</header>
      ) : null}
      {hasChildren ? (
        <div className={tooltipCardBodyClassNames()} tabIndex={0}>
          {children}
        </div>
      ) : bodyHtml ? (
        <div
          className={tooltipCardBodyClassNames()}
          tabIndex={0}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      ) : body ? (
        <div className={tooltipCardBodyClassNames()} tabIndex={0}>
          <p>{body}</p>
        </div>
      ) : null}
      {footer ? <footer>{footer}</footer> : null}
    </div>
  );
};
