import { abilityScoreGroupClassNames, type AbilityScoreProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { AbilityScore } from '../molecules/AbilityScore';

export const AbilityScoreGroup = defineComponent({
  name: 'EevenkotoAbilityScoreGroup',
  props: {
    abilities: { type: Array as PropType<AbilityScoreProps[]>, required: true },
  },
  setup(props, { slots }) {
    const className = computed(() => abilityScoreGroupClassNames());

    return () => {
      const children = [];
      if (slots.header) {
        children.push(h('div', { class: 'eevenkoto-ability-score-group__header' }, slots.header()));
      }
      children.push(
        h(
          'div',
          { class: 'eevenkoto-ability-score-group__grid' },
          props.abilities.map((ability) => h(AbilityScore, { ...ability, key: ability.label })),
        ),
      );
      if (slots.footer) {
        children.push(h('div', { class: 'eevenkoto-ability-score-group__footer' }, slots.footer()));
      }
      return h('div', { class: className.value }, children);
    };
  },
});
