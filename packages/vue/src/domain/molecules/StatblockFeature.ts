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
    description: { type: String, required: true },
    level: { type: Number as PropType<StatblockFeatureLevel>, default: 3 },
  },
  setup(props) {
    const className = computed(() => statblockFeatureClassNames());

    return () =>
      h('div', { class: className.value }, [
        h(
          `h${props.level}`,
          { class: headingClassNames({ level: props.level, runIn: true }) },
          props.name,
        ),
        h('p', { class: paragraphClassNames({ size: 'md' }) }, props.description),
      ]);
  },
});
