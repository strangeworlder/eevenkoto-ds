import { badgeClassNames, type BadgeProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { BadgeProps };

export type BadgeComponentProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & BadgeProps;

export const Badge = ({
  label,
  variant,
  intent,
  size,
  dot,
  className,
  ...rest
}: BadgeComponentProps): ReactElement => {
  const classes = [badgeClassNames({ variant, intent, size }), className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {dot ? <span className="eevenkoto-badge__dot" aria-hidden="true" /> : null}
      <span className="eevenkoto-badge__label">{label}</span>
    </span>
  );
};
