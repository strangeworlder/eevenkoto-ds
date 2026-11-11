import { propertyClassNames, type PropertyProps } from '@eevenkoto/core';
import { computed, defineComponent, h } from 'vue';

export type { PropertyProps };

export const Property = defineComponent({
  name: 'EevenkotoProperty',
  props: {
    label: { type: String, required: true },
    value: { type: String, default: undefined },
    valueHtml: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() => propertyClassNames());

    return () =>
      h('div', { class: className.value }, [
        h('dt', { class: 'eevenkoto-property__label' }, props.label),
        slots.default
          ? h('dd', { class: 'eevenkoto-property__value' }, slots.default())
          : props.valueHtml !== undefined
            ? h('dd', { class: 'eevenkoto-property__value', innerHTML: props.valueHtml })
            : h('dd', { class: 'eevenkoto-property__value' }, props.value ?? ''),
      ]);
  },
});
