import {
  selectClassNames,
  selectFieldClassNames,
  type SelectProps as SelectCoreProps,
  type SelectOption,
} from '@eevenkoto/core';
import { renderIcon } from '../icon/renderIcon';
import { escapeHtml } from '../../../utils/html';
import template from './Select.html';

export type SelectProps = SelectCoreProps & {
  /** Custom children HTML or options HTML override. */
  children?: string;
  dataRole?: string;
};

export const renderSelect = (args: SelectProps): string => {
  const selectedValue = args.value ?? args.defaultValue;

  const renderOptionTag = (opt: SelectOption): string => {
    const isSelected = selectedValue !== undefined && opt.value === selectedValue;
    const disabledAttr = opt.disabled ? ' disabled' : '';
    const selectedAttr = isSelected ? ' selected' : '';
    return `<option value="${escapeHtml(opt.value)}"${selectedAttr}${disabledAttr}>${escapeHtml(opt.label)}</option>`;
  };

  let optionsHtml = '';

  if (args.placeholder) {
    const isSelected = selectedValue === undefined || selectedValue === '';
    optionsHtml += `<option value=""${isSelected ? ' selected' : ''} disabled>${escapeHtml(args.placeholder)}</option>`;
  }

  if (args.children) {
    optionsHtml += args.children;
  } else if (args.groups && args.groups.length > 0) {
    optionsHtml += args.groups
      .map(
        (group) =>
          `<optgroup label="${escapeHtml(group.label)}">${group.options.map(renderOptionTag).join('')}</optgroup>`,
      )
      .join('');
  } else if (args.options && args.options.length > 0) {
    optionsHtml += args.options.map(renderOptionTag).join('');
  }

  const attrs = [
    ` class="${selectFieldClassNames()}"`,
    args.id ? ` id="${escapeHtml(args.id)}"` : '',
    args.name ? ` name="${escapeHtml(args.name)}"` : '',
    args.dataRole ? ` data-role="${escapeHtml(args.dataRole)}"` : '',
    args.disabled ? ' disabled' : '',
    args.invalid ? ' aria-invalid="true"' : '',
    args.ariaLabel ? ` aria-label="${escapeHtml(args.ariaLabel)}"` : '',
    args.describedBy ? ` aria-describedby="${escapeHtml(args.describedBy)}"` : '',
  ].join('');

  const iconHtml = renderIcon({
    name: 'chevron-down',
    size: args.size === 'sm' ? 'sm' : 'md',
  });

  return template
    .replace('{{className}}', selectClassNames(args))
    .replace('{{field}}', `<select${attrs}>${optionsHtml}</select>`)
    .replace('{{icon}}', iconHtml);
};
