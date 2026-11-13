import {
  floatingBannerActionsClassNames,
  floatingBannerBodyClassNames,
  floatingBannerClassNames,
  type FloatingBannerProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { Button } from '../atoms/Button';

export type { FloatingBannerProps };

export const FloatingBanner = defineComponent({
  name: 'EevenkotoFloatingBanner',
  props: {
    id: { type: String, default: undefined },
    open: { type: Boolean, default: false },
    placement: { type: String as PropType<FloatingBannerProps['placement']>, default: undefined },
    ariaLabel: { type: String, required: true },
    body: { type: String, default: undefined },
    bodyHtml: { type: String, default: undefined },
    secondaryLink: {
      type: Object as PropType<FloatingBannerProps['secondaryLink']>,
      default: undefined,
    },
    confirmLabel: { type: String, default: undefined },
    confirmId: { type: String, default: undefined },
  },
  emits: ['confirm'],
  setup(props, { slots, emit }) {
    const className = computed(() =>
      floatingBannerClassNames({ open: props.open, placement: props.placement }),
    );

    return () => {
      const bodyContent = slots.default
        ? slots.default()
        : props.bodyHtml !== undefined
          ? [h('span', { innerHTML: props.bodyHtml })]
          : [props.body ?? ''];
      const link = props.secondaryLink
        ? [' ', h('a', { href: props.secondaryLink.href }, props.secondaryLink.label)]
        : [];
      const actions = slots.actions
        ? slots.actions()
        : props.confirmLabel
          ? [
              h(Button, {
                label: props.confirmLabel,
                size: 'sm',
                id: props.confirmId,
                onClick: () => emit('confirm'),
              }),
            ]
          : [];

      return h(
        'aside',
        { id: props.id, class: className.value, 'aria-label': props.ariaLabel },
        [
          h('div', { class: floatingBannerBodyClassNames() }, [...bodyContent, ...link]),
          h('div', { class: floatingBannerActionsClassNames() }, actions),
        ],
      );
    };
  },
});
