import {
  checkboxGroupClassNames,
  checkboxGroupLegendClassNames,
  checkboxGroupMessageClassNames,
  type CheckboxGroupProps as CheckboxGroupCoreProps,
} from '@eevenkoto/core';
import { renderCheckbox } from '../../atoms/checkbox/renderCheckbox';
import { renderBadge } from '../../atoms/badge/renderBadge';
import { escapeHtml } from '../../../utils/html';
import template from './CheckboxGroup.html';

export type CheckboxGroupProps = CheckboxGroupCoreProps & {
  /** Optional pre-rendered items HTML or slot. */
  children?: string;
};

export const renderCheckboxGroup = (args: CheckboxGroupProps): string => {
  const itemsHtml = args.children
    ? args.children
    : (args.items ?? [])
        .map((item) =>
          renderCheckbox({
            ...item,
            name: item.name ?? args.name,
          }),
        )
        .join('');

  const badgeHtml = args.badge
    ? renderBadge({
        label: args.badge,
        intent: args.badgeIntent ?? 'neutral',
        variant: 'solid',
      })
    : '';

  const hasError = Boolean(args.error);
  const messageText = hasError ? args.error : args.hint;
  const messageHtml = messageText
    ? `<p class="${checkboxGroupMessageClassNames(hasError)}">${escapeHtml(messageText)}</p>`
    : '';

  return template
    .replace('{{className}}', checkboxGroupClassNames(args))
    .replace(
      '{{legendClassName}}',
      checkboxGroupLegendClassNames(args.legendVisuallyHidden),
    )
    .replace('{{legend}}', escapeHtml(args.label))
    .replace('{{badge}}', badgeHtml)
    .replace('{{items}}', itemsHtml)
    .replace('{{message}}', messageHtml);
};
