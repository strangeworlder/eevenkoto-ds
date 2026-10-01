import {
  abilityNameClassNames,
  abbreviateAbility,
  type AbilityNameProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { AbilityNameProps };

export const AbilityName = defineComponent({
  name: 'EevenkotoAbilityName',
  props: {
    name: { type: String, default: undefined },
    short: { type: String, default: undefined },
    variant: { type: String as PropType<'auto' | 'full' | 'short'>, default: 'auto' },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      abilityNameClassNames({
        variant: props.variant,
      }),
    );

    return () => {
      const slotContent = slots.default ? slots.default() : null;
      let textContent = props.name || '';
      if (!textContent && slotContent && typeof slotContent[0]?.children === 'string') {
        textContent = slotContent[0].children;
      }

      const fullText = textContent;
      const shortText = props.short || (fullText ? abbreviateAbility(fullText) : '');

      return h(
        'span',
        {
          class: className.value,
          'aria-label': fullText,
        },
        [
          h('span', { class: 'eevenkoto-ability-name__full' }, slotContent || fullText),
          h('span', { class: 'eevenkoto-ability-name__short', 'aria-hidden': 'true' }, shortText),
        ],
      );
    };
  },
});
