import { entityPreviewClassNames, type EntityPreviewProps } from '@eevenkoto/core';
import { defineComponent, h, type PropType } from 'vue';
import { Badge } from '../../core/atoms/Badge';
import { LinkButton } from '../../core/atoms/LinkButton';

export type { EntityPreviewProps };

export const EntityPreview = defineComponent({
  name: 'EevenkotoEntityPreview',
  props: {
    title: { type: String, default: undefined },
    titleLevel: { type: Number as PropType<EntityPreviewProps['titleLevel']>, default: 2 },
    body: { type: String, default: undefined },
    bodyHtml: { type: String, default: undefined },
    flush: { type: Boolean, default: false },
    kind: { type: String as PropType<EntityPreviewProps['kind']>, default: undefined },
    badge: { type: Object as PropType<EntityPreviewProps['badge']>, default: undefined },
    truncatedLabel: { type: String, default: undefined },
    footerLink: { type: Object as PropType<EntityPreviewProps['footerLink']>, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const Title = props.titleLevel === 3 ? 'h3' : 'h2';
      const extra = slots.default?.();
      const hasBody = Boolean(
        props.badge || props.bodyHtml || props.body || extra?.length || props.truncatedLabel,
      );
      return h(
        'div',
        { class: entityPreviewClassNames({ flush: props.flush }), 'data-entity-kind': props.kind },
        [
          props.title ? h('header', null, [h(Title, null, props.title)]) : null,
          hasBody
            ? h(
                'div',
                { class: 'eevenkoto-tooltip-card__body eevenkoto-prose', tabindex: 0 },
                [
                  props.badge
                    ? h('div', { class: 'eevenkoto-entity-preview__meta' }, [h(Badge, props.badge)])
                    : null,
                  props.bodyHtml !== undefined
                    ? h('div', { class: 'eevenkoto-entity-preview__html', innerHTML: props.bodyHtml })
                    : props.body
                      ? h('p', null, props.body)
                      : null,
                  extra,
                  props.truncatedLabel
                    ? h('p', { class: 'eevenkoto-entity-preview__truncated' }, props.truncatedLabel)
                    : null,
                ],
              )
            : null,
          props.footerLink ? h('footer', null, [h(LinkButton, props.footerLink)]) : null,
        ],
      );
    };
  },
});