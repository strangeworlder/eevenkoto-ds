import {
  headingClassNames,
  paragraphClassNames,
  statblockFeatureClassNames,
  type StatblockFeatureLevel,
  type StatblockFeatureProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { StatblockFeatureProps, StatblockFeatureLevel };

export const StatblockFeature = defineComponent({
  name: 'EevenkotoStatblockFeature',
  props: {
    name: { type: String, required: true },
    description: { type: String, default: undefined },
    descriptionHtml: { type: String, default: undefined },
    level: { type: Number as PropType<StatblockFeatureLevel>, default: 3 },
  },
  setup(props, { slots }) {
    const className = computed(() => statblockFeatureClassNames());

    return () =>
      h('div', { class: className.value }, [
        h(
          `h${props.level}`,
          { class: headingClassNames({ level: props.level, runIn: true }) },
          props.name,
        ),
        slots.default
          ? h('p', { class: paragraphClassNames({ size: 'md' }) }, slots.default())
          : props.descriptionHtml !== undefined
            ? h('p', {
                class: paragraphClassNames({ size: 'md' }),
                innerHTML: props.descriptionHtml,
              })
            : h('p', { class: paragraphClassNames({ size: 'md' }) }, props.description ?? ''),
      ]);
  },
});
