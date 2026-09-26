import { tableCellClassNames, type TableCellKind } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export const TableCell = defineComponent({
  name: 'EevenkotoTableCell',
  props: {
    kind: { type: String as PropType<TableCellKind>, default: 'text' },
    header: { type: Boolean, default: false },
    angled: { type: Boolean, default: false },
    /** Cell sits inside a `.eevenkoto-table` host, which already styles bare `th` / `td`. */
    inTable: { type: Boolean, default: false },
    scope: { type: String as PropType<'col' | 'row'>, default: undefined },
    tabIndex: { type: Number, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      tableCellClassNames({ kind: props.kind, inTable: props.inTable }),
    );

    return () => {
      const kind = props.kind ?? 'text';
      const children = slots.default?.();
      const content =
        props.angled && props.header && kind === 'numeric'
          ? h('span', { class: 'eevenkoto-table-cell__head-label' }, children)
          : children;

      const tag = props.header ? 'th' : 'td';
      return h(
        tag,
        {
          /* Vue renders class="" for an empty value, so drop the key instead. */
          ...(className.value ? { class: className.value } : {}),
          scope: props.header ? props.scope : undefined,
          tabindex: props.tabIndex,
        },
        content,
      );
    };
  },
});
