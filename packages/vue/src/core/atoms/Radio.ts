import {
  radioBadgeClassNames,
  radioClassNames,
  radioContentClassNames,
  radioControlClassNames,
  radioDescriptionClassNames,
  radioTitleClassNames,
  type RadioProps,
  type RadioSize,
  type RadioVariant,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { RadioProps };

export const Radio = defineComponent({
  name: 'EevenkotoRadio',
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: undefined },
    value: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, default: undefined },
    badge: { type: String, default: undefined },
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    variant: { type: String as PropType<RadioVariant>, default: undefined },
    card: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    size: { type: String as PropType<RadioSize>, default: undefined },
    ariaLabel: { type: String, default: undefined },
    ariaDescribedBy: { type: String, default: undefined },
  },
  emits: ['update:checked', 'change'],
  setup(props, { emit, slots }) {
    const className = computed(() =>
      radioClassNames({
        variant: props.variant,
        card: props.card,
        size: props.size,
        invalid: props.invalid,
        disabled: props.disabled,
      }),
    );

    return () => {
      const contentChildren: VNodeChild[] = [
        h('strong', { class: radioTitleClassNames() }, props.label),
      ];

      if (props.description) {
        contentChildren.push(
          h('span', { class: radioDescriptionClassNames() }, props.description),
        );
      }

      const children: VNodeChild[] = [
        h('input', {
          class: radioControlClassNames(),
          type: 'radio',
          id: props.id,
          name: props.name,
          value: props.value,
          checked: props.checked,
          disabled: props.disabled || undefined,
          'aria-label': props.ariaLabel,
          'aria-describedby': props.ariaDescribedBy,
          'aria-invalid': props.invalid ? 'true' : undefined,
          onChange: () => {
            emit('update:checked', true);
            emit('change', props.value);
          },
        }),
        h('span', { class: radioContentClassNames() }, contentChildren),
      ];

      if (slots.badge) {
        children.push(h('span', { class: radioBadgeClassNames() }, slots.badge()));
      } else if (props.badge) {
        children.push(h('span', { class: radioBadgeClassNames() }, props.badge));
      }

      return h('label', { class: className.value }, children);
    };
  },
});
