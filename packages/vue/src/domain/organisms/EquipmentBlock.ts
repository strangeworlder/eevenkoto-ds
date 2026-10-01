import {
  headingClassNames,
  captionClassNames,
  badgeClassNames,
  chipClassNames,
  buttonClassNames,
  noticeClassNames,
  equipmentBlockClassNames,
  type EquipmentBlockProps,
  type EquipmentBlockNameLevel,
  type EquipmentStatItem,
  type EquipmentKestoBreakdown,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNode } from 'vue';
import { AbilityName } from '../atoms/AbilityName';

export type { EquipmentBlockProps };

export const EquipmentBlock = defineComponent({
  name: 'EevenkotoEquipmentBlock',
  props: {
    name: { type: String, required: true },
    nameLevel: { type: Number as PropType<EquipmentBlockNameLevel>, default: 1 },
    category: { type: String, default: undefined },
    price: { type: String, default: undefined },
    stats: { type: Array as PropType<EquipmentStatItem[]>, default: undefined },
    kesto: { type: Object as PropType<EquipmentKestoBreakdown>, default: undefined },
    traits: { type: Array as PropType<string[]>, default: undefined },
    emptyTraitsText: { type: String, default: 'Ei erikoispiirteitä' },
    traitsTitle: { type: String, default: 'Valitut piirteet' },
    notesTitle: { type: String, default: 'Säännöt & vaikutukset' },
    notes: { type: Array as PropType<string[]>, default: undefined },
    warnings: { type: Array as PropType<string[]>, default: undefined },
    copyText: { type: String, default: undefined },
    copyLabel: { type: String, default: 'Kopioi hahmolomakkeelle' },
    showCopyButton: { type: Boolean, default: false },
  },
  emits: ['copy'],
  setup(props, { emit }) {
    const className = computed(() => equipmentBlockClassNames());

    const handleCopy = () => {
      if (props.copyText) {
        emit('copy', props.copyText);
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(props.copyText);
        }
      }
    };

    return () => {
      const level: EquipmentBlockNameLevel = props.nameLevel === 2 ? 2 : 1;
      const children: VNode[] = [];

      // 1. Header Plate
      const headingGroupChildren: VNode[] = [
        h(`h${level}`, { class: headingClassNames({ level }) }, props.name),
      ];
      if (props.category) {
        headingGroupChildren.push(
          h('p', { class: `${captionClassNames()} eevenkoto-equipment-block__category` }, props.category),
        );
      }

      const plateChildren: VNode[] = [
        h('div', { class: 'eevenkoto-equipment-block__heading-group' }, headingGroupChildren),
      ];

      if (props.price) {
        plateChildren.push(
          h('div', { class: 'eevenkoto-equipment-block__price' }, [
            h('span', { class: badgeClassNames({ variant: 'solid', intent: 'neutral' }) }, props.price),
          ]),
        );
      }

      children.push(h('div', { class: 'eevenkoto-equipment-block__plate' }, plateChildren));

      // 2. Stats Row
      if (props.stats?.length) {
        const statItems = props.stats.map((st) => {
          const itemClasses = [
            'eevenkoto-equipment-block__stat-item',
            st.emphasis && 'eevenkoto-equipment-block__stat-item--emphasis',
            st.subItems?.length && 'eevenkoto-equipment-block__stat-item--split',
          ]
            .filter(Boolean)
            .join(' ');

          if (st.subItems?.length) {
            const subNodes = st.subItems.map((sub) =>
              h('div', { class: 'eevenkoto-equipment-block__stat-subitem' }, [
                h('span', { class: 'eevenkoto-equipment-block__stat-label' }, sub.label),
                h('strong', { class: 'eevenkoto-equipment-block__stat-value' }, String(sub.value)),
              ]),
            );
            return h('div', { class: itemClasses }, subNodes);
          }

          let valueNode: (string | VNode)[] | string | VNode = String(st.value ?? '');
          if (st.abilities?.length) {
            const nodes: (string | VNode)[] = [];
            st.abilities.forEach((ab, idx) => {
              if (idx > 0) nodes.push(' tai ');
              nodes.push(h(AbilityName, { name: ab }));
            });
            valueNode = nodes;
          } else if (st.label?.toLowerCase().startsWith('omin') && typeof st.value === 'string') {
            if (st.value.includes(' tai ')) {
              const nodes: (string | VNode)[] = [];
              st.value.split(' tai ').forEach((ab, idx) => {
                if (idx > 0) nodes.push(' tai ');
                nodes.push(h(AbilityName, { name: ab.trim() }));
              });
              valueNode = nodes;
            } else {
              valueNode = h(AbilityName, { name: st.value.trim() });
            }
          }

          const cardChildren: VNode[] = [
            h('span', { class: 'eevenkoto-equipment-block__stat-label' }, st.label ?? ''),
            h('strong', { class: 'eevenkoto-equipment-block__stat-value' }, valueNode),
          ];

          if (st.subValue) {
            cardChildren.push(
              h('span', { class: 'eevenkoto-equipment-block__stat-subvalue' }, st.subValue),
            );
          }

          return h('div', { class: itemClasses }, cardChildren);
        });
        children.push(h('div', { class: 'eevenkoto-equipment-block__stats' }, statItems));
      }

      // 3. Kesto Breakdown
      if (props.kesto) {
        const k = props.kesto;
        const tagChildren: VNode[] = [
          h('span', { class: 'eevenkoto-equipment-block__kesto-tag' }, [
            `${k.labels?.base || 'Perus'}: `,
            h('strong', null, String(k.base)),
          ]),
        ];
        if (k.bludgeoning !== undefined) {
          tagChildren.push(
            h('span', { class: 'eevenkoto-equipment-block__kesto-tag' }, [
              `${k.labels?.bludgeoning || 'Murskaus'}: `,
              h('strong', null, String(k.bludgeoning)),
            ]),
          );
        }
        if (k.slashing !== undefined) {
          tagChildren.push(
            h('span', { class: 'eevenkoto-equipment-block__kesto-tag' }, [
              `${k.labels?.slashing || 'Viilto'}: `,
              h('strong', null, String(k.slashing)),
            ]),
          );
        }
        if (k.piercing !== undefined) {
          tagChildren.push(
            h('span', { class: 'eevenkoto-equipment-block__kesto-tag' }, [
              `${k.labels?.piercing || 'Pisto'}: `,
              h('strong', null, String(k.piercing)),
            ]),
          );
        }

        children.push(
          h('div', { class: 'eevenkoto-equipment-block__kesto' }, [
            h('span', { class: 'eevenkoto-equipment-block__kesto-title' }, k.title || 'Vahingon kesto'),
            h('div', { class: 'eevenkoto-equipment-block__kesto-tags' }, tagChildren),
          ]),
        );
      }

      // 4. Traits
      const traitElements: VNode[] = props.traits?.length
        ? props.traits.map((tr) => h('span', { class: chipClassNames() }, tr))
        : [h('span', { class: 'eevenkoto-equipment-block__empty-traits' }, props.emptyTraitsText)];

      children.push(
        h('div', { class: 'eevenkoto-equipment-block__section' }, [
          h('h4', { class: 'eevenkoto-equipment-block__section-title' }, props.traitsTitle),
          h('div', { class: 'eevenkoto-equipment-block__traits' }, traitElements),
        ]),
      );

      // 5. Notes
      if (props.notes?.length) {
        const noteItems = props.notes.map((note) =>
          h('li', { innerHTML: note }),
        );
        children.push(
          h('div', { class: 'eevenkoto-equipment-block__section' }, [
            h('h4', { class: 'eevenkoto-equipment-block__section-title' }, props.notesTitle),
            h('ul', { class: 'eevenkoto-list eevenkoto-equipment-block__notes' }, noteItems),
          ]),
        );
      }

      // 6. Warnings
      if (props.warnings?.length) {
        const warningDivs = props.warnings.map((w) => h('div', null, w));
        children.push(
          h('div', { class: 'eevenkoto-equipment-block__notice' }, [
            h('div', { class: noticeClassNames({ intent: 'caution' }), role: 'alert' }, warningDivs),
          ]),
        );
      }

      // 7. Footer / Copy button
      if (props.showCopyButton) {
        children.push(
          h('div', { class: 'eevenkoto-equipment-block__footer' }, [
            h(
              'button',
              {
                type: 'button',
                class: `${buttonClassNames({ variant: 'primary', size: 'md' })} eevenkoto-equipment-block__copy-btn`,
                onClick: handleCopy,
              },
              props.copyLabel,
            ),
          ]),
        );
      }

      return h('article', { class: className.value }, children);
    };
  },
});
