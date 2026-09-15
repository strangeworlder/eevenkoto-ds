import {
  inputClassNames,
  inputFieldClassNames,
  type InputProps,
  type InputType,
} from '@eevenkoto/core';
import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';

export type { InputProps, InputType };

export type InputComponentProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type' | 'children'
> &
  InputProps & {
    /** Icon slot (leading). Pair with `search`. */
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
  disabled,
  icon,
  className,
  ...rest
}: InputComponentProps): ReactElement => {
  const classes = [inputClassNames({ size, invalid, search }), className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {icon ? <span className="eevenkoto-input__icon">{icon}</span> : null}
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
