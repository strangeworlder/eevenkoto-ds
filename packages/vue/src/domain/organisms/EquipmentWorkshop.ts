import {
  equipmentWorkshopClassNames,
  workshopBodyClassNames,
  workshopControlsClassNames,
  workshopFooterClassNames,
  workshopHeaderClassNames,
  workshopPreviewClassNames,
  workshopToolbarClassNames,
  type EquipmentWorkshopProps,
  type WorkshopLayout,
  type WorkshopSticky,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType, type VNodeChild } from 'vue';

export type { EquipmentWorkshopProps };

export const EquipmentWorkshop = defineComponent({
  name: 'EevenkotoEquipmentWorkshop',
  props: {
    idSuffix: {
      type: String,
      default: undefined,
    },
    layout: {
      type: String as PropType<WorkshopLayout>,
      default: undefined,
    },
    sticky: {
      type: String as PropType<WorkshopSticky>,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() =>
      equipmentWorkshopClassNames({ layout: props.layout, sticky: props.sticky }),
    );

    return () => {
      const headerContent = slots.header?.();
      const controlsContent = slots.controls ? slots.controls() : slots.default?.();
      const toolbarContent = slots.toolbar?.();
      const previewContent = slots.preview?.();
      const footerContent = slots.footer?.();

      const children: VNodeChild[] = [];

      if (headerContent) {
        children.push(
          h(
            'div',
            { class: `${workshopHeaderClassNames()} eevenkoto-equipment-workshop__header` },
            headerContent,
          ),
        );
      }

      const bodyChildren: VNodeChild[] = [
        h(
          'div',
          { class: `${workshopControlsClassNames()} eevenkoto-equipment-workshop__controls` },
          controlsContent,
        ),
      ];

      if (toolbarContent || previewContent) {
        if (toolbarContent) {
          const previewChildren: VNodeChild[] = [
            h(
              'div',
              { class: `${workshopToolbarClassNames()} eevenkoto-equipment-workshop__toolbar` },
              toolbarContent,
            ),
          ];
          if (previewContent) {
            previewChildren.push(...previewContent);
          }
          bodyChildren.push(
            h(
              'div',
              { class: `${workshopPreviewClassNames()} eevenkoto-equipment-workshop__preview` },
              previewChildren,
            ),
          );
        } else {
          bodyChildren.push(
            h(
              'div',
              { class: `${workshopPreviewClassNames()} eevenkoto-equipment-workshop__preview` },
              previewContent,
            ),
          );
        }
      }

      children.push(
        h(
          'div',
          { class: `${workshopBodyClassNames()} eevenkoto-equipment-workshop__body` },
          bodyChildren,
        ),
      );

      if (footerContent) {
        children.push(
          h(
            'div',
            { class: `${workshopFooterClassNames()} eevenkoto-equipment-workshop__footer` },
            footerContent,
          ),
        );
      }

      const elementId =
        attrs.id ?? (props.idSuffix ? `equipment-workshop${props.idSuffix}` : undefined);

      return h(
        'div',
        {
          ...attrs,
          id: elementId,
          class: className.value,
          'data-eevenkoto-equipment-workshop': true,
        },
        children,
      );
    };
  },
});
