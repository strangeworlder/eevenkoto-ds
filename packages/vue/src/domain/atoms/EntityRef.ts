import {
  entityRefClassNames,
  inlineRefLabelClassNames,
  type EntityRefKind,
  type EntityRefProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { EntityRefProps, EntityRefKind };

export const EntityRef = defineComponent({
  name: 'EevenkotoEntityRef',
  props: {
    kind: { type: String as PropType<EntityRefKind>, default: undefined },
    name: { type: String, required: true },
    href: { type: String, default: undefined },
  },
  setup(props) {
    const className = computed(() => entityRefClassNames({ kind: props.kind }));

    return () =>
      h(props.href ? 'a' : 'span', { class: className.value, href: props.href }, [
        h('span', { class: inlineRefLabelClassNames() }, props.name),
      ]);
  },
});
