import {
  inlineRefClassNames,
  inlineRefLabelClassNames,
  inlineRefLockClassNames,
  inlineRefLockIconClassNames,
  type InlineRefProps,
} from '@eevenkoto/core';
import { renderIcon } from '../icon/renderIcon';
import { escapeHtml } from '../../../utils/html';
import template from './InlineRef.html';

export type { InlineRefProps };

export const DEFAULT_INLINE_REF_LOCKED_LABEL = 'Locked';

export const renderInlineRefLock = (lockedLabel = DEFAULT_INLINE_REF_LOCKED_LABEL): string =>
  `<span class="${inlineRefLockClassNames()}">${renderIcon({
    name: 'lock',
    className: inlineRefLockIconClassNames(),
  })}<span class="eevenkoto-visually-hidden">${escapeHtml(lockedLabel)}</span></span>`;

export const renderInlineRefContent = (args: InlineRefProps): string => {
  const label = `<span class="${inlineRefLabelClassNames()}">${escapeHtml(args.name)}</span>`;
  const lock = args.locked ? renderInlineRefLock(args.lockedLabel) : '';
  return `${label}${lock}`;
};

export const resolveInlineRefTag = (args: InlineRefProps): 'a' | 'span' =>
  args.unlinked || !args.href ? 'span' : 'a';

export const renderInlineRef = (args: InlineRefProps): string => {
  const tag = resolveInlineRefTag(args);
  const hrefAttr = tag === 'a' && args.href ? ` href="${escapeHtml(args.href)}"` : '';

  return template
    .replaceAll('{{tag}}', tag)
    .replace('{{className}}', inlineRefClassNames(args))
    .replace('{{hrefAttr}}', hrefAttr)
    .replace('{{content}}', renderInlineRefContent(args));
};
