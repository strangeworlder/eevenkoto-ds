import {
  panelBodyClassNames,
  panelClassNames,
  panelHeaderActionsClassNames,
  panelHeaderClassNames,
  panelHeaderLeadClassNames,
  panelTitleClassNames,
  type PanelDensity,
  type PanelProps,
  type PanelSurface,
  type PanelTitleLevel,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { PanelProps, PanelSurface, PanelDensity, PanelTitleLevel };

const BLOCK_TAG_RE = /^\s*<(?:p|ul|ol|div|dl|blockquote|table|figure|section|fieldset|h[1-6])\b/i;

export const Panel = defineComponent({
  name: 'EevenkotoPanel',
  props: {
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
    surface: { type: String as PropType<PanelSurface>, default: 'sunken' },
    density: { type: String as PropType<PanelDensity>, default: 'default' },
    title: { type: String, default: undefined },
    titleLevel: { type: Number as PropType<PanelTitleLevel>, default: 3 },
    hidden: { type: Boolean, default: false },
    body: { type: String, default: undefined },
    bodyHtml: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      panelClassNames({ surface: props.surface, density: props.density }),
    );

    return () => {
      const children: VNodeChild[] = [];
      const hasLead = Boolean(slots.headerLead);
      const hasActions = Boolean(slots.headerActions);

      if (hasLead || props.title || hasActions) {
        const headerChildren: VNodeChild[] = [];
        if (hasLead && slots.headerLead) {
          headerChildren.push(
            h('span', { class: panelHeaderLeadClassNames() }, slots.headerLead()),
          );
        }
        if (props.title) {
          const level: PanelTitleLevel =
            props.titleLevel === 2 ? 2 : props.titleLevel === 4 ? 4 : 3;
          headerChildren.push(h(`h${level}`, { class: panelTitleClassNames() }, props.title));
        }
        if (hasActions && slots.headerActions) {
          headerChildren.push(
            h('div', { class: panelHeaderActionsClassNames() }, slots.headerActions()),
          );
        }
        children.push(h('div', { class: panelHeaderClassNames() }, headerChildren));
      }

      if (slots.default) {
        children.push(h('div', { class: panelBodyClassNames() }, slots.default()));
      } else if (props.bodyHtml !== undefined) {
        children.push(
          BLOCK_TAG_RE.test(props.bodyHtml)
            ? h('div', { class: panelBodyClassNames(), innerHTML: props.bodyHtml })
            : h('div', { class: panelBodyClassNames() }, [
                h('p', { innerHTML: props.bodyHtml }),
              ]),
        );
      } else if (props.body) {
        children.push(h('div', { class: panelBodyClassNames() }, [h('p', props.body)]));
      }

      const tag = props.label ? 'section' : 'div';
      return h(
        tag,
        {
          id: props.id,
          role: props.label ? 'region' : undefined,
          'aria-label': props.label,
          hidden: props.hidden || undefined,
          class: className.value,
        },
        children,
      );
    };
  },
});
