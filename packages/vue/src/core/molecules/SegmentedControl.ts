import {
  resolveSegmentedControlOptionTone,
  segmentedControlClassNames,
  segmentedControlOptionClassNames,
  type SegmentedControlMode,
  type SegmentedControlOption,
  type SegmentedControlProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { SegmentedControlProps };

export const SegmentedControl = defineComponent({
  name: 'EevenkotoSegmentedControl',
  props: {
    options: {
      type: Array as PropType<SegmentedControlOption[]>,
      required: true,
    },
    selectedId: { type: String, default: undefined },
    mode: { type: String as PropType<SegmentedControlMode>, default: 'radios' },
    name: { type: String, default: 'eevenkoto-segmented' },
    tone: { type: String as PropType<SegmentedControlProps['tone']>, default: undefined },
    size: { type: String as PropType<SegmentedControlProps['size']>, default: undefined },
    label: { type: String, default: undefined },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const className = computed(() =>
      segmentedControlClassNames({
        size: props.size,
        mode: props.mode,
      }),
    );

    return () => {
      if (props.mode === 'links') {
        return h(
          'nav',
          { class: className.value, 'aria-label': props.label },
          props.options.map((option) => {
            const selected = option.id === props.selectedId;
            const optionTone = resolveSegmentedControlOptionTone(option.tone, props.tone);
            return h(
              'a',
              {
                key: option.id,
                class: segmentedControlOptionClassNames({
                  tone: optionTone,
                  selected,
                }),
                href: option.href ?? '#',
                'aria-current': selected ? 'page' : undefined,
                'aria-disabled': option.disabled || undefined,
                tabindex: option.disabled ? -1 : undefined,
                onClick: (event: Event) => {
                  if (option.disabled) event.preventDefault();
                },
              },
              h('span', { class: 'eevenkoto-segmented-control__label' }, option.label),
            );
          }),
        );
      }

      return h('fieldset', { class: className.value }, [
        props.label
          ? h('legend', { class: 'eevenkoto-visually-hidden' }, props.label)
          : null,
        ...props.options.map((option) => {
          const selected = option.id === props.selectedId;
          const optionTone = resolveSegmentedControlOptionTone(option.tone, props.tone);
          const inputId = `${props.name}-${option.id}`;
          return h(
            'label',
            {
              key: option.id,
              class: segmentedControlOptionClassNames({
                tone: optionTone,
                selected: false,
              }),
              for: inputId,
            },
            [
              h('input', {
                class: 'eevenkoto-segmented-control__input',
                type: 'radio',
                id: inputId,
                name: props.name,
                value: option.id,
                // Uncontrolled: initial checked only — native radios clear siblings without JS.
                ...(selected ? { checked: true } : {}),
                disabled: option.disabled,
                onChange: () => emit('change', option.id),
              }),
              h('span', { class: 'eevenkoto-segmented-control__label' }, option.label),
            ],
          );
        }),
      ]);
    };
  },
});
