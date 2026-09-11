import {
  tableShellClassNames,
  tableShellFooterClassNames,
  type ScrollAxis,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { Frame } from '../atoms/Frame';
import { Scroll } from '../atoms/Scroll';

export const TableShell = defineComponent({
  name: 'EevenkotoTableShell',
  props: {
    frame: { type: Boolean, default: true },
    scroll: { type: Boolean, default: true },
    scrollAxis: { type: String as PropType<ScrollAxis>, default: 'x' },
  },
  setup(props, { slots }) {
    const className = computed(() => tableShellClassNames());

    return () => {
      let body = slots.default?.();
      if (props.scroll) {
        body = [h(Scroll, { axis: props.scrollAxis }, () => body)];
      }
      if (props.frame) {
        body = [h(Frame, null, () => body)];
      }

      const footer = slots.footer
        ? h('div', { class: tableShellFooterClassNames() }, slots.footer())
        : null;

      return h('div', { class: className.value }, [body, footer]);
    };
  },
});
