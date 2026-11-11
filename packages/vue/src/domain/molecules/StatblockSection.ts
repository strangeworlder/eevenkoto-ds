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
    titleLevel: { type: Number as PropType<2 | 3>, default: 2 },
    bodyHtml: { type: String, default: undefined },
    features: { type: Array as PropType<StatblockFeatureProps[]>, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() => statblockSectionClassNames());

    return () => {
      const tag = props.titleLevel === 3 ? 'h3' : 'h2';
      const children = [
        h(tag, { class: headingClassNames({ level: 2 }) }, props.title),
      ];
      if (props.bodyHtml) {
        children.push(h('div', { innerHTML: props.bodyHtml }));
      }
      for (const feature of props.features ?? []) {
        children.push(
          h(StatblockFeature, {
            name: feature.name,
            description: feature.description,
            descriptionHtml: feature.descriptionHtml,
            level: feature.level,
            key: feature.name,
          }),
        );
      }
      if (slots.default) {
        children.push(...slots.default());
      }
      return h('section', { class: className.value }, children);
    };
  },
});
