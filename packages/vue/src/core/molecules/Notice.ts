import {
  defaultNoticeIcon,
  noticeClassNames,
  resolveNoticeRole,
  type NoticeProps,
  type NoticeRole,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { Icon } from '../atoms/Icon';

export type { NoticeProps, NoticeRole };

const BLOCK_TAG_RE = /^\s*<(?:p|ul|ol|div|dl|blockquote|table|figure|section|h[1-6])\b/i;

export const Notice = defineComponent({
  name: 'EevenkotoNotice',
  props: {
    intent: { type: String as PropType<NoticeProps['intent']>, default: undefined },
    variant: { type: String as PropType<NoticeProps['variant']>, default: undefined },
    title: { type: String, default: undefined },
    body: { type: String, default: undefined },
    bodyHtml: { type: String, default: undefined },
    icon: {
      type: [String, Boolean] as PropType<NoticeProps['icon']>,
      default: undefined,
    },
    role: {
      type: String as PropType<NoticeRole>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      noticeClassNames({ intent: props.intent, variant: props.variant }),
    );
    const resolvedRole = computed(() => resolveNoticeRole(props.intent, props.role));

    return () => {
      const contentChildren = [];
      if (props.title) {
        contentChildren.push(h('p', { class: 'eevenkoto-notice__title' }, props.title));
      }
      if (props.bodyHtml) {
        contentChildren.push(
          BLOCK_TAG_RE.test(props.bodyHtml)
            ? h('div', { class: 'eevenkoto-notice__body', innerHTML: props.bodyHtml })
            : h('p', { class: 'eevenkoto-notice__body', innerHTML: props.bodyHtml }),
        );
      } else if (props.body) {
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
      } else if (props.icon !== false) {
        const iconName = props.icon || defaultNoticeIcon(props.intent);
        children.push(
          h(
            'span',
            { class: 'eevenkoto-notice__icon', 'aria-hidden': 'true' },
            h(Icon, { name: iconName }),
          ),
        );
      }
      children.push(h('div', { class: 'eevenkoto-notice__content' }, contentChildren));

      return h('div', { class: className.value, role: resolvedRole.value }, children);
    };
  },
});
