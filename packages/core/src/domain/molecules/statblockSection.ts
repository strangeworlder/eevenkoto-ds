import type { StatblockFeatureProps } from './statblockFeature';

export interface StatblockSectionProps {
  /** Section heading (e.g. Actions / Reactions) — semantic H2. */
  title: string;
  features: StatblockFeatureProps[];
}

export const statblockSectionClassNames = (): string => 'eevenkoto-statblock-section';
