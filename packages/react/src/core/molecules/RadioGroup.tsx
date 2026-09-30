import {
  radioGroupClassNames,
  radioGroupHeaderClassNames,
  radioGroupLegendClassNames,
  radioGroupListClassNames,
  radioGroupMessageClassNames,
  type RadioGroupOptionProps,
  type RadioGroupProps,
} from '@eevenkoto/core';
import type { FieldsetHTMLAttributes, ReactElement, ReactNode } from 'react';
import { Badge } from '../atoms/Badge';
import { Radio } from '../atoms/Radio';

export type { RadioGroupProps, RadioGroupOptionProps };

export type RadioGroupComponentProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'children' | 'onChange'
> &
  RadioGroupProps & {
    badgeSlot?: ReactNode;
    children?: ReactNode;
    className?: string;
    onChange?: (value: string) => void;
  };

export const RadioGroup = ({
  name,
  label,
  legendVisuallyHidden,
  value,
  defaultValue,
  layout,
  columns,
  variant,
  hint,
  error,
  badge,
  badgeIntent,
  badgeSlot,
  options,
  children,
  className,
  onChange,
  ...rest
}: RadioGroupComponentProps): ReactElement => {
  const classes = [radioGroupClassNames({ layout, columns }), className]
    .filter(Boolean)
    .join(' ');

  const hasError = Boolean(error);
  const messageText = hasError ? error : hint;

  return (
    <fieldset className={classes} {...rest}>
      <div className={radioGroupHeaderClassNames()}>
        <legend className={radioGroupLegendClassNames(legendVisuallyHidden)}>
          {label}
        </legend>
        {badgeSlot ? (
          badgeSlot
        ) : badge ? (
          <Badge label={badge} intent={badgeIntent ?? 'neutral'} variant="solid" />
        ) : null}
      </div>
      <div className={radioGroupListClassNames()}>
        {children
          ? children
          : options?.map((opt) => (
              <Radio
                key={opt.value}
                {...opt}
                name={name}
                variant={opt.variant ?? variant}
                checked={value !== undefined ? opt.value === value : opt.checked}
                defaultChecked={
                  defaultValue !== undefined
                    ? opt.value === defaultValue
                    : opt.defaultChecked
                }
                onChange={() => onChange?.(opt.value)}
              />
            ))}
      </div>
      {messageText ? (
        <p className={radioGroupMessageClassNames(hasError)}>{messageText}</p>
      ) : null}
    </fieldset>
  );
};
