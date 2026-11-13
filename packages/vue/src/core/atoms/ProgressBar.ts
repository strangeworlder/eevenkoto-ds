import { progressBarClassNames, progressBarFillClassNames, type ProgressBarProps } from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';

export type { ProgressBarProps };

export const ProgressBar = defineComponent({
  name: 'EevenkotoProgressBar',
  props: {
    id: { type: String, default: undefined },
    active: { type: Boolean, default: false },
    tone: { type: String as PropType<ProgressBarProps['tone']>, default: undefined },
    fixed: { type: Boolean, default: false },
    label: { type: String, default: 'Loading' },
    value: { type: Number, default: undefined },
  },
  setup(props) {
    const className = computed(() =>
      progressBarClassNames({ active: props.active, tone: props.tone, fixed: props.fixed }),
    );
    const clamped = computed(() =>
      typeof props.value === 'number' && Number.isFinite(props.value)
        ? Math.min(100, Math.max(0, props.value))
        : undefined,
    );

    return () =>
      h(
        'div',
        {
          id: props.id,
          class: className.value,
          role: 'progressbar',
          'aria-label': props.label,
          'aria-busy': props.active ? 'true' : undefined,
          'aria-hidden': props.active ? undefined : 'true',
          'aria-valuemin': clamped.value !== undefined ? 0 : undefined,
          'aria-valuemax': clamped.value !== undefined ? 100 : undefined,
          'aria-valuenow': clamped.value,
          style:
            clamped.value !== undefined
              ? { '--eevenkoto-progress-bar-scale': String(clamped.value / 100) }
              : undefined,
        },
        [h('div', { class: progressBarFillClassNames() })],
      );
  },
});
