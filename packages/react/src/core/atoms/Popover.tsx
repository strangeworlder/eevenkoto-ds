import { popoverClassNames, type PopoverProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { PopoverProps };

export type PopoverComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  PopoverProps & {
    children?: ReactNode;
    /** ARIA role. Apps own focus management for `dialog`. */
    role?: 'dialog' | 'tooltip' | 'note' | 'group';
  };

export const Popover = ({
  placement,
  arrow,
  fixed,
  open,
  label,
  children,
  className,
  ...rest
}: PopoverComponentProps): ReactElement => {
  const classes = [popoverClassNames({ placement, fixed, open }), className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      aria-label={label}
      data-open={fixed && open ? 'true' : undefined}
      {...rest}
    >
      {children}
      {arrow ? <span className="eevenkoto-popover__arrow" /> : null}
    </div>
  );
};
