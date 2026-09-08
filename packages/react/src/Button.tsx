import {
  buttonClassNames,
  buttonIconPaths,
  resolveButtonIconPosition,
  type ButtonIconName,
  type ButtonProps,
} from '@eevenkoto/core';
import type { ButtonHTMLAttributes, ReactElement } from 'react';

export type { ButtonProps, ButtonIconName };

export type ButtonComponentProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'disabled'
> &
  ButtonProps;

const ButtonIcon = ({ name }: { name: ButtonIconName }): ReactElement => (
  <svg
    className="eevenkoto-button__icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d={buttonIconPaths[name]} />
  </svg>
);

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
    const iconEl = <ButtonIcon name={icon} />;
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
