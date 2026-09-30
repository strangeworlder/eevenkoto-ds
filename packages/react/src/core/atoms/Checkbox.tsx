import {
  checkboxBadgeClassNames,
  checkboxClassNames,
  checkboxContentClassNames,
  checkboxControlClassNames,
  checkboxDescriptionClassNames,
  checkboxTitleClassNames,
  type CheckboxProps,
} from '@eevenkoto/core';
import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';

export type { CheckboxProps };

export type CheckboxComponentProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'children'
> &
  CheckboxProps & {
    badgeSlot?: ReactNode;
    className?: string;
  };

export const Checkbox = ({
  id,
  name,
  value,
  label,
  description,
  badge,
  badgeSlot,
  checked,
  defaultChecked,
  disabled,
  variant,
  card,
  invalid,
  size,
  ariaLabel,
  ariaDescribedBy,
  className,
  ...rest
}: CheckboxComponentProps): ReactElement => {
  const classes = [
    checkboxClassNames({ variant, card, size, invalid, disabled }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-invalid={invalid ? true : undefined}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={checkboxControlClassNames()}
        {...rest}
      />
      <span className={checkboxContentClassNames()}>
        <strong className={checkboxTitleClassNames()}>{label}</strong>
        {description ? (
          <span className={checkboxDescriptionClassNames()}>{description}</span>
        ) : null}
      </span>
      {badgeSlot ? (
        <span className={checkboxBadgeClassNames()}>{badgeSlot}</span>
      ) : badge ? (
        <span className={checkboxBadgeClassNames()}>{badge}</span>
      ) : null}
    </label>
  );
};
