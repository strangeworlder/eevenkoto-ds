import { scrollClassNames, type ScrollProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { ScrollProps };

export type ScrollComponentProps = HTMLAttributes<HTMLDivElement> &
  ScrollProps & {
    children?: ReactNode;
  };

export const Scroll = ({
  axis,
  className,
  children,
  ...rest
}: ScrollComponentProps): ReactElement => {
  const classes = [scrollClassNames({ axis }), className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
