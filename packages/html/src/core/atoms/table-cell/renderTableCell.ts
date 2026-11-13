import {
  tableCellClassNames,
  type TableCellKind,
  type TableCellProps as TableCellCoreProps,
  type TableCellScope,
  type TableElementAttributes,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './TableCell.html';

export type { TableCellKind, TableCellScope, TableElementAttributes };

export interface TableCellProps extends TableCellCoreProps {
  /** Optional keyboard focus target (numeric heads). */
  tabIndex?: number;
}

const SAFE_ATTR_NAME_RE = /^[a-zA-Z_:][a-zA-Z0-9_.:-]*$/;

export const serializeTableAttributes = (
  attrs?: TableElementAttributes,
  omitClass = false,
): string => {
  if (!attrs) return '';
  return Object.entries(attrs)
    .map(([name, value]) => {
      if (value === undefined || value === false) return '';
      if (omitClass && name === 'class') return '';
      if (!SAFE_ATTR_NAME_RE.test(name) || /^on/i.test(name)) return '';
      if (value === true) return ` ${name}`;
      return ` ${name}="${escapeHtml(String(value))}"`;
    })
    .join('');
};

export const mergeTableClass = (base: string, attrs?: TableElementAttributes): string => {
  const extra = typeof attrs?.class === 'string' ? escapeHtml(attrs.class.trim()) : '';
  return [base, extra].filter(Boolean).join(' ');
};

export const renderTableCell = (args: TableCellProps): string => {
  const kind = args.kind ?? 'text';
  const header = Boolean(args.header);
  const tag = header ? 'th' : 'td';
  const className = mergeTableClass(
    tableCellClassNames({ kind, inTable: args.inTable }),
    args.attributes,
  );
  const angled = Boolean(args.angled) && header && kind === 'numeric';

  const attrParts: string[] = [];
  if (args.scope) {
    attrParts.push(` scope="${escapeHtml(args.scope)}"`);
  }
  if (args.colSpan != null) {
    attrParts.push(` colspan="${args.colSpan}"`);
  }
  if (args.rowSpan != null) {
    attrParts.push(` rowspan="${args.rowSpan}"`);
  }
  if (args.tabIndex != null) {
    attrParts.push(` tabindex="${args.tabIndex}"`);
  }
  const extraAttrs = serializeTableAttributes(args.attributes, true);
  if (extraAttrs) {
    attrParts.push(extraAttrs);
  }

  const inner = args.html ?? escapeHtml(args.text ?? '');
  const content = angled
    ? `<span class="eevenkoto-table-cell__head-label">${inner}</span>`
    : inner;

  return template
    .replaceAll('{{tag}}', tag)
    .replace('{{classAttr}}', className ? ` class="${className}"` : '')
    .replace('{{attrs}}', attrParts.join(''))
    .replace('{{content}}', content);
};
