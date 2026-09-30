import {
  buttonClassNames,
  stepperButtonClassNames,
  stepperClassNames,
  type StepperProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Stepper.html';

export type { StepperProps };

export const renderStepper = (args: StepperProps): string => {
  const btnClass = `${buttonClassNames({ variant: 'secondary', size: 'sm' })} ${stepperButtonClassNames()}`;
  const min = args.min ?? 0;
  const isDecreaseDisabled = args.disabled || args.value <= min;
  const isIncreaseDisabled =
    args.disabled || (args.max !== undefined && args.value >= args.max);

  const descHtml = args.description
    ? `<span class="eevenkoto-stepper__description">${escapeHtml(args.description)}</span>`
    : '';

  const fieldAttr = args.name ? ` data-field="${escapeHtml(args.name)}"` : '';
  const valFieldAttr = args.name ? ` data-stepper-val="${escapeHtml(args.name)}"` : '';

  return template
    .replace('{{className}}', stepperClassNames(args))
    .replace('{{label}}', escapeHtml(args.label))
    .replace('{{description}}', descHtml)
    .replace(/\{\{buttonClass\}\}/g, btnClass)
    .replace(/\{\{fieldAttr\}\}/g, fieldAttr)
    .replace('{{valFieldAttr}}', valFieldAttr)
    .replace('{{decreaseAriaLabel}}', escapeHtml(args.decreaseAriaLabel ?? 'Vähennä'))
    .replace('{{increaseAriaLabel}}', escapeHtml(args.increaseAriaLabel ?? 'Lisää'))
    .replace('{{decreaseDisabled}}', isDecreaseDisabled ? ' disabled' : '')
    .replace('{{increaseDisabled}}', isIncreaseDisabled ? ' disabled' : '')
    .replace('{{value}}', String(args.value));
};
