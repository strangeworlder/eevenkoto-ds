import { iconClassNames, iconPaths, type IconName, type IconProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { IconProps, IconName };

export const Icon = defineComponent({
  name: 'EevenkotoIcon',
  props: {
    name: { type: String as PropType<IconName>, required: true },
    size: { type: String as PropType<IconProps['size']>, default: undefined },
    label: { type: String, default: undefined },
  },
  setup(props) {
    const className = computed(() => iconClassNames({ size: props.size }));

    return () =>
      h(
        'svg',
        {
          class: className.value,
          xmlns: 'http://www.w3.org/2000/svg',
          viewBox: '0 0 16 16',
          fill: 'currentColor',
          focusable: 'false',
          role: props.label ? 'img' : undefined,
          'aria-label': props.label,
          'aria-hidden': props.label ? undefined : 'true',
        },
        [h('path', { d: iconPaths[props.name] })],
      );
  },
});
