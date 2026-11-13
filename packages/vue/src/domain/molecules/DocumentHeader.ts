import { documentHeaderClassNames, type DocumentHeaderProps } from '@eevenkoto/core';
import { defineComponent, h, type PropType } from 'vue';
import { Badge } from '../../core/atoms/Badge';
import { SegmentedControl } from '../../core/molecules/SegmentedControl';

export type { DocumentHeaderProps };

export const DocumentHeader = defineComponent({
  name: 'EevenkotoDocumentHeader',
  props: {
    id: { type: String, default: undefined },
    showLicenseToggle: { type: Boolean, default: false },
    selectedLicense: {
      type: String as PropType<DocumentHeaderProps['selectedLicense']>,
      default: undefined,
    },
    licenseOptions: {
      type: Array as PropType<DocumentHeaderProps['licenseOptions']>,
      default: undefined,
    },
    licenseLabel: { type: String, default: 'License' },
    readinessLabel: { type: String, default: undefined },
    readinessIntent: {
      type: String as PropType<DocumentHeaderProps['readinessIntent']>,
      default: undefined,
    },
  },
  emits: ['licenseChange'],
  setup(props, { slots, emit }) {
    return () => {
      const hasToggle = Boolean(props.showLicenseToggle && props.licenseOptions?.length);
      const meta = [
        props.readinessLabel
          ? h(Badge, {
              label: props.readinessLabel,
              intent: props.readinessIntent ?? 'neutral',
              dot: true,
              shape: 'pill',
            })
          : null,
        hasToggle
          ? h('div', { class: 'eevenkoto-document-header__license-toggle' }, [
              h(SegmentedControl, {
                label: props.licenseLabel,
                options: props.licenseOptions ?? [],
                selectedId: props.selectedLicense ?? 'proprietary',
                mode: 'radios',
                name: `${props.id ?? 'document-header'}-license`,
                size: 'sm',
                onChange: (id: string) => emit('licenseChange', id),
              }),
            ])
          : null,
      ];
      return h(
        'header',
        {
          id: props.id,
          class: documentHeaderClassNames({ selectedLicense: props.selectedLicense }),
        },
        [
          h('div', { class: 'eevenkoto-document-header__title' }, slots.default?.()),
          props.readinessLabel || hasToggle
            ? h('div', { class: 'eevenkoto-document-header__meta' }, meta)
            : null,
        ],
      );
    };
  },
});