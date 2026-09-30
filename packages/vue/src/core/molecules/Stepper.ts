import {
  stepperButtonClassNames,
  stepperClassNames,
  stepperControlsClassNames,
  stepperDescriptionClassNames,
  stepperInfoClassNames,
  stepperLabelClassNames,
  stepperValueClassNames,
  type StepperProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type VNodeChild } from 'vue';
import { Button } from '../atoms/Button';

export type { StepperProps };

export const Stepper = defineComponent({
  name: 'EevenkotoStepper',
  props: {
    id: { type: String, default: undefined },
    name: { type: String, default: undefined },
    label: { type: String, required: true },
    description: { type: String, default: undefined },
    value: { type: Number, required: true },
    min: { type: Number, default: 0 },
    max: { type: Number, default: undefined },
    step: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
    decreaseAriaLabel: { type: String, default: 'Vähennä' },
    increaseAriaLabel: { type: String, default: 'Lisää' },
  },
  emits: ['update:value', 'change'],
  setup(props, { emit }) {
    const className = computed(() =>
      stepperClassNames({ disabled: props.disabled }),
    );

    const isDecreaseDisabled = computed(
      () => props.disabled || props.value <= props.min,
    );
    const isIncreaseDisabled = computed(
      () => props.disabled || (props.max !== undefined && props.value >= props.max),
    );

    const handleDecrease = () => {
      if (isDecreaseDisabled.value) return;
      const next = Math.max(props.min, props.value - props.step);
      emit('update:value', next);
      emit('change', next);
    };

    const handleIncrease = () => {
      if (isIncreaseDisabled.value) return;
      const next =
        props.max !== undefined
          ? Math.min(props.max, props.value + props.step)
          : props.value + props.step;
      emit('update:value', next);
      emit('change', next);
    };

    return () => {
      const infoChildren: VNodeChild[] = [
        h('strong', { class: stepperLabelClassNames() }, props.label),
      ];

      if (props.description) {
        infoChildren.push(
          h('span', { class: stepperDescriptionClassNames() }, props.description),
        );
      }

      const controlsChildren: VNodeChild[] = [
        h(Button, {
          label: '−',
          variant: 'secondary',
          size: 'sm',
          class: stepperButtonClassNames(),
          disabled: isDecreaseDisabled.value,
          'aria-label': props.decreaseAriaLabel,
          onClick: handleDecrease,
        }),
        h(
          'span',
          { class: stepperValueClassNames(), role: 'status', 'aria-live': 'polite' },
          props.value,
        ),
        h(Button, {
          label: '+',
          variant: 'secondary',
          size: 'sm',
          class: stepperButtonClassNames(),
          disabled: isIncreaseDisabled.value,
          'aria-label': props.increaseAriaLabel,
          onClick: handleIncrease,
        }),
      ];

      return h('div', { class: className.value, id: props.id }, [
        h('div', { class: stepperInfoClassNames() }, infoChildren),
        h('div', { class: stepperControlsClassNames() }, controlsChildren),
      ]);
    };
  },
});
