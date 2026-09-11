import type { ListItemProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';

export type { ListItemProps };

export type ListItemComponentProps = Omit<HTMLAttributes<HTMLLIElement>, 'children'> &
  ListItemProps;

export const ListItem = ({
  text,
  className,
  ...rest
}: ListItemComponentProps): ReactElement => {
  return (
    <li className={className} {...rest}>
      {text}
    </li>
  );
};
