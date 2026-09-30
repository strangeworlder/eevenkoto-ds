export interface StepperProps {
  id?: string;
  name?: string;
  /** Primary label describing the numeric counter. */
  label: string;
  /** Optional secondary description / rule text below label. */
  description?: string;
  /** Current numeric value. */
  value: number;
  /** Minimum allowed value. Default: 0. */
  min?: number;
  /** Maximum allowed value. */
  max?: number;
  /** Delta to add or subtract on each click. Default: 1. */
  step?: number;
  disabled?: boolean;
  /** Accessible label for the decrease button. Default: "Vähennä". */
  decreaseAriaLabel?: string;
  /** Accessible label for the increase button. Default: "Lisää". */
  increaseAriaLabel?: string;
}

export type StepperClassNameProps = Pick<StepperProps, 'disabled'>;

export const stepperClassNames = (props: StepperClassNameProps = {}): string =>
  ['eevenkoto-stepper', props.disabled ? 'eevenkoto-stepper--disabled' : '']
    .filter(Boolean)
    .join(' ');

export const stepperInfoClassNames = (): string => 'eevenkoto-stepper__info';

export const stepperLabelClassNames = (): string => 'eevenkoto-stepper__label';

export const stepperDescriptionClassNames = (): string => 'eevenkoto-stepper__description';

export const stepperControlsClassNames = (): string => 'eevenkoto-stepper__controls';

export const stepperButtonClassNames = (): string => 'eevenkoto-stepper__button';

export const stepperValueClassNames = (): string => 'eevenkoto-stepper__value';
