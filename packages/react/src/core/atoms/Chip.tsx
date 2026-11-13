import { chipClassNames, type ChipProps } from '@eevenkoto/core';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactElement } from 'react';
import { Icon } from './Icon';
import { Swatch } from './Swatch';

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
  icon,
  swatchColor,
  href,
  disabled,
  className,
  ...rest
}: ChipComponentProps): ReactElement => {
  const classes = [chipClassNames({ selected, size }), className].filter(Boolean).join(' ');
  const hasLeading = Boolean(swatchColor || icon);
  const content = hasLeading ? (
    <>
      {swatchColor ? <Swatch color={swatchColor} size="sm" /> : null}
      {icon ? <Icon name={icon} size="sm" /> : null}
      <span className="eevenkoto-chip__label">{label}</span>
    </>
  ) : (
    label
  );

  if (href) {
    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        aria-pressed={selected || undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
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
      {content}
    </button>
  );
};
