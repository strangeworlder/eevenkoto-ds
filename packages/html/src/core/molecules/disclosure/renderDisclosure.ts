import {
  disclosureBodyClassNames,
  disclosureChevronClassNames,
  disclosureClassNames,
  disclosureSummaryClassNames,
  disclosureSummaryLabelClassNames,
  disclosureSummaryLeadClassNames,
  disclosureSummaryMetaClassNames,
  disclosureSummaryTextClassNames,
  type DisclosureProps as CoreDisclosureProps,
} from '@eevenkoto/core';
import { escapeHtml, sanitizeInlineHtml } from '../../../utils/html';
import { renderIcon } from '../../atoms/icon/renderIcon';
import template from './Disclosure.html';

export type DisclosureProps = CoreDisclosureProps & {
  /** Trusted HTML before the label (e.g. a Swatch). */
  summaryLead?: string;
  /** Trusted HTML aligned to the end of the summary (e.g. a Badge). */
  summaryMeta?: string;
};

export const renderDisclosure = (args: DisclosureProps): string => {
  const body =
    args.bodyHtml !== undefined
      ? sanitizeInlineHtml(args.bodyHtml)
      : args.body
        ? `<p>${escapeHtml(args.body)}</p>`
        : '';

  return template
    .replace('{{idAttr}}', args.id ? ` id="${escapeHtml(args.id)}"` : '')
    .replace('{{className}}', disclosureClassNames(args))
    .replace('{{openAttr}}', args.open ? ' open' : '')
    .replace('{{summaryClassName}}', disclosureSummaryClassNames())
    .replace('{{lead}}', () =>
      args.summaryLead
        ? `<span class="${disclosureSummaryLeadClassNames()}">${args.summaryLead}</span>`
        : '',
    )
    .replace('{{labelClassName}}', disclosureSummaryLabelClassNames())
    .replace('{{label}}', escapeHtml(args.label))
    .replace('{{text}}', () =>
      args.summaryText
        ? `<span class="${disclosureSummaryTextClassNames()}">${escapeHtml(args.summaryText)}</span>`
        : '',
    )
    .replace('{{meta}}', () =>
      args.summaryMeta
        ? `<span class="${disclosureSummaryMetaClassNames()}">${args.summaryMeta}</span>`
        : '',
    )
    .replace('{{chevron}}', () =>
      renderIcon({ name: 'chevron-down', size: 'sm', className: disclosureChevronClassNames() }),
    )
    .replace('{{bodyClassName}}', disclosureBodyClassNames())
    .replace('{{body}}', () => body);
};
