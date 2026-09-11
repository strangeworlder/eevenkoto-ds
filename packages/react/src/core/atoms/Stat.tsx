import { statClassNames, type StatProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { StatProps };

export type StatComponentProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & StatProps;

export const Stat = ({
  value,
  shape,
  size,
  emphasis,
  className,
  ...rest
}: StatComponentProps): ReactElement => {
  const classes = [statClassNames({ shape, size, emphasis }), className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      {value}
    </span>
  );
};
