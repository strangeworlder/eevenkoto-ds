import { flowClassNames, type FlowDensity, type FlowProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { FlowDensity, FlowProps };

export const Flow = defineComponent({
  name: 'EevenkotoFlow',
  props: {
    density: { type: String as PropType<FlowDensity>, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() => flowClassNames({ density: props.density }));

    return () => h('div', { class: className.value }, slots.default?.());
  },
});
