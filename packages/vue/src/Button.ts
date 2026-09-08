import {
  buttonClassNames,
  buttonIconPaths,
  resolveButtonIconPosition,
  type ButtonIconName,
  type ButtonProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { ButtonProps, ButtonIconName };

const ButtonIcon = defineComponent({
  name: 'EevenkotoButtonIcon',
  props: {
    name: { type: String as PropType<ButtonIconName>, required: true },
  },
  setup(props) {
    return () =>
      h(
        'svg',
        {
          class: 'eevenkoto-button__icon',
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 16 16',
          fill: 'currentColor',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        [h('path', { d: buttonIconPaths[props.name] })],
      );
  },
});

export const Button = defineComponent({
  name: 'EevenkotoButton',
  props: {
    variant: { type: String as PropType<ButtonProps['variant']>, required: true },
    label: { type: String, required: true },
    size: { type: String as PropType<ButtonProps['size']>, default: undefined },
    disabled: { type: Boolean, default: false },
    icon: { type: String as PropType<ButtonIconName>, default: undefined },
    iconPosition: {
      type: String as PropType<ButtonProps['iconPosition']>,
      default: undefined,
    },
  },
  setup(props) {
    const className = computed(() =>
      buttonClassNames({
        variant: props.variant,
        size: props.size,
        icon: props.icon,
        iconPosition: props.iconPosition,
      }),
    );

    return () => {
      const iconPosition = resolveButtonIconPosition({
        icon: props.icon,
        iconPosition: props.iconPosition,
      });

      const children: VNodeChild[] = [];
      let ariaLabel: string | undefined;

      if (props.icon && iconPosition) {
        const iconVNode = h(ButtonIcon, { name: props.icon });
        if (iconPosition === 'left') {
          children.push(iconVNode, props.label);
        } else if (iconPosition === 'right') {
          children.push(props.label, iconVNode);
        } else {
          children.push(iconVNode);
          ariaLabel = props.label;
        }
      } else {
        children.push(props.label);
      }

      return h(
        'button',
        {
          type: 'button',
          class: className.value,
          disabled: props.disabled || undefined,
          'aria-label': ariaLabel,
        },
        children,
      );
    };
  },
});
