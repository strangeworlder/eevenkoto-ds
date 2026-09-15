import {
  inputClassNames,
  inputFieldClassNames,
  type InputProps,
  type InputType,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { InputProps, InputType };

export const Input = defineComponent({
  name: 'EevenkotoInput',
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: undefined },
    type: { type: String as PropType<InputType>, default: undefined },
    value: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    size: { type: String as PropType<InputProps['size']>, default: undefined },
    ariaLabel: { type: String, default: undefined },
    describedBy: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    search: { type: Boolean, default: false },
  },
  emits: ['update:value'],
  setup(props, { emit, slots }) {
    const className = computed(() =>
      inputClassNames({ size: props.size, invalid: props.invalid, search: props.search }),
    );

    return () => {
      const children: VNodeChild[] = [];
      if (slots.icon) {
        children.push(h('span', { class: 'eevenkoto-input__icon' }, slots.icon()));
      }

      children.push(
        h('input', {
          class: inputFieldClassNames(),
          id: props.id,
          name: props.name,
          type: props.type ?? (props.search ? 'search' : 'text'),
          value: props.value,
          placeholder: props.placeholder,
          disabled: props.disabled || undefined,
          'aria-label': props.ariaLabel,
          'aria-describedby': props.describedBy,
          'aria-invalid': props.invalid ? 'true' : undefined,
          onInput: (event: Event) =>
            emit('update:value', (event.target as HTMLInputElement).value),
        }),
      );

      return h('span', { class: className.value }, children);
    };
  },
});
