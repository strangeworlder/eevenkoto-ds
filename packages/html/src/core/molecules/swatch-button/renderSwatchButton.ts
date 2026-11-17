import {
  swatchButtonChevronClassNames,
  swatchButtonClassNames,
  swatchButtonContentClassNames,
  swatchButtonHintClassNames,
  swatchButtonLabelClassNames,
  swatchButtonRoleClassNames,
  type SwatchButtonProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderIcon } from '../../atoms/icon/renderIcon';
import template from './SwatchButton.html';

export type { SwatchButtonProps };

export const renderSwatchButton = (args: SwatchButtonProps): string => {
  const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';
  const expandedAttr =
    args.expanded !== undefined ? ` aria-expanded="${args.expanded ? 'true' : 'false'}"` : '';
  const controlsAttr = args.controls ? ` aria-controls="${escapeHtml(args.controls)}"` : '';
  const disabledAttr = args.disabled ? ' disabled' : '';

  const roleHtml = args.roleLabel
    ? `<span class="${swatchButtonRoleClassNames()}">${escapeHtml(args.roleLabel)}</span>`
    : '';
  const labelHtml = `<span class="${swatchButtonLabelClassNames()}">${escapeHtml(args.label)}</span>`;
  const hintHtml = args.hint
    ? `<span class="${swatchButtonHintClassNames()}">${escapeHtml(args.hint)}</span>`
    : '';
  const chevronHtml = renderIcon({
    name: 'chevron-down',
    size: 'sm',
    className: swatchButtonChevronClassNames(),
  });

  return template
    .replace('{{idAttr}}', idAttr)
    .replace('{{className}}', swatchButtonClassNames(args))
    .replace('{{color}}', escapeHtml(args.color))
    .replace('{{expandedAttr}}', expandedAttr)
    .replace('{{controlsAttr}}', controlsAttr)
    .replace('{{disabledAttr}}', disabledAttr)
    .replace('{{contentClassName}}', swatchButtonContentClassNames())
    .replace('{{role}}', () => roleHtml)
    .replace('{{label}}', () => labelHtml)
    .replace('{{hint}}', () => hintHtml)
    .replace('{{chevron}}', () => chevronHtml);
};
