import { chipClassNames, type ChipProps } from '@eevenkoto/core';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactElement } from 'react';

export type { ChipProps };

type ChipButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled'> &
  ChipProps;

type ChipLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'href'> &
  ChipProps;

export type ChipComponentProps = ChipButtonProps | ChipLinkProps;

export const Chip = ({
  label,
  selected,
  size,
  href,
  disabled,
  className,
  ...rest
}: ChipComponentProps): ReactElement => {
  const classes = [chipClassNames({ selected, size }), className].filter(Boolean).join(' ');

  if (href) {
    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        aria-pressed={selected || undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      aria-pressed={selected || undefined}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {label}
    </button>
  );
};
