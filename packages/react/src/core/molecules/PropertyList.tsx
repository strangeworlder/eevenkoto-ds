import { propertyListClassNames, type PropertyItem, type PropertyListProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { Property } from '../atoms/Property';

export type { PropertyItem, PropertyListProps };

export type PropertyListComponentProps = Omit<HTMLAttributes<HTMLDListElement>, 'children'> &
  PropertyListProps;

export const PropertyList = ({
  items,
  className,
  ...rest
}: PropertyListComponentProps): ReactElement => {
  const classes = [propertyListClassNames(), className].filter(Boolean).join(' ');
  return (
    <dl className={classes} {...rest}>
      {items.map((item) => (
        <Property key={`${item.label}-${item.value}`} label={item.label} value={item.value} />
      ))}
    </dl>
  );
};
