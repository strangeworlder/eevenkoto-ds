import type { ContentTableProps } from '@eevenkoto/core';
import type { ReactElement, ReactNode } from 'react';
import { Notice } from '../../core/molecules/Notice';
import {
  Table,
  type TableComponentProps,
  type TableReactRowInput,
} from '../../core/molecules/Table';

export type { ContentTableProps };

export type ContentTableComponentProps = Omit<TableComponentProps, 'rows'> & {
  rows: ContentTableProps['rows'];
  children?: ReactNode;
};

export const ContentTable = ({
  rows,
  columns,
  className,
  ...rest
}: ContentTableComponentProps): ReactElement => {
  const colCount = columns?.length ?? 1;
  const mapped: TableReactRowInput[] = rows.map((row) => {
    if (row.kind === 'locked') {
      return {
        attributes: { 'data-locked': true },
        cells: [
          {
            node: <Notice {...row.notice} />,
            colSpan: row.colSpan ?? colCount,
            attributes: { class: 'eevenkoto-content-table__locked-cell' },
          },
        ],
      };
    }
    return {
      attributes: {
        ...(row.readiness ? { 'data-readiness': row.readiness } : {}),
        ...row.attributes,
      },
      cells: row.cells,
    };
  });
  const classes = ['eevenkoto-content-table', className].filter(Boolean).join(' ');

  return <Table {...rest} columns={columns} rows={mapped} className={classes} />;
};