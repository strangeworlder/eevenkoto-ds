import {
  listItemClassNames,
  type IconName,
  type ListItemProps,
  type ListItemStatus,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from './Icon';

export type { ListItemProps, ListItemStatus };

export type ListItemComponentProps = Omit<HTMLAttributes<HTMLLIElement>, 'children'> &
  ListItemProps & {
    children?: ReactNode;
  };

const statusIconName = (status: ListItemStatus): IconName => {
  if (status === 'accent') return 'star';
  if (status === 'excluded') return 'close';
  return 'check';
};

export const ListItem = ({
  text,
  html,
  status,
  children,
  className,
  ...rest
}: ListItemComponentProps): ReactElement => {
  if (!status) {
    if (children !== undefined) {
      return (
        <li className={className} {...rest}>
          {children}
        </li>
      );
    }
    if (html !== undefined) {
      return <li className={className} dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
    }
    return (
      <li className={className} {...rest}>
        {text}
      </li>
    );
  }

  const classes = [listItemClassNames(status), className].filter(Boolean).join(' ');

  return (
    <li className={classes} {...rest}>
      <Icon name={statusIconName(status)} size="sm" className="eevenkoto-list__icon" />
      {status === 'excluded' ? (
        <span className="eevenkoto-visually-hidden">Excluded: </span>
      ) : null}
      {children !== undefined ? (
        <span className="eevenkoto-list__item-text">{children}</span>
      ) : html !== undefined ? (
        <span className="eevenkoto-list__item-text" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <span className="eevenkoto-list__item-text">{text}</span>
      )}
    </li>
  );
};
