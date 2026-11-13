import {
  fieldClassNames,
  fieldControlClassNames,
  fieldControlGroupClassNames,
  fieldLabelClassNames,
  fieldMessageClassNames,
  resolveFieldMessageId,
  type FieldOrientation,
  type FieldProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { FieldOrientation, FieldProps };

export const Field = defineComponent({
  name: 'EevenkotoField',
  props: {
    label: { type: String, required: true },
    htmlFor: { type: String, default: undefined },
    orientation: { type: String as PropType<FieldOrientation>, default: undefined },
    hint: { type: String, default: undefined },
    error: { type: String, default: undefined },
    messageId: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() => fieldClassNames({ orientation: props.orientation }));
    const messageId = computed(() =>
      resolveFieldMessageId({ htmlFor: props.htmlFor, messageId: props.messageId }),
    );

    return () => {
      const hasError = Boolean(props.error);
      const messageText = hasError ? props.error : props.hint;
      const children = [];

      children.push(
        h(
          'label',
          { class: fieldLabelClassNames(), for: props.htmlFor },
          props.label,
        ),
      );
      const controlContent = slots.action
        ? [h('div', { class: fieldControlGroupClassNames() }, [slots.default?.(), slots.action()])]
        : slots.default?.();
      children.push(
        h('div', { class: fieldControlClassNames() }, controlContent),
      );

      if (messageText && messageId.value) {
        children.push(
          h(
            'p',
            { class: fieldMessageClassNames(hasError), id: messageId.value },
            messageText,
          ),
        );
      }

      return h('div', { class: className.value }, children);
    };
  },
});
