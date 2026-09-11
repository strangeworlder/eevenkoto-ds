import { proseClassNames } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

export type ProseComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode;
};

export const Prose = ({ className, children, ...rest }: ProseComponentProps): ReactElement => {
  const classes = [proseClassNames(), className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
