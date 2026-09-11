import { badgeClassNames, type BadgeProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { BadgeProps };

export const Badge = defineComponent({
  name: 'EevenkotoBadge',
  props: {
    label: { type: String, required: true },
    variant: { type: String as PropType<BadgeProps['variant']>, default: undefined },
    intent: { type: String as PropType<BadgeProps['intent']>, default: undefined },
    size: { type: String as PropType<BadgeProps['size']>, default: undefined },
    shape: { type: String as PropType<BadgeProps['shape']>, default: undefined },
    dot: { type: Boolean, default: false },
  },
  setup(props) {
    const className = computed(() =>
      badgeClassNames({
        variant: props.variant,
        intent: props.intent,
        size: props.size,
        shape: props.shape,
      }),
    );

    return () => {
      const children = [];
      if (props.dot) {
        children.push(
          h('span', { class: 'eevenkoto-badge__dot', 'aria-hidden': 'true' }),
        );
      }
      children.push(h('span', { class: 'eevenkoto-badge__label' }, props.label));

      return h('span', { class: className.value }, children);
    };
  },
});
