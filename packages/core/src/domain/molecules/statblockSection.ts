import type { StatblockFeatureProps } from './statblockFeature';

export type StatblockSectionTitleLevel = 2 | 3 | 4;

export interface StatblockSectionProps {
  /** Section heading (e.g. Actions / Reactions) — visual H2. */
  title: string;
  /** Semantic heading tag level (`2` default; `3` or `4` when embedded under H2/H3). */
  titleLevel?: StatblockSectionTitleLevel;
  /** Optional introductory HTML rendered before `features` (e.g. Spellcasting/Lair preamble). */
  bodyHtml?: string;
  features?: StatblockFeatureProps[];
}

export const statblockSectionClassNames = (): string => 'eevenkoto-statblock-section';
