import { mapFrameClassNames, type MapFrameProps } from '@eevenkoto/core';
import { defineComponent, h } from 'vue';

export type { MapFrameProps };

export const MapFrame = defineComponent({
  name: 'EevenkotoMapFrame',
  props: {
    id: { type: String, default: undefined },
    title: { type: String, default: undefined },
    scale: { type: String, default: undefined },
    svgHtml: { type: String, default: undefined },
    src: { type: String, default: undefined },
    alt: { type: String, default: undefined },
    caption: { type: String, default: undefined },
    captionHtml: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const slot = slots.default?.();
      const vpClass = 'eevenkoto-map-frame__viewport';
      const viewport = slot?.length
        ? h('div', { class: vpClass }, slot)
        : props.svgHtml !== undefined
          ? h('div', { class: vpClass, innerHTML: props.svgHtml })
          : h('div', { class: vpClass }, [
              props.src ? h('img', { src: props.src, alt: props.alt ?? '' }) : null,
            ]);
      const capProps = { class: 'eevenkoto-map-frame__caption' };
      const caption =
        props.captionHtml !== undefined
          ? props.captionHtml
            ? h('figcaption', { ...capProps, innerHTML: props.captionHtml })
            : null
          : props.caption
            ? h('figcaption', capProps, props.caption)
            : null;
      return h('figure', { id: props.id, class: mapFrameClassNames() }, [
        props.title || props.scale
          ? h('div', { class: 'eevenkoto-map-frame__header' }, [
              props.title ? h('span', { class: 'eevenkoto-map-frame__title' }, props.title) : null,
              props.scale ? h('span', { class: 'eevenkoto-map-frame__scale' }, props.scale) : null,
            ])
          : null,
        viewport,
        caption,
      ]);
    };
  },
});