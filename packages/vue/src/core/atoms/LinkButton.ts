import {
  linkButtonClassNames,
  resolveLinkButtonIconPosition,
  resolveLinkButtonRel,
  type ButtonIconName,
  type LinkButtonProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { Icon } from './Icon';

export type { LinkButtonProps, ButtonIconName };

export const LinkButton = defineComponent({
  name: 'EevenkotoLinkButton',
  props: {
    href: { type: String, required: true },
    variant: { type: String as PropType<LinkButtonProps['variant']>, default: undefined },
    label: { type: String, required: true },
    size: { type: String as PropType<LinkButtonProps['size']>, default: undefined },
    disabled: { type: Boolean, default: false },
    icon: { type: String as PropType<ButtonIconName>, default: undefined },
    iconPosition: {
      type: String as PropType<LinkButtonProps['iconPosition']>,
      default: undefined,
    },
    target: { type: String, default: undefined },
    rel: { type: String, default: undefined },
  },
  setup(props) {
    const className = computed(() =>
      linkButtonClassNames({
        variant: props.variant,
        size: props.size,
        icon: props.icon,
        iconPosition: props.iconPosition,
      }),
    );

    return () => {
      const iconPosition = resolveLinkButtonIconPosition({
        icon: props.icon,
        iconPosition: props.iconPosition,
      });
      const resolvedRel = resolveLinkButtonRel({ target: props.target, rel: props.rel });

      const children: VNodeChild[] = [];

      if (props.icon && iconPosition) {
        const iconVNode = h(Icon, { name: props.icon });
        if (iconPosition === 'left') {
          children.push(iconVNode, props.label);
        } else {
          children.push(props.label, iconVNode);
        }
      } else {
        children.push(props.label);
      }

      return h(
        'a',
        {
          class: className.value,
          href: props.disabled ? undefined : props.href,
          target: props.disabled ? undefined : props.target,
          rel: props.disabled ? undefined : resolvedRel,
          'aria-disabled': props.disabled || undefined,
          tabindex: props.disabled ? -1 : undefined,
        },
        children,
      );
    };
  },
});
