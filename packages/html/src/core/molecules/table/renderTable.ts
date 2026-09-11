import {
  tableCaptionClassNames,
  tableClassNames,
  tableColClassNames,
  type TableColumn,
  type TableProps,
  type TableStripe,
  type TableVariant,
} from '@eevenkoto/core';
import { escapeHtml } from '../../../utils/html';
import { renderTableCell } from '../../atoms/table-cell/renderTableCell';
import template from './Table.html';

export type { TableColumn, TableProps, TableStripe, TableVariant };

export const renderTable = (args: TableProps): string => {
  const variant = args.variant ?? 'default';
  const className = tableClassNames(args);
  const columns = args.columns ?? [];
  const rows = args.rows ?? [];

  const caption = args.caption
    ? `<caption class="${tableCaptionClassNames()}">${escapeHtml(args.caption)}</caption>`
    : '';

  const colgroup =
    columns.length > 0
      ? `<colgroup>${columns
          .map((col) => `<col class="${tableColClassNames({ kind: col.kind })}" />`)
          .join('')}</colgroup>`
      : '';

  const headCells = columns
    .map((col) => {
      const kind = col.kind ?? 'text';
      const angled = variant === 'numeric' && kind === 'numeric';
      return renderTableCell({
        text: col.header,
        kind,
        header: true,
        scope: 'col',
        angled,
        tabIndex: angled ? 0 : undefined,
      });
    })
    .join('');

  const thead = columns.length > 0 ? `<thead><tr>${headCells}</tr></thead>` : '';

  const bodyRows = rows
    .map((row) => {
      const cells = columns
        .map((col, index) => {
          const kind = col.kind ?? 'text';
          const text = row[index] ?? '';
          const asRowHeader =
            variant === 'pair' && (kind === 'index' || index === 0) && index === 0;

          return renderTableCell({
            text,
            kind: asRowHeader ? 'index' : kind,
            header: asRowHeader,
            scope: asRowHeader ? 'row' : undefined,
          });
        })
        .join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');

  const tbody = `<tbody>${bodyRows}</tbody>`;
  const content = `${caption}${colgroup}${thead}${tbody}`;

  return template.replace('{{className}}', className).replace('{{content}}', content);
};
