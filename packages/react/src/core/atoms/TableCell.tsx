import {
  tableCellClassNames,
  type TableCellKind,
  type TableCellProps,
} from '@eevenkoto/core';
import type { ReactElement, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

export type { TableCellKind, TableCellProps };

type Shared = {
  kind?: TableCellKind;
  angled?: boolean;
  /** Cell sits inside a `.eevenkoto-table` host, which already styles bare `th` / `td`. */
  inTable?: boolean;
  children?: ReactNode;
  className?: string;
};

export type TableCellComponentProps =
  | (Shared &
      ThHTMLAttributes<HTMLTableCellElement> & {
        header: true;
      })
  | (Shared &
      TdHTMLAttributes<HTMLTableCellElement> & {
        header?: false;
      });

export const TableCell = ({
  kind = 'text',
  header = false,
  angled = false,
  inTable = false,
  children,
  className,
  ...rest
}: TableCellComponentProps): ReactElement => {
  const classes =
    [tableCellClassNames({ kind, inTable }), className].filter(Boolean).join(' ') || undefined;
  const content =
    angled && header && kind === 'numeric' ? (
      <span className="eevenkoto-table-cell__head-label">{children}</span>
    ) : (
      children
    );

  if (header) {
    return (
      <th className={classes} {...(rest as ThHTMLAttributes<HTMLTableCellElement>)}>
        {content}
      </th>
    );
  }

  return (
    <td className={classes} {...(rest as TdHTMLAttributes<HTMLTableCellElement>)}>
      {content}
    </td>
  );
};
