import {
  headingClassNames,
  paragraphClassNames,
  captionClassNames,
  spellblockClassNames,
  type PropertyItem,
  type SpellblockNameLevel,
  type StatblockFeatureLevel,
  type StatblockFeatureProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNode } from 'vue';
import { PropertyList } from '../../core/molecules/PropertyList';
import { StatblockFeature } from '../molecules/StatblockFeature';

export const Spellblock = defineComponent({
  name: 'EevenkotoSpellblock',
  props: {
    name: { type: String, required: true },
    nameLevel: { type: Number as PropType<SpellblockNameLevel>, default: 1 },
    typeLine: { type: String, default: undefined },
    typeLineHtml: { type: String, default: undefined },
    classes: { type: Array as PropType<PropertyItem[]>, default: undefined },
    properties: { type: Array as PropType<PropertyItem[]>, required: true },
    paragraphs: { type: Array as PropType<string[]>, default: undefined },
    paragraphsHtml: { type: Array as PropType<string[]>, default: undefined },
    bodyHtml: { type: String, default: undefined },
    features: { type: Array as PropType<StatblockFeatureProps[]>, default: undefined },
    deck: { type: Boolean, default: false },
  },
  setup(props) {
    const className = computed(() => spellblockClassNames({ deck: props.deck }));

    return () => {
      const level: SpellblockNameLevel = props.nameLevel === 2 ? 2 : 1;
      const bands: VNode[] = [];

      const plate: VNode[] = [
        h(`h${level}`, { class: headingClassNames({ level }) }, props.name),
      ];

      if (props.typeLineHtml) {
        plate.push(
          h('p', {
            class: `${captionClassNames()} eevenkoto-spellblock__type`,
            innerHTML: props.typeLineHtml,
          }),
        );
      } else if (props.typeLine) {
        plate.push(
          h(
            'p',
            { class: `${captionClassNames()} eevenkoto-spellblock__type` },
            props.typeLine,
          ),
        );
      }

      if (props.classes?.length) {
        plate.push(h(PropertyList, { items: props.classes }));
      }

      bands.push(h('div', { class: 'eevenkoto-spellblock__plate' }, plate));

      if (props.properties.length) {
        bands.push(
          h('div', { class: 'eevenkoto-spellblock__stats' }, [
            h(PropertyList, { items: props.properties }),
          ]),
        );
      }

      const bodyNodes: VNode[] = [];
      if (props.paragraphsHtml?.length) {
        bodyNodes.push(
          ...props.paragraphsHtml.map((html, index) =>
            h('p', { key: index, class: paragraphClassNames({ size: 'md' }), innerHTML: html }),
          ),
        );
      } else if (props.paragraphs?.length) {
        bodyNodes.push(
          ...props.paragraphs.map((text, index) =>
            h('p', { key: index, class: paragraphClassNames({ size: 'md' }) }, text),
          ),
        );
      }
      if (props.bodyHtml) {
        bodyNodes.push(h('div', { innerHTML: props.bodyHtml }));
      }
      if (bodyNodes.length) {
        bands.push(h('div', { class: 'eevenkoto-spellblock__body' }, bodyNodes));
      }

      if (props.features?.length) {
        // Spells have no section H2, so scaling runs in one level below the name.
        const featureLevel: StatblockFeatureLevel = level === 2 ? 3 : 2;
        bands.push(
          h(
            'div',
            { class: 'eevenkoto-spellblock__footer' },
            props.features.map((feature) =>
              h(StatblockFeature, {
                name: feature.name,
                description: feature.description,
                descriptionHtml: feature.descriptionHtml,
                level: featureLevel,
                key: feature.name,
              }),
            ),
          ),
        );
      }

      return h('article', { class: className.value }, bands);
    };
  },
});
