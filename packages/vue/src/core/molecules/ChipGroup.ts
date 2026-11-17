import {
  chipGroupActionClassNames,
  chipGroupClassNames,
  chipGroupHeaderClassNames,
  chipGroupLegendClassNames,
  chipGroupListClassNames,
  type ChipGroupProps,
} from '@eevenkoto/core';
import { defineComponent, h, type PropType } from 'vue';
import { Chip } from '../atoms/Chip';

export type { ChipGroupProps };

export const ChipGroup = defineComponent({
  name: 'EevenkotoChipGroup',
  props: {
    id: { type: String, default: undefined },
    label: { type: String, required: true },
    hideLegend: { type: Boolean, default: false },
    mode: { type: String as PropType<ChipGroupProps['mode']>, default: 'single' },
    size: { type: String as PropType<ChipGroupProps['size']>, default: 'sm' },
    hidden: { type: Boolean, default: false },
    options: { type: Array as PropType<ChipGroupProps['options']>, required: true },
  },
  emits: ['select'],
  setup(props, { emit, slots }) {
    return () => {
      const chips = props.options.map((opt) =>
        h(Chip, {
          key: opt.value,
          label: opt.label,
          selected: props.mode === 'action' ? false : opt.selected,
          disabled: opt.disabled,
          size: props.size,
          icon: opt.icon,
          swatchColor: opt.swatchColor,
          href: opt.href,
          'data-value': opt.value,
          title: opt.title,
          onClick: () => emit('select', opt.value),
          ...(opt.attributes ?? {}),
        }),
      );

      if (slots.headerAction) {
        const labelId = props.id ? `${props.id}-label` : undefined;
        return h(
          'div',
          {
            id: props.id,
            hidden: props.hidden || undefined,
            class: chipGroupClassNames(),
            role: 'group',
            'aria-labelledby': labelId,
            'aria-label': labelId ? undefined : props.label,
            'data-selection-mode': props.mode,
          },
          [
            h('div', { class: chipGroupHeaderClassNames() }, [
              h(
                'span',
                { id: labelId, class: chipGroupLegendClassNames(props.hideLegend) },
                props.label,
              ),
              h('div', { class: chipGroupActionClassNames() }, slots.headerAction()),
            ]),
            h('div', { class: chipGroupListClassNames() }, chips),
          ],
        );
      }

      return h(
        'fieldset',
        {
          id: props.id,
          hidden: props.hidden || undefined,
          class: chipGroupClassNames(),
          'data-selection-mode': props.mode,
        },
        [
          h('legend', { class: chipGroupLegendClassNames(props.hideLegend) }, props.label),
          h('div', { class: chipGroupListClassNames() }, chips),
        ],
      );
    };
  },
});
