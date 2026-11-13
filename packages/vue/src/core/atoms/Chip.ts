import { chipClassNames, type ChipProps, type IconName } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { Icon } from './Icon';
import { Swatch } from './Swatch';

export type { ChipProps };

export const Chip = defineComponent({
  name: 'EevenkotoChip',
  props: {
    label: { type: String, required: true },
    selected: { type: Boolean, default: false },
    size: { type: String as PropType<ChipProps['size']>, default: undefined },
    icon: { type: String as PropType<IconName>, default: undefined },
    swatchColor: { type: String, default: undefined },
    href: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  setup(props) {
    const className = computed(() =>
      chipClassNames({ selected: props.selected, size: props.size }),
    );

    return () => {
      const hasLeading = Boolean(props.swatchColor || props.icon);
      const children: VNodeChild = hasLeading
        ? [
            ...(props.swatchColor ? [h(Swatch, { color: props.swatchColor, size: 'sm' })] : []),
            ...(props.icon ? [h(Icon, { name: props.icon, size: 'sm' })] : []),
            h('span', { class: 'eevenkoto-chip__label' }, props.label),
          ]
        : props.label;

      if (props.href) {
        return h(
          'a',
          {
            class: className.value,
            href: props.disabled ? undefined : props.href,
            'aria-disabled': props.disabled ? 'true' : undefined,
            'aria-pressed': props.selected ? 'true' : undefined,
          },
          children,
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
        children,
      );
    };
  },
});
