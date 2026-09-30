import {
  radioBadgeClassNames,
  radioClassNames,
  radioContentClassNames,
  radioControlClassNames,
  radioDescriptionClassNames,
  radioTitleClassNames,
  type RadioProps,
} from '@eevenkoto/core';
import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';

export type { RadioProps };

export type RadioComponentProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'children'
> &
  RadioProps & {
    badgeSlot?: ReactNode;
    className?: string;
  };

export const Radio = ({
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
}: RadioComponentProps): ReactElement => {
  const classes = [
    radioClassNames({ variant, card, size, invalid, disabled }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-invalid={invalid ? true : undefined}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={radioControlClassNames()}
        {...rest}
      />
      <span className={radioContentClassNames()}>
        <strong className={radioTitleClassNames()}>{label}</strong>
        {description ? (
          <span className={radioDescriptionClassNames()}>{description}</span>
        ) : null}
      </span>
      {badgeSlot ? (
        <span className={radioBadgeClassNames()}>{badgeSlot}</span>
      ) : badge ? (
        <span className={radioBadgeClassNames()}>{badge}</span>
      ) : null}
    </label>
  );
};
