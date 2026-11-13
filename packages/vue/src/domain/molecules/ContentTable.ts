import type { ContentTableProps } from '@eevenkoto/core';
import { defineComponent, h, type PropType } from 'vue';
import { Notice } from '../../core/molecules/Notice';
import { Table, type TableVueRowInput } from '../../core/molecules/Table';

export type { ContentTableProps };

export const ContentTable = defineComponent({
  name: 'EevenkotoContentTable',
  props: {
    variant: { type: String as PropType<ContentTableProps['variant']>, default: 'default' },
    stripe: { type: String as PropType<ContentTableProps['stripe']>, default: 'row' },
    caption: { type: String, default: undefined },
    columns: { type: Array as PropType<ContentTableProps['columns']>, required: true },
    rows: { type: Array as PropType<ContentTableProps['rows']>, required: true },
  },
  setup(props) {
    return () => {
      const colCount = props.columns?.length ?? 1;
      const mapped: TableVueRowInput[] = props.rows.map((row) => {
        if (row.kind === 'locked') {
          return {
            attributes: { 'data-locked': true },
            cells: [
              {
                node: h(Notice, row.notice as never),
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
          cells: row.cells as never,
        };
      });
      return h(Table, {
        variant: props.variant,
        stripe: props.stripe,
        caption: props.caption,
        columns: props.columns,
        rows: mapped,
        class: 'eevenkoto-content-table',
      });
    };
  },
});