import {
  inlineRefClassNames,
  inlineRefLabelClassNames,
  type InlineRefProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h } from 'vue';

export type { InlineRefProps };

export const InlineRef = defineComponent({
  name: 'EevenkotoInlineRef',
  props: {
    name: { type: String, required: true },
    href: { type: String, default: undefined },
  },
  setup(props) {
    const className = computed(() => inlineRefClassNames());

    return () =>
      h(props.href ? 'a' : 'span', { class: className.value, href: props.href }, [
        h('span', { class: inlineRefLabelClassNames() }, props.name),
      ]);
  },
});
