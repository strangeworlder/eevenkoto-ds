import {
  headingClassNames,
  statblockSectionClassNames,
  type StatblockFeatureProps,
  type StatblockSectionProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { StatblockFeature } from './StatblockFeature';

export type { StatblockSectionProps };

export const StatblockSection = defineComponent({
  name: 'EevenkotoStatblockSection',
  props: {
    title: { type: String, required: true },
    features: { type: Array as PropType<StatblockFeatureProps[]>, required: true },
  },
  setup(props) {
    const className = computed(() => statblockSectionClassNames());

    return () =>
      h('section', { class: className.value }, [
        h('h2', { class: headingClassNames({ level: 2 }) }, props.title),
        ...props.features.map((feature) =>
          h(StatblockFeature, {
            name: feature.name,
            description: feature.description,
            key: feature.name,
          }),
        ),
      ]);
  },
});
