import type { BadgeIntent } from '../../core/atoms/badge';

export type ContentGateTitleLevel = 1 | 2 | 3;

export interface ContentGateProps {
  /** Optional DOM element `id`. */
  id?: string;
  /** Readiness badge label. */
  readinessLabel: string;
  /** Readiness badge intent. */
  readinessIntent: BadgeIntent;
  /** Accessible label for the lock glyph. */
  lockLabel?: string;
  /** Gate heading. */
  title: string;
  /** Semantic heading level. Default: `2`. */
  titleLevel?: ContentGateTitleLevel;
  /** Plain text explanation. */
  description?: string;
  /** Trusted HTML explanation. Takes precedence over `description`. */
  descriptionHtml?: string;
  /** The reader's current tier label. */
  currentTierLabel: string;
  /** Prefix for the current tier (e.g. `'Nykytilasi:'`). */
  currentTierPrefix?: string;
  /** The tier required to read the document. */
  requiredTierLabel: string;
  /** Prefix for the required tier (e.g. `'Vaadittu rooli:'`). */
  requiredTierPrefix?: string;
  /** Live-region text (hidden when empty). */
  statusMessage?: string;
}

export const contentGateClassNames = (): string => 'eevenkoto-content-gate';
