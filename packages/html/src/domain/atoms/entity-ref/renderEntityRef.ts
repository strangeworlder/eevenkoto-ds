import {
  entityRefClassNames,
  inlineRefLabelClassNames,
  type EntityRefProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './EntityRef.html';

export type { EntityRefProps };

export const renderEntityRef = (args: EntityRefProps): string => {
  const tag = args.href ? 'a' : 'span';
  const hrefAttr = args.href ? ` href="${escapeHtml(args.href)}"` : '';
  const label = `<span class="${inlineRefLabelClassNames()}">${escapeHtml(args.name)}</span>`;

  return template
    .replaceAll('{{tag}}', tag)
    .replace('{{className}}', entityRefClassNames(args))
    .replace('{{hrefAttr}}', hrefAttr)
    .replace('{{content}}', label);
};
