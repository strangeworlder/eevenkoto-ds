import { swatchClassNames, type SwatchProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { SwatchProps };

export const Swatch = defineComponent({
  name: 'EevenkotoSwatch',
  props: {
    color: { type: String, required: true },
    size: { type: String as PropType<SwatchProps['size']>, default: undefined },
    shape: { type: String as PropType<SwatchProps['shape']>, default: undefined },
    label: { type: String, default: undefined },
  },
  setup(props) {
    const className = computed(() =>
      swatchClassNames({ size: props.size, shape: props.shape }),
    );

    return () =>
      h('span', {
        class: className.value,
        style: { '--eevenkoto-swatch-color': props.color },
        role: props.label ? 'img' : undefined,
        'aria-label': props.label || undefined,
        'aria-hidden': props.label ? undefined : 'true',
      });
  },
});
