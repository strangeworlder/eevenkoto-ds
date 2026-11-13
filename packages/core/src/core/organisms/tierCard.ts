import type { BadgeProps } from '../atoms/badge';
import type { LinkButtonProps } from '../atoms/linkButton';
import type { ListItemProps } from '../atoms/listItem';

export type TierCardNameLevel = 2 | 3;

export interface TierCardProps {
  /** Optional DOM element `id`. */
  id?: string;
  /** Tier or plan display name. */
  name: string;
  /** Semantic heading level for `name`. Default: `2`. */
  nameLevel?: TierCardNameLevel;
  /** Optional status/tier pill Badge in the header row. */
  badge?: BadgeProps;
  /** Primary price string (e.g. `'0 €'`, `'5 €'`). */
  price: string;
  /** Billing cadence or availability string (e.g. `'/ kk'`). */
  period?: string;
  /** Summary paragraph below price. */
  description?: string;
  /** Trusted inline HTML for summary paragraph. Takes precedence over `description`. */
  descriptionHtml?: string;
  /** Checklist features (`included` | `accent` | `excluded`). */
  features: ListItemProps[];
  /** Highlights recommended/featured tier with accent outline. Default: `false`. */
  featured?: boolean;
  /** Marks the user's active tier with a high-contrast current ring. Default: `false`. */
  current?: boolean;
  /** Full-width footer CTA link button (used when custom `footer` slot/prop is omitted). */
  cta?: LinkButtonProps;
}

export type TierCardClassNameProps = Pick<TierCardProps, 'featured' | 'current'>;

export const tierCardClassNames = (props: TierCardClassNameProps = {}): string =>
  [
    'eevenkoto-tier-card',
    props.featured ? 'eevenkoto-tier-card--featured' : '',
    props.current ? 'eevenkoto-tier-card--current' : '',
  ]
    .filter(Boolean)
    .join(' ');
