import {
  swatchButtonChevronClassNames,
  swatchButtonClassNames,
  swatchButtonContentClassNames,
  swatchButtonHintClassNames,
  swatchButtonLabelClassNames,
  swatchButtonRoleClassNames,
  type SwatchButtonProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type VNodeChild } from 'vue';
import { Icon } from '../atoms/Icon';

export type { SwatchButtonProps };

export const SwatchButton = defineComponent({
  name: 'EevenkotoSwatchButton',
  props: {
    id: { type: String, default: undefined },
    color: { type: String, required: true },
    roleLabel: { type: String, default: undefined },
    label: { type: String, required: true },
    hint: { type: String, default: undefined },
    expanded: { type: Boolean, default: undefined },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    controls: { type: String, default: undefined },
  },
  setup(props) {
    const className = computed(() =>
      swatchButtonClassNames({ active: props.active, expanded: props.expanded }),
    );

    return () => {
      const contentChildren: VNodeChild[] = [];
      if (props.roleLabel) {
        contentChildren.push(
          h('span', { class: swatchButtonRoleClassNames() }, props.roleLabel),
        );
      }
      contentChildren.push(h('span', { class: swatchButtonLabelClassNames() }, props.label));
      if (props.hint) {
        contentChildren.push(h('span', { class: swatchButtonHintClassNames() }, props.hint));
      }

      return h(
        'button',
        {
          id: props.id,
          type: 'button',
          class: className.value,
          style: { '--eevenkoto-swatch-button-color': props.color },
          'aria-expanded':
            props.expanded !== undefined ? (props.expanded ? 'true' : 'false') : undefined,
          'aria-controls': props.controls,
          disabled: props.disabled || undefined,
        },
        [
          h('span', { class: swatchButtonContentClassNames() }, contentChildren),
          h(Icon, { name: 'chevron-down', size: 'sm', class: swatchButtonChevronClassNames() }),
        ],
      );
    };
  },
});
