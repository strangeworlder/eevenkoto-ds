import { avatarClassNames, type AvatarProps } from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { Icon } from './Icon';

export type { AvatarProps };

export type AvatarComponentProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> &
  AvatarProps;

export const Avatar = ({
  name,
  src,
  size,
  className,
  ...rest
}: AvatarComponentProps): ReactElement => {
  const classes = [avatarClassNames({ size }), className].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      role={src ? undefined : 'img'}
      aria-label={src ? undefined : name}
      {...rest}
    >
      {src ? (
        <img className="eevenkoto-avatar__image" src={src} alt={name} />
      ) : (
        <span className="eevenkoto-avatar__placeholder" aria-hidden="true">
          <Icon name="user" size={size ?? 'md'} />
        </span>
      )}
    </span>
  );
};
