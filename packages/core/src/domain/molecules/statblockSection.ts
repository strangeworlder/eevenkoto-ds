import type { StatblockFeatureProps } from './statblockFeature';

export interface StatblockSectionProps {
  /** Section heading (e.g. Actions / Reactions) — visual H2. */
  title: string;
  /** Semantic heading tag level (`2` default; `3` when embedded under H2). */
  titleLevel?: 2 | 3;
  /** Optional introductory HTML rendered before `features` (e.g. Spellcasting/Lair preamble). */
  bodyHtml?: string;
  features?: StatblockFeatureProps[];
}

export const statblockSectionClassNames = (): string => 'eevenkoto-statblock-section';
