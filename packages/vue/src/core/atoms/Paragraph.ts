import { paragraphClassNames, type ParagraphProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { ParagraphProps };

export const Paragraph = defineComponent({
  name: 'EevenkotoParagraph',
  props: {
    text: { type: String, required: true },
    size: { type: String as PropType<ParagraphProps['size']>, default: undefined },
    tone: { type: String as PropType<ParagraphProps['tone']>, default: undefined },
  },
  setup(props) {
    const className = computed(() =>
      paragraphClassNames({ size: props.size, tone: props.tone }),
    );

    return () => h('p', { class: className.value }, props.text);
  },
});
