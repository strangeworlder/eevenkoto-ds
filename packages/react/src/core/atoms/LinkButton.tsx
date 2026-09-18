import {
  linkButtonClassNames,
  resolveLinkButtonIconPosition,
  resolveLinkButtonRel,
  type ButtonIconName,
  type LinkButtonProps,
} from '@eevenkoto/core';
import type { AnchorHTMLAttributes, ReactElement } from 'react';
import { Icon } from './Icon';

export type { LinkButtonProps, ButtonIconName };

export type LinkButtonComponentProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'href'
> &
  LinkButtonProps;

export const LinkButton = ({
  href,
  variant,
  label,
  size,
  disabled,
  icon,
  iconPosition,
  target,
  rel,
  className,
  ...rest
}: LinkButtonComponentProps): ReactElement => {
  const resolvedPosition = resolveLinkButtonIconPosition({ icon, iconPosition });
  const resolvedRel = resolveLinkButtonRel({ target, rel });
  const classes = [linkButtonClassNames({ variant, size, icon, iconPosition }), className]
    .filter(Boolean)
    .join(' ');

  let content: ReactElement | string = label;

  if (icon && resolvedPosition) {
    const iconEl = <Icon name={icon} />;
    if (resolvedPosition === 'left') {
      content = (
        <>
          {iconEl}
          {label}
        </>
      );
    } else {
      content = (
        <>
          {label}
          {iconEl}
        </>
      );
    }
  }

  return (
    <a
      {...rest}
      className={classes}
      href={disabled ? undefined : href}
      target={disabled ? undefined : target}
      rel={disabled ? undefined : resolvedRel}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : rest.tabIndex}
    >
      {content}
    </a>
  );
};
