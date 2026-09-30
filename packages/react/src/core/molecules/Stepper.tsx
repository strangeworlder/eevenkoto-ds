import {
  stepperButtonClassNames,
  stepperClassNames,
  stepperControlsClassNames,
  stepperDescriptionClassNames,
  stepperInfoClassNames,
  stepperLabelClassNames,
  stepperValueClassNames,
  type StepperProps,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { Button } from '../atoms/Button';

export type { StepperProps };

export type StepperComponentProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange'
> &
  StepperProps & {
    onChange?: (value: number) => void;
    className?: string;
  };

export const Stepper = ({
  id,
  name,
  label,
  description,
  value,
  min = 0,
  max,
  step = 1,
  disabled,
  decreaseAriaLabel = 'Vähennä',
  increaseAriaLabel = 'Lisää',
  className,
  onChange,
  ...rest
}: StepperComponentProps): ReactElement => {
  const classes = [stepperClassNames({ disabled }), className]
    .filter(Boolean)
    .join(' ');

  const isDecreaseDisabled = disabled || value <= min;
  const isIncreaseDisabled = disabled || (max !== undefined && value >= max);

  const handleDecrease = () => {
    if (isDecreaseDisabled) return;
    onChange?.(Math.max(min, value - step));
  };

  const handleIncrease = () => {
    if (isIncreaseDisabled) return;
    const next = max !== undefined ? Math.min(max, value + step) : value + step;
    onChange?.(next);
  };

  return (
    <div className={classes} id={id} {...rest}>
      <div className={stepperInfoClassNames()}>
        <strong className={stepperLabelClassNames()}>{label}</strong>
        {description ? (
          <span className={stepperDescriptionClassNames()}>{description}</span>
        ) : null}
      </div>
      <div className={stepperControlsClassNames()}>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className={stepperButtonClassNames()}
          label="−"
          aria-label={decreaseAriaLabel}
          disabled={isDecreaseDisabled}
          onClick={handleDecrease}
        />
        <span
          className={stepperValueClassNames()}
          role="status"
          aria-live="polite"
        >
          {value}
        </span>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className={stepperButtonClassNames()}
          label="+"
          aria-label={increaseAriaLabel}
          disabled={isIncreaseDisabled}
          onClick={handleIncrease}
        />
      </div>
    </div>
  );
};
