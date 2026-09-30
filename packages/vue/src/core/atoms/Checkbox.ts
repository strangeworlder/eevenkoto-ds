import {
  checkboxBadgeClassNames,
  checkboxClassNames,
  checkboxContentClassNames,
  checkboxControlClassNames,
  checkboxDescriptionClassNames,
  checkboxTitleClassNames,
  type CheckboxProps,
  type CheckboxSize,
  type CheckboxVariant,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { CheckboxProps };

export const Checkbox = defineComponent({
  name: 'EevenkotoCheckbox',
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: undefined },
    value: { type: String, default: undefined },
    label: { type: String, required: true },
    description: { type: String, default: undefined },
    badge: { type: String, default: undefined },
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    variant: { type: String as PropType<CheckboxVariant>, default: undefined },
    card: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    size: { type: String as PropType<CheckboxSize>, default: undefined },
    ariaLabel: { type: String, default: undefined },
    ariaDescribedBy: { type: String, default: undefined },
  },
  emits: ['update:checked', 'change'],
  setup(props, { emit, slots }) {
    const className = computed(() =>
      checkboxClassNames({
        variant: props.variant,
        card: props.card,
        size: props.size,
        invalid: props.invalid,
        disabled: props.disabled,
      }),
    );

    return () => {
      const contentChildren: VNodeChild[] = [
        h('strong', { class: checkboxTitleClassNames() }, props.label),
      ];

      if (props.description) {
        contentChildren.push(
          h('span', { class: checkboxDescriptionClassNames() }, props.description),
        );
      }

      const children: VNodeChild[] = [
        h('input', {
          class: checkboxControlClassNames(),
          type: 'checkbox',
          id: props.id,
          name: props.name,
          value: props.value,
          checked: props.checked,
          disabled: props.disabled || undefined,
          'aria-label': props.ariaLabel,
          'aria-describedby': props.ariaDescribedBy,
          'aria-invalid': props.invalid ? 'true' : undefined,
          onChange: (event: Event) => {
            const val = (event.target as HTMLInputElement).checked;
            emit('update:checked', val);
            emit('change', val);
          },
        }),
        h('span', { class: checkboxContentClassNames() }, contentChildren),
      ];

      if (slots.badge) {
        children.push(h('span', { class: checkboxBadgeClassNames() }, slots.badge()));
      } else if (props.badge) {
        children.push(h('span', { class: checkboxBadgeClassNames() }, props.badge));
      }

      return h('label', { class: className.value }, children);
    };
  },
});
