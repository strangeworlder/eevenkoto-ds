import {
  menuBranchClassNames,
  menuClassNames,
  menuGroupClassNames,
  menuItemClassNames,
  menuItemLabelClassNames,
  menuSummaryClassNames,
  type MenuEntry,
  type MenuItemEntry,
  type MenuProps,
} from '@eevenkoto/core';
import { renderIcon } from '../../atoms/icon/renderIcon';
import { renderStatusDot } from '../../atoms/status-dot/renderStatusDot';
import { escapeHtml } from '../../../utils/html';
import template from './Menu.html';

export type { MenuProps, MenuEntry };

const chevron = (): string =>
  `<span class="eevenkoto-menu__chevron" aria-hidden="true">${renderIcon({
    name: 'chevron-right',
    size: 'sm',
  })}</span>`;

const itemLock = (entry: MenuItemEntry): string => {
  if (!entry.locked) return '';
  return `<span class="eevenkoto-menu__lock">${renderIcon({ name: 'lock' })}<span class="eevenkoto-visually-hidden">${escapeHtml(entry.lockedLabel ?? 'Locked')}</span></span>`;
};

const itemStatus = (entry: MenuItemEntry): string => {
  if (!entry.status) return '';
  return `<span class="eevenkoto-menu__status">${renderStatusDot({
    intent: entry.status,
    label: entry.statusLabel ?? 'Ready',
  })}</span>`;
};

const itemInner = (entry: MenuItemEntry): string =>
  `<span class="${menuItemLabelClassNames()}">${escapeHtml(entry.label)}</span>${itemLock(entry)}${itemStatus(entry)}`;

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
  <summary class="${menuSummaryClassNames()}">${chevron()}<span class="${menuItemLabelClassNames()}">${escapeHtml(entry.label)}</span></summary>
  <div class="${menuGroupClassNames()}">${children}</div>
</details>`;
  }

  const className = menuItemClassNames({ selected: entry.selected, locked: entry.locked });
  const inner = itemInner(entry);
  const lockedNoHref = Boolean(entry.locked && !entry.href);

  if (entry.href) {
    const disabledAttrs = entry.disabled || lockedNoHref ? ' aria-disabled="true"' : '';
    return `<a class="${className}" href="${escapeHtml(entry.href)}"${disabledAttrs}>${inner}</a>`;
  }

  const disabledAttr = entry.disabled || entry.locked ? ' disabled' : '';
  return `<button type="button" class="${className}"${disabledAttr}>${inner}</button>`;
};

export const renderMenu = (args: MenuProps): string => {
  const labelAttr = args.label ? ` aria-label="${escapeHtml(args.label)}"` : '';

  return template
    .replace('{{className}}', menuClassNames(args))
    .replace('{{labelAttr}}', labelAttr)
    .replace('{{content}}', args.entries.map((entry) => renderEntry(entry)).join(''));
};
