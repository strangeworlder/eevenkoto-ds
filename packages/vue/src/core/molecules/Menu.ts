import {
  menuClassNames,
  menuIconClassNames,
  menuItemClassNames,
  menuItemLabelClassNames,
  type MenuEntry,
  type MenuGroupEntry,
  type MenuItemEntry,
  type MenuProps,
  type MenuSize,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNode } from 'vue';
import { Icon } from '../atoms/Icon';
import { StatusDot } from '../atoms/StatusDot';

export type { MenuProps, MenuEntry, MenuSize };

const itemChildren = (entry: MenuItemEntry): (string | VNode)[] => {
  const extras = Boolean(entry.icon || entry.locked || entry.status);
  const nodes: (string | VNode)[] = [];
  if (entry.icon) {
    nodes.push(h('span', { class: menuIconClassNames() }, [h(Icon, { name: entry.icon })]));
  }
  nodes.push(
    extras ? h('span', { class: menuItemLabelClassNames() }, entry.label) : entry.label,
  );
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

const groupSummaryChildren = (entry: MenuGroupEntry): string | (string | VNode)[] => {
  if (!entry.icon) return entry.label;
  return [
    h('span', { class: menuIconClassNames() }, [h(Icon, { name: entry.icon })]),
    h('span', { class: menuItemLabelClassNames() }, entry.label),
  ];
};

const renderEntries = (
  entries: MenuEntry[],
  onSelect: (id: string) => void,
): VNode[] =>
  entries.map((entry, index) => {
    if (entry.kind === 'separator') {
      return h('li', { key: `separator-${index}` }, [h('hr')]);
    }

    if (entry.kind === 'header') {
      return h('li', { key: `header-${entry.label}-${index}` }, [
        h('p', { class: 'eevenkoto-menu__header' }, entry.label),
      ]);
    }

    if (entry.kind === 'group') {
      return h('li', { key: entry.id }, [
        h('details', { open: entry.expanded || undefined }, [
          h('summary', groupSummaryChildren(entry)),
          h('ul', renderEntries(entry.children, onSelect)),
        ]),
      ]);
    }

    const itemClass = menuItemClassNames({ selected: entry.selected, locked: entry.locked });
    const lockedNoHref = Boolean(entry.locked && !entry.href);

    if (entry.href) {
      return h('li', { key: entry.id }, [
        h(
          'a',
          {
            class: itemClass,
            href: entry.href,
            'aria-current': entry.selected ? 'page' : undefined,
            'aria-disabled': entry.disabled || lockedNoHref ? 'true' : undefined,
            tabindex: entry.disabled || lockedNoHref ? '-1' : undefined,
          },
          itemChildren(entry),
        ),
      ]);
    }

    return h('li', { key: entry.id }, [
      h(
        'button',
        {
          type: 'button',
          class: itemClass,
          disabled: entry.disabled || entry.locked || undefined,
          onClick: () => onSelect(entry.id),
        },
        itemChildren(entry),
      ),
    ]);
  });

export const Menu = defineComponent({
  name: 'EevenkotoMenu',
  props: {
    entries: { type: Array as PropType<MenuEntry[]>, required: true },
    label: { type: String, default: undefined },
    size: { type: String as PropType<MenuSize>, default: undefined },
    embedded: { type: Boolean, default: false },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const className = computed(() =>
      menuClassNames({ embedded: props.embedded, size: props.size }),
    );

    return () =>
      h('nav', { class: className.value, 'aria-label': props.label }, [
        h('ul', renderEntries(props.entries, (id) => emit('select', id))),
      ]);
  },
});
