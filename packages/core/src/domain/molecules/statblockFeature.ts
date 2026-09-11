export interface StatblockFeatureProps {
  /** Feature / action name (rendered as H3 run-in). */
  name: string;
  /**
   * Body copy after the run-in name.
   * HTML renderer: plain text or a small allowlist of inline tags
   * (`em`, `strong`, `i`, `b`, `br`) — sanitized before insert.
   * React/Vue: prefer framework nodes; string props stay text.
   */
  description: string;
}

export const statblockFeatureClassNames = (): string => 'eevenkoto-statblock-feature';
