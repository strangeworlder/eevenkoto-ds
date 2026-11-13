import {
  tooltipCardBodyClassNames,
  tooltipCardClassNames,
  type TooltipCardProps,
  type TooltipCardTitleLevel,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { TooltipCardProps, TooltipCardTitleLevel };

export const TooltipCard = defineComponent({
  name: 'EevenkotoTooltipCard',
  props: {
    title: { type: String, default: undefined },
    titleLevel: { type: Number as PropType<TooltipCardTitleLevel>, default: 2 },
    body: { type: String, default: undefined },
    bodyHtml: { type: String, default: undefined },
    flush: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    const className = computed(() => tooltipCardClassNames({ flush: props.flush }));
    const bodyClassName = computed(() => tooltipCardBodyClassNames());

    return () => {
      const children: VNodeChild[] = [];
      const level: TooltipCardTitleLevel = props.titleLevel === 3 ? 3 : 2;

      if (slots.header) {
        children.push(h('header', slots.header()));
      } else if (props.title) {
        children.push(h('header', [h(`h${level}`, props.title)]));
      }

      if (slots.default) {
        children.push(h('div', { class: bodyClassName.value, tabindex: '0' }, slots.default()));
      } else if (props.bodyHtml) {
        children.push(
          h('div', { class: bodyClassName.value, tabindex: '0', innerHTML: props.bodyHtml }),
        );
      } else if (props.body) {
        children.push(
          h('div', { class: bodyClassName.value, tabindex: '0' }, [h('p', props.body)]),
        );
      }

      if (slots.footer) {
        children.push(h('footer', slots.footer()));
      }

      return h('div', { class: className.value }, children);
    };
  },
});
