import { statClassNames, type StatProps } from '@eevenkoto/core';
import template from './Stat.html';

export type { StatProps };
/** @deprecated Prefer StatProps from @eevenkoto/core */
export type StatArgs = StatProps;

export const renderStat = (args: StatProps): string => {
  const className = statClassNames(args);
  return template.replace('{{className}}', className).replace('{{value}}', args.value);
};
