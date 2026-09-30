import {
  toastClassNames,
  defaultToastIcon,
  resolveToastAria,
  type ToastProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { Icon } from './Icon';

export type { ToastProps };

export const Toast = defineComponent({
  name: 'EevenkotoToast',
  props: {
    text: { type: String, default: undefined },
    intent: { type: String as PropType<ToastProps['intent']>, default: undefined },
    variant: { type: String as PropType<ToastProps['variant']>, default: undefined },
    icon: { type: String as PropType<ToastProps['icon']>, default: undefined },
    visible: { type: Boolean, default: true },
    placement: { type: String as PropType<ToastProps['placement']>, default: undefined },
    role: { type: String, default: undefined },
    ariaLive: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      toastClassNames({
        intent: props.intent,
        variant: props.variant,
        visible: props.visible,
        placement: props.placement,
      }),
    );

    const defaultAria = computed(() => resolveToastAria(props.intent));
    const iconName = computed(() => props.icon ?? defaultToastIcon(props.intent));

    return () => {
      const children: VNodeChild[] = [];

      if (iconName.value) {
        children.push(
          h(
            'span',
            { class: 'eevenkoto-toast__icon', 'aria-hidden': 'true' },
            h(Icon, { name: iconName.value }),
          ),
        );
      }

      const textContent = slots.default ? slots.default() : props.text;
      if (textContent) {
        children.push(h('span', { class: 'eevenkoto-toast__text' }, textContent));
      }

      return h(
        'div',
        {
          class: className.value,
          role: props.role ?? defaultAria.value.role,
          'aria-live': props.ariaLive ?? defaultAria.value.ariaLive,
        },
        children,
      );
    };
  },
});
