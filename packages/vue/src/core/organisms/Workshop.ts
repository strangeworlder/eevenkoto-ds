import {
  workshopBodyClassNames,
  workshopClassNames,
  workshopControlsClassNames,
  workshopHeaderClassNames,
  workshopPreviewClassNames,
  type WorkshopProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type VNodeChild } from 'vue';

export type { WorkshopProps };

export const Workshop = defineComponent({
  name: 'EevenkotoWorkshop',
  props: {
    id: { type: String, default: undefined },
    idSuffix: { type: String, default: undefined },
    label: { type: String, default: undefined },
    controlsWidth: { type: String, default: undefined },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() => workshopClassNames());

    return () => {
      const headerContent = slots.header?.();
      const controlsContent = slots.controls ? slots.controls() : slots.default?.();
      const previewContent = slots.preview?.();

      const children: VNodeChild[] = [];

      if (headerContent) {
        children.push(h('div', { class: workshopHeaderClassNames() }, headerContent));
      }

      const bodyChildren: VNodeChild[] = [
        h('div', { class: workshopControlsClassNames() }, controlsContent),
      ];

      if (previewContent) {
        bodyChildren.push(
          h('div', { class: workshopPreviewClassNames() }, previewContent),
        );
      }

      children.push(h('div', { class: workshopBodyClassNames() }, bodyChildren));

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
