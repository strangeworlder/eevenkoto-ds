import {
  chipGroupClassNames,
  chipGroupLegendClassNames,
  chipGroupListClassNames,
  type ChipGroupProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderChip } from '../../atoms/chip/renderChip';
import template from './ChipGroup.html';

export type { ChipGroupProps };

export const renderChipGroup = (args: ChipGroupProps): string => {
  const chips = args.options
    .map((opt) => {
      const extras = [
        ` data-value="${escapeHtml(opt.value)}"`,
        opt.title ? ` title="${escapeHtml(opt.title)}"` : '',
        ...Object.entries(opt.attributes ?? {}).map(([key, value]) =>
          value === undefined || value === false
            ? ''
            : value === true
              ? ` ${escapeHtml(key)}`
              : ` ${escapeHtml(key)}="${escapeHtml(String(value))}"`,
        ),
      ].join('');

      return renderChip({
        label: opt.label,
        selected: opt.selected,
        disabled: opt.disabled,
        size: args.size ?? 'sm',
        icon: opt.icon,
        swatchColor: opt.swatchColor,
        href: opt.href,
      }).replace(/^<(button|a)/, (_m, tag: string) => `<${tag}${extras}`);
    })
    .join('');

  return template
    .replace('{{idAttr}}', args.id ? ` id="${escapeHtml(args.id)}"` : '')
    .replace('{{hiddenAttr}}', args.hidden ? ' hidden' : '')
    .replace('{{className}}', chipGroupClassNames())
    .replace('{{mode}}', args.mode ?? 'single')
    .replace('{{legendClassName}}', chipGroupLegendClassNames(args.hideLegend))
    .replace('{{legend}}', escapeHtml(args.label))
    .replace('{{listClassName}}', chipGroupListClassNames())
    .replace('{{chips}}', () => chips);
};
