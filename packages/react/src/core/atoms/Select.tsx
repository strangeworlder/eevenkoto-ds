import {
  selectClassNames,
  selectFieldClassNames,
  selectIconClassNames,
  type SelectProps,
  type SelectOption,
  type SelectOptionGroup,
} from '@eevenkoto/core';
import type { ReactElement, ReactNode, SelectHTMLAttributes } from 'react';
import { Icon } from './Icon';

export type { SelectProps, SelectOption, SelectOptionGroup };

export type SelectComponentProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> &
  SelectProps & {
    icon?: ReactNode;
    className?: string;
  };

export const Select = ({
  id,
  name,
  value,
  defaultValue,
  size,
  disabled,
  invalid,
  placeholder,
  ariaLabel,
  describedBy,
  options,
  groups,
  fullWidth,
  icon,
  className,
  children,
  ...rest
}: SelectComponentProps): ReactElement => {
  const classes = [
    selectClassNames({ size, invalid, disabled, fullWidth }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      <select
        className={selectFieldClassNames()}
        id={id}
        name={name}
        value={value}
        defaultValue={
          defaultValue ?? (value === undefined && placeholder ? '' : undefined)
        }
        disabled={disabled}
        aria-invalid={invalid ? true : undefined}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children ? (
          children
        ) : (
          <>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
            {groups?.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </>
        )}
      </select>
      <span className={selectIconClassNames()} aria-hidden="true">
        {icon ?? <Icon name="chevron-down" size={size === 'sm' ? 'sm' : 'md'} />}
      </span>
    </span>
  );
};
