import { npcCardGridClassNames, type NpcCardGridProps } from '@eevenkoto/core';
import { defineComponent, h, type PropType } from 'vue';
import { NpcCard } from '../molecules/NpcCard';

export type { NpcCardGridProps };

export const NpcCardGrid = defineComponent({
  name: 'EevenkotoNpcCardGrid',
  props: {
    id: { type: String, default: undefined },
    columns: { type: Number as PropType<NpcCardGridProps['columns']>, default: undefined },
    cards: { type: Array as PropType<NpcCardGridProps['cards']>, default: undefined },
  },
  setup(props, { slots }) {
    return () =>
      h('div', { id: props.id, class: npcCardGridClassNames({ columns: props.columns }) }, [
        ...(props.cards ?? []).map((card, index) =>
          h(NpcCard, { key: card.id ?? `${card.name}-${index}`, ...card }),
        ),
        slots.default?.(),
      ]);
  },
});