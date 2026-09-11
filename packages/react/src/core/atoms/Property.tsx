import { propertyClassNames, type PropertyProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { PropertyProps };

export type PropertyComponentProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  PropertyProps;

export const Property = ({
  label,
  value,
  className,
  ...rest
}: PropertyComponentProps): ReactElement => {
  const classes = [propertyClassNames(), className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      <dt className="eevenkoto-property__label">{label}</dt>
      <dd className="eevenkoto-property__value">{value}</dd>
    </div>
  );
};
