import { dividerClassNames, type DividerProps } from '@eevenkoto/core';
import template from './Divider.html';

export type { DividerProps };

export const renderDivider = (args: DividerProps = {}): string =>
  template.replace('{{className}}', dividerClassNames(args));
