import {
  inputClassNames,
  inputFieldClassNames,
  type InputProps,
  type InputType,
} from '@eevenkoto/core';
import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { Icon } from './Icon';

export type { InputProps, InputType };

export type InputComponentProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'children'
> &
  InputProps & {
    /** Icon slot (leading). Defaults to search glyph when `search` is set. */
    icon?: ReactNode;
    /** Class applied to the host wrapper. */
    className?: string;
  };

export const Input = ({
  type,
  size,
  ariaLabel,
  describedBy,
  invalid,
  search,
  fullWidth,
  disabled,
  icon,
  className,
  ...rest
}: InputComponentProps): ReactElement => {
  const classes = [
    inputClassNames({ size, invalid, search, fullWidth }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedIcon =
    icon !== undefined ? icon : search ? <Icon name="search" size={size === 'sm' ? 'sm' : 'md'} /> : null;

  return (
    <span className={classes}>
      {resolvedIcon ? <span className="eevenkoto-input__icon">{resolvedIcon}</span> : null}
      <input
        className={inputFieldClassNames()}
        type={type ?? (search ? 'search' : 'text')}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={invalid ? true : undefined}
        disabled={disabled}
        {...rest}
      />
    </span>
  );
};
