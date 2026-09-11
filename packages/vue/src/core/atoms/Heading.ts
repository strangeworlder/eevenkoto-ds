import { headingClassNames, type HeadingLevel, type HeadingProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { HeadingProps, HeadingLevel };

export const Heading = defineComponent({
  name: 'EevenkotoHeading',
  props: {
    level: { type: Number as PropType<HeadingLevel>, required: true },
    text: { type: String, required: true },
    tone: { type: String as PropType<HeadingProps['tone']>, default: undefined },
    runIn: { type: Boolean, default: false },
  },
  setup(props) {
    const className = computed(() =>
      headingClassNames({
        level: props.level,
        tone: props.tone,
        runIn: props.runIn,
      }),
    );

    return () => h(`h${props.level}`, { class: className.value }, props.text);
  },
});
