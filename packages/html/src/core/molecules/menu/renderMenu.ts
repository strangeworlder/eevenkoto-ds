import {
  menuBranchClassNames,
  menuClassNames,
  menuGroupClassNames,
  menuItemClassNames,
  menuSummaryClassNames,
  type MenuEntry,
  type MenuProps,
} from '@eevenkoto/core';
import { renderIcon } from '../../atoms/icon/renderIcon';
import { escapeHtml } from '../../../utils/html';
import template from './Menu.html';

export type { MenuProps, MenuEntry };

const chevron = (): string =>
  `<span class="eevenkoto-menu__chevron" aria-hidden="true">${renderIcon({
    name: 'chevron-right',
    size: 'sm',
  })}</span>`;

const renderEntry = (entry: MenuEntry): string => {
  if (entry.kind === 'separator') {
    return '<hr class="eevenkoto-menu__separator" />';
  }

  if (entry.kind === 'header') {
    return `<p class="eevenkoto-menu__header">${escapeHtml(entry.label)}</p>`;
  }

  if (entry.kind === 'group') {
    const openAttr = entry.expanded ? ' open' : '';
    const children = entry.children.map((child) => renderEntry(child)).join('');
    return `<details class="${menuBranchClassNames()}"${openAttr}>
  <summary class="${menuSummaryClassNames()}">${chevron()}<span>${escapeHtml(entry.label)}</span></summary>
  <div class="${menuGroupClassNames()}">${children}</div>
</details>`;
  }

  const className = menuItemClassNames(entry.selected);
  const label = escapeHtml(entry.label);

  if (entry.href) {
    const disabledAttrs = entry.disabled ? ' aria-disabled="true"' : '';
    return `<a class="${className}" href="${escapeHtml(entry.href)}"${disabledAttrs}>${label}</a>`;
  }

  const disabledAttr = entry.disabled ? ' disabled' : '';
  return `<button type="button" class="${className}"${disabledAttr}>${label}</button>`;
};

export const renderMenu = (args: MenuProps): string => {
  const labelAttr = args.label ? ` aria-label="${escapeHtml(args.label)}"` : '';

  return template
    .replace('{{className}}', menuClassNames())
    .replace('{{labelAttr}}', labelAttr)
    .replace('{{content}}', args.entries.map((entry) => renderEntry(entry)).join(''));
};
