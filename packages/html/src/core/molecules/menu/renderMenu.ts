import {
  menuClassNames,
  menuIconClassNames,
  menuItemClassNames,
  menuItemLabelClassNames,
  type MenuAttributes,
  type MenuEntry,
  type MenuGroupEntry,
  type MenuItemEntry,
  type MenuProps,
  type MenuSize,
} from '@eevenkoto/core';
import { renderIcon } from '../../atoms/icon/renderIcon';
import { renderStatusDot } from '../../atoms/status-dot/renderStatusDot';
import { escapeHtml } from '../../../utils/html';
import template from './Menu.html';

export type { MenuAttributes, MenuProps, MenuEntry, MenuSize };

const SAFE_ATTR_NAME_RE = /^[a-zA-Z_:][a-zA-Z0-9_.:-]*$/;

const serializeAttributes = (attrs?: MenuAttributes, omitClass = false): string => {
  if (!attrs) return '';
  return Object.entries(attrs)
    .map(([name, value]) => {
      if (value === undefined || value === false) return '';
      if (omitClass && name === 'class') return '';
      if (!SAFE_ATTR_NAME_RE.test(name) || /^on/i.test(name)) return '';
      if (value === true) return ` ${name}`;
      return ` ${name}="${escapeHtml(value)}"`;
    })
    .join('');
};

const mergeClass = (base: string, attrs?: MenuAttributes): string => {
  const extra = typeof attrs?.class === 'string' ? attrs.class.trim() : '';
  return extra ? `${base} ${escapeHtml(extra)}` : base;
};

const itemIcon = (entry: MenuItemEntry | MenuGroupEntry): string => {
  if (!entry.icon) return '';
  return `<span class="${menuIconClassNames()}">${renderIcon({ name: entry.icon })}</span>`;
};

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

const itemInner = (entry: MenuItemEntry): string => {
  const extras = Boolean(entry.icon || entry.locked || entry.status);
  const label = extras
    ? `<span class="${menuItemLabelClassNames()}">${escapeHtml(entry.label)}</span>`
    : escapeHtml(entry.label);
  return `${itemIcon(entry)}${label}${itemLock(entry)}${itemStatus(entry)}`;
};

const groupSummaryInner = (entry: MenuGroupEntry): string => {
  if (!entry.icon) return escapeHtml(entry.label);
  return `${itemIcon(entry)}<span class="${menuItemLabelClassNames()}">${escapeHtml(entry.label)}</span>`;
};

const wrapItem = (inner: string): string => `<li>${inner}</li>`;

const renderEntry = (entry: MenuEntry): string => {
  if (entry.kind === 'separator') {
    const extraAttrs = serializeAttributes(entry.attributes);
    return wrapItem(`<hr${extraAttrs} />`);
  }

  if (entry.kind === 'header') {
    const cls = mergeClass('eevenkoto-menu__header', entry.attributes);
    const extraAttrs = serializeAttributes(entry.attributes, true);
    return wrapItem(`<p class="${cls}"${extraAttrs}>${escapeHtml(entry.label)}</p>`);
  }

  if (entry.kind === 'group') {
    const openAttr = entry.expanded ? ' open' : '';
    const extraAttrs = serializeAttributes(entry.attributes);
    const children = entry.children.map((child) => renderEntry(child)).join('');
    return wrapItem(
      `<details${openAttr}${extraAttrs}><summary>${groupSummaryInner(entry)}</summary><ul>${children}</ul></details>`,
    );
  }

  const className = mergeClass(
    menuItemClassNames({ selected: entry.selected, locked: entry.locked }),
    entry.attributes,
  );
  const extraAttrs = serializeAttributes(entry.attributes, true);
  const inner = itemInner(entry);
  const lockedNoHref = Boolean(entry.locked && !entry.href);

  if (entry.href) {
    const linkInactive = Boolean(entry.disabled || lockedNoHref);
    const disabledAttrs = linkInactive ? ' aria-disabled="true" tabindex="-1"' : '';
    const currentAttr = entry.selected ? ' aria-current="page"' : '';
    return wrapItem(
      `<a class="${className}" href="${escapeHtml(entry.href)}"${currentAttr}${disabledAttrs}${extraAttrs}>${inner}</a>`,
    );
  }

  const disabledAttr = entry.disabled || entry.locked ? ' disabled' : '';
  return wrapItem(
    `<button type="button" class="${className}"${disabledAttr}${extraAttrs}>${inner}</button>`,
  );
};

export const renderMenu = (args: MenuProps): string => {
  const labelAttr = args.label ? ` aria-label="${escapeHtml(args.label)}"` : '';

  return template
    .replace('{{className}}', menuClassNames(args))
    .replace('{{labelAttr}}', labelAttr)
    .replace('{{content}}', args.entries.map((entry) => renderEntry(entry)).join(''));
};
