import {
  checkboxGroupClassNames,
  checkboxGroupHeaderClassNames,
  checkboxGroupLegendClassNames,
  checkboxGroupListClassNames,
  checkboxGroupMessageClassNames,
  type CheckboxGroupProps,
} from '@eevenkoto/core';
import type { FieldsetHTMLAttributes, ReactElement, ReactNode } from 'react';
import { Badge } from '../atoms/Badge';
import { Checkbox, type CheckboxComponentProps } from '../atoms/Checkbox';

export type { CheckboxGroupProps };
export type CheckboxGroupItemProps = CheckboxComponentProps;

export type CheckboxGroupComponentProps = Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'children'
> &
  Omit<CheckboxGroupProps, 'items'> & {
    items?: CheckboxComponentProps[];
    badgeSlot?: ReactNode;
    children?: ReactNode;
    className?: string;
  };

export const CheckboxGroup = ({
  label,
  legendVisuallyHidden,
  name,
  layout,
  columns,
  hint,
  error,
  badge,
  badgeIntent,
  badgeSlot,
  items,
  children,
  className,
  ...rest
}: CheckboxGroupComponentProps): ReactElement => {
  const classes = [checkboxGroupClassNames({ layout, columns }), className]
    .filter(Boolean)
    .join(' ');

  const hasError = Boolean(error);
  const messageText = hasError ? error : hint;

  return (
    <fieldset className={classes} {...rest}>
      <div className={checkboxGroupHeaderClassNames()}>
        <legend className={checkboxGroupLegendClassNames(legendVisuallyHidden)}>
          {label}
        </legend>
        {badgeSlot ? (
          badgeSlot
        ) : badge ? (
          <Badge label={badge} intent={badgeIntent ?? 'neutral'} variant="solid" />
        ) : null}
      </div>
      <div className={checkboxGroupListClassNames()}>
        {children
          ? children
          : items?.map((item, idx) => (
              <Checkbox
                key={item.id ?? item.value ?? idx}
                {...item}
                name={item.name ?? name}
              />
            ))}
      </div>
      {messageText ? (
        <p className={checkboxGroupMessageClassNames(hasError)}>{messageText}</p>
      ) : null}
    </fieldset>
  );
};
