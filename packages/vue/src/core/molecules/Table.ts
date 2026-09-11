import {
  tableCaptionClassNames,
  tableClassNames,
  tableColClassNames,
  type TableColumn,
  type TableProps,
  type TableStripe,
  type TableVariant,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { TableCell } from '../atoms/TableCell';

export type { TableColumn, TableProps, TableStripe, TableVariant };

export const Table = defineComponent({
  name: 'EevenkotoTable',
  props: {
    variant: { type: String as PropType<TableVariant>, default: 'default' },
    stripe: { type: String as PropType<TableStripe>, default: 'row' },
    caption: { type: String, default: undefined },
    columns: { type: Array as PropType<TableColumn[]>, required: true },
    rows: { type: Array as PropType<string[][]>, required: true },
  },
  setup(props) {
    const className = computed(() =>
      tableClassNames({ variant: props.variant, stripe: props.stripe }),
    );

    return () => {
      const variant = props.variant ?? 'default';
      const columns = props.columns ?? [];
      const rows = props.rows ?? [];

      const captionNode = props.caption
        ? h('caption', { class: tableCaptionClassNames() }, props.caption)
        : null;

      const colgroup =
        columns.length > 0
          ? h(
              'colgroup',
              null,
              columns.map((col) =>
                h('col', { key: col.key, class: tableColClassNames({ kind: col.kind }) }),
              ),
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

      const tbody = h(
        'tbody',
        null,
        rows.map((row, rowIndex) =>
          h(
            'tr',
            { key: rowIndex },
            columns.map((col, index) => {
              const kind = col.kind ?? 'text';
              const asRowHeader = variant === 'pair' && index === 0;
              return h(
                TableCell,
                {
                  key: col.key,
                  header: asRowHeader,
                  scope: asRowHeader ? 'row' : undefined,
                  kind: asRowHeader ? 'index' : kind,
                },
                () => row[index] ?? '',
              );
            }),
          ),
        ),
      );

      return h('table', { class: className.value }, [captionNode, colgroup, thead, tbody]);
    };
  },
});
