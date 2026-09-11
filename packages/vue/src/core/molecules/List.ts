import {
  listClassNames,
  type ListItemProps,
  type ListProps,
  type ListSize,
  type ListTone,
  type ListVariant,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { ListItem } from '../atoms/ListItem';

export type { ListItemProps, ListProps };

export const List = defineComponent({
  name: 'EevenkotoList',
  props: {
    items: { type: Array as PropType<ListItemProps[]>, required: true },
    variant: { type: String as PropType<ListVariant>, default: undefined },
    size: { type: String as PropType<ListSize>, default: undefined },
    tone: { type: String as PropType<ListTone>, default: undefined },
  },
  setup(props) {
    const className = computed(() =>
      listClassNames({
        variant: props.variant,
        size: props.size,
        tone: props.tone,
      }),
    );

    return () => {
      const tag = (props.variant ?? 'unordered') === 'ordered' ? 'ol' : 'ul';
      return h(
        tag,
        { class: className.value },
        props.items.map((item) => h(ListItem, { text: item.text, key: item.text })),
      );
    };
  },
});
