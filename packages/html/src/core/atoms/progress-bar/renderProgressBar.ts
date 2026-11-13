import {
  progressBarClassNames,
  progressBarFillClassNames,
  type ProgressBarProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './ProgressBar.html';

export type { ProgressBarProps };

export const renderProgressBar = (args: ProgressBarProps = {}): string => {
  const determinate = typeof args.value === 'number' && Number.isFinite(args.value);
  const clamped = determinate ? Math.min(100, Math.max(0, args.value as number)) : undefined;

  let stateAttrs = args.active ? ' aria-busy="true"' : ' aria-hidden="true"';
  if (clamped !== undefined) {
    stateAttrs += ` aria-valuemin="0" aria-valuemax="100" aria-valuenow="${clamped}" style="--eevenkoto-progress-bar-scale: ${clamped / 100}"`;
  }

  return template
    .replace('{{idAttr}}', args.id ? ` id="${escapeHtml(args.id)}"` : '')
    .replace('{{className}}', progressBarClassNames(args))
    .replace('{{label}}', escapeHtml(args.label ?? 'Loading'))
    .replace('{{stateAttrs}}', stateAttrs)
    .replace('{{fillClassName}}', progressBarFillClassNames());
};
