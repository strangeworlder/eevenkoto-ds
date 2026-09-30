import {
  resolveSegmentedControlOptionTone,
  segmentedControlClassNames,
  segmentedControlOptionClassNames,
  type SegmentedControlProps,
} from '@eevenkoto/core';
import { renderIcon } from '../../atoms/icon/renderIcon';
import { escapeHtml } from '../../../utils/html';
import template from './SegmentedControl.html';

export type { SegmentedControlProps };

export const renderSegmentedControl = (args: SegmentedControlProps): string => {
  const mode = args.mode ?? 'radios';
  const className = segmentedControlClassNames(args);
  const label = args.label ? escapeHtml(args.label) : '';
  const hostTone = args.tone;
  const iconSize = args.size === 'sm' ? 'sm' : 'md';

  if (mode === 'links') {
    const labelAttr = label ? ` aria-label="${label}"` : '';
    const content = args.options
      .map((option) => {
        const optId = option.id ?? (option as any).value ?? '';
        const selected = optId === (args.selectedId ?? (args as any).value);
        const tone = resolveSegmentedControlOptionTone(option.tone, hostTone);
        const href = escapeHtml(option.href ?? '#');
        const currentAttr = selected ? ' aria-current="page"' : '';
        const disabledClass = option.disabled ? ' aria-disabled="true" tabindex="-1"' : '';
        const optionClass = segmentedControlOptionClassNames({ tone, selected });
        const iconMarkup = option.icon ? renderIcon({ name: option.icon, size: iconSize }) : '';
        return `<a class="${optionClass}" href="${href}"${currentAttr}${disabledClass}><span class="eevenkoto-segmented-control__label">${iconMarkup}${escapeHtml(option.label ?? '')}</span></a>`;
      })
      .join('');

    return template
      .replace('{{hostOpen}}', `<nav class="${className}"${labelAttr}>`)
      .replace('{{hostClose}}', '</nav>')
      .replace('{{content}}', content);
  }

  const name = escapeHtml(args.name ?? 'eevenkoto-segmented');
  const legend = label
    ? `<legend class="eevenkoto-visually-hidden">${label}</legend>`
    : '';
  const content =
    legend +
    args.options
      .map((option) => {
        const optId = option.id ?? (option as any).value ?? '';
        const selected = optId === (args.selectedId ?? (args as any).value);
        const tone = resolveSegmentedControlOptionTone(option.tone, hostTone);
        // Radios: never emit --selected (would stick after a native change). Paint via :checked only.
        const optionClass = segmentedControlOptionClassNames({ tone, selected: false });
        const checkedAttr = selected ? ' checked' : '';
        const disabledAttr = option.disabled ? ' disabled' : '';
        const id = escapeHtml(`${name}-${optId}`);
        const iconMarkup = option.icon ? renderIcon({ name: option.icon, size: iconSize }) : '';
        return `<label class="${optionClass}" for="${id}"><input class="eevenkoto-segmented-control__input" type="radio" id="${id}" name="${name}" value="${escapeHtml(optId)}"${checkedAttr}${disabledAttr} /><span class="eevenkoto-segmented-control__label">${iconMarkup}${escapeHtml(option.label ?? '')}</span></label>`;
      })
      .join('');

    return template
      .replace('{{hostOpen}}', `<fieldset class="${className}">`)
      .replace('{{hostClose}}', '</fieldset>')
      .replace('{{content}}', content);
};
