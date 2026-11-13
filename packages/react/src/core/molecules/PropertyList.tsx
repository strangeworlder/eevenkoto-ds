import {
  propertyListClassNames,
  type PropertyItem,
  type PropertyListColumns,
  type PropertyListLayout,
  type PropertyListProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { Property, type PropertyItemNode } from '../atoms/Property';

export type {
  PropertyItem,
  PropertyItemNode,
  PropertyListColumns,
  PropertyListLayout,
  PropertyListProps,
};

export type PropertyListComponentProps = Omit<HTMLAttributes<HTMLDListElement>, 'children'> &
  Omit<PropertyListProps, 'items'> & { items: PropertyItemNode[] | PropertyItem[] };

export const PropertyList = ({
  items,
  layout,
  columns,
  className,
  ...rest
}: PropertyListComponentProps): ReactElement => {
  const classes = [propertyListClassNames({ layout, columns }), className]
    .filter(Boolean)
    .join(' ');
  return (
    <dl className={classes} {...rest}>
      {items.map((item, index) => (
        <Property
          key={`${item.label}-${index}`}
          label={item.label}
          value={item.value}
          valueHtml={item.valueHtml}
          meta={item.meta}
        />
      ))}
    </dl>
  );
};
