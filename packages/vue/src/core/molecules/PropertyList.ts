import {
  propertyListClassNames,
  type PropertyItem,
  type PropertyListColumns,
  type PropertyListLayout,
  type PropertyListProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { Property } from '../atoms/Property';

export type { PropertyItem, PropertyListColumns, PropertyListLayout, PropertyListProps };

export const PropertyList = defineComponent({
  name: 'EevenkotoPropertyList',
  props: {
    items: { type: Array as PropType<PropertyItem[]>, required: true },
    layout: { type: String as PropType<PropertyListLayout>, default: undefined },
    columns: { type: Number as PropType<PropertyListColumns>, default: undefined },
  },
  setup(props) {
    const className = computed(() =>
      propertyListClassNames({ layout: props.layout, columns: props.columns }),
    );

    return () =>
      h(
        'dl',
        { class: className.value },
        props.items.map((item, index) =>
          h(Property, {
            label: item.label,
            value: item.value,
            valueHtml: item.valueHtml,
            meta: item.meta,
            key: `${item.label}-${index}`,
          }),
        ),
      );
  },
});
