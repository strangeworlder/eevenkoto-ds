import { cardClassNames, type CardProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type VNodeChild } from 'vue';

export type { CardProps };

export const Card = defineComponent({
  name: 'EevenkotoCard',
  props: {
    elevated: { type: Boolean, default: false },
    interactive: { type: Boolean, default: false },
    title: { type: String, default: undefined },
    body: { type: String, default: undefined },
    href: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      cardClassNames({ elevated: props.elevated, interactive: props.interactive }),
    );

    return () => {
      const children: VNodeChild[] = [];

      const header = slots.header ? slots.header() : props.title;
      if (header) {
        children.push(h('div', { class: 'eevenkoto-card__header' }, header));
      }

      const bodyChildren: VNodeChild[] = [];
      if (props.body) bodyChildren.push(h('p', props.body));
      if (slots.default) bodyChildren.push(slots.default());
      if (bodyChildren.length > 0) {
        children.push(h('div', { class: 'eevenkoto-card__body' }, bodyChildren));
      }

      if (slots.footer) {
        children.push(h('div', { class: 'eevenkoto-card__footer' }, slots.footer()));
      }

      return h(
        props.href ? 'a' : 'div',
        { class: className.value, href: props.href },
        children,
      );
    };
  },
});
