import { statusDotClassNames, type StatusDotIntent, type StatusDotProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { StatusDotProps };

export const StatusDot = defineComponent({
  name: 'EevenkotoStatusDot',
  props: {
    intent: { type: String as PropType<StatusDotIntent>, default: undefined },
    label: { type: String, required: true },
  },
  setup(props) {
    const className = computed(() => statusDotClassNames({ intent: props.intent }));

    return () =>
      h('span', { class: className.value, role: 'img', 'aria-label': props.label });
  },
});
