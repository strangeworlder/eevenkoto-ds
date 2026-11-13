import {
  disclosureBodyClassNames,
  disclosureChevronClassNames,
  disclosureClassNames,
  disclosureSummaryClassNames,
  disclosureSummaryLabelClassNames,
  disclosureSummaryLeadClassNames,
  disclosureSummaryMetaClassNames,
  disclosureSummaryTextClassNames,
  type DisclosureProps,
} from '@eevenkoto/core';
import { computed, defineComponent, h, type PropType } from 'vue';
import { Icon } from '../atoms/Icon';

export type { DisclosureProps };

export const Disclosure = defineComponent({
  name: 'EevenkotoDisclosure',
  props: {
    id: { type: String, default: undefined },
    label: { type: String, required: true },
    summaryText: { type: String, default: undefined },
    variant: { type: String as PropType<DisclosureProps['variant']>, default: undefined },
    open: { type: Boolean, default: false },
    emphasized: { type: Boolean, default: false },
    body: { type: String, default: undefined },
    bodyHtml: { type: String, default: undefined },
  },
  setup(props, { slots }) {
    const className = computed(() =>
      disclosureClassNames({ variant: props.variant, emphasized: props.emphasized }),
    );

    return () => {
      const summary = [
        slots.summaryLead
          ? h('span', { class: disclosureSummaryLeadClassNames() }, slots.summaryLead())
          : null,
        h('span', { class: disclosureSummaryLabelClassNames() }, props.label),
        props.summaryText
          ? h('span', { class: disclosureSummaryTextClassNames() }, props.summaryText)
          : null,
        slots.summaryMeta
          ? h('span', { class: disclosureSummaryMetaClassNames() }, slots.summaryMeta())
          : null,
        h(Icon, { name: 'chevron-down', size: 'sm', class: disclosureChevronClassNames() }),
      ];

      const body = slots.default
        ? h('div', { class: disclosureBodyClassNames() }, slots.default())
        : props.bodyHtml !== undefined
          ? h('div', { class: disclosureBodyClassNames(), innerHTML: props.bodyHtml })
          : h('div', { class: disclosureBodyClassNames() }, props.body ? [h('p', props.body)] : []);

      return h(
        'details',
        { id: props.id, class: className.value, open: props.open || undefined },
        [h('summary', { class: disclosureSummaryClassNames() }, summary), body],
      );
    };
  },
});
