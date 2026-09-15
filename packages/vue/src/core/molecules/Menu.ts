import {
  menuBranchClassNames,
  menuClassNames,
  menuGroupClassNames,
  menuItemClassNames,
  menuSummaryClassNames,
  type MenuEntry,
  type MenuProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNode } from 'vue';
import { Icon } from '../atoms/Icon';

export type { MenuProps, MenuEntry };

const renderEntries = (
  entries: MenuEntry[],
  onSelect: (id: string) => void,
): VNode[] =>
  entries.map((entry, index) => {
    if (entry.kind === 'separator') {
      return h('hr', { class: 'eevenkoto-menu__separator', key: `separator-${index}` });
    }

    if (entry.kind === 'header') {
      return h(
        'p',
        { class: 'eevenkoto-menu__header', key: `header-${entry.label}-${index}` },
        entry.label,
      );
    }

    if (entry.kind === 'group') {
      return h(
        'details',
        {
          class: menuBranchClassNames(),
          open: entry.expanded || undefined,
          key: entry.id,
        },
        [
          h('summary', { class: menuSummaryClassNames() }, [
            h('span', { class: 'eevenkoto-menu__chevron', 'aria-hidden': 'true' }, [
              h(Icon, { name: 'chevron-right', size: 'sm' }),
            ]),
            h('span', entry.label),
          ]),
          h('div', { class: menuGroupClassNames() }, renderEntries(entry.children, onSelect)),
        ],
      );
    }

    const itemClass = menuItemClassNames(entry.selected);

    if (entry.href) {
      return h(
        'a',
        {
          class: itemClass,
          href: entry.href,
          'aria-disabled': entry.disabled ? 'true' : undefined,
          key: entry.id,
        },
        entry.label,
      );
    }

    return h(
      'button',
      {
        type: 'button',
        class: itemClass,
        disabled: entry.disabled || undefined,
        key: entry.id,
        onClick: () => onSelect(entry.id),
      },
      entry.label,
    );
  });

export const Menu = defineComponent({
  name: 'EevenkotoMenu',
  props: {
    entries: { type: Array as PropType<MenuEntry[]>, required: true },
    label: { type: String, default: undefined },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const className = computed(() => menuClassNames());

    return () =>
      h(
        'div',
        { class: className.value, role: 'group', 'aria-label': props.label },
        renderEntries(props.entries, (id) => emit('select', id)),
      );
  },
});
