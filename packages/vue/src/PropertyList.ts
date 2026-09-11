import { propertyListClassNames, type PropertyItem, type PropertyListProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { Property } from './Property';

export type { PropertyItem, PropertyListProps };

export const PropertyList = defineComponent({
  name: 'EevenkotoPropertyList',
  props: {
    items: { type: Array as PropType<PropertyItem[]>, required: true },
  },
  setup(props) {
    const className = computed(() => propertyListClassNames());

    return () =>
      h(
        'dl',
        { class: className.value },
        props.items.map((item) =>
          h(Property, { label: item.label, value: item.value, key: `${item.label}-${item.value}` }),
        ),
      );
  },
});
