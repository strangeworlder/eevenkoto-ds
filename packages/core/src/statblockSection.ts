export interface StatblockFeatureProps {
  /** Feature / attack name (rendered as H3 run-in). */
  name: string;
  /**
   * Body copy after the run-in name. May include trusted inline HTML
   * (`<em>`, etc.) for the HTML renderer; frameworks pass nodes instead.
   */
  description: string;
}

/** @deprecated Prefer StatblockFeatureProps */
export type StatblockFeature = StatblockFeatureProps;

export const statblockFeatureClassNames = (): string => 'eevenkoto-statblock-feature';

export interface StatblockSectionProps {
  /** Section heading (e.g. Actions / Reactions) — semantic H2. */
  title: string;
  features: StatblockFeatureProps[];
}

/** @deprecated Prefer StatblockSectionProps */
export type StatblockSection = StatblockSectionProps;

export const statblockSectionClassNames = (): string => 'eevenkoto-statblock-section';
