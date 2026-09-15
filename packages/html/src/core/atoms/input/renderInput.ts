import { inputClassNames, inputFieldClassNames, type InputProps as InputCoreProps } from '@eevenkoto/core';
import { renderIcon } from '../icon/renderIcon';
import { escapeHtml } from '../../../utils/html';
import template from './Input.html';

export type InputProps = InputCoreProps & {
  /** Icon slot HTML. Defaults to the search glyph when `search` is set. */
  icon?: string;
};

export const renderInput = (args: InputProps): string => {
  const type = args.type ?? (args.search ? 'search' : 'text');

  const icon =
    args.icon ??
    (args.search ? renderIcon({ name: 'search', size: args.size === 'sm' ? 'sm' : 'md' }) : '');
  const iconSlot = icon ? `<span class="eevenkoto-input__icon">${icon}</span>` : '';

  const attrs = [
    ` class="${inputFieldClassNames()}"`,
    ` type="${type}"`,
    args.id ? ` id="${escapeHtml(args.id)}"` : '',
    args.name ? ` name="${escapeHtml(args.name)}"` : '',
    args.value ? ` value="${escapeHtml(args.value)}"` : '',
    args.placeholder ? ` placeholder="${escapeHtml(args.placeholder)}"` : '',
    args.ariaLabel ? ` aria-label="${escapeHtml(args.ariaLabel)}"` : '',
    args.describedBy ? ` aria-describedby="${escapeHtml(args.describedBy)}"` : '',
    args.invalid ? ' aria-invalid="true"' : '',
    args.disabled ? ' disabled' : '',
  ].join('');

  return template
    .replace('{{className}}', inputClassNames(args))
    .replace('{{content}}', `${iconSlot}<input${attrs} />`);
};
