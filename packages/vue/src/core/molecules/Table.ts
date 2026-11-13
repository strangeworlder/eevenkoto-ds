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
import { computed, defineComponent, h, isVNode, type PropType, type VNodeChild } from 'vue';
import { mergeTableClass, normalizeTableAttributes, TableCell } from '../atoms/TableCell';

export type { TableCellObject, TableColumn, TableProps, TableStripe, TableVariant };

export type TableVueCellObject = TableCellObject & {
  node?: VNodeChild;
};

export type TableVueCellInput = VNodeChild | TableVueCellObject;

export interface TableVueRowObject {
  attributes?: TableElementAttributes;
  cells: TableVueCellInput[];
}

export type TableVueRowInput = TableVueCellInput[] | TableVueRowObject;

const isRowObject = (row: TableVueRowInput): row is TableVueRowObject =>
  !Array.isArray(row) &&
  typeof row === 'object' &&
  row !== null &&
  'cells' in row &&
  Array.isArray((row as TableVueRowObject).cells);

const isCellObject = (cell: TableVueCellInput): cell is TableVueCellObject =>
  typeof cell === 'object' && cell !== null && !Array.isArray(cell) && !isVNode(cell);

export const Table = defineComponent({
  name: 'EevenkotoTable',
  props: {
    variant: { type: String as PropType<TableVariant>, default: 'default' },
    stripe: { type: String as PropType<TableStripe>, default: 'row' },
    caption: { type: String, default: undefined },
    columns: { type: Array as PropType<TableColumn[]>, required: true },
    rows: { type: Array as PropType<TableVueRowInput[]>, required: true },
  },
  setup(props) {
    const className = computed(() =>
      tableClassNames({ variant: props.variant, stripe: props.stripe }),
    );

    return () => {
      const variant = props.variant ?? 'default';
      const columns = props.columns ?? [];
      const rows = props.rows ?? [];

      const captionNode = props.caption ? h('caption', null, props.caption) : null;

      const colgroup =
        columns.length > 0
          ? h(
              'colgroup',
              null,
              columns.map((col) => {
                const colClass = tableColClassNames({ kind: col.kind });
                /* Vue renders class="" for an empty value, so drop the key instead. */
                return h('col', { key: col.key, ...(colClass ? { class: colClass } : {}) });
              }),
            )
          : null;

      const thead =
        columns.length > 0
          ? h('thead', null, [
              h(
                'tr',
                null,
                columns.map((col) => {
                  const kind = col.kind ?? 'text';
                  const angled = variant === 'numeric' && kind === 'numeric';
                  return h(
                    TableCell,
                    {
                      key: col.key,
                      header: true,
                      inTable: true,
                      scope: 'col',
                      kind,
                      angled,
                      tabIndex: angled ? 0 : undefined,
                    },
                    () => col.header,
                  );
                }),
              ),
            ])
          : null;

      const colRowSpans: number[] = [];

      const tbody = h(
        'tbody',
        null,
        rows.map((row, rowIndex) => {
          const rowCells = isRowObject(row) ? row.cells : row;
          const rowAttrs = isRowObject(row) ? row.attributes : undefined;
          const trClass = mergeTableClass('', rowAttrs);
          const trProps: Record<string, unknown> = {
            key: rowIndex,
            ...(trClass ? { class: trClass } : {}),
            ...normalizeTableAttributes(rowAttrs, true),
          };

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

              return h(
                TableCell,
                {
                  key: cellKey,
                  header: Boolean(cell.header),
                  inTable: true,
                  scope: cell.scope,
                  kind,
                  colSpan: cell.colSpan,
                  rowSpan: cell.rowSpan,
                  html: cell.html,
                  text: cell.text,
                  attributes: cell.attributes,
                },
                cell.node !== undefined ? () => cell.node : undefined,
              );
            }

            const colKind = col?.kind ?? 'text';
            const asRowHeader = variant === 'pair' && colCursor === 0;
            colCursor += 1;

            return h(
              TableCell,
              {
                key: cellKey,
                header: asRowHeader,
                inTable: true,
                scope: asRowHeader ? 'row' : undefined,
                kind: asRowHeader ? 'index' : colKind,
              },
              () => cell ?? '',
            );
          });

          for (let c = colCursor; c < colRowSpans.length; c += 1) {
            if (colRowSpans[c] > 0) colRowSpans[c] -= 1;
          }

          return h('tr', trProps, renderedCells);
        }),
      );

      return h('table', { class: className.value }, [captionNode, colgroup, thead, tbody]);
    };
  },
});
