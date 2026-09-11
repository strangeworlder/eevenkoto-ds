import type { ListItemProps } from '@eevenkoto/core';
import { defineComponent, h } from 'vue';

export type { ListItemProps };

export const ListItem = defineComponent({
  name: 'EevenkotoListItem',
  props: {
    text: { type: String, required: true },
  },
  setup(props) {
    return () => h('li', {}, props.text);
  },
});
