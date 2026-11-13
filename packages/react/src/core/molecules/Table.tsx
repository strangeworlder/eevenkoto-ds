import {
  tableClassNames,
  tableColClassNames,
  type TableCellObject,
  type TableColumn,
  type TableElementAttributes,
  type TableProps,
  type TableStripe,
  type TableVariant,
} from '@eevenkoto/core';
import { isValidElement, type HTMLAttributes, type ReactElement, type ReactNode } from 'react';
import { normalizeTableAttributes, TableCell } from '../atoms/TableCell';

export type { TableCellObject, TableColumn, TableProps, TableStripe, TableVariant };

export type TableReactCellObject = TableCellObject & {
  node?: ReactNode;
};

export type TableReactCellInput = ReactNode | TableReactCellObject;

export interface TableReactRowObject {
  attributes?: TableElementAttributes;
  cells: TableReactCellInput[];
}

export type TableReactRowInput = TableReactCellInput[] | TableReactRowObject;

export type TableComponentProps = Omit<HTMLAttributes<HTMLTableElement>, 'children'> &
  Omit<TableProps, 'rows'> & {
    rows: TableReactRowInput[];
  };

const isRowObject = (row: TableReactRowInput): row is TableReactRowObject =>
  !Array.isArray(row) && typeof row === 'object' && row !== null && 'cells' in row && Array.isArray(row.cells);

const isCellObject = (cell: TableReactCellInput): cell is TableReactCellObject =>
  typeof cell === 'object' && cell !== null && !Array.isArray(cell) && !isValidElement(cell);

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
  const colRowSpans: number[] = [];

  return (
    <table className={classes} {...rest}>
      {caption ? <caption>{caption}</caption> : null}
      {columns.length > 0 ? (
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} className={tableColClassNames({ kind: col.kind }) || undefined} />
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
                  inTable
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
        {rows.map((row, rowIndex) => {
          const rowCells = isRowObject(row) ? row.cells : row;
          const rowAttrs = isRowObject(row) ? row.attributes : undefined;
          const trClass =
            typeof rowAttrs?.class === 'string' ? rowAttrs.class.trim() || undefined : undefined;
          const trExtraAttrs = normalizeTableAttributes(rowAttrs, true);

          let colCursor = 0;
          const advancePastSpannedCols = () => {
            while ((colRowSpans[colCursor] ?? 0) > 0) {
              colRowSpans[colCursor] -= 1;
              colCursor += 1;
            }
          };

          const renderedCells = rowCells.map((cell, cellIndex) => {
            advancePastSpannedCols();
            const col = columns[colCursor];
            const cellKey = col?.key ? `${col.key}-${cellIndex}` : cellIndex;

            if (isCellObject(cell)) {
              const colSpan = cell.colSpan && cell.colSpan > 0 ? cell.colSpan : 1;
              const rowSpan = cell.rowSpan && cell.rowSpan > 1 ? cell.rowSpan : 1;
              if (rowSpan > 1) {
                for (let s = 0; s < colSpan; s += 1) {
                  colRowSpans[colCursor + s] = rowSpan - 1;
                }
              }
              const kind = cell.kind ?? col?.kind ?? 'text';
              colCursor += colSpan;

              return (
                <TableCell
                  key={cellKey}
                  header={cell.header || undefined}
                  inTable
                  scope={cell.scope}
                  kind={kind}
                  colSpan={cell.colSpan}
                  rowSpan={cell.rowSpan}
                  html={cell.html}
                  text={cell.text}
                  attributes={cell.attributes}
                >
                  {cell.node}
                </TableCell>
              );
            }

            const colKind = col?.kind ?? 'text';
            const asRowHeader =
              variant === 'pair' && colCursor === 0 && (colKind === 'index' || colCursor === 0);
            colCursor += 1;

            return (
              <TableCell
                key={cellKey}
                header={asRowHeader || undefined}
                inTable
                scope={asRowHeader ? 'row' : undefined}
                kind={asRowHeader ? 'index' : colKind}
              >
                {cell ?? ''}
              </TableCell>
            );
          });

          for (let c = colCursor; c < colRowSpans.length; c += 1) {
            if (colRowSpans[c] > 0) colRowSpans[c] -= 1;
          }

          return (
            <tr key={rowIndex} className={trClass} {...trExtraAttrs}>
              {renderedCells}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
