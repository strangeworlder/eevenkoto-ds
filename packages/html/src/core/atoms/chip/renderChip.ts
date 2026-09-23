import { chipClassNames, type ChipProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Chip.html';

export type { ChipProps };

export const renderChip = (args: ChipProps): string => {
  const tag = args.href ? 'a' : 'button';
  const hrefAttr = args.href && !args.disabled ? ` href="${escapeHtml(args.href)}"` : '';
  const typeAttr = tag === 'button' ? ' type="button"' : '';
  const disabledAttr =
    tag === 'button' && args.disabled
      ? ' disabled'
      : args.disabled
        ? ' aria-disabled="true"'
        : '';
  const pressedAttr = args.selected ? ' aria-pressed="true"' : '';

  return template
    .replaceAll('{{tag}}', tag)
    .replace('{{className}}', chipClassNames(args))
    .replace('{{hrefAttr}}', hrefAttr)
    .replace('{{typeAttr}}', typeAttr)
    .replace('{{disabledAttr}}', disabledAttr)
    .replace('{{pressedAttr}}', pressedAttr)
    .replace('{{label}}', escapeHtml(args.label));
};
