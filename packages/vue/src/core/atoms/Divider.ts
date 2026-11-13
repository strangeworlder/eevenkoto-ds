import { dividerClassNames, type DividerProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { DividerProps };

export const Divider = defineComponent({
  name: 'EevenkotoDivider',
  props: {
    spacing: { type: String as PropType<DividerProps['spacing']>, default: undefined },
    variant: { type: String as PropType<DividerProps['variant']>, default: undefined },
  },
  setup(props) {
    const className = computed(() =>
      dividerClassNames({ spacing: props.spacing, variant: props.variant }),
    );
    return () => h('hr', { class: className.value });
  },
});
