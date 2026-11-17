export type DisclosureVariant = 'card' | 'flush' | 'subtle';
export type DisclosureSize = 'sm' | 'md';

export interface DisclosureProps {
  /** Optional DOM element `id` on `<details>`. */
  id?: string;
  /** Primary disclosure label inside `<summary>`. */
  label: string;
  /** Optional secondary text shown inline after `label` inside `<summary>`. */
  summaryText?: string;
  /** Surface treatment. Default: `'card'`. */
  variant?: DisclosureVariant;
  /** Padding and typography density. Default: `'md'`. */
  size?: DisclosureSize;
  /** Start expanded (`open` attribute on `<details>`). Default: `false`. */
  open?: boolean;
  /** Accent/strong border emphasis for focal items. Default: `false`. */
  emphasized?: boolean;
  /** Plain-text body copy inside `.eevenkoto-disclosure__body`. */
  body?: string;
  /** Trusted pre-rendered HTML inside `.eevenkoto-disclosure__body`. Takes precedence over `body`. */
  bodyHtml?: string;
}

export type DisclosureClassNameProps = Pick<DisclosureProps, 'variant' | 'size' | 'emphasized'>;

export const disclosureClassNames = (props: DisclosureClassNameProps = {}): string => {
  const variant = props.variant ?? 'card';
  const size = props.size ?? 'md';
  return [
    'eevenkoto-disclosure',
    variant !== 'card' ? `eevenkoto-disclosure--${variant}` : '',
    size === 'sm' ? 'eevenkoto-disclosure--sm' : '',
    props.emphasized ? 'eevenkoto-disclosure--emphasized' : '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const disclosureSummaryClassNames = (): string => 'eevenkoto-disclosure__summary';
export const disclosureSummaryLeadClassNames = (): string => 'eevenkoto-disclosure__summary-lead';
export const disclosureSummaryLabelClassNames = (): string => 'eevenkoto-disclosure__summary-label';
export const disclosureSummaryTextClassNames = (): string => 'eevenkoto-disclosure__summary-text';
export const disclosureSummaryMetaClassNames = (): string => 'eevenkoto-disclosure__summary-meta';
export const disclosureChevronClassNames = (): string => 'eevenkoto-disclosure__chevron';
export const disclosureBodyClassNames = (): string => 'eevenkoto-disclosure__body eevenkoto-prose';
