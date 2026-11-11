import {
  menuClassNames,
  menuIconClassNames,
  menuItemClassNames,
  menuItemLabelClassNames,
  type MenuAttributes,
  type MenuEntry,
  type MenuGroupEntry,
  type MenuItemEntry,
  type MenuProps,
  type MenuSize,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNode } from 'vue';
import { Icon } from '../atoms/Icon';
import { StatusDot } from '../atoms/StatusDot';

export type { MenuAttributes, MenuProps, MenuEntry, MenuSize };

const SAFE_ATTR_NAME_RE = /^[a-zA-Z_:][a-zA-Z0-9_.:-]*$/;

const normalizeAttributes = (
  attrs?: MenuAttributes,
  omitClass = false,
): Record<string, string | boolean> => {
  const out: Record<string, string | boolean> = {};
  if (!attrs) return out;
  for (const [name, value] of Object.entries(attrs)) {
    if (value === undefined || value === false) continue;
    if (omitClass && name === 'class') continue;
    if (!SAFE_ATTR_NAME_RE.test(name) || /^on/i.test(name)) continue;
    out[name] = value === true && name.startsWith('data-') ? '' : value;
  }
  return out;
};

const mergeClass = (base: string, attrs?: MenuAttributes): string => {
  const extra = typeof attrs?.class === 'string' ? attrs.class.trim() : '';
  return extra ? `${base} ${extra}` : base;
};

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
      return h('li', { key: entry.id ?? `separator-${index}` }, [
        h('hr', normalizeAttributes(entry.attributes)),
      ]);
    }

    if (entry.kind === 'header') {
      return h('li', { key: entry.id ?? `header-${entry.label}-${index}` }, [
        h(
          'p',
          {
            ...normalizeAttributes(entry.attributes, true),
            class: mergeClass('eevenkoto-menu__header', entry.attributes),
          },
          entry.label,
        ),
      ]);
    }

    if (entry.kind === 'group') {
      return h('li', { key: entry.id }, [
        h(
          'details',
          {
            ...normalizeAttributes(entry.attributes),
            open: entry.expanded || undefined,
          },
          [
            h('summary', groupSummaryChildren(entry)),
            h('ul', renderEntries(entry.children, onSelect)),
          ],
        ),
      ]);
    }

    const itemClass = mergeClass(
      menuItemClassNames({ selected: entry.selected, locked: entry.locked }),
      entry.attributes,
    );
    const lockedNoHref = Boolean(entry.locked && !entry.href);

    if (entry.href) {
      return h('li', { key: entry.id }, [
        h(
          'a',
          {
            ...normalizeAttributes(entry.attributes, true),
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
          ...normalizeAttributes(entry.attributes, true),
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
