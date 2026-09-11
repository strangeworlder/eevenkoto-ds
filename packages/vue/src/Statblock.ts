import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  statblockClassNames,
  type PropertyItem,
  type AbilityScoreProps,
  type StatblockSectionProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { AbilityScoreGroup } from './AbilityScoreGroup';
import { PropertyList } from './PropertyList';
import { StatblockSection } from './StatblockSection';

export const Statblock = defineComponent({
  name: 'EevenkotoStatblock',
  props: {
    name: { type: String, required: true },
    flavor: { type: String, default: undefined },
    typeLine: { type: String, default: undefined },
    vitals: { type: Array as PropType<PropertyItem[]>, required: true },
    abilities: { type: Array as PropType<AbilityScoreProps[]>, required: true },
    traits: { type: Array as PropType<PropertyItem[]>, required: true },
    sections: { type: Array as PropType<StatblockSectionProps[]>, default: undefined },
  },
  setup(props) {
    const className = computed(() => statblockClassNames());

    return () => {
      const children = [
        h('h1', { class: headingClassNames({ level: 1 }) }, props.name),
      ];

      if (props.flavor) {
        children.push(h('p', { class: paragraphClassNames({ size: 'md' }) }, props.flavor));
      }

      if (props.typeLine) {
        children.push(
          h('p', { class: `${captionClassNames()} eevenkoto-statblock__type` }, props.typeLine),
        );
      }

      children.push(
        h(
          AbilityScoreGroup,
          { abilities: props.abilities },
          {
            header: () => h(PropertyList, { items: props.vitals }),
            footer: () => h(PropertyList, { items: props.traits }),
          },
        ),
      );

      for (const section of props.sections ?? []) {
        children.push(
          h(StatblockSection, {
            title: section.title,
            features: section.features,
            key: section.title,
          }),
        );
      }

      return h('article', { class: className.value }, children);
    };
  },
});
