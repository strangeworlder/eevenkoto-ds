import {
  inlineRefClassNames,
  inlineRefLabelClassNames,
  inlineRefLockClassNames,
  inlineRefLockIconClassNames,
  type InlineRefProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h } from 'vue';
import { Icon } from './Icon';

export type { InlineRefProps };

export const InlineRef = defineComponent({
  name: 'EevenkotoInlineRef',
  props: {
    name: { type: String, required: true },
    href: { type: String, default: undefined },
    unlinked: { type: Boolean, default: false },
    locked: { type: Boolean, default: false },
    lockedLabel: { type: String, default: 'Locked' },
  },
  setup(props) {
    const className = computed(() =>
      inlineRefClassNames({ unlinked: props.unlinked, locked: props.locked }),
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
