import {
  entityRefClassNames,
  inlineRefLabelClassNames,
  inlineRefLockClassNames,
  inlineRefLockIconClassNames,
  type EntityRefKind,
  type EntityRefProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { Icon } from '../../core/atoms/Icon';

export type { EntityRefProps, EntityRefKind };

export const EntityRef = defineComponent({
  name: 'EevenkotoEntityRef',
  props: {
    kind: { type: String as PropType<EntityRefKind>, default: undefined },
    name: { type: String, required: true },
    href: { type: String, default: undefined },
    unlinked: { type: Boolean, default: false },
    locked: { type: Boolean, default: false },
    lockedLabel: { type: String, default: 'Locked' },
  },
  setup(props) {
    const className = computed(() =>
      entityRefClassNames({
        kind: props.kind,
        unlinked: props.unlinked,
        locked: props.locked,
      }),
    );

    return () => {
      const inner = [
        h('span', { class: inlineRefLabelClassNames() }, props.name),
        props.locked
          ? h('span', { class: inlineRefLockClassNames() }, [
              h(Icon, { name: 'lock', class: inlineRefLockIconClassNames() }),
              h('span', { class: 'eevenkoto-visually-hidden' }, props.lockedLabel),
            ])
          : null,
      ];

      if (!props.unlinked && props.href) {
        return h('a', { class: className.value, href: props.href }, inner);
      }

      return h('span', { class: className.value }, inner);
    };
  },
});
