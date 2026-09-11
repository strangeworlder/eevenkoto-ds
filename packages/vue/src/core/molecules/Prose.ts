import { proseClassNames } from '@eevenkoto/core';
import { computed, defineComponent, h } from 'vue';

export const Prose = defineComponent({
  name: 'EevenkotoProse',
  setup(_props, { slots }) {
    const className = computed(() => proseClassNames());

    return () => h('div', { class: className.value }, slots.default?.());
  },
});
