import { imageClassNames, type ImageFit, type ImageLayout, type ImageProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { ImageProps };

export const Image = defineComponent({
  name: 'EevenkotoImage',
  props: {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    caption: { type: String, default: undefined },
    layout: { type: String as PropType<ImageLayout>, default: undefined },
    framed: { type: Boolean, default: false },
    width: { type: [Number, String], default: undefined },
    height: { type: [Number, String], default: undefined },
    aspectRatio: { type: String, default: undefined },
    fit: { type: String as PropType<ImageFit>, default: undefined },
    loading: { type: String as PropType<'lazy' | 'eager'>, default: 'lazy' },
    decoding: { type: String as PropType<'async' | 'sync' | 'auto'>, default: 'async' },
    fetchPriority: { type: String as PropType<'high' | 'low' | 'auto'>, default: undefined },
    srcSet: { type: String, default: undefined },
    sizes: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      imageClassNames({
        layout: props.layout,
        framed: props.framed,
      }),
    );

    const style = computed(() => {
      const s: Record<string, string> = {};
      if (props.aspectRatio) s['--eevenkoto-image-aspect-ratio'] = props.aspectRatio;
      if (props.fit) s['--eevenkoto-image-object-fit'] = props.fit;
      return Object.keys(s).length > 0 ? s : undefined;
    });

    return () => {
      const imgNode = h('img', {
        class: 'eevenkoto-image__media',
        src: props.src,
        alt: props.alt,
        width: props.width,
        height: props.height,
        loading: props.loading,
        decoding: props.decoding,
        fetchpriority: props.fetchPriority,
        srcset: props.srcSet,
        sizes: props.sizes,
      });

      const captionContent = slots.caption ? slots.caption() : props.caption;
      const captionNode = captionContent
        ? h('figcaption', { class: 'eevenkoto-image__caption eevenkoto-caption' }, captionContent)
        : null;

      return h(
        'figure',
        {
          class: className.value,
          style: style.value,
        },
        captionNode ? [imgNode, captionNode] : [imgNode],
      );
    };
  },
});
