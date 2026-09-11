import { frameClassNames } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type FrameComponentProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export const Frame = ({ className, children, ...rest }: FrameComponentProps): ReactElement => {
  const classes = [frameClassNames(), className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
