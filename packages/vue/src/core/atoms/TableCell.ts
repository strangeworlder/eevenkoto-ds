import { tableCellClassNames, type TableCellKind } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export const TableCell = defineComponent({
  name: 'EevenkotoTableCell',
  props: {
    kind: { type: String as PropType<TableCellKind>, default: 'text' },
    header: { type: Boolean, default: false },
    angled: { type: Boolean, default: false },
    scope: { type: String as PropType<'col' | 'row'>, default: undefined },
    tabIndex: { type: Number, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() => tableCellClassNames({ kind: props.kind }));

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
          class: className.value,
          scope: props.header ? props.scope : undefined,
          tabindex: props.tabIndex,
        },
        content,
      );
    };
  },
});
