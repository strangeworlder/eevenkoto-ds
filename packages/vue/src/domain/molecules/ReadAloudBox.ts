import {
  readAloudBoxBodyClassNames,
  readAloudBoxClassNames,
  readAloudBoxOrnamentClassNames,
  type ReadAloudBoxProps,
} from '@eevenkoto/core';
import { defineComponent, h, type PropType } from 'vue';

export type { ReadAloudBoxProps };

export const ReadAloudBox = defineComponent({
  name: 'EevenkotoReadAloudBox',
  props: {
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
    ornament: {
      type: [String, Boolean] as PropType<ReadAloudBoxProps['ornament']>,
      default: '❖',
    },
    body: { type: String, default: undefined },
    bodyHtml: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const slot = slots.default?.();
      const bodyClass = readAloudBoxBodyClassNames();
      const body = slot?.length
        ? h('div', { class: bodyClass }, slot)
        : props.bodyHtml !== undefined
          ? h('div', { class: bodyClass, innerHTML: props.bodyHtml })
          : h('div', { class: bodyClass }, props.body ? [h('p', null, props.body)] : []);
      return h(
        'aside',
        { id: props.id, class: readAloudBoxClassNames(), 'aria-label': props.label },
        [
          props.ornament
            ? h(
                'span',
                { class: readAloudBoxOrnamentClassNames(), 'aria-hidden': 'true' },
                props.ornament as string,
              )
            : null,
          body,
        ],
      );
    };
  },
});