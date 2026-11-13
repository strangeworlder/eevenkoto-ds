import {
  chipGroupClassNames,
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
  setup(props, { emit }) {
    return () =>
      h(
        'fieldset',
        {
          id: props.id,
          hidden: props.hidden || undefined,
          class: chipGroupClassNames(),
          'data-selection-mode': props.mode,
        },
        [
          h('legend', { class: chipGroupLegendClassNames(props.hideLegend) }, props.label),
          h(
            'div',
            { class: chipGroupListClassNames() },
            props.options.map((opt) =>
              h(Chip, {
                key: opt.value,
                label: opt.label,
                selected: opt.selected,
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
            ),
          ),
        ],
      );
  },
});
