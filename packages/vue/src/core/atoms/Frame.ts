import { frameClassNames } from '@eevenkoto/core';
import { defineComponent, h } from 'vue';

export const Frame = defineComponent({
  name: 'EevenkotoFrame',
  setup(_props, { slots }) {
    return () => h('div', { class: frameClassNames() }, slots.default?.());
  },
});
