import {
  selectClassNames,
  selectFieldClassNames,
  selectIconClassNames,
  type SelectOption,
  type SelectOptionGroup,
  type SelectProps,
  type SelectSize,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { Icon } from './Icon';

export type { SelectProps, SelectOption, SelectOptionGroup };

export const Select = defineComponent({
  name: 'EevenkotoSelect',
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: undefined },
    value: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
    size: { type: String as PropType<SelectSize>, default: undefined },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    placeholder: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
    describedBy: { type: String, default: undefined },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: undefined,
    },
    groups: {
      type: Array as PropType<SelectOptionGroup[]>,
      default: undefined,
    },
  },
  emits: ['update:value', 'change'],
  setup(props, { emit, slots }) {
    const className = computed(() =>
      selectClassNames({
        size: props.size,
        invalid: props.invalid,
        disabled: props.disabled,
      }),
    );

    return () => {
      const optionElements: VNodeChild[] = [];

      if (props.placeholder) {
        optionElements.push(
          h('option', { value: '', disabled: true, selected: !props.value }, props.placeholder),
        );
      }

      if (slots.default) {
        optionElements.push(slots.default());
      } else if (props.groups && props.groups.length > 0) {
        props.groups.forEach((group) => {
          const groupOptions = group.options.map((opt) =>
            h(
              'option',
              {
                value: opt.value,
                disabled: opt.disabled || undefined,
                selected: opt.value === props.value,
              },
              opt.label,
            ),
          );
          optionElements.push(h('optgroup', { label: group.label }, groupOptions));
        });
      } else if (props.options && props.options.length > 0) {
        props.options.forEach((opt) => {
          optionElements.push(
            h(
              'option',
              {
                value: opt.value,
                disabled: opt.disabled || undefined,
                selected: opt.value === props.value,
              },
              opt.label,
            ),
          );
        });
      }

      const selectEl = h(
        'select',
        {
          class: selectFieldClassNames(),
          id: props.id,
          name: props.name,
          value: props.value,
          disabled: props.disabled || undefined,
          'aria-label': props.ariaLabel,
          'aria-describedby': props.describedBy,
          'aria-invalid': props.invalid ? 'true' : undefined,
          onChange: (event: Event) => {
            const val = (event.target as HTMLSelectElement).value;
            emit('update:value', val);
            emit('change', val);
          },
        },
        optionElements,
      );

      const iconEl = h(
        'span',
        { class: selectIconClassNames(), 'aria-hidden': 'true' },
        slots.icon
          ? slots.icon()
          : h(Icon, { name: 'chevron-down', size: props.size === 'sm' ? 'sm' : 'md' }),
      );

      return h('span', { class: className.value }, [selectEl, iconEl]);
    };
  },
});
