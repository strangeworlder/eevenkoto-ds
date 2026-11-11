import {
  radioGroupClassNames,
  radioGroupHeaderClassNames,
  radioGroupLegendClassNames,
  radioGroupListClassNames,
  radioGroupMessageClassNames,
  type RadioGroupColumns,
  type RadioGroupLayout,
  type RadioGroupOptionProps,
  type RadioGroupProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { Badge } from '../atoms/Badge';
import { Radio } from '../atoms/Radio';

export type { RadioGroupProps, RadioGroupOptionProps };

export const RadioGroup = defineComponent({
  name: 'EevenkotoRadioGroup',
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    legendVisuallyHidden: { type: Boolean, default: false },
    hideLegend: { type: Boolean, default: undefined },
    value: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
    layout: { type: String as PropType<RadioGroupLayout>, default: undefined },
    columns: { type: Number as PropType<RadioGroupColumns>, default: undefined },
    variant: { type: String as PropType<RadioGroupOptionProps['variant']>, default: undefined },
    hint: { type: String, default: undefined },
    error: { type: String, default: undefined },
    badge: { type: String, default: undefined },
    badgeIntent: {
      type: String as PropType<RadioGroupProps['badgeIntent']>,
      default: undefined,
    },
    options: {
      type: Array as PropType<RadioGroupOptionProps[]>,
      default: undefined,
    },
  },
  emits: ['update:value', 'change'],
  setup(props, { emit, slots }) {
    const className = computed(() =>
      radioGroupClassNames({ layout: props.layout, columns: props.columns }),
    );

    return () => {
      const isLegendHidden = Boolean(props.hideLegend ?? props.legendVisuallyHidden);
      const legendNode = h(
        'legend',
        { class: radioGroupLegendClassNames(isLegendHidden) },
        props.label,
      );

      let badgeNode: VNodeChild = null;
      if (slots.badge) {
        badgeNode = slots.badge();
      } else if (props.badge) {
        badgeNode = h(Badge, {
          label: props.badge,
          intent: props.badgeIntent ?? 'neutral',
          variant: 'solid',
        });
      }

      const listChildren: VNodeChild[] = [];

      if (slots.default) {
        listChildren.push(slots.default());
      } else if (props.options && props.options.length > 0) {
        props.options.forEach((opt) => {
          listChildren.push(
            h(Radio, {
              key: opt.value,
              ...opt,
              name: props.name,
              variant: opt.variant ?? props.variant,
              checked:
                props.value !== undefined
                  ? opt.value === props.value
                  : props.defaultValue !== undefined
                    ? opt.value === props.defaultValue
                    : opt.checked,
              onChange: (val: string) => {
                emit('update:value', val);
                emit('change', val);
              },
            }),
          );
        });
      }

      const children: VNodeChild[] = [
        isLegendHidden && !badgeNode
          ? legendNode
          : h('div', { class: radioGroupHeaderClassNames() }, [legendNode, badgeNode]),
        h('div', { class: radioGroupListClassNames() }, listChildren),
      ];

      const hasError = Boolean(props.error);
      const messageText = hasError ? props.error : props.hint;
      if (messageText) {
        children.push(
          h('p', { class: radioGroupMessageClassNames(hasError) }, messageText),
        );
      }

      return h('fieldset', { class: className.value }, children);
    };
  },
});
