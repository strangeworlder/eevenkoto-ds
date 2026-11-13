import { contentTableClassNames, tableClassNames, type ContentTableProps } from '@eevenkoto/core';
import { renderNotice } from '../../../core/molecules/notice/renderNotice';
import { renderTable } from '../../../core/molecules/table/renderTable';

export type { ContentTableProps };

export const renderContentTable = (args: ContentTableProps): string => {
  const colCount = args.columns?.length ?? 1;
  const rows = args.rows.map((row) => {
    if (row.kind === 'locked') {
      return {
        attributes: { 'data-locked': true },
        cells: [
          {
            html: renderNotice(row.notice),
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
  const markup = renderTable({ ...args, rows });
  /* renderTable owns the <table> template; only the host class differs. */
  return markup.replace(
    `class="${tableClassNames(args)}"`,
    () => `class="${contentTableClassNames(args)}"`,
  );
};
