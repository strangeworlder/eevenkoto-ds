import { listClassNames, type ListItemProps, type ListProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { ListItem } from '../atoms/ListItem';

export type { ListItemProps, ListProps };

export type ListComponentProps = Omit<
  HTMLAttributes<HTMLUListElement | HTMLOListElement>,
  'children'
> &
  ListProps;

export const List = ({
  items,
  variant,
  size,
  tone,
  className,
  ...rest
}: ListComponentProps): ReactElement => {
  const classes = [listClassNames({ variant, size, tone }), className].filter(Boolean).join(' ');
  const Tag = (variant ?? 'unordered') === 'ordered' ? 'ol' : 'ul';

  return (
    <Tag className={classes} {...rest}>
      {items.map((item) => (
        <ListItem key={item.text} text={item.text} />
      ))}
    </Tag>
  );
};
