import type { AbilityScoreProps } from './abilityScore';
import type { PropertyItem } from './property';
import type { StatblockSectionProps } from './statblockSection';

export interface StatblockProps {
  /** Creature / entity name (H1). */
  name: string;
  /** Optional flavor paragraph. */
  flavor?: string;
  /** Optional italic type line (size / type). */
  typeLine?: string;
  /** Combat vitals — rendered in the ability group header slot. */
  vitals: PropertyItem[];
  /** Ability columns. */
  abilities: AbilityScoreProps[];
  /** Skills, senses, languages, CR — ability group footer slot. */
  traits: PropertyItem[];
  /** Named sections (Actions, Reactions, …). */
  sections?: StatblockSectionProps[];
}

export const statblockClassNames = (): string => 'eevenkoto-statblock';
