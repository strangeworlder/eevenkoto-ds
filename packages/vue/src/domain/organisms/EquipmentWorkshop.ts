import {
  equipmentWorkshopClassNames,
  type EquipmentWorkshopProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type VNodeChild } from 'vue';

export type { EquipmentWorkshopProps };

export const EquipmentWorkshop = defineComponent({
  name: 'EevenkotoEquipmentWorkshop',
  props: {
    idSuffix: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { slots, attrs }) {
    const className = computed(() => equipmentWorkshopClassNames());

    return () => {
      const headerContent = slots.header?.();
      const controlsContent = slots.controls ? slots.controls() : slots.default?.();
      const previewContent = slots.preview?.();

      const children: VNodeChild[] = [];

      if (headerContent) {
        children.push(
          h('div', { class: 'eevenkoto-equipment-workshop__header' }, headerContent),
        );
      }

      const bodyChildren: VNodeChild[] = [
        h('div', { class: 'eevenkoto-equipment-workshop__controls' }, controlsContent),
      ];

      if (previewContent) {
        bodyChildren.push(
          h('div', { class: 'eevenkoto-equipment-workshop__preview' }, previewContent),
        );
      }

      children.push(h('div', { class: 'eevenkoto-equipment-workshop__body' }, bodyChildren));

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
