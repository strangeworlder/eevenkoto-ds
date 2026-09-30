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
  icon,
  className,
  children,
  ...rest
}: SelectComponentProps): ReactElement => {
  const classes = [selectClassNames({ size, invalid, disabled }), className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      <select
        className={selectFieldClassNames()}
        id={id}
        name={name}
        value={value}
        defaultValue={defaultValue}
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
        {children
          ? children
          : groups && groups.length > 0
            ? groups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))
            : options?.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))}
      </select>
      <span className={selectIconClassNames()} aria-hidden="true">
        {icon ?? <Icon name="chevron-down" size={size === 'sm' ? 'sm' : 'md'} />}
      </span>
    </span>
  );
};
