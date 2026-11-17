import {
  cardClassNames,
  cardEyebrowClassNames,
  cardHeaderActionsClassNames,
  cardHeaderGroupClassNames,
  type CardLayout,
  type CardProps,
  type CardSurface,
  type CardTitleLevel,
  type CardTitleSize,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { CardProps, CardTitleLevel, CardTitleSize, CardSurface, CardLayout };

const BLOCK_TAG_RE = /^\s*<(?:p|ul|ol|div|dl|blockquote|table|figure|section|h[1-6])\b/i;

export const Card = defineComponent({
  name: 'EevenkotoCard',
  props: {
    surface: { type: String as PropType<CardSurface>, default: 'raised' },
    featured: { type: Boolean, default: false },
    current: { type: Boolean, default: false },
    layout: { type: String as PropType<CardLayout>, default: 'stack' },
    elevated: { type: Boolean, default: false },
    interactive: { type: Boolean, default: false },
    eyebrow: { type: String, default: undefined },
    title: { type: String, default: undefined },
    titleHtml: { type: String, default: undefined },
    titleLevel: { type: Number as PropType<CardTitleLevel>, default: 2 },
    titleSize: { type: String as PropType<CardTitleSize>, default: undefined },
    body: { type: String, default: undefined },
    bodyHtml: { type: String, default: undefined },
    href: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      cardClassNames({
        surface: props.surface,
        featured: props.featured,
        current: props.current,
        layout: props.layout,
        elevated: props.elevated,
        interactive: props.interactive || Boolean(props.href),
        titleSize: props.titleSize,
      }),
    );

    return () => {
      const mainChildren: VNodeChild[] = [];
      const level: CardTitleLevel = props.titleLevel === 3 ? 3 : 2;
      const hasHeaderActions = Boolean(slots.headerActions);

      const headerItems: VNodeChild[] = [];
      if (slots.header) {
        headerItems.push(slots.header());
      } else {
        const eyebrowEl = props.eyebrow
          ? h('p', { class: cardEyebrowClassNames() }, props.eyebrow)
          : null;
        const headingEl = props.titleHtml
          ? h(`h${level}`, { innerHTML: props.titleHtml })
          : props.title
            ? h(`h${level}`, props.title)
            : null;
        if (eyebrowEl && headingEl) {
          headerItems.push(h('div', { class: cardHeaderGroupClassNames() }, [eyebrowEl, headingEl]));
        } else if (eyebrowEl) {
          headerItems.push(eyebrowEl);
        } else if (headingEl) {
          headerItems.push(headingEl);
        }
      }

      if (hasHeaderActions && slots.headerActions) {
        headerItems.push(h('div', { class: cardHeaderActionsClassNames() }, slots.headerActions()));
      }

      if (headerItems.length > 0) {
        mainChildren.push(
          h(
            'header',
            hasHeaderActions || props.eyebrow ? { class: 'eevenkoto-card__header' } : null,
            headerItems,
          ),
        );
      }

      if (props.bodyHtml) {
        mainChildren.push(
          BLOCK_TAG_RE.test(props.bodyHtml)
            ? h('div', { class: 'eevenkoto-card__body', innerHTML: props.bodyHtml })
            : h('p', { innerHTML: props.bodyHtml }),
        );
      } else if (props.body) {
        mainChildren.push(h('p', props.body));
      }
      if (slots.default) mainChildren.push(slots.default());

      const children: VNodeChild[] =
        props.layout === 'split'
          ? mainChildren.length > 0
            ? [h('div', { class: 'eevenkoto-card__body' }, mainChildren)]
            : []
          : [...mainChildren];

      if (slots.actions) {
        children.push(h('div', { class: 'eevenkoto-card__actions' }, slots.actions()));
      }

      if (slots.footer) {
        children.push(h('footer', slots.footer()));
      }

      const inner = props.href ? [h('a', { href: props.href }, children)] : children;

      return h('article', { class: className.value }, inner);
    };
  },
});
