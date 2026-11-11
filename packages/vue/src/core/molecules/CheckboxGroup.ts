import {
  checkboxGroupClassNames,
  checkboxGroupHeaderClassNames,
  checkboxGroupLegendClassNames,
  checkboxGroupListClassNames,
  checkboxGroupMessageClassNames,
  type CheckboxGroupColumns,
  type CheckboxGroupItemProps as CoreCheckboxGroupItemProps,
  type CheckboxGroupLayout,
  type CheckboxGroupProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { Badge } from '../atoms/Badge';
import { Checkbox } from '../atoms/Checkbox';

export type CheckboxGroupItemProps = CoreCheckboxGroupItemProps & {
  'onUpdate:checked'?: (checked: boolean) => void;
  onChange?: (event: Event) => void;
};

export type { CheckboxGroupProps };

export const CheckboxGroup = defineComponent({
  name: 'EevenkotoCheckboxGroup',
  props: {
    label: { type: String, required: true },
    legendVisuallyHidden: { type: Boolean, default: false },
    hideLegend: { type: Boolean, default: undefined },
    name: { type: String, default: undefined },
    layout: { type: String as PropType<CheckboxGroupLayout>, default: undefined },
    columns: { type: Number as PropType<CheckboxGroupColumns>, default: undefined },
    hint: { type: String, default: undefined },
    error: { type: String, default: undefined },
    badge: { type: String, default: undefined },
    badgeIntent: {
      type: String as PropType<CheckboxGroupProps['badgeIntent']>,
      default: undefined,
    },
    items: {
      type: Array as PropType<CheckboxGroupItemProps[]>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      checkboxGroupClassNames({ layout: props.layout, columns: props.columns }),
    );

    return () => {
      const isLegendHidden = Boolean(props.hideLegend ?? props.legendVisuallyHidden);
      const legendNode = h(
        'legend',
        { class: checkboxGroupLegendClassNames(isLegendHidden) },
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
      } else if (props.items && props.items.length > 0) {
        props.items.forEach((item, idx) => {
          listChildren.push(
            h(Checkbox, {
              key: item.id ?? item.value ?? idx,
              ...item,
              name: item.name ?? props.name,
            }),
          );
        });
      }

      const children: VNodeChild[] = [
        isLegendHidden && !badgeNode
          ? legendNode
          : h('div', { class: checkboxGroupHeaderClassNames() }, [legendNode, badgeNode]),
        h('div', { class: checkboxGroupListClassNames() }, listChildren),
      ];

      const hasError = Boolean(props.error);
      const messageText = hasError ? props.error : props.hint;
      if (messageText) {
        children.push(
          h('p', { class: checkboxGroupMessageClassNames(hasError) }, messageText),
        );
      }

      return h('fieldset', { class: className.value }, children);
    };
  },
});
