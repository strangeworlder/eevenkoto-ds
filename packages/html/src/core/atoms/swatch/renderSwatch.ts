import { swatchClassNames, type SwatchProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './Swatch.html';

export type { SwatchProps };

export const renderSwatch = (args: SwatchProps): string => {
  const ariaAttrs = args.label
    ? ` role="img" aria-label="${escapeHtml(args.label)}"`
    : ' aria-hidden="true"';

  return template
    .replace('{{className}}', swatchClassNames(args))
    .replace('{{color}}', escapeHtml(args.color))
    .replace('{{ariaAttrs}}', ariaAttrs);
};
