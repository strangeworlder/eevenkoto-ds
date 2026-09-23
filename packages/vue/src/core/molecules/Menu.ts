import {
  menuBranchClassNames,
  menuClassNames,
  menuGroupClassNames,
  menuItemClassNames,
  menuItemLabelClassNames,
  menuSummaryClassNames,
  type MenuEntry,
  type MenuItemEntry,
  type MenuProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNode } from 'vue';
import { Icon } from '../atoms/Icon';
import { StatusDot } from '../atoms/StatusDot';

export type { MenuProps, MenuEntry };

const itemChildren = (entry: MenuItemEntry): VNode[] => {
  const nodes: VNode[] = [h('span', { class: menuItemLabelClassNames() }, entry.label)];
  if (entry.locked) {
    nodes.push(
      h('span', { class: 'eevenkoto-menu__lock' }, [
        h(Icon, { name: 'lock' }),
        h('span', { class: 'eevenkoto-visually-hidden' }, entry.lockedLabel ?? 'Locked'),
      ]),
    );
  }
  if (entry.status) {
    nodes.push(
      h('span', { class: 'eevenkoto-menu__status' }, [
        h(StatusDot, { intent: entry.status, label: entry.statusLabel ?? 'Ready' }),
      ]),
    );
  }
  return nodes;
};

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
            h('span', { class: menuItemLabelClassNames() }, entry.label),
          ]),
          h('div', { class: menuGroupClassNames() }, renderEntries(entry.children, onSelect)),
        ],
      );
    }

    const itemClass = menuItemClassNames({ selected: entry.selected, locked: entry.locked });
    const lockedNoHref = Boolean(entry.locked && !entry.href);

    if (entry.href) {
      return h(
        'a',
        {
          class: itemClass,
          href: entry.href,
          'aria-disabled': entry.disabled || lockedNoHref ? 'true' : undefined,
          key: entry.id,
        },
        itemChildren(entry),
      );
    }

    return h(
      'button',
      {
        type: 'button',
        class: itemClass,
        disabled: entry.disabled || entry.locked || undefined,
        key: entry.id,
        onClick: () => onSelect(entry.id),
      },
      itemChildren(entry),
    );
  });

export const Menu = defineComponent({
  name: 'EevenkotoMenu',
  props: {
    entries: { type: Array as PropType<MenuEntry[]>, required: true },
    label: { type: String, default: undefined },
    embedded: { type: Boolean, default: false },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const className = computed(() => menuClassNames({ embedded: props.embedded }));

    return () =>
      h(
        'div',
        { class: className.value, role: 'group', 'aria-label': props.label },
        renderEntries(props.entries, (id) => emit('select', id)),
      );
  },
});
