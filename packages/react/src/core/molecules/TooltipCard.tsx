import {
  tooltipCardBodyClassNames,
  tooltipCardClassNames,
  type TooltipCardProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { TooltipCardProps };

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
  body,
  scrollBody,
  header,
  footer,
  children,
  className,
  ...rest
}: TooltipCardComponentProps): ReactElement => {
  const classes = [tooltipCardClassNames(), className].filter(Boolean).join(' ');
  const headerContent = header ?? title;
  const hasBody = Boolean(body) || Boolean(children);

  return (
    <div className={classes} {...rest}>
      {headerContent ? (
        <div className="eevenkoto-tooltip-card__header">{headerContent}</div>
      ) : null}
      {hasBody ? (
        <div className={tooltipCardBodyClassNames(scrollBody)}>
          {body ? <p>{body}</p> : null}
          {children}
        </div>
      ) : null}
      {footer ? <div className="eevenkoto-tooltip-card__footer">{footer}</div> : null}
    </div>
  );
};
