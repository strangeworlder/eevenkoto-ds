import { contentGateClassNames, headingClassNames, type ContentGateProps } from '@eevenkoto/core';
import { defineComponent, h, type PropType } from 'vue';
import { Badge } from '../../core/atoms/Badge';
import { Icon } from '../../core/atoms/Icon';

export type { ContentGateProps };

export const ContentGate = defineComponent({
  name: 'EevenkotoContentGate',
  props: {
    id: { type: String, default: undefined },
    readinessLabel: { type: String, required: true },
    readinessIntent: {
      type: String as PropType<ContentGateProps['readinessIntent']>,
      required: true,
    },
    lockLabel: { type: String, default: undefined },
    title: { type: String, required: true },
    titleLevel: { type: Number as PropType<ContentGateProps['titleLevel']>, default: 2 },
    description: { type: String, default: undefined },
    descriptionHtml: { type: String, default: undefined },
    currentTierLabel: { type: String, required: true },
    currentTierPrefix: { type: String, default: undefined },
    requiredTierLabel: { type: String, required: true },
    requiredTierPrefix: { type: String, default: undefined },
    statusMessage: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const level = props.titleLevel ?? 2;
      const slot = slots.default?.();
      const descClass = 'eevenkoto-content-gate__description eevenkoto-prose';
      const description = slot?.length
        ? h('div', { class: descClass }, slot)
        : props.descriptionHtml !== undefined
          ? h('div', { class: descClass, innerHTML: props.descriptionHtml })
          : props.description
            ? h('div', { class: descClass }, [h('p', null, props.description)])
            : null;
      const actions = slots.actions?.();
      const footer = slots.footer?.();
      const tier = (prefix: string | undefined, label: string) =>
        h('span', null, [prefix ? `${prefix} ` : null, h('strong', null, label)]);
      return h('section', { id: props.id, class: contentGateClassNames() }, [
        h('div', { class: 'eevenkoto-content-gate__status-row' }, [
          h(Badge, {
            label: props.readinessLabel,
            intent: props.readinessIntent,
            dot: true,
            shape: 'pill',
          }),
          h('span', { class: 'eevenkoto-content-gate__lock' }, [
            h(Icon, { name: 'lock', size: 'md', label: props.lockLabel }),
          ]),
        ]),
        h(
          `h${level}`,
          { class: `${headingClassNames({ level })} eevenkoto-content-gate__title` },
          props.title,
        ),
        description,
        h('p', { class: 'eevenkoto-content-gate__comparison' }, [
          tier(props.currentTierPrefix, props.currentTierLabel),
          tier(props.requiredTierPrefix, props.requiredTierLabel),
        ]),
        actions?.length ? h('div', { class: 'eevenkoto-content-gate__actions' }, actions) : null,
        h(
          'p',
          {
            class: 'eevenkoto-content-gate__feedback',
            role: 'status',
            'aria-live': 'polite',
            hidden: !props.statusMessage,
          },
          props.statusMessage,
        ),
        footer?.length ? h('footer', { class: 'eevenkoto-content-gate__footer' }, footer) : null,
      ]);
    };
  },
});