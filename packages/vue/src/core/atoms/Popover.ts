import { popoverClassNames, type PopoverProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { PopoverProps };

export const Popover = defineComponent({
  name: 'EevenkotoPopover',
  props: {
    placement: {
      type: String as PropType<PopoverProps['placement']>,
      default: undefined,
    },
    arrow: { type: Boolean, default: false },
    fixed: { type: Boolean, default: false },
    open: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    role: {
      type: String as PropType<'dialog' | 'tooltip' | 'note' | 'group'>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      popoverClassNames({
        placement: props.placement,
        fixed: props.fixed,
        open: props.open,
      }),
    );

    return () => {
      const children: VNodeChild[] = [];
      if (slots.default) children.push(slots.default());
      if (props.arrow) children.push(h('span', { class: 'eevenkoto-popover__arrow' }));

      return h(
        'div',
        {
          class: className.value,
          role: props.role,
          'aria-label': props.label,
          'data-open': props.fixed && props.open ? 'true' : undefined,
        },
        children,
      );
    };
  },
});
