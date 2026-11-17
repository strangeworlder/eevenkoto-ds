import {
  chipGroupActionClassNames,
  chipGroupClassNames,
  chipGroupHeaderClassNames,
  chipGroupLegendClassNames,
  chipGroupListClassNames,
  type ChipGroupProps as CoreChipGroupProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderChip } from '../../atoms/chip/renderChip';
import template from './ChipGroup.html';

export type ChipGroupProps = CoreChipGroupProps & {
  /** Optional trailing action HTML in the group header (e.g. a refresh `Button`). */
  headerAction?: string;
};

export const renderChipGroup = (args: ChipGroupProps): string => {
  const mode = args.mode ?? 'single';
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
        selected: mode === 'action' ? false : opt.selected,
        disabled: opt.disabled,
        size: args.size ?? 'sm',
        icon: opt.icon,
        swatchColor: opt.swatchColor,
        href: opt.href,
      }).replace(/^<(button|a)/, (_m, tag: string) => `<${tag}${extras}`);
    })
    .join('');

  if (args.headerAction) {
    const labelId = args.id ? `${args.id}-label` : undefined;
    const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';
    const hiddenAttr = args.hidden ? ' hidden' : '';
    const ariaAttr = labelId
      ? ` aria-labelledby="${escapeHtml(labelId)}"`
      : ` aria-label="${escapeHtml(args.label)}"`;
    const spanIdAttr = labelId ? ` id="${escapeHtml(labelId)}"` : '';

    return (
      `<div${idAttr}${hiddenAttr} class="${chipGroupClassNames()}" role="group"${ariaAttr} data-selection-mode="${mode}">` +
      `<div class="${chipGroupHeaderClassNames()}">` +
      `<span${spanIdAttr} class="${chipGroupLegendClassNames(args.hideLegend)}">${escapeHtml(args.label)}</span>` +
      `<div class="${chipGroupActionClassNames()}">${args.headerAction}</div>` +
      `</div>` +
      `<div class="${chipGroupListClassNames()}">${chips}</div>` +
      `</div>`
    );
  }

  return template
    .replace('{{idAttr}}', args.id ? ` id="${escapeHtml(args.id)}"` : '')
    .replace('{{hiddenAttr}}', args.hidden ? ' hidden' : '')
    .replace('{{className}}', chipGroupClassNames())
    .replace('{{mode}}', mode)
    .replace('{{legendClassName}}', chipGroupLegendClassNames(args.hideLegend))
    .replace('{{legend}}', escapeHtml(args.label))
    .replace('{{listClassName}}', chipGroupListClassNames())
    .replace('{{chips}}', () => chips);
};
