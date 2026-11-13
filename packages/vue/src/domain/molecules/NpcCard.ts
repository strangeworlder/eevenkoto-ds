import { npcCardClassNames, type NpcCardProps } from '@eevenkoto/core';
import { defineComponent, h, type PropType } from 'vue';
import { PropertyList } from '../../core/molecules/PropertyList';

export type { NpcCardProps };

export const NpcCard = defineComponent({
  name: 'EevenkotoNpcCard',
  props: {
    id: { type: String, default: undefined },
    name: { type: String, required: true },
    nameHtml: { type: String, default: undefined },
    nameLevel: { type: Number as PropType<NpcCardProps['nameLevel']>, default: 3 },
    role: { type: String, default: undefined },
    roleHtml: { type: String, default: undefined },
    details: { type: Array as PropType<NpcCardProps['details']>, default: undefined },
    body: { type: String, default: undefined },
    bodyHtml: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const nameProps = { class: 'eevenkoto-npc-card__name' };
      const nameNode = h(
        `h${props.nameLevel ?? 3}`,
        props.nameHtml !== undefined ? { ...nameProps, innerHTML: props.nameHtml } : nameProps,
        props.nameHtml !== undefined ? undefined : props.name,
      );
      const roleProps = { class: 'eevenkoto-npc-card__role' };
      const roleNode =
        props.roleHtml !== undefined
          ? props.roleHtml
            ? h('p', { ...roleProps, innerHTML: props.roleHtml })
            : null
          : props.role
            ? h('p', roleProps, props.role)
            : null;
      const slot = slots.default?.();
      const bodyClass = 'eevenkoto-npc-card__body eevenkoto-prose';
      const body = slot?.length
        ? h('div', { class: bodyClass }, slot)
        : props.bodyHtml !== undefined
          ? h('div', { class: bodyClass, innerHTML: props.bodyHtml })
          : props.body
            ? h('div', { class: bodyClass }, [h('p', null, props.body)])
            : null;
      return h('article', { id: props.id, class: npcCardClassNames() }, [
        h('header', { class: 'eevenkoto-npc-card__header' }, [nameNode, roleNode]),
        props.details?.length
          ? h(PropertyList, { layout: 'divided', items: props.details })
          : null,
        body,
      ]);
    };
  },
});