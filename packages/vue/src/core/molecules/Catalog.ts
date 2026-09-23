import {
  catalogClassNames,
  catalogTileClassNames,
  type CatalogProps,
  type CatalogTileProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { Icon } from '../atoms/Icon';
import { StatusDot } from '../atoms/StatusDot';

export type { CatalogProps, CatalogTileProps };

export const CatalogTile = defineComponent({
  name: 'EevenkotoCatalogTile',
  props: {
    name: { type: String, required: true },
    href: { type: String, required: true },
    status: { type: String as PropType<CatalogTileProps['status']>, default: undefined },
    statusLabel: { type: String, default: 'Ready' },
    locked: { type: Boolean, default: false },
    lockedLabel: { type: String, default: 'Locked' },
  },
  setup(props) {
    const className = computed(() => catalogTileClassNames({ locked: props.locked }));

    return () =>
      h('a', { class: className.value, href: props.href }, [
        props.status
          ? h(StatusDot, { intent: props.status, label: props.statusLabel })
          : null,
        h('span', { class: 'eevenkoto-catalog-tile__name' }, props.name),
        props.locked
          ? h('span', { class: 'eevenkoto-catalog-tile__lock' }, [
              h(Icon, { name: 'lock' }),
              h('span', { class: 'eevenkoto-visually-hidden' }, props.lockedLabel),
            ])
          : null,
      ]);
  },
});

export const Catalog = defineComponent({
  name: 'EevenkotoCatalog',
  props: {
    tiles: { type: Array as PropType<CatalogTileProps[]>, required: true },
    label: { type: String, default: undefined },
  },
  setup(props) {
    const className = computed(() => catalogClassNames());

    return () =>
      h(
        'ul',
        { class: className.value, 'aria-label': props.label },
        props.tiles.map((tile) =>
          h('li', { key: `${tile.href}${tile.name}` }, [h(CatalogTile, tile)]),
        ),
      );
  },
});
