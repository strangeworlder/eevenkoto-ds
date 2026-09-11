import { statClassNames, type StatProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Stat.html';

export type { StatProps };

export const renderStat = (args: StatProps): string => {
  const className = statClassNames(args);
  return template
    .replace('{{className}}', className)
    .replace('{{value}}', escapeHtml(args.value));
};
