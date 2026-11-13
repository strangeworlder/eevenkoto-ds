import {
  workshopBodyClassNames,
  workshopClassNames,
  workshopControlsClassNames,
  workshopFooterClassNames,
  workshopHeaderClassNames,
  workshopPreviewClassNames,
  workshopToolbarClassNames,
  type IconName,
  type WorkshopLayout,
  type WorkshopProps,
  type WorkshopSticky,
  type WorkshopTitleLevel,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';
import { Icon } from '../atoms/Icon';

export type { WorkshopProps };

export const Workshop = defineComponent({
  name: 'EevenkotoWorkshop',
  props: {
    id: { type: String, default: undefined },
    idSuffix: { type: String, default: undefined },
    label: { type: String, default: undefined },
    layout: { type: String as PropType<WorkshopLayout>, default: undefined },
    sticky: { type: String as PropType<WorkshopSticky>, default: undefined },
    icon: { type: String as PropType<IconName>, default: undefined },
    title: { type: String, default: undefined },
    titleLevel: { type: Number as PropType<WorkshopTitleLevel>, default: undefined },
    subtitle: { type: String, default: undefined },
    controlsWidth: { type: String, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() =>
      workshopClassNames({ layout: props.layout, sticky: props.sticky }),
    );

    return () => {
      const headerContent = slots.header?.();
      const controlsContent = slots.controls ? slots.controls() : slots.default?.();
      const toolbarContent = slots.toolbar?.();
      const previewContent = slots.preview?.();
      const footerContent = slots.footer?.();

      const children: VNodeChild[] = [];

      const hasTitleGroup = Boolean(props.icon || props.title || props.subtitle);
      if (hasTitleGroup || headerContent) {
        const headerChildren: VNodeChild[] = [];
        if (hasTitleGroup) {
          const titleGroupChildren: VNodeChild[] = [];
          if (props.icon) {
            titleGroupChildren.push(
              h('span', { class: 'eevenkoto-workshop__icon-badge' }, [
                h(Icon, { name: props.icon }),
              ]),
            );
          }
          if (props.title) {
            const resolvedTitleLevel: WorkshopTitleLevel = props.titleLevel === 3 ? 3 : 2;
            titleGroupChildren.push(
              h(`h${resolvedTitleLevel}`, { class: 'eevenkoto-workshop__title' }, props.title),
            );
          }
          if (props.subtitle) {
            titleGroupChildren.push(
              h('p', { class: 'eevenkoto-workshop__subtitle' }, props.subtitle),
            );
          }
          headerChildren.push(
            h('div', { class: 'eevenkoto-workshop__title-group' }, titleGroupChildren),
          );
        }
        if (headerContent) {
          headerChildren.push(...headerContent);
        }
        children.push(h('div', { class: workshopHeaderClassNames() }, headerChildren));
      }

      const bodyChildren: VNodeChild[] = [
        h('div', { class: workshopControlsClassNames() }, controlsContent),
      ];

      if (toolbarContent || previewContent) {
        if (toolbarContent) {
          const previewChildren: VNodeChild[] = [
            h('div', { class: workshopToolbarClassNames() }, toolbarContent),
          ];
          if (previewContent) {
            previewChildren.push(...previewContent);
          }
          bodyChildren.push(h('div', { class: workshopPreviewClassNames() }, previewChildren));
        } else {
          bodyChildren.push(h('div', { class: workshopPreviewClassNames() }, previewContent));
        }
      }

      children.push(h('div', { class: workshopBodyClassNames() }, bodyChildren));

      if (footerContent) {
        children.push(h('footer', { class: workshopFooterClassNames() }, footerContent));
      }

      const elementId =
        props.id ??
        (attrs.id as string | undefined) ??
        (props.idSuffix ? `workshop${props.idSuffix}` : undefined);

      const styleObj = props.controlsWidth
        ? [attrs.style, { '--eevenkoto-workshop-controls-width': props.controlsWidth }]
        : attrs.style;

      return h(
        'div',
        {
          ...attrs,
          id: elementId,
          role: attrs.role ?? (props.label ? 'region' : undefined),
          'aria-label': props.label,
          style: styleObj,
          class: className.value,
          'data-eevenkoto-workshop': true,
        },
        children,
      );
    };
  },
});
