import {
  tableClassNames,
  tableColClassNames,
  type TableCellInput,
  type TableCellObject,
  type TableColumn,
  type TableProps,
  type TableRowInput,
  type TableRowObject,
  type TableStripe,
  type TableVariant,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import {
  mergeTableClass,
  renderTableCell,
  serializeTableAttributes,
} from '../../atoms/table-cell/renderTableCell';
import template from './Table.html';

export type {
  TableCellInput,
  TableCellObject,
  TableColumn,
  TableProps,
  TableRowInput,
  TableRowObject,
  TableStripe,
  TableVariant,
};

const isRowObject = (row: TableRowInput): row is TableRowObject =>
  !Array.isArray(row) && typeof row === 'object' && row !== null && Array.isArray(row.cells);

const isCellObject = (cell: TableCellInput): cell is TableCellObject =>
  typeof cell === 'object' && cell !== null;

export const renderTable = (args: TableProps): string => {
  const variant = args.variant ?? 'default';
  const className = tableClassNames(args);
  const columns = args.columns ?? [];
  const rows = args.rows ?? [];

  const caption = args.caption ? `<caption>${escapeHtml(args.caption)}</caption>` : '';

  const colgroup =
    columns.length > 0
      ? `<colgroup>${columns
          .map((col) => {
            const colClass = tableColClassNames({ kind: col.kind });
            return colClass ? `<col class="${colClass}" />` : '<col />';
          })
          .join('')}</colgroup>`
      : '';

  const headCells = columns
    .map((col) => {
      const kind = col.kind ?? 'text';
      const angled = variant === 'numeric' && kind === 'numeric';
      return renderTableCell({
        text: col.header,
        kind,
        inTable: true,
        header: true,
        scope: 'col',
        angled,
        tabIndex: angled ? 0 : undefined,
      });
    })
    .join('');

  const thead = columns.length > 0 ? `<thead><tr>${headCells}</tr></thead>` : '';

  const colRowSpans: number[] = [];

  const bodyRows = rows
    .map((row) => {
      const rowCells = isRowObject(row) ? row.cells : row;
      const rowAttrs = isRowObject(row) ? row.attributes : undefined;
      const trClass = mergeTableClass('', rowAttrs);
      const trClassAttr = trClass ? ` class="${trClass}"` : '';
      const trExtraAttrs = serializeTableAttributes(rowAttrs, true);

      let colCursor = 0;
      const advancePastSpannedCols = () => {
        while ((colRowSpans[colCursor] ?? 0) > 0) {
          colRowSpans[colCursor] -= 1;
          colCursor += 1;
        }
      };

      const cells = rowCells
        .map((cell) => {
          advancePastSpannedCols();
          const col = columns[colCursor];

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

            return renderTableCell({
              text: cell.text,
              html: cell.html,
              kind,
              inTable: true,
              header: Boolean(cell.header),
              scope: cell.scope,
              colSpan: cell.colSpan,
              rowSpan: cell.rowSpan,
              attributes: cell.attributes,
            });
          }

          const colKind = col?.kind ?? 'text';
          const asRowHeader =
            variant === 'pair' && (colKind === 'index' || colCursor === 0) && colCursor === 0;
          colCursor += 1;

          return renderTableCell({
            text: cell,
            kind: asRowHeader ? 'index' : colKind,
            inTable: true,
            header: asRowHeader,
            scope: asRowHeader ? 'row' : undefined,
          });
        })
        .join('');

      for (let c = colCursor; c < colRowSpans.length; c += 1) {
        if (colRowSpans[c] > 0) colRowSpans[c] -= 1;
      }

      return `<tr${trClassAttr}${trExtraAttrs}>${cells}</tr>`;
    })
    .join('');

  const tbody = `<tbody>${bodyRows}</tbody>`;
  const content = `${caption}${colgroup}${thead}${tbody}`;

  return template.replace('{{className}}', className).replace('{{content}}', content);
};
