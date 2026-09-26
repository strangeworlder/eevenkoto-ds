import { cardClassNames, type CardProps, type CardTitleLevel } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { CardProps, CardTitleLevel };

export const Card = defineComponent({
  name: 'EevenkotoCard',
  props: {
    elevated: { type: Boolean, default: false },
    interactive: { type: Boolean, default: false },
    title: { type: String, default: undefined },
    titleLevel: { type: Number as PropType<CardTitleLevel>, default: 2 },
    body: { type: String, default: undefined },
    href: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      cardClassNames({
        elevated: props.elevated,
        interactive: props.interactive || Boolean(props.href),
      }),
    );

    return () => {
      const children: VNodeChild[] = [];
      const level: CardTitleLevel = props.titleLevel === 3 ? 3 : 2;

      if (slots.header) {
        children.push(h('header', slots.header()));
      } else if (props.title) {
        children.push(h('header', [h(`h${level}`, props.title)]));
      }

      if (props.body) children.push(h('p', props.body));
      if (slots.default) children.push(slots.default());

      if (slots.footer) {
        children.push(h('footer', slots.footer()));
      }

      const inner = props.href ? [h('a', { href: props.href }, children)] : children;

      return h('article', { class: className.value }, inner);
    };
  },
});
