import {
  buttonClassNames,
  resolveButtonIconPosition,
  type ButtonIconName,
  type ButtonProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { Icon } from './Icon';

export type { ButtonProps, ButtonIconName };

export const Button = defineComponent({
  name: 'EevenkotoButton',
  props: {
    variant: { type: String as PropType<ButtonProps['variant']>, default: undefined },
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
        const iconVNode = h(Icon, { name: props.icon });
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
