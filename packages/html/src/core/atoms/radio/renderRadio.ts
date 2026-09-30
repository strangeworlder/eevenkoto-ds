import {
  radioClassNames,
  radioControlClassNames,
  type RadioProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Radio.html';

export type { RadioProps };

export const renderRadio = (args: RadioProps): string => {
  const isChecked = Boolean(args.checked ?? args.defaultChecked);

  const attrs = [
    ` class="${radioControlClassNames()}"`,
    ` type="radio"`,
    args.name ? ` name="${escapeHtml(args.name)}"` : '',
    args.value !== undefined ? ` value="${escapeHtml(args.value)}"` : '',
    args.id ? ` id="${escapeHtml(args.id)}"` : '',
    isChecked ? ' checked' : '',
    args.disabled ? ' disabled' : '',
    args.invalid ? ' aria-invalid="true"' : '',
    args.ariaLabel ? ` aria-label="${escapeHtml(args.ariaLabel)}"` : '',
    args.ariaDescribedBy ? ` aria-describedby="${escapeHtml(args.ariaDescribedBy)}"` : '',
  ].join('');

  const descHtml = args.description
    ? `<span class="eevenkoto-radio__description">${escapeHtml(args.description)}</span>`
    : '';

  const badgeHtml = args.badge
    ? `<span class="eevenkoto-radio__badge">${escapeHtml(args.badge)}</span>`
    : '';

  return template
    .replace('{{className}}', radioClassNames(args))
    .replace('{{control}}', `<input${attrs} />`)
    .replace('{{title}}', escapeHtml(args.label))
    .replace('{{description}}', descHtml)
    .replace('{{badge}}', badgeHtml);
};
