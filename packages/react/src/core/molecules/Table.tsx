import {
  tableCaptionClassNames,
  tableClassNames,
  tableColClassNames,
  type TableColumn,
  type TableProps,
  type TableStripe,
  type TableVariant,
} from '@eevenkoto/core';
import type { HTMLAttributes, ReactElement } from 'react';
import { TableCell } from '../atoms/TableCell';

export type { TableColumn, TableProps, TableStripe, TableVariant };

export type TableComponentProps = Omit<HTMLAttributes<HTMLTableElement>, 'children'> & TableProps;

export const Table = ({
  variant = 'default',
  stripe = 'row',
  caption,
  columns,
  rows,
  className,
  ...rest
}: TableComponentProps): ReactElement => {
  const classes = [tableClassNames({ variant, stripe }), className].filter(Boolean).join(' ');

  return (
    <table className={classes} {...rest}>
      {caption ? <caption className={tableCaptionClassNames()}>{caption}</caption> : null}
      {columns.length > 0 ? (
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} className={tableColClassNames({ kind: col.kind })} />
          ))}
        </colgroup>
      ) : null}
      {columns.length > 0 ? (
        <thead>
          <tr>
            {columns.map((col) => {
              const kind = col.kind ?? 'text';
              const angled = variant === 'numeric' && kind === 'numeric';
              return (
                <TableCell
                  key={col.key}
                  header
                  scope="col"
                  kind={kind}
                  angled={angled}
                  tabIndex={angled ? 0 : undefined}
                >
                  {col.header}
                </TableCell>
              );
            })}
          </tr>
        </thead>
      ) : null}
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, index) => {
              const kind = col.kind ?? 'text';
              const asRowHeader =
                variant === 'pair' && index === 0 && (kind === 'index' || index === 0);
              return (
                <TableCell
                  key={col.key}
                  header={asRowHeader || undefined}
                  scope={asRowHeader ? 'row' : undefined}
                  kind={asRowHeader ? 'index' : kind}
                >
                  {row[index] ?? ''}
                </TableCell>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
