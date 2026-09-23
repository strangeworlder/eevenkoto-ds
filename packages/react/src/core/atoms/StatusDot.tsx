import { statusDotClassNames, type StatusDotProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { StatusDotProps };

export type StatusDotComponentProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> &
  StatusDotProps;

export const StatusDot = ({
  intent,
  label,
  className,
  ...rest
}: StatusDotComponentProps): ReactElement => {
  const classes = [statusDotClassNames({ intent }), className].filter(Boolean).join(' ');

  return <span className={classes} role="img" aria-label={label} {...rest} />;
};
