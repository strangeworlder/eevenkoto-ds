import {
  checkboxClassNames,
  checkboxControlClassNames,
  type CheckboxProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Checkbox.html';

export type { CheckboxProps };

export const renderCheckbox = (args: CheckboxProps): string => {
  const isChecked = Boolean(args.checked ?? args.defaultChecked);

  const attrs = [
    ` class="${checkboxControlClassNames()}"`,
    ` type="checkbox"`,
    args.id ? ` id="${escapeHtml(args.id)}"` : '',
    args.name ? ` name="${escapeHtml(args.name)}"` : '',
    args.value !== undefined ? ` value="${escapeHtml(args.value)}"` : '',
    isChecked ? ' checked' : '',
    args.disabled ? ' disabled' : '',
    args.invalid ? ' aria-invalid="true"' : '',
    args.ariaLabel ? ` aria-label="${escapeHtml(args.ariaLabel)}"` : '',
    args.ariaDescribedBy ? ` aria-describedby="${escapeHtml(args.ariaDescribedBy)}"` : '',
  ].join('');

  const descHtml = args.description
    ? `<span class="eevenkoto-checkbox__description">${escapeHtml(args.description)}</span>`
    : '';

  const badgeHtml = args.badge
    ? `<span class="eevenkoto-checkbox__badge">${escapeHtml(args.badge)}</span>`
    : '';

  return template
    .replace('{{className}}', checkboxClassNames(args))
    .replace('{{control}}', `<input${attrs} />`)
    .replace('{{title}}', escapeHtml(args.label))
    .replace('{{description}}', descHtml)
    .replace('{{badge}}', badgeHtml);
};
