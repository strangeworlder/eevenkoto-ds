import {
  tableOfContentsClassNames,
  type TableOfContentsGroup,
  type TableOfContentsProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderIcon } from '../../atoms/icon/renderIcon';
import template from './TableOfContents.html';

export type { TableOfContentsProps };

const renderGroups = (groups: TableOfContentsGroup[]): string =>
  groups
    .map((group) => {
      const items = group.items
        .map(
          (item) =>
            `<li><a class="eevenkoto-toc__link" href="${escapeHtml(item.href)}" data-toc-target="${escapeHtml(item.id)}"${item.current ? ' aria-current="location"' : ''}>${escapeHtml(item.label)}</a></li>`,
        )
        .join('');
      const idAttr = group.id ? ` id="${escapeHtml(group.id)}"` : '';
      const label = group.label
        ? `<p class="eevenkoto-toc__group-label">${escapeHtml(group.label)}</p>`
        : '';
      return `<div class="eevenkoto-toc__group"${idAttr}>${label}<ul class="eevenkoto-toc__list">${items}</ul></div>`;
    })
    .join('');

export const renderTableOfContents = (args: TableOfContentsProps): string => {
  const variant = args.variant ?? 'auto';
  const toggleLabel = args.toggleLabel ?? 'On this page';
  const groups = renderGroups(args.groups);

  const rail =
    variant === 'collapsible'
      ? ''
      : `<div class="eevenkoto-toc__rail"><p class="eevenkoto-toc__heading">${escapeHtml(toggleLabel)}</p>${groups}</div>`;
  const disclosure =
    variant === 'rail'
      ? ''
      : `<details class="eevenkoto-toc__disclosure"${args.open ? ' open' : ''}><summary class="eevenkoto-toc__summary"><span class="eevenkoto-toc__toggle-label">${escapeHtml(toggleLabel)}</span>${renderIcon({ name: 'chevron-down', size: 'sm' })}</summary><div class="eevenkoto-toc__panel">${groups}</div></details>`;

  return template
    .replace('{{idAttr}}', args.id ? ` id="${escapeHtml(args.id)}"` : '')
    .replace('{{className}}', tableOfContentsClassNames(args))
    .replace('{{label}}', escapeHtml(args.label ?? 'Table of contents'))
    .replace('{{rail}}', () => rail)
    .replace('{{disclosure}}', () => disclosure);
};
