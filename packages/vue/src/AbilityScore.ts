import { abilityScoreClassNames, type AbilityScoreProps } from '@eevenkoto/core';
import { computed, defineComponent, h } from 'vue';
import { Stat } from './Stat';

export type { AbilityScoreProps };

const renderStatSlot = (
  role: 'score' | 'modifier' | 'save',
  term: string,
  value: string,
  shape: 'disk' | 'arch' | 'shield',
  size: 'sm' | 'lg',
  emphasis?: boolean,
) =>
  h('div', { class: `eevenkoto-ability-score__stat eevenkoto-ability-score__stat--${role}` }, [
    h('dt', { class: 'eevenkoto-ability-score__stat-label' }, term),
    h('dd', { class: 'eevenkoto-ability-score__stat-value' }, [
      h(Stat, { value, shape, size, emphasis }),
    ]),
  ]);

export const AbilityScore = defineComponent({
  name: 'EevenkotoAbilityScore',
  props: {
    label: { type: String, required: true },
    score: { type: String, required: true },
    modifier: { type: String, required: true },
    save: { type: String, required: true },
    scoreLabel: { type: String, default: 'Score' },
    modifierLabel: { type: String, default: 'Modifier' },
    saveLabel: { type: String, default: 'Save' },
    saveProficient: { type: Boolean, default: false },
  },
  setup(props) {
    const className = computed(() =>
      abilityScoreClassNames({ saveProficient: props.saveProficient }),
    );

    return () => {
      const saveTerm = props.saveProficient
        ? `${props.saveLabel} (proficient)`
        : props.saveLabel;

      return h('div', { class: className.value }, [
        h('div', { class: 'eevenkoto-ability-score__label' }, props.label),
        h('dl', { class: 'eevenkoto-ability-score__stats' }, [
          renderStatSlot('modifier', props.modifierLabel, props.modifier, 'arch', 'lg'),
          renderStatSlot('score', props.scoreLabel, props.score, 'disk', 'sm'),
          renderStatSlot(
            'save',
            saveTerm,
            props.save,
            'shield',
            'sm',
            props.saveProficient,
          ),
        ]),
      ]);
    };
  },
});
