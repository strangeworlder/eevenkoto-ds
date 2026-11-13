import {
  listItemClassNames,
  type IconName,
  type ListItemProps,
  type ListItemStatus,
} from '@eevenkoto/core';
import { defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { Icon } from './Icon';

export type { ListItemProps, ListItemStatus };

const statusIconName = (status: ListItemStatus): IconName => {
  if (status === 'accent') return 'star';
  if (status === 'excluded') return 'close';
  return 'check';
};

export const ListItem = defineComponent({
  name: 'EevenkotoListItem',
  props: {
    text: { type: String, default: undefined },
    html: { type: String, default: undefined },
    status: { type: String as PropType<ListItemStatus>, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      if (!props.status) {
        if (slots.default) {
          return h('li', {}, slots.default());
        }
        if (props.html !== undefined) {
          return h('li', { innerHTML: props.html });
        }
        return h('li', {}, props.text ?? '');
      }

      const children: VNodeChild[] = [
        h(Icon, {
          name: statusIconName(props.status),
          size: 'sm',
          class: 'eevenkoto-list__icon',
        }),
      ];
      if (props.status === 'excluded') {
        children.push(h('span', { class: 'eevenkoto-visually-hidden' }, 'Excluded: '));
      }
      if (slots.default) {
        children.push(h('span', { class: 'eevenkoto-list__item-text' }, slots.default()));
      } else if (props.html !== undefined) {
        children.push(h('span', { class: 'eevenkoto-list__item-text', innerHTML: props.html }));
      } else {
        children.push(h('span', { class: 'eevenkoto-list__item-text' }, props.text ?? ''));
      }

      return h('li', { class: listItemClassNames(props.status) }, children);
    };
  },
});
