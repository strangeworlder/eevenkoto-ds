import { scrollClassNames, type ScrollProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { ScrollProps };

export const Scroll = defineComponent({
  name: 'EevenkotoScroll',
  props: {
    axis: { type: String as PropType<ScrollProps['axis']>, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() => scrollClassNames({ axis: props.axis }));
    return () => h('div', { class: className.value }, slots.default?.());
  },
});
