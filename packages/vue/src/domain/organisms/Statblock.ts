import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  statblockClassNames,
  type PropertyItem,
  type AbilityScoreProps,
  type StatblockNameLevel,
  type StatblockSectionProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { AbilityScoreGroup } from './AbilityScoreGroup';
import { PropertyList } from '../../core/molecules/PropertyList';
import { StatblockSection } from '../molecules/StatblockSection';

export const Statblock = defineComponent({
  name: 'EevenkotoStatblock',
  props: {
    name: { type: String, required: true },
    nameLevel: { type: Number as PropType<StatblockNameLevel>, default: 1 },
    flavor: { type: String, default: undefined },
    flavorHtml: { type: String, default: undefined },
    typeLine: { type: String, default: undefined },
    typeLineHtml: { type: String, default: undefined },
    vitals: { type: Array as PropType<PropertyItem[]>, required: true },
    abilities: { type: Array as PropType<AbilityScoreProps[]>, required: true },
    details: { type: Array as PropType<PropertyItem[]>, required: true },
    sections: { type: Array as PropType<StatblockSectionProps[]>, default: undefined },
    bodyHtml: { type: String, default: undefined },
  },
  setup(props) {
    const className = computed(() => statblockClassNames());

    return () => {
      const level: StatblockNameLevel = props.nameLevel === 2 ? 2 : 1;
      const children = [
        h(`h${level}`, { class: headingClassNames({ level }) }, props.name),
      ];

      if (props.flavorHtml) {
        children.push(
          h('p', { class: paragraphClassNames({ size: 'md' }), innerHTML: props.flavorHtml }),
        );
      } else if (props.flavor) {
        children.push(h('p', { class: paragraphClassNames({ size: 'md' }) }, props.flavor));
      }

      if (props.typeLineHtml) {
        children.push(
          h('p', {
            class: `${captionClassNames()} eevenkoto-statblock__type`,
            innerHTML: props.typeLineHtml,
          }),
        );
      } else if (props.typeLine) {
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
            footer: () => h(PropertyList, { items: props.details }),
          },
        ),
      );

      for (const section of props.sections ?? []) {
        children.push(
          h(StatblockSection, {
            title: section.title,
            titleLevel: section.titleLevel,
            bodyHtml: section.bodyHtml,
            features: section.features,
            key: section.title,
          }),
        );
      }

      if (props.bodyHtml) {
        children.push(h('div', { innerHTML: props.bodyHtml }));
      }

      return h('article', { class: className.value }, children);
    };
  },
});
