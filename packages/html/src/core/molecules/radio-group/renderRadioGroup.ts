import {
  radioGroupClassNames,
  radioGroupHeaderClassNames,
  radioGroupLegendClassNames,
  radioGroupMessageClassNames,
  type RadioGroupProps as RadioGroupCoreProps,
} from '@eevenkoto/core';
import { renderRadio } from '../../atoms/radio/renderRadio';
import { renderBadge } from '../../atoms/badge/renderBadge';
import { escapeHtml } from '../../../utils/html';
import template from './RadioGroup.html';

export type RadioGroupProps = RadioGroupCoreProps & {
  /** Optional pre-rendered items HTML or slot. */
  children?: string;
};

export const renderRadioGroup = (args: RadioGroupProps): string => {
  const selectedValue = args.value ?? args.defaultValue;

  const itemsHtml = args.children
    ? args.children
    : (args.options ?? [])
        .map((opt) =>
          renderRadio({
            ...opt,
            name: args.name,
            variant: opt.variant ?? args.variant,
            checked: selectedValue !== undefined ? opt.value === selectedValue : opt.checked,
          }),
        )
        .join('');

  const isLegendHidden = Boolean(args.hideLegend ?? args.legendVisuallyHidden);
  const legendHtml = `<legend class="${radioGroupLegendClassNames(isLegendHidden)}">${escapeHtml(args.label)}</legend>`;

  const badgeHtml = args.badge
    ? renderBadge({
        label: args.badge,
        intent: args.badgeIntent ?? 'neutral',
        variant: 'solid',
      })
    : '';

  const headerHtml =
    isLegendHidden && !badgeHtml
      ? legendHtml
      : `<div class="${radioGroupHeaderClassNames()}">${legendHtml}${badgeHtml}</div>`;

  const hasError = Boolean(args.error);
  const messageText = hasError ? args.error : args.hint;
  const messageHtml = messageText
    ? `<p class="${radioGroupMessageClassNames(hasError)}">${escapeHtml(messageText)}</p>`
    : '';

  return template
    .replace('{{className}}', radioGroupClassNames(args))
    .replace('{{header}}', headerHtml)
    .replace('{{items}}', itemsHtml)
    .replace('{{message}}', messageHtml)
    .trim();
};
