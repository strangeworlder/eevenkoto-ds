import { captionClassNames, type CaptionProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { CaptionProps };

export const Caption = defineComponent({
  name: 'EevenkotoCaption',
  props: {
    text: { type: String, required: true },
    tone: { type: String as PropType<CaptionProps['tone']>, default: undefined },
  },
  setup(props) {
    const className = computed(() => captionClassNames({ tone: props.tone }));

    return () => h('p', { class: className.value }, props.text);
  },
});
