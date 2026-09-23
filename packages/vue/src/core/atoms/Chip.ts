import { chipClassNames, type ChipProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { ChipProps };

export const Chip = defineComponent({
  name: 'EevenkotoChip',
  props: {
    label: { type: String, required: true },
    selected: { type: Boolean, default: false },
    size: { type: String as PropType<ChipProps['size']>, default: undefined },
    href: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  setup(props) {
    const className = computed(() =>
      chipClassNames({ selected: props.selected, size: props.size }),
    );

    return () => {
      if (props.href) {
        return h(
          'a',
          {
            class: className.value,
            href: props.disabled ? undefined : props.href,
            'aria-disabled': props.disabled ? 'true' : undefined,
            'aria-pressed': props.selected ? 'true' : undefined,
          },
          props.label,
        );
      }

      return h(
        'button',
        {
          type: 'button',
          class: className.value,
          disabled: props.disabled || undefined,
          'aria-pressed': props.selected ? 'true' : undefined,
        },
        props.label,
      );
    };
  },
});
