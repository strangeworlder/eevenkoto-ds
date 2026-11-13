import type { BadgeIntent } from '../../core/atoms/badge';
import type { TableCellInput, TableProps } from '../../core/molecules/table';
import type { TableElementAttributes } from '../../core/atoms/tableCell';
import type { NoticeProps } from '../../core/molecules/notice';
import { tableClassNames } from '../../core/molecules/table';

export interface ContentTableDataRow {
  kind?: 'row';
  /** Readiness marker for the row (`data-readiness`). */
  readiness?: BadgeIntent;
  attributes?: TableElementAttributes;
  cells: TableCellInput[];
}

export interface ContentTableLockedRow {
  kind: 'locked';
  /** Columns to span. Defaults to the number of table columns. */
  colSpan?: number;
  /** Notice shown in place of gated content. */
  notice: NoticeProps;
}

export type ContentTableRow = ContentTableDataRow | ContentTableLockedRow;

export interface ContentTableProps extends Omit<TableProps, 'rows'> {
  rows: ContentTableRow[];
}

export const contentTableClassNames = (
  props: Pick<ContentTableProps, 'variant' | 'stripe'> = {},
): string => `${tableClassNames(props)} eevenkoto-content-table`;
