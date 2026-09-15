import {
  tooltipCardBodyClassNames,
  tooltipCardClassNames,
  type TooltipCardProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type VNodeChild } from 'vue';

export type { TooltipCardProps };

export const TooltipCard = defineComponent({
  name: 'EevenkotoTooltipCard',
  props: {
    title: { type: String, default: undefined },
    body: { type: String, default: undefined },
    scrollBody: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const className = computed(() => tooltipCardClassNames());
    const bodyClassName = computed(() => tooltipCardBodyClassNames(props.scrollBody));

    return () => {
      const children: VNodeChild[] = [];

      const header = slots.header ? slots.header() : props.title;
      if (header) {
        children.push(h('div', { class: 'eevenkoto-tooltip-card__header' }, header));
      }

      const bodyChildren: VNodeChild[] = [];
      if (props.body) bodyChildren.push(h('p', props.body));
      if (slots.default) bodyChildren.push(slots.default());
      if (bodyChildren.length > 0) {
        children.push(h('div', { class: bodyClassName.value }, bodyChildren));
      }

      if (slots.footer) {
        children.push(h('div', { class: 'eevenkoto-tooltip-card__footer' }, slots.footer()));
      }

      return h('div', { class: className.value }, children);
    };
  },
});
