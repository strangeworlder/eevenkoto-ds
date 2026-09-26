import {
  menuClassNames,
  menuItemClassNames,
  menuItemLabelClassNames,
  type MenuEntry,
  type MenuItemEntry,
  type MenuProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNode } from 'vue';
import { Icon } from '../atoms/Icon';
import { StatusDot } from '../atoms/StatusDot';

export type { MenuProps, MenuEntry };

const itemChildren = (entry: MenuItemEntry): (string | VNode)[] => {
  const extras = Boolean(entry.locked || entry.status);
  const nodes: (string | VNode)[] = extras
    ? [h('span', { class: menuItemLabelClassNames() }, entry.label)]
    : [entry.label];
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
          h('summary', entry.label),
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
    embedded: { type: Boolean, default: false },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const className = computed(() => menuClassNames({ embedded: props.embedded }));

    return () =>
      h('nav', { class: className.value, 'aria-label': props.label }, [
        h('ul', renderEntries(props.entries, (id) => emit('select', id))),
      ]);
  },
});
