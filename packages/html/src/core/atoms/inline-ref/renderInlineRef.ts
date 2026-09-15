import {
  inlineRefClassNames,
  inlineRefLabelClassNames,
  type InlineRefProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './InlineRef.html';

export type { InlineRefProps };

export const renderInlineRef = (args: InlineRefProps): string => {
  const tag = args.href ? 'a' : 'span';
  const hrefAttr = args.href ? ` href="${escapeHtml(args.href)}"` : '';
  const label = `<span class="${inlineRefLabelClassNames()}">${escapeHtml(args.name)}</span>`;

  return template
    .replaceAll('{{tag}}', tag)
    .replace('{{className}}', inlineRefClassNames())
    .replace('{{hrefAttr}}', hrefAttr)
    .replace('{{content}}', label);
};
