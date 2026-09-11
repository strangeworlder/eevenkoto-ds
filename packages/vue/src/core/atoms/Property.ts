import { propertyClassNames, type PropertyProps } from '@eevenkoto/core';
import { computed, defineComponent, h } from 'vue';

export type { PropertyProps };

export const Property = defineComponent({
  name: 'EevenkotoProperty',
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  setup(props) {
    const className = computed(() => propertyClassNames());

    return () =>
      h('div', { class: className.value }, [
        h('dt', { class: 'eevenkoto-property__label' }, props.label),
        h('dd', { class: 'eevenkoto-property__value' }, props.value),
      ]);
  },
});
