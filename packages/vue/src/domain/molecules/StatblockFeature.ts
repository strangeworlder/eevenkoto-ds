import {
  headingClassNames,
  paragraphClassNames,
  statblockFeatureClassNames,
  type StatblockFeatureProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h } from 'vue';

export type { StatblockFeatureProps };

export const StatblockFeature = defineComponent({
  name: 'EevenkotoStatblockFeature',
  props: {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  setup(props) {
    const className = computed(() => statblockFeatureClassNames());

    return () =>
      h('div', { class: className.value }, [
        h('h3', { class: headingClassNames({ level: 3, runIn: true }) }, props.name),
        h('p', { class: paragraphClassNames({ size: 'md' }) }, props.description),
      ]);
  },
});
