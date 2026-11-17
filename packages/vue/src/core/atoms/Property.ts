import {
  propertyClassNames,
  propertyMetaClassNames,
  type PropertyProps,
  type PropertySpan,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { PropertyProps, PropertySpan };

export const Property = defineComponent({
  name: 'EevenkotoProperty',
  props: {
    id: { type: String, default: undefined },
    label: { type: String, required: true },
    value: { type: String, default: undefined },
    valueHtml: { type: String, default: undefined },
    meta: { type: [String, Array] as PropType<PropertyProps['meta']>, default: undefined },
    emphasized: { type: Boolean, default: false },
    span: { type: String as PropType<PropertySpan>, default: undefined },
    hidden: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      propertyClassNames({ emphasized: props.emphasized, span: props.span }),
    );

    return () => {
      const metaLines = (
        Array.isArray(props.meta) ? props.meta : props.meta ? [props.meta] : []
      ).filter(Boolean);
      const metaVNodes = metaLines.map((line, index) =>
        h('span', { class: propertyMetaClassNames(), key: `${line}-${index}` }, line),
      );

      let ddNode;
      if (slots.default) {
        ddNode = h('dd', { class: 'eevenkoto-property__value' }, [
          ...slots.default(),
          ...metaVNodes,
        ]);
      } else if (props.valueHtml !== undefined) {
        ddNode =
          metaVNodes.length > 0
            ? h('dd', { class: 'eevenkoto-property__value' }, [
                h('span', { innerHTML: props.valueHtml }),
                ...metaVNodes,
              ])
            : h('dd', { class: 'eevenkoto-property__value', innerHTML: props.valueHtml });
      } else {
        ddNode =
          metaVNodes.length > 0
            ? h('dd', { class: 'eevenkoto-property__value' }, [props.value ?? '', ...metaVNodes])
            : h('dd', { class: 'eevenkoto-property__value' }, props.value ?? '');
      }

      return h(
        'div',
        { id: props.id, hidden: props.hidden || undefined, class: className.value },
        [h('dt', { class: 'eevenkoto-property__label' }, props.label), ddNode],
      );
    };
  },
});
