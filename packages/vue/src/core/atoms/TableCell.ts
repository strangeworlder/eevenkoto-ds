import {
  tableCellClassNames,
  type TableCellKind,
  type TableCellProps,
  type TableCellScope,
  type TableElementAttributes,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { TableCellKind, TableCellProps, TableCellScope, TableElementAttributes };

const SAFE_ATTR_NAME_RE = /^[a-zA-Z_:][a-zA-Z0-9_.:-]*$/;

export const normalizeTableAttributes = (
  attrs?: TableElementAttributes,
  omitClass = false,
): Record<string, string | number | boolean> => {
  const out: Record<string, string | number | boolean> = {};
  if (!attrs) return out;
  for (const [name, value] of Object.entries(attrs)) {
    if (value === undefined || value === false) continue;
    if (omitClass && name === 'class') continue;
    if (!SAFE_ATTR_NAME_RE.test(name) || /^on/i.test(name)) continue;
    out[name] = value === true && name.startsWith('data-') ? '' : value;
  }
  return out;
};

export const mergeTableClass = (base: string, attrs?: TableElementAttributes): string => {
  const extra = typeof attrs?.class === 'string' ? attrs.class.trim() : '';
  return [base, extra].filter(Boolean).join(' ');
};

export const TableCell = defineComponent({
  name: 'EevenkotoTableCell',
  props: {
    kind: { type: String as PropType<TableCellKind>, default: 'text' },
    text: { type: String, default: undefined },
    html: { type: String, default: undefined },
    header: { type: Boolean, default: false },
    angled: { type: Boolean, default: false },
    /** Cell sits inside a `.eevenkoto-table` host, which already styles bare `th` / `td`. */
    inTable: { type: Boolean, default: false },
    scope: { type: String as PropType<TableCellScope>, default: undefined },
    colSpan: { type: Number, default: undefined },
    rowSpan: { type: Number, default: undefined },
    tabIndex: { type: Number, default: undefined },
    attributes: { type: Object as PropType<TableElementAttributes>, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      tableCellClassNames({ kind: props.kind, inTable: props.inTable }),
    );

    return () => {
      const kind = props.kind ?? 'text';
      const cls = mergeTableClass(className.value, props.attributes);
      const wrapHeadLabel = props.angled && props.header && kind === 'numeric';
      const tag = props.header ? 'th' : 'td';

      const baseAttrs: Record<string, unknown> = {
        /* Vue renders class="" for an empty value, so drop the key instead. */
        ...(cls ? { class: cls } : {}),
        scope: props.scope,
        colspan: props.colSpan,
        rowspan: props.rowSpan,
        tabindex: props.tabIndex,
        ...normalizeTableAttributes(props.attributes, true),
      };

      if (slots.default) {
        const children = slots.default();
        const content = wrapHeadLabel
          ? h('span', { class: 'eevenkoto-table-cell__head-label' }, children)
          : children;
        return h(tag, baseAttrs, content);
      }

      if (props.html !== undefined) {
        if (wrapHeadLabel) {
          return h(tag, baseAttrs, [
            h('span', { class: 'eevenkoto-table-cell__head-label', innerHTML: props.html }),
          ]);
        }
        return h(tag, { ...baseAttrs, innerHTML: props.html });
      }

      const textContent = props.text ?? '';
      const content = wrapHeadLabel
        ? h('span', { class: 'eevenkoto-table-cell__head-label' }, textContent)
        : textContent;

      return h(tag, baseAttrs, content);
    };
  },
});
