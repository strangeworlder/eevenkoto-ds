import { flowClassNames, type FlowDensity, type FlowProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type { FlowDensity, FlowProps };

export type FlowComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  FlowProps & {
    children?: ReactNode;
  };

export const Flow = ({ density, className, children, ...rest }: FlowComponentProps): ReactElement => {
  const classes = [flowClassNames({ density }), className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
