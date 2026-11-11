import type { HeadingRunInLevel } from '../../core/atoms/heading';

/** Heading levels the feature name may use (all support run-in). */
export type StatblockFeatureLevel = HeadingRunInLevel;

export interface StatblockFeatureProps {
  /** Feature / action name (rendered as a run-in heading). */
  name: string;
  /**
   * Semantic heading level for `name`. Default `3` — correct under a
   * StatblockSection H2. Hosts without a section H2 (Spellblock) pass `2` so
   * the outline stays contiguous. Appearance is identical at every level.
   */
  level?: StatblockFeatureLevel;
  /**
   * Body copy after the run-in name. Optional when `descriptionHtml` is set.
   * HTML renderer allows a sanitized inline tag set (`em`, `strong`, `i`, `b`,
   * `code`, `br`, `a`, `span`, and `.eevenkoto-icon` SVGs).
   */
  description?: string;
  /**
   * Trusted pre-rendered inline HTML after the run-in name (e.g. from a Markdown
   * compiler). Takes precedence over `description`.
   */
  descriptionHtml?: string;
}

export const statblockFeatureClassNames = (): string => 'eevenkoto-statblock-feature';
