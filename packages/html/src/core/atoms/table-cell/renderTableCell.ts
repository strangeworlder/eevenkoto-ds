import {
  tableCellClassNames,
  type TableCellKind,
  type TableCellProps as TableCellCoreProps,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import template from './TableCell.html';

export type { TableCellKind };

export interface TableCellProps extends TableCellCoreProps {
  /** Optional keyboard focus target (numeric heads). */
  tabIndex?: number;
}

export const renderTableCell = (args: TableCellProps): string => {
  const kind = args.kind ?? 'text';
  const header = Boolean(args.header);
  const tag = header ? 'th' : 'td';
  const className = tableCellClassNames({ kind });
  const angled = Boolean(args.angled) && header && kind === 'numeric';

  const attrParts: string[] = [];
  if (header && args.scope) {
    attrParts.push(` scope="${escapeHtml(args.scope)}"`);
  }
  if (args.tabIndex != null) {
    attrParts.push(` tabindex="${args.tabIndex}"`);
  }

  const text = escapeHtml(args.text);
  const content = angled
    ? `<span class="eevenkoto-table-cell__head-label">${text}</span>`
    : text;

  return template
    .replaceAll('{{tag}}', tag)
    .replace('{{className}}', className)
    .replace('{{attrs}}', attrParts.join(''))
    .replace('{{content}}', content);
};
