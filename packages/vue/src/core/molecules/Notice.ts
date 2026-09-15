import { noticeClassNames, type NoticeProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { NoticeProps };

export const Notice = defineComponent({
  name: 'EevenkotoNotice',
  props: {
    intent: { type: String as PropType<NoticeProps['intent']>, default: undefined },
    variant: { type: String as PropType<NoticeProps['variant']>, default: undefined },
    title: { type: String, default: undefined },
    body: { type: String, default: undefined },
    role: {
      type: String as PropType<'status' | 'alert' | 'note' | 'region'>,
      default: 'status',
    },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      noticeClassNames({ intent: props.intent, variant: props.variant }),
    );

    return () => {
      const contentChildren = [];
      if (props.title) {
        contentChildren.push(h('p', { class: 'eevenkoto-notice__title' }, props.title));
      }
      if (props.body) {
        contentChildren.push(h('p', { class: 'eevenkoto-notice__body' }, props.body));
      }
      if (slots.default) {
        contentChildren.push(slots.default());
      }
      if (slots.actions) {
        contentChildren.push(h('div', { class: 'eevenkoto-notice__actions' }, slots.actions()));
      }

      const children = [];
      if (slots.icon) {
        children.push(
          h('span', { class: 'eevenkoto-notice__icon', 'aria-hidden': 'true' }, slots.icon()),
        );
      }
      children.push(h('div', { class: 'eevenkoto-notice__content' }, contentChildren));

      return h('aside', { class: className.value, role: props.role }, children);
    };
  },
});
