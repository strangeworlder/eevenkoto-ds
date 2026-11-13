import {
  readAloudBoxBodyClassNames,
  readAloudBoxClassNames,
  readAloudBoxOrnamentClassNames,
  type ReadAloudBoxProps,
} from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import template from './ReadAloudBox.html';

export type { ReadAloudBoxProps };

export const renderReadAloudBox = (args: ReadAloudBoxProps): string => {
  const ornament = args.ornament === false ? '' : (args.ornament ?? '❖');
  const ornamentMarkup = ornament
    ? `<span class="${readAloudBoxOrnamentClassNames()}" aria-hidden="true">${escapeHtml(ornament)}</span>`
    : '';
  const body =
    args.bodyHtml !== undefined
      ? sanitizeInlineHtml(args.bodyHtml)
      : args.body
        ? `<p>${escapeHtml(args.body)}</p>`
        : '';
  const idAttr = args.id ? ` id="${escapeHtml(args.id)}"` : '';
  const labelAttr = args.label ? ` aria-label="${escapeHtml(args.label)}"` : '';
  return template
    .replace('{{idAttr}}', idAttr)
    .replace('{{className}}', readAloudBoxClassNames())
    .replace('{{labelAttr}}', labelAttr)
    .replace('{{ornament}}', ornamentMarkup)
    .replace('{{bodyClassName}}', readAloudBoxBodyClassNames())
    .replace('{{body}}', () => body);
};
