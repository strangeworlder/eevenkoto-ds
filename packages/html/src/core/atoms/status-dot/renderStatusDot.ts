import { statusDotClassNames, type StatusDotProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './StatusDot.html';

export type { StatusDotProps };

export const renderStatusDot = (args: StatusDotProps): string =>
  template
    .replace('{{className}}', statusDotClassNames(args))
    .replace('{{label}}', escapeHtml(args.label));
