import {
  fieldClassNames,
  fieldControlClassNames,
  fieldLabelClassNames,
  fieldMessageClassNames,
  resolveFieldMessageId,
  type FieldProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h } from 'vue';

export type { FieldProps };

export const Field = defineComponent({
  name: 'EevenkotoField',
  props: {
    label: { type: String, required: true },
    htmlFor: { type: String, default: undefined },
    hint: { type: String, default: undefined },
    error: { type: String, default: undefined },
    messageId: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() => fieldClassNames());
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
      children.push(
        h('div', { class: fieldControlClassNames() }, slots.default?.()),
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
