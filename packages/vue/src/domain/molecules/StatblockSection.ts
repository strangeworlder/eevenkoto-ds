import {
  headingClassNames,
  statblockSectionClassNames,
  type StatblockFeatureLevel,
  type StatblockFeatureProps,
  type StatblockSectionProps,
  type StatblockSectionTitleLevel,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { StatblockFeature } from './StatblockFeature';

export type { StatblockSectionProps, StatblockSectionTitleLevel };

export const StatblockSection = defineComponent({
  name: 'EevenkotoStatblockSection',
  props: {
    title: { type: String, required: true },
    titleLevel: { type: Number as PropType<StatblockSectionTitleLevel>, default: 2 },
    bodyHtml: { type: String, default: undefined },
    features: { type: Array as PropType<StatblockFeatureProps[]>, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() => statblockSectionClassNames());

    return () => {
      const tagLevel: StatblockSectionTitleLevel =
        props.titleLevel === 4 ? 4 : props.titleLevel === 3 ? 3 : 2;
      const tag = `h${tagLevel}`;
      const defaultFeatureLevel = (tagLevel + 1) as StatblockFeatureLevel;
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
            level: feature.level ?? defaultFeatureLevel,
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
