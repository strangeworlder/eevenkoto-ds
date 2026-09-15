import {
  buttonClassNames,
  resolveButtonIconPosition,
  type ButtonIconName,
  type ButtonProps,
} from '@eevenkoto/core';
import type { ButtonHTMLAttributes, ReactElement } from 'react';
import { Icon } from './Icon';

export type { ButtonProps, ButtonIconName };

export type ButtonComponentProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'disabled'
> &
  ButtonProps;

export const Button = ({
  variant,
  label,
  size,
  disabled,
  icon,
  iconPosition,
  className,
  type = 'button',
  ...rest
}: ButtonComponentProps): ReactElement => {
  const resolvedPosition = resolveButtonIconPosition({ icon, iconPosition });
  const classes = [buttonClassNames({ variant, size, icon, iconPosition }), className]
    .filter(Boolean)
    .join(' ');

  let content: ReactElement | string = label;
  let ariaLabel: string | undefined;

  if (icon && resolvedPosition) {
    const iconEl = <Icon name={icon} />;
    if (resolvedPosition === 'left') {
      content = (
        <>
          {iconEl}
          {label}
        </>
      );
    } else if (resolvedPosition === 'right') {
      content = (
        <>
          {label}
          {iconEl}
        </>
      );
    } else {
      content = iconEl;
      ariaLabel = label;
    }
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {content}
    </button>
  );
};
