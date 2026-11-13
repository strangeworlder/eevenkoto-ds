import { cardClassNames, tierCardClassNames, type TierCardProps } from '@eevenkoto/core';
import { defineComponent, h, type PropType } from 'vue';
import { Badge } from '../atoms/Badge';
import { LinkButton } from '../atoms/LinkButton';
import { List } from '../molecules/List';

export type { TierCardProps };

export const TierCard = defineComponent({
  name: 'EevenkotoTierCard',
  props: {
    id: { type: String, default: undefined },
    name: { type: String, required: true },
    nameLevel: { type: Number as PropType<TierCardProps['nameLevel']>, default: 2 },
    badge: { type: Object as PropType<TierCardProps['badge']>, default: undefined },
    price: { type: String, required: true },
    period: { type: String, default: undefined },
    description: { type: String, default: undefined },
    descriptionHtml: { type: String, default: undefined },
    features: { type: Array as PropType<TierCardProps['features']>, required: true },
    featured: { type: Boolean, default: false },
    current: { type: Boolean, default: false },
    cta: { type: Object as PropType<TierCardProps['cta']>, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const className = `${cardClassNames({
        elevated: true,
        accent: props.featured ? 'outline' : 'none',
        current: props.current,
      })} ${tierCardClassNames({ featured: props.featured, current: props.current })}`;
      const footer = slots.footer
        ? slots.footer()
        : props.cta
          ? [h(LinkButton, { ...props.cta, fullWidth: true })]
          : [];

      return h('article', { id: props.id, class: className }, [
        h('header', { class: 'eevenkoto-tier-card__header' }, [
          h(`h${props.nameLevel ?? 2}`, { class: 'eevenkoto-tier-card__name' }, props.name),
          props.badge ? h(Badge, { ...props.badge, shape: props.badge.shape ?? 'pill' }) : null,
        ]),
        h('div', { class: 'eevenkoto-tier-card__pricing' }, [
          h('span', { class: 'eevenkoto-tier-card__price' }, props.price),
          props.period ? h('span', { class: 'eevenkoto-tier-card__period' }, props.period) : null,
        ]),
        props.descriptionHtml !== undefined
          ? h('p', { class: 'eevenkoto-tier-card__description', innerHTML: props.descriptionHtml })
          : props.description
            ? h('p', { class: 'eevenkoto-tier-card__description' }, props.description)
            : null,
        h('div', { class: 'eevenkoto-tier-card__features' }, [
          h(List, { variant: 'checklist', size: 'sm', items: props.features }),
        ]),
        footer.length ? h('footer', { class: 'eevenkoto-tier-card__footer' }, footer) : null,
      ]);
    };
  },
});
