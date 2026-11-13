import {
  tableOfContentsClassNames,
  type TableOfContentsGroup,
  type TableOfContentsProps,
} from '@eevenkoto/core';
import { defineComponent, h, type PropType, type VNode } from 'vue';
import { Icon } from '../atoms/Icon';

export type { TableOfContentsProps };

const renderGroups = (groups: TableOfContentsGroup[]): VNode[] =>
  groups.map((group, index) =>
    h('div', { class: 'eevenkoto-toc__group', id: group.id, key: group.id ?? index }, [
      group.label ? h('p', { class: 'eevenkoto-toc__group-label' }, group.label) : null,
      h(
        'ul',
        { class: 'eevenkoto-toc__list' },
        group.items.map((item) =>
          h('li', { key: item.id }, [
            h(
              'a',
              {
                class: 'eevenkoto-toc__link',
                href: item.href,
                'data-toc-target': item.id,
                'aria-current': item.current ? 'location' : undefined,
              },
              item.label,
            ),
          ]),
        ),
      ),
    ]),
  );

export const TableOfContents = defineComponent({
  name: 'EevenkotoTableOfContents',
  props: {
    id: { type: String, default: undefined },
    label: { type: String, default: 'Table of contents' },
    groups: { type: Array as PropType<TableOfContentsProps['groups']>, required: true },
    variant: { type: String as PropType<TableOfContentsProps['variant']>, default: 'auto' },
    toggleLabel: { type: String, default: 'On this page' },
    open: { type: Boolean, default: false },
  },
  setup(props) {
    return () =>
      h(
        'nav',
        {
          id: props.id,
          class: tableOfContentsClassNames({ variant: props.variant }),
          'aria-label': props.label,
        },
        [
          props.variant !== 'collapsible'
            ? h('div', { class: 'eevenkoto-toc__rail' }, [
                h('p', { class: 'eevenkoto-toc__heading' }, props.toggleLabel),
                ...renderGroups(props.groups),
              ])
            : null,
          props.variant !== 'rail'
            ? h(
                'details',
                { class: 'eevenkoto-toc__disclosure', open: props.open || undefined },
                [
                  h('summary', { class: 'eevenkoto-toc__summary' }, [
                    h('span', { class: 'eevenkoto-toc__toggle-label' }, props.toggleLabel),
                    h(Icon, { name: 'chevron-down', size: 'sm' }),
                  ]),
                  h('div', { class: 'eevenkoto-toc__panel' }, renderGroups(props.groups)),
                ],
              )
            : null,
        ],
      );
  },
});
