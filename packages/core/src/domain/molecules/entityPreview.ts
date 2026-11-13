import type { BadgeProps } from '../../core/atoms/badge';
import type { LinkButtonProps } from '../../core/atoms/linkButton';
import type { TooltipCardProps } from '../../core/molecules/tooltipCard';
import { tooltipCardClassNames } from '../../core/molecules/tooltipCard';
import type { EntityRefKind } from '../atoms/entityRef';

export interface EntityPreviewProps extends TooltipCardProps {
  /** Entity kind shown as `data-kind` for styling hooks. */
  kind?: EntityRefKind;
  /** Optional badge next to the title (e.g. readiness). */
  badge?: BadgeProps;
  /** Shown when the preview body was truncated. */
  truncatedLabel?: string;
  /** Footer link to the full entry. */
  footerLink?: LinkButtonProps;
}

export const entityPreviewClassNames = (props: Pick<TooltipCardProps, 'flush'> = {}): string =>
  `${tooltipCardClassNames(props)} eevenkoto-entity-preview`;
