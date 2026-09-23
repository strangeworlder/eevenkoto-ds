import { entityRefClassNames, type EntityRefProps } from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import {
  renderInlineRefContent,
  resolveInlineRefTag,
} from '../../../core/atoms/inline-ref/renderInlineRef';
import template from './EntityRef.html';

export type { EntityRefProps };

export const renderEntityRef = (args: EntityRefProps): string => {
  const tag = resolveInlineRefTag(args);
  const hrefAttr = tag === 'a' && args.href ? ` href="${escapeHtml(args.href)}"` : '';

  return template
    .replaceAll('{{tag}}', tag)
    .replace('{{className}}', entityRefClassNames(args))
    .replace('{{hrefAttr}}', hrefAttr)
    .replace('{{content}}', renderInlineRefContent(args));
};
