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
   * Body copy after the run-in name.
   * HTML renderer: plain text or a small allowlist of inline tags
   * (`em`, `strong`, `i`, `b`, `br`) — sanitized before insert.
   * React/Vue: prefer framework nodes; string props stay text.
   */
  description: string;
}

export const statblockFeatureClassNames = (): string => 'eevenkoto-statblock-feature';
