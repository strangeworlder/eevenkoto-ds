import { statClassNames, type StatProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { StatProps };

export const Stat = defineComponent({
  name: 'EevenkotoStat',
  props: {
    value: { type: String, required: true },
    shape: { type: String as PropType<StatProps['shape']>, default: undefined },
    size: { type: String as PropType<StatProps['size']>, default: undefined },
    emphasis: { type: Boolean, default: false },
  },
  setup(props) {
    const className = computed(() =>
      statClassNames({
        shape: props.shape,
        size: props.size,
        emphasis: props.emphasis,
      }),
    );

    return () => h('span', { class: className.value }, props.value);
  },
});
